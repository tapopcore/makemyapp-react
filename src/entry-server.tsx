import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

export { META, ROUTES, SITE, SERVICE_PAGES, FAQS, TESTIMONIALS, SERVICES, ALL_WORK, inr } from "./content";

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
