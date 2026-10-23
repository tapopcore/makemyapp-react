import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { setNewsSnapshot, type NewsData } from "./news";

export { META, ROUTES, SITE, SERVICE_PAGES, FAQS, TESTIMONIALS, SERVICES, ALL_WORK, TEAM, inr } from "./content";

export function render(url: string, news: NewsData | null = null) {
  setNewsSnapshot(news);
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
