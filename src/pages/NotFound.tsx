import { Link } from "react-router-dom";
import { Arrow } from "../ui";

export default function NotFound() {
  return (
    <section className="hero-top wrap flex min-h-[80vh] flex-col justify-center pb-20">
      <p className="label text-mute">Error 404</p>
      <h1 className="display mt-4 text-[clamp(72px,16vw,240px)]">Lost?</h1>
      <p className="mt-6 max-w-lg text-[19px] text-ink-2">This page doesn't exist, or it moved when we rebuilt the site. These will get you back on track.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn-ink">Home <Arrow /></Link>
        <Link to="/work" className="btn-line">Our work</Link>
        <Link to="/services" className="btn-line">Services</Link>
      </div>
    </section>
  );
}
