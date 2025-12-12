import type { FC } from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/logo.png";

const Footer: FC = () => {
  return (
    <>
      <footer className="py-16 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="mb-6">
                <img
                  src="https://static.readdy.ai/image/a63ec0b6f34fb9b66d50256c348ce6a2/eee86fc26724efb9f9cd1d9f7ac7cc47.png"
                  alt="MakeMyApp Logo"
                  className="h-12"
                />
              </div>
              <p className="mb-4">
                Full-stack agency for websites, mobile apps & custom software
                solutions.
              </p>
              <p className="font-mono">© 2025 MakeMyApp.co</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="hover:text-[#FF6B00] cursor-pointer">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="hover:text-[#FF6B00] cursor-pointer"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="hover:text-[#FF6B00] cursor-pointer"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#FF6B00] cursor-pointer"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#FF6B00] cursor-pointer"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Contact</h3>
              <ul className="space-y-3 font-mono">
                <li className="flex items-center gap-3">
                  <i className="fas fa-phone"></i>
                  <span>+91 99993 96619</span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-envelope"></i>
                  <span>makemyapp.co@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    2-A/3, Kundan mansion, Asaf ali road, Daryaganj,
                    Delhi-110002
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                {/* <a
                  href="#"
                  className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a> */}
                <a
                  href="https://www.instagram.com/makemyapp.co/"
                  target="_blank"
                  className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="http://makemyapp.qviq.io"
                  target="_blank"
                  className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <img src={Logo} className="h-[25px] w-[25px]" />
                </a>
                {/* <a
                  href="#"
                  className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <i className="fab fa-github"></i>
                </a> */}
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-[20px] mt-[36px] md:mt-[58px]">
            <div className="font-[500] text-[#fffefe] text-[12px] sm:text-[18px] leading-[20px]">
              Tapop Smart Tech Private Limited
            </div>
            <div className="font-[500] text-[#f6f3f3] text-[12px] sm:text-[18px] leading-[20px]">
              <Link to="/privacy-policy">Privacy-Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
