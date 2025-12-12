import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import ContactUS from "./components/ContactUs";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import PrivacyPolicy from "./components/PrivacyPolicy";
function App() {
  ReactGA.initialize("G-9YYJP2Q07L");
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
