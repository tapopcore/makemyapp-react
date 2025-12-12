import { useEffect, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from "react-ga4";

const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* LEFT: Logo */}
          <div className="h-10 md:h-12">
            <img
              src="https://static.readdy.ai/image/a63ec0b6f34fb9b66d50256c348ce6a2/eee86fc26724efb9f9cd1d9f7ac7cc47.png"
              alt="MakeMyApp Logo"
              className="h-full"
            />
          </div>

          {/* MIDDLE (empty or can be used for center links if needed) */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-[#5D00FF] cursor-pointer">Home</Link>
            <Link to="/Services" className="font-medium hover:text-[#5D00FF] cursor-pointer">Services</Link>
            <Link to="/projects" className="font-medium hover:text-[#5D00FF] cursor-pointer">Work</Link>
            <Link to="/about" className="font-medium hover:text-[#5D00FF] cursor-pointer">About</Link>
            <Link to="/Contact" className="font-medium hover:text-[#5D00FF] cursor-pointer">Contact</Link>
          </nav>

          {/* RIGHT: Book Call + Hamburger (for mobile) */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => {
                ReactGA.event({
                  category: 'Calendly form',
                  action: 'Clicked a button'
                });
                window.open("https://calendly.com/makemyapp-co/30min", "_blank");
              }}
              className="bg-[#FF6B00] text-white px-4 py-2  font-medium "
            >
              Book Free Call
            </button>

            {/* Hamburger Icon */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(true)} className="text-black">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col px-6 py-10 space-y-6 text-lg font-medium">
          {/* Close Button */}
          <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile Nav Links */}
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/Services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>Work</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          {/* CTA in Mobile Menu */}
          <button
            onClick={() => {
              ReactGA.event({
                category: 'Calendly form',
                action: 'Clicked a button',
              });
              window.open("https://calendly.com/makemyapp-co/30min", "_blank");
              setMenuOpen(false);
            }}
            className="mt-4 bg-[#FF6B00] text-white px-6 py-2 rounded-none w-full text-center font-medium"
          >
            Book Free Call
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
