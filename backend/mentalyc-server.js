import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import compression from "compression";
// import csurf from "csurf";
import graphqlHTTP from "express-graphql";
import cookieParser from "cookie-parser";
import { schema } from "./graphql/schema.graphql.js";
import { root } from "./graphql/root.graphql.js";
import { router } from "./routers/router.js";

import dbMiddleware from "./middleware/db.js";
import sessionMiddleware from "./middleware/session.js";
import http from "http";
import { PORT, isProd, cookieSecret, corsSettings } from "./settings.js";

import redisClient from "./redis/index.js";
import { AppError } from "./lib/errors.js";

dotenv.config();

console.log(`Starting a server for ${process.env.NODE_ENV}`);

const app = express();
const server = http.createServer(app);

// redis listen
redisClient.on("connect", () => {
  console.log("Redis client connected");
});

app.set("trust proxy", true);
app.use(cookieParser(cookieSecret));
app.use(helmet());
app.use(compression());
// app.use(helmet({ contentSecurityPolicy: false })
app.use(sessionMiddleware);
app.options("*", cors(corsSettings));
app.use(cors(corsSettings));
//csrfProtection
// const csrfProtection = csurf({
//   cookie: {
//     secure: isProd ? true : false,
//     httpOnly: true,
//     sameSite: true
//   }
// });

app.use("/api/v1", dbMiddleware, express.urlencoded({ limit: "50mb", extended: false }), express.json({ limit: "50mb", extended: false }), router);

// do we need graphql for this ?
app.use(
  "/graphql",
  express.json({ limit: "50mb", extended: false }),
  dbMiddleware,
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// global error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.

  if (err instanceof AppError) {
    let statuscode = err.statusCode;
    let message = err.message;
    res.status(statuscode).json({ error: message });
  } else if (isProd) {
    res.status(err.statusCode ?? 500).json({ error: "server error " });
  } else {
    next(err);
  }
});

app.use(express.static(path.join(path.resolve(), "../client/dist")));

app.get("*", function (req, res) {
  res.sendFile(path.join(path.resolve(), "../client/dist", "index.html"));
});

server.listen(PORT, () => console.log(`Started server on port ${PORT}, port`));
