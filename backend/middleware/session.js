import session from "express-session";
import memcached from "connect-memcached";
import { cookieSecret, isProd } from "../settings.js";


const cookieMaxAge = process.env.SESSION_INACTIVITY_LIMIT_MINUTES * 60 * 1000;
const memcachedURL = process.env.MEMCACHED_HOST || process.env.LOCAL_MEMCACHED_URL;
console.log(`got memcached host ${memcachedURL}`);

console.log({ cookieMaxAge });
const MemcachedStore = memcached(session);

const sessionMiddleware = session({
  proxy: true,
  secret: cookieSecret,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    secure: isProd ? true : false,
    httpOnly: true,
    sameSite: true,
    maxAge: cookieMaxAge
  },
  store: new MemcachedStore({
    hosts: [memcachedURL],
    poolSize: 200 // how should I chose this?
  })
});

export default sessionMiddleware;
