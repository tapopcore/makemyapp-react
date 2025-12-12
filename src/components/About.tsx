// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import PreviewModal from "./PreviewModal"
import Logo from "./assets/logo.png";
import ReactGA from "react-ga4";
import COFOUNDER from "./assets/sayaji.png";
import FOUNDER from "./assets/dhruv.png";
import qviq from "./assets/qviq.png";
import Ram from "./assets/ram.jpg"

const About: React.FC = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // if (window.scrollY > 50) {
      //   setIsScrolled(true);
      // } else {
      //   setIsScrolled(false);
      // }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Animation for stats counting
  // Testimonial slider
  const testimonials = [
    {
      quote:
        "MakeMyApp transformed our business with their innovative approach. Their team delivered beyond our expectations and within our timeline.",
      name: "Sarah Johnson",
      position: "CEO, TechVision Inc.",
      image:
        "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520a%2520confident%2520female%2520CEO%2520in%2520her%252040s%2520with%2520short%2520dark%2520hair%2520and%2520glasses%2520wearing%2520a%2520navy%2520blue%2520blazer%2520against%2520a%2520neutral%2520background%2520looking%2520directly%2520at%2520camera%2520with%2520a%2520warm%2520smile%2520professional%2520corporate%2520portrait%2520with%2520soft%2520lighting&width=100&height=100&seq=101&orientation=squarish",
    },
    {
      quote:
        "Working with MakeMyApp was a game-changer for our startup. Their expertise in mobile development helped us launch our app months ahead of schedule.",
      name: "Michael Chen",
      position: "Founder, AppLaunch",
      image:
        "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520an%2520Asian%2520male%2520tech%2520entrepreneur%2520in%2520his%252030s%2520wearing%2520a%2520casual%2520button%2520up%2520shirt%2520against%2520a%2520light%2520background%2520with%2520a%2520friendly%2520confident%2520expression%2520high%2520quality%2520corporate%2520portrait%2520with%2520professional%2520lighting&width=100&height=100&seq=102&orientation=squarish",
    },
    {
      quote:
        "The team at MakeMyApp delivered a complete rebrand that perfectly captured our company's vision. Their attention to detail and creative approach exceeded our expectations.",
      name: "Emma Rodriguez",
      position: "Marketing Director, Elevate Brands",
      image:
        "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520a%2520latina%2520woman%2520in%2520her%252030s%2520with%2520long%2520dark%2520hair%2520wearing%2520professional%2520attire%2520against%2520a%2520neutral%2520background%2520smiling%2520confidently%2520at%2520the%2520camera%2520high%2520quality%2520corporate%2520portrait%2520with%2520soft%2520professional%2520lighting&width=100&height=100&seq=103&orientation=squarish",
    },
  ];
  //   const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      //   setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#5D00FF]">
        <div className="container mx-auto px-6">
           <div className="flex justify-start mb-6">
      <Link
        to="/"
        className="flex items-center text-white hover:text-gray-200 transition-colors cursor-pointer"
      >
        <i className="fas fa-arrow-left mr-2"></i>
        <span>Back to Home</span>
      </Link>
    </div>

          <div className="flex flex-col items-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
              About Us
            </h1>
            <div className="w-24 h-1 bg-white mb-6"></div>
            <p className="text-white/90 text-xl text-center max-w-2xl">
              We're a team of passionate designers and developers creating
              exceptional digital experiences.
            </p>
          </div>
        </div>
      </section>
      {/* Company Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="w-16 h-1 bg-[#5D00FF] mb-8"></div>
              <p className="text-lg mb-6">
                Founded in 2017, MakeMyApp began with a simple mission: to
                bridge the gap between innovative ideas and exceptional digital
                products. What started as a small team of three passionate
                developers has grown into a full-service digital agency with
                specialists across design, development, and strategy.
              </p>
              <p className="text-lg mb-6">
                We believe that great technology should be accessible to
                businesses of all sizes. Our approach combines technical
                expertise with creative problem-solving to deliver solutions
                that not only meet but exceed our clients' expectations.
              </p>
              <p className="text-lg">
                Today, we're proud to have partnered with over 120 clients
                across various industries, from startups to enterprise
                organizations, helping them transform their digital presence and
                achieve their business goals.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-4 border-[#5D00FF]"></div>
                <img
                  src="https://readdy.ai/api/search-image?query=A%2520modern%2520tech%2520office%2520space%2520with%2520diverse%2520team%2520of%2520designers%2520and%2520developers%2520collaborating%2520at%2520a%2520large%2520table%2520with%2520computers%2520and%2520design%2520materials%2520bright%2520airy%2520space%2520with%2520large%2520windows%2520plants%2520and%2520minimalist%2520decor%2520professional%2520creative%2520atmosphere%2520with%2520purple%2520brand%2520accents&width=600&height=450&seq=201&orientation=landscape"
                  alt="Our team working together"
                  className="w-full h-auto object-cover border-4 border-black relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Mission & Values Section */}
      <section className="py-20 bg-gray-50 border-y-4 border-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Mission & Values</h2>
            <div className="w-16 h-1 bg-[#5D00FF] mx-auto mb-8"></div>
            <p className="text-xl max-w-3xl mx-auto">
              We're driven by a commitment to excellence and innovation in
              everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 border-4 border-black transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#5D00FF]">
              <div className="w-16 h-16 bg-[#5D00FF] text-white flex items-center justify-center mb-6">
                <i className="fas fa-lightbulb text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-700">
                We embrace new technologies and creative approaches to solve
                complex problems with elegant solutions.
              </p>
            </div>
            <div className="bg-white p-8 border-4 border-black transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#FF6B00]">
              <div className="w-16 h-16 bg-[#FF6B00] text-white flex items-center justify-center mb-6">
                <i className="fas fa-handshake text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Partnership</h3>
              <p className="text-gray-700">
                We build lasting relationships with our clients, working
                collaboratively to achieve shared success.
              </p>
            </div>
            <div className="bg-white p-8 border-4 border-black transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#0066FF]">
              <div className="w-16 h-16 bg-[#0066FF] text-white flex items-center justify-center mb-6">
                <i className="fas fa-gem text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-700">
                We're committed to delivering exceptional quality in every
                project, paying attention to every detail.
              </p>
            </div>
            <div className="bg-white p-8 border-4 border-black transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#FF0099]">
              <div className="w-16 h-16 bg-[#FF0099] text-white flex items-center justify-center mb-6">
                <i className="fas fa-users text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Inclusivity</h3>
              <p className="text-gray-700">
                We celebrate diversity and create products that are accessible
                and user-friendly for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 bg-gray-50 border-y-4 border-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <div className="w-16 h-1 bg-[#5D00FF] mx-auto mb-8"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Our talented team of experts is passionate about creating
              exceptional digital experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white border-4 border-black overflow-hidden group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#5D00FF]">
              <div className="h-80 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#5D00FF] opacity-0 group-hover:opacity-20 transition-all duration-500 z-10"></div>
                <img
                  src={FOUNDER}
                  className="w-full h-full object-contain transform transition-all duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="p-6 relative overflow-hidden bg-white">
                <div className="transform transition-all duration-500 ease-out group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold mb-1 transition-colors duration-300 group-hover:text-[#5D00FF]">
                    DHRUV GUPTA
                  </h3>
                  <p className="text-[#5D00FF] font-medium mb-4">
                    Co-Founder & CEO
                  </p>
                  <p className="text-gray-700 mb-6 transition-all duration-300 group-hover:text-black">
                    We’ve built and scaled our own products, so we know the
                    challenges firsthand. At MakeMyApp, we focus on solutions
                    that work, not just code. Let’s turn your idea into
                    something real and impactful!
                  </p>
                  <div className="flex space-x-4 transform transition-all duration-500 ease-out translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <a
                      href="https://www.linkedin.com/in/iamdhruvguptaa/"
                      target="_blank"
                      className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#FF6B00] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/iamdhruvguptaa/"
                      target="_blank"
                      className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#0066FF] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
                    >
                      <i className="fab fa-instagram text-lg"></i>
                    </a>
                    <a
                      href="https://dhruv.qviq.io/"
                      target="_blank"
                      className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#83d4dc] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
                    >
                      <img src={qviq} className="w-8 h-8" alt="qviq" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white border-4 border-black overflow-hidden group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#FF6B00]">
              <div className="h-80 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF6B00] opacity-0 group-hover:opacity-20 transition-all duration-500 z-10"></div>
                <img
                  src={COFOUNDER}
                  alt="Jessica Wong"
                  className="w-full h-full object-contain transform transition-all duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="p-6 relative overflow-hidden bg-white">
                <div className="transform transition-all duration-500 ease-out group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold mb-1 transition-colors duration-300 group-hover:text-[#FF6B00]">
                    SAYAJI SHIRKE
                  </h3>
                  <p className="text-[#FF6B00] font-medium mb-4">
                    Co-Founder & CTO
                  </p>
                  <p className="text-gray-700 mb-6 transition-all duration-300 group-hover:text-black">
                    Tech should empower, not complicate. We build smart,
                    scalable, and futureproof solutions that help businesses
                    grow. Let’s collaborate and create something truly
                    game-changing!
                  </p>
                  <div className="flex space-x-4 transform transition-all duration-500 ease-out translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <a
                      href="https://www.linkedin.com/in/sayajishirke/"
                      target="_blank"
                      className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#FF6B00] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/sayajishirke/"
                      target="_blank"
                      className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#0066FF] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
                    >
                      <i className="fab fa-instagram text-lg"></i>
                    </a>
                    <a
                      href="https://sayaji.qviq.io/"
                      target="_blank"
                      className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#83d4dc] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
                    >
                      <img src={qviq} className="w-8 h-8" alt="qviq" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white border-4 border-black overflow-hidden group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#0066FF]">
              <div className="h-80 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0066FF] opacity-0 group-hover:opacity-20 transition-all duration-500 z-10"></div>
                <img
                  src={Ram}
                  alt="Marcus Johnson"
                  className="w-full h-full object-contain object-top transform transition-all duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="p-6 relative overflow-hidden bg-white">
                <div className="transform transition-all duration-500 ease-out group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold mb-1 transition-colors duration-300 group-hover:text-[#0066FF]">
                   RAMPRASAD YADAV
                  </h3>
                  <p className="text-[#0066FF] font-medium mb-4">
                    Senior Tech Head
                  </p>
                  <p className="text-gray-700 mb-6 transition-all duration-300 group-hover:text-black">
                    Ramprasad oversees all technical aspects of our projects,
                    ensuring they're built with clean, efficient code and the
                    latest technologies.
                  </p>
                  <div className="flex space-x-4 transform transition-all duration-500 ease-out translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <a
                      href="https://www.linkedin.com/in/ramprasad-yadav-786ab5193/"
                      target="_blank"
                      className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#FF6B00] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/iamyadavram/"
                      target="_blank"
                      className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#0066FF] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
                    >
                      <i className="fab fa-instagram text-lg"></i>
                    </a>
                    <a
                      href="https://ram.qviq.io/"
                      target="_blank"
                      className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#83d4dc] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
                    >
                      <img src={qviq} className="w-8 h-8" alt="qviq" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 space-x-6">
           {/* <a
              href="#"
              className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#5D00FF] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
            >
              <i className="fab fa-linkedin-in text-lg"></i>
            </a>*/}
            {/*<a
              href="#"
              className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#FF6B00] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
            >
              <i className="fab fa-twitter text-lg"></i>
            </a>*/}
            <a
              href="#"
              className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#0066FF] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
            >
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a
                  href="http://makemyapp.qviq.io"
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#0066FF] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
                >
                  <img src={Logo} className="h-[25px] w-[25px]" />
                </a>
           {/*<a
              href="#"
              className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#FF0099] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer"
            >
              <i className="fab fa-github text-lg"></i>
            </a>*/}
          </div>
        </div>
      </section>
      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Work Gallery</h2>
            <div className="w-16 h-1 bg-[#5D00FF] mx-auto mb-8"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Explore our portfolio of successful projects and creative
              solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gallery Item 1 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#5D00FF] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20mobile%20app%20interface%20design%20showcasing%20a%20sleek%20fitness%20tracking%20dashboard%20with%20dark%20mode%20UI%20clean%20typography%20and%20data%20visualization%20charts%20professional%20app%20screenshot%20on%20latest%20smartphone%20device%20against%20simple%20background&width=600&height=400&seq=401&orientation=landscape"
                alt="Fitness App UI"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  FitTrack Pro
                </h3>
                <p className="text-white/90">
                  Mobile fitness tracking application with advanced analytics
                </p>
              </div>
            </div>
            {/* Gallery Item 2 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF6B00] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Elegant%20ecommerce%20website%20design%20showing%20a%20luxury%20fashion%20product%20page%20with%20minimalist%20layout%20high%20quality%20product%20photography%20and%20sophisticated%20typography%20professional%20web%20design%20against%20simple%20background&width=600&height=400&seq=402&orientation=landscape"
                alt="E-commerce Platform"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  LuxeCommerce
                </h3>
                <p className="text-white/90">
                  Premium e-commerce platform for luxury brands
                </p>
              </div>
            </div>
            {/* Gallery Item 3 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0066FF] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20fintech%20dashboard%20interface%20showing%20cryptocurrency%20trading%20platform%20with%20real%20time%20charts%20and%20analytics%20dark%20theme%20professional%20financial%20app%20design%20against%20simple%20background&width=600&height=400&seq=403&orientation=landscape"
                alt="Crypto Trading Platform"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  CryptoTrade Pro
                </h3>
                <p className="text-white/90">
                  Advanced cryptocurrency trading platform
                </p>
              </div>
            </div>
            {/* Gallery Item 4 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF0099] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Social%20media%20app%20interface%20design%20showing%20content%20creation%20and%20sharing%20features%20with%20modern%20UI%20elements%20and%20interactive%20components%20professional%20mobile%20app%20design%20against%20simple%20background&width=600&height=400&seq=404&orientation=landscape"
                alt="Social Media App"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  SocialConnect
                </h3>
                <p className="text-white/90">Next-gen social media platform</p>
              </div>
            </div>
            {/* Gallery Item 5 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#5D00FF] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Educational%20platform%20interface%20showing%20online%20course%20dashboard%20with%20video%20lessons%20progress%20tracking%20and%20interactive%20quizzes%20professional%20e%20learning%20design%20against%20simple%20background&width=600&height=400&seq=405&orientation=landscape"
                alt="Education Platform"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  EduLearn Plus
                </h3>
                <p className="text-white/90">
                  Comprehensive online learning platform
                </p>
              </div>
            </div>
            {/* Gallery Item 6 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF6B00] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Smart%20home%20automation%20app%20interface%20showing%20device%20control%20dashboard%20with%20IoT%20integration%20and%20energy%20monitoring%20professional%20IoT%20app%20design%20against%20simple%20background&width=600&height=400&seq=406&orientation=landscape"
                alt="Smart Home App"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  SmartHome Hub
                </h3>
                <p className="text-white/90">
                  IoT-powered home automation solution
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              className="bg-black text-white px-8 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#5D00FF]"
              onClick={() => {
                ReactGA.event({
                  category: "Project viewed",
                  action: "Clicked a button",
                });

                setShowPreviewModal(true);
              }}
            >
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#5D00FF] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Ready to bring your vision to life? Get in touch with our team to
            discuss how we can help you achieve your goals.
          </p>
          <Link
            to="/contact"
            data-readdy="true"
            className="inline-block bg-[#FF6B00] text-white px-8 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
            onClick={() => {
              ReactGA.event({
                category: "Navigation",
                action: "Clicked Contact Us link",
              });
            }}
          >
            Contact Us
          </Link>
        </div>
      </section>
      {/* Footer */}
      <Footer />
      {showPreviewModal && (
        <PreviewModal onClose={() => setShowPreviewModal(false)} />
      )}
    </div>
  );
};
export default About;
