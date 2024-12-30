// import 'react-app-polyfill/ie9'; // For IE 9-11 support
import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "./polyfill";
import ReactDOM from "react-dom";

// debug: true
import App from "./App";
import "./tailwind/index.css";


ReactDOM.render(<App />, document.getElementById("root"));


