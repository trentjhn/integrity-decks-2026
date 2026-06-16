import { ViteReactSSG } from "vite-react-ssg";
import routes from "./App.jsx";
import "./index.css";

// vite-react-ssg renders each route to static HTML at build time and hydrates on the client.
export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    // The icon web component registers a custom element (touches `customElements`),
    // which doesn't exist during Node static generation — load it on the client only.
    if (isClient) import("iconify-icon");
  }
);
