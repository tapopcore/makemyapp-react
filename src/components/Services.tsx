// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactGA from "react-ga4";
import { Link } from "react-router-dom";
import { serverUrl } from "../config";
import { Check, X } from "lucide-react";
const Services: React.FC = () => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
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

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    // Update the windowWidth state when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = "auto";
  };

  const handleSubmit = async (formId: string, modalType: string) => {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (form && form.checkValidity()) {
      // Get form data
      const formData = new FormData(form);

      // Prepare data for API
      const data = {
        packageType: modalType, // "basic" or "professional"
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        companyName: formData.get("company"),
        projectDescription: formData.get("description"),
        preferContactMethod: formData.get("contactMethod"),
      };

      // Show loading state
      const submitBtn = document.querySelector(
        `#${modalType}SubmitBtn`
      ) as HTMLButtonElement;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML =
          '<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>Submitting...';
      }

      try {
        // Send POST request to your backend
        const response = await fetch(`${serverUrl}/connect/packageInquiry`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Form submitted successfully:", result);

        // Close modal
        closeModal();

        // Show success toast
        const toast = document.createElement("div");
        toast.className =
          "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50   duration-300";
        toast.innerHTML = `
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <p>Your ${modalType} package inquiry has been submitted successfully!</p>
          </div>`;
        document.body.appendChild(toast);

        setTimeout(() => {
          toast.style.transform = "translate(0)";
          toast.style.opacity = "1";
        }, 100);

        setTimeout(() => {
          toast.style.transform = "translate-y-full";
          toast.style.opacity = "0";
          setTimeout(() => toast.remove(), 300);
        }, 5000);
      } catch (error) {
        console.error("Form submission error:", error);

        // Show error toast
        const errorToast = document.createElement("div");
        errorToast.className =
          "fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[10000] transition-all duration-300 transform translate-y-full opacity-0";
        errorToast.innerHTML = `
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <p>Failed to submit inquiry. Please try again.</p>
          </div>`;
        document.body.appendChild(errorToast);

        setTimeout(() => {
          errorToast.style.transform = "translate(0)";
          errorToast.style.opacity = "1";
        }, 100);

        setTimeout(() => {
          errorToast.style.transform = "translate-y-full";
          errorToast.style.opacity = "0";
          setTimeout(() => errorToast.remove(), 300);
        }, 3000);
      } finally {
        // Reset button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Submit Inquiry";
        }
      }
    } else {
      form?.reportValidity();
    }
  };

  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#5D00FF] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%2520purple%2520gradient%2520background%2520with%2520soft%2520geometric%2520shapes%2520and%2520subtle%2520patterns%2520creating%2520a%2520modern%2520tech%2520aesthetic%2520perfect%2520for%2520a%2520digital%2520services%2520company%2520professional%2520clean%2520design%2520with%2520ample%2520space%2520for%2520text%2520on%2520the%2520left%2520side%2520high%2520quality%2520digital%2520artwork&width=1440&height=500&seq=101&orientation=landscape"
            alt="Services Background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
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
              Our Services
            </h1>
            <div className="w-24 h-1 bg-white mb-6"></div>
            <p className="text-white/90 text-xl text-center max-w-2xl">
              We deliver exceptional digital solutions tailored to your unique
              business needs.
            </p>
          </div>
        </div>
      </section>
      {/* Service Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What We Offer</h2>
            <div className="w-16 h-1 bg-[#5D00FF] mx-auto mb-8"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive digital solutions to help your business thrive in
              the digital landscape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Web Development */}
            <div
              className="bg-white p-8 border-4 border-black transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#5D00FF] cursor-pointer"
              onClick={() =>
                setActiveService((prev) => (prev === "web" ? null : "web"))
              }
            >
              <div className="w-20 h-20 mb-6 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Minimalist%2520illustration%2520of%2520web%2520development%2520concept%2520with%2520code%2520brackets%2520and%2520simple%2520geometric%2520shapes%2520in%2520purple%2520color%2520scheme%2520clean%2520professional%2520icon%2520style%2520with%2520subtle%2520gradient%2520background%2520high%2520quality%2520digital%2520artwork&width=200&height=200&seq=201&orientation=squarish"
                  alt="Web Development"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Web Development</h3>
              <p className="text-gray-700 mb-6">
                Custom websites and web applications built with cutting-edge
                technologies to deliver exceptional user experiences.
              </p>
              <button
                id="web-learn-more"
               onClick={() => {
                  ReactGA.event({
                    category: "Learn More",
                    action: "Clicked Learn More",
                  });
                }}
                className="flex items-center text-[#5D00FF] font-medium hover:underline !rounded-button whitespace-nowrap cursor-pointer"
              >
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
            {activeService === "web" && windowWidth <= 420 && (
              <section className=" bg-gray-50">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-4xl font-bold mb-6">
                        Web Development
                      </h2>
                      <div className="w-16 h-1 bg-[#5D00FF] mb-8"></div>
                      <p className="text-lg mb-6">
                        Our web development services focus on creating custom,
                        high-performance websites and web applications that
                        align with your business objectives and provide
                        exceptional user experiences.
                      </p>
                      <p className="text-lg mb-6">
                        Whether you need a simple informational website, a
                        complex e-commerce platform, or a custom web
                        application, our team of experienced developers has the
                        expertise to bring your vision to life.
                      </p>
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">
                          Technologies We Use:
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                            React
                          </span>
                          <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                            Next.js
                          </span>
                          <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                            Node.js
                          </span>
                          <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                            Vue.js
                          </span>
                          <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                            Angular
                          </span>
                          <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                            PHP/Laravel
                          </span>
                          <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                            WordPress
                          </span>
                          <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                            Shopify
                          </span>
                        </div>
                      </div>
                      <button
                        className="bg-[#5D00FF] text-white px-6 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
                        onClick={() => {
                          ReactGA.event({
                            category: "Portfolio",
                            action: "Clicked View Web Portfolio button",
                            label: "Services Section",
                          });
                        }}
                      >
                        View Web Portfolio
                      </button>
                    </div>
                    <div>
                      <img
                        src="https://readdy.ai/api/search-image?query=Professional%2520web%2520development%2520workspace%2520with%2520multiple%2520screens%2520showing%2520code%2520and%2520website%2520layouts%2520modern%2520office%2520setting%2520with%2520clean%2520desk%2520and%2520purple%2520accent%2520lighting%2520high%2520quality%2520professional%2520photograph%2520with%2520shallow%2520depth%2520of%2520field%2520and%2520excellent%2520composition&width=600&height=500&seq=301&orientation=landscape"
                        alt="Web Development Services"
                        className="w-full h-auto border-4 border-black shadow-[8px_8px_0px_0px_#5D00FF]"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}
            {/* Mobile Apps */}
            <div
              className="bg-white p-8 border-4 border-black transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#FF6B00] cursor-pointer"
              onClick={() =>
                setActiveService((prev) =>
                  prev === "mobile" ? null : "mobile"
                )
              }
            >
              <div className="w-20 h-20 mb-6 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Minimalist%2520illustration%2520of%2520mobile%2520app%2520development%2520concept%2520with%2520smartphone%2520outline%2520and%2520simple%2520app%2520interface%2520elements%2520in%2520orange%2520color%2520scheme%2520clean%2520professional%2520icon%2520style%2520with%2520subtle%2520gradient%2520background%2520high%2520quality%2520digital%2520artwork&width=200&height=200&seq=202&orientation=squarish"
                  alt="Mobile Apps"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Mobile Apps</h3>
              <p className="text-gray-700 mb-6">
                Native and cross-platform mobile applications designed for
                seamless performance across all devices.
              </p>
              <button
                onClick={() => {
                  ReactGA.event({
                    category: "Learn More",
                    action: "Clicked Learn More",
                  });
                }}
                className="flex items-center text-[#FF6B00] font-medium hover:underline !rounded-button whitespace-nowrap cursor-pointer"
              >
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
            {activeService === "mobile" && windowWidth <= 420 && (
              <section className=" bg-gray-50 ">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-4xl font-bold mb-6">
                        Mobile App Development
                      </h2>
                      <div className="w-16 h-1 bg-[#FF6B00] mb-8"></div>
                      <p className="text-lg mb-6">
                        Our mobile app development services deliver innovative,
                        user-friendly applications that engage your audience and
                        drive business growth across iOS and Android platforms.
                      </p>
                      <p className="text-lg mb-6">
                        From concept to launch, we handle every aspect of the
                        mobile app development process, ensuring your app stands
                        out in today's competitive marketplace with intuitive
                        interfaces and robust functionality.
                      </p>
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">
                          Technologies We Use:
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                            React Native
                          </span>
                          <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                            Flutter
                          </span>
                          <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                            Swift
                          </span>
                          <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                            Kotlin
                          </span>
                          <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                            Firebase
                          </span>
                          <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                            AWS Amplify
                          </span>
                        </div>
                      </div>
                      <button
                        className="bg-[#FF6B00] text-white px-6 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
                        onClick={() => {
                          ReactGA.event({
                            category: "Portfolio",
                            action: "Clicked View Mobile Portfolio button",
                          });
                        }}
                      >
                        View Mobile Portfolio
                      </button>
                    </div>
                    <div>
                      <img
                        src="https://readdy.ai/api/search-image?query=Professional%2520mobile%2520app%2520development%2520workspace%2520with%2520smartphone%2520prototypes%2520and%2520tablet%2520showing%2520app%2520interfaces%2520modern%2520office%2520setting%2520with%2520clean%2520desk%2520and%2520orange%2520accent%2520lighting%2520high%2520quality%2520professional%2520photograph%2520with%2520shallow%2520depth%2520of%2520field%2520and%2520excellent%2520composition&width=600&height=500&seq=302&orientation=landscape"
                        alt="Mobile App Development Services"
                        className="w-full h-auto border-4 border-black shadow-[8px_8px_0px_0px_#FF6B00]"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}
            {/* UI/UX Design */}
            <div
              className="bg-white p-8 border-4 border-black transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#0066FF] cursor-pointer"
              onClick={() =>
                setActiveService((prev) =>
                  prev === "design" ? null : "design"
                )
              }
            >
              <div className="w-20 h-20 mb-6 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Minimalist%2520illustration%2520of%2520UI%2520UX%2520design%2520concept%2520with%2520wireframe%2520elements%2520and%2520simple%2520design%2520tools%2520in%2520blue%2520color%2520scheme%2520clean%2520professional%2520icon%2520style%2520with%2520subtle%2520gradient%2520background%2520high%2520quality%2520digital%2520artwork&width=200&height=200&seq=203&orientation=squarish"
                  alt="UI/UX Design"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">UI/UX Design</h3>
              <p className="text-gray-700 mb-6">
                User-centered design solutions that combine aesthetics with
                functionality to create engaging digital experiences.
              </p>
              <button
                onClick={() => {
                  ReactGA.event({
                    category: "Learn More",
                    action: "Clicked Learn More",
                  });
                }}
                className="flex items-center text-[#0066FF] font-medium hover:underline !rounded-button whitespace-nowrap cursor-pointer"
              >
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
            {activeService === "design" && windowWidth <= 420 && (
              <section className=" bg-gray-50 ">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-4xl font-bold mb-6">UI/UX Design</h2>
                      <div className="w-16 h-1 bg-[#0066FF] mb-8"></div>
                      <p className="text-lg mb-6">
                        Our UI/UX design services focus on creating intuitive,
                        engaging user experiences that balance aesthetic appeal
                        with functional efficiency to enhance user satisfaction
                        and drive conversions.
                      </p>
                      <p className="text-lg mb-6">
                        Through comprehensive user research, wireframing,
                        prototyping, and testing, we develop designs that not
                        only look great but also provide seamless interactions
                        that keep users coming back.
                      </p>
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">
                          Design Services Include:
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                            User Research
                          </span>
                          <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                            Wireframing
                          </span>
                          <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                            Prototyping
                          </span>
                          <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                            Visual Design
                          </span>
                          <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                            Interaction Design
                          </span>
                          <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                            Usability Testing
                          </span>
                        </div>
                      </div>
                      <button
                        className="bg-[#0066FF] text-white px-6 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
                        onClick={() => {
                          ReactGA.event({
                            category: "Portfolio",
                            action: "Clicked View  Design Portfolio button",
                          });
                        }}
                      >
                        View Design Portfolio
                      </button>
                    </div>
                    <div>
                      <img
                        src="https://readdy.ai/api/search-image?query=Professional%2520UI%2520UX%2520design%2520workspace%2520with%2520digital%2520tablet%2520showing%2520wireframes%2520and%2520color%2520palettes%2520modern%2520office%2520setting%2520with%2520clean%2520desk%2520and%2520blue%2520accent%2520lighting%2520high%2520quality%2520professional%2520photograph%2520with%2520shallow%2520depth%2520of%2520field%2520and%2520excellent%2520composition&width=600&height=500&seq=303&orientation=landscape"
                        alt="UI/UX Design Services"
                        className="w-full h-auto border-4 border-black shadow-[8px_8px_0px_0px_#0066FF]"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}
            {/* Branding */}
            <div
              className="bg-white p-8 border-4 border-black transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#FF0099] cursor-pointer"
              onClick={() =>
                setActiveService((prev) =>
                  prev === "branding" ? null : "branding"
                )
              }
            >
              <div className="w-20 h-20 mb-6 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Minimalist%20branding%20concept%20illustration%20featuring%20a%20stylized%20pink%20paint%20brush%20stroke%20forming%20an%20abstract%20logo%20shape%20with%20elegant%20typography%20elements%20modern%20design%20icon%20with%20soft%20pink%20gradient%20background%20and%20black%20accents%20professional%20clean%20composition%20high%20quality%20digital%20artwork&width=200&height=200&seq=204&orientation=squarish"
                  alt="Branding"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Branding</h3>
              <p className="text-gray-700 mb-6">
                Strategic brand identity development and design that helps
                businesses stand out and connect with their audience.
              </p>
              <button
                onClick={() => {
                  ReactGA.event({
                    category: "Learn More",
                    action: "Clicked Learn More",
                  });
                }}
                className="flex items-center text-[#FF0099] font-medium hover:underline !rounded-button whitespace-nowrap cursor-pointer"
              >
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
            {activeService === "branding" && windowWidth <= 420 && (
              <section className=" bg-gray-50 ">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-4xl font-bold mb-6">
                        Branding Services
                      </h2>
                      <div className="w-16 h-1 bg-[#FF0099] mb-8"></div>
                      <p className="text-lg mb-6">
                        Our branding services help businesses create memorable,
                        impactful brand identities that resonate with their
                        target audience and stand out in today's competitive
                        market.
                      </p>
                      <p className="text-lg mb-6">
                        From logo design to complete brand guidelines, we
                        develop comprehensive branding solutions that
                        communicate your unique value proposition and build
                        lasting connections with your customers.
                      </p>
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">
                          Branding Services Include:
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                            Logo Design
                          </span>
                          <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                            Brand Strategy
                          </span>
                          <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                            Visual Identity
                          </span>
                          <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                            Brand Guidelines
                          </span>
                          <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                            Marketing Materials
                          </span>
                          <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                            Brand Voice
                          </span>
                        </div>
                      </div>
                      <button
                        className="bg-[#FF0099] text-white px-6 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
                        onClick={() => {
                          ReactGA.event({
                            category: "Portfolio",
                            action: "Clicked View Branding Portfolio button",
                          });
                        }}
                      >
                        View Branding Portfolio
                      </button>
                    </div>
                    <div>
                      <img
                        src="https://readdy.ai/api/search-image?query=Professional%2520branding%2520design%2520workspace%2520showing%2520brand%2520identity%2520elements%2520logo%2520variations%2520color%2520palettes%2520and%2520typography%2520layouts%2520modern%2520office%2520setting%2520with%2520clean%2520desk%2520and%2520pink%2520accent%2520lighting%2520high%2520quality%2520professional%2520photograph%2520with%2520shallow%2520depth%2520of%2520field%2520and%2520excellent%2520composition&width=600&height=500&seq=304&orientation=landscape"
                        alt="Branding Services"
                        className="w-full h-auto border-4 border-black shadow-[8px_8px_0px_0px_#FF0099]"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
      {/* Service Details Section */}
      {activeService === "web" && windowWidth > 420 && (
        <section className="py-20 bg-gray-50 border-y-4 border-black">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Web Development</h2>
                <div className="w-16 h-1 bg-[#5D00FF] mb-8"></div>
                <p className="text-lg mb-6">
                  Our web development services focus on creating custom,
                  high-performance websites and web applications that align with
                  your business objectives and provide exceptional user
                  experiences.
                </p>
                <p className="text-lg mb-6">
                  Whether you need a simple informational website, a complex
                  e-commerce platform, or a custom web application, our team of
                  experienced developers has the expertise to bring your vision
                  to life.
                </p>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Technologies We Use:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                      React
                    </span>
                    <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                      Next.js
                    </span>
                    <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                      Node.js
                    </span>
                    <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                      Vue.js
                    </span>
                    <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                      Angular
                    </span>
                    <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                      PHP/Laravel
                    </span>
                    <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                      WordPress
                    </span>
                    <span className="bg-[#5D00FF]/10 text-[#5D00FF] px-4 py-2 rounded-full">
                      Shopify
                    </span>
                  </div>
                </div>
                <button
                  className="bg-[#5D00FF] text-white px-6 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
                  onClick={() => {
                    ReactGA.event({
                      category: "Portfolio",
                      action: "Clicked View Web Portfolio button",
                      label: "Services Section",
                    });
                  }}
                >
                  View Web Portfolio
                </button>
              </div>
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%2520web%2520development%2520workspace%2520with%2520multiple%2520screens%2520showing%2520code%2520and%2520website%2520layouts%2520modern%2520office%2520setting%2520with%2520clean%2520desk%2520and%2520purple%2520accent%2520lighting%2520high%2520quality%2520professional%2520photograph%2520with%2520shallow%2520depth%2520of%2520field%2520and%2520excellent%2520composition&width=600&height=500&seq=301&orientation=landscape"
                  alt="Web Development Services"
                  className="w-full h-auto border-4 border-black shadow-[8px_8px_0px_0px_#5D00FF]"
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {activeService === "mobile" && windowWidth > 420 && (
        <section className="py-20 bg-gray-50 border-y-4 border-black">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Mobile App Development
                </h2>
                <div className="w-16 h-1 bg-[#FF6B00] mb-8"></div>
                <p className="text-lg mb-6">
                  Our mobile app development services deliver innovative,
                  user-friendly applications that engage your audience and drive
                  business growth across iOS and Android platforms.
                </p>
                <p className="text-lg mb-6">
                  From concept to launch, we handle every aspect of the mobile
                  app development process, ensuring your app stands out in
                  today's competitive marketplace with intuitive interfaces and
                  robust functionality.
                </p>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Technologies We Use:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                      React Native
                    </span>
                    <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                      Flutter
                    </span>
                    <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                      Swift
                    </span>
                    <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                      Kotlin
                    </span>
                    <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                      Firebase
                    </span>
                    <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full">
                      AWS Amplify
                    </span>
                  </div>
                </div>
                <button
                  className="bg-[#FF6B00] text-white px-6 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
                  onClick={() => {
                    ReactGA.event({
                      category: "Portfolio",
                      action: "Clicked View Mobile Portfolio button",
                    });
                  }}
                >
                  View Mobile Portfolio
                </button>
              </div>
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%2520mobile%2520app%2520development%2520workspace%2520with%2520smartphone%2520prototypes%2520and%2520tablet%2520showing%2520app%2520interfaces%2520modern%2520office%2520setting%2520with%2520clean%2520desk%2520and%2520orange%2520accent%2520lighting%2520high%2520quality%2520professional%2520photograph%2520with%2520shallow%2520depth%2520of%2520field%2520and%2520excellent%2520composition&width=600&height=500&seq=302&orientation=landscape"
                  alt="Mobile App Development Services"
                  className="w-full h-auto border-4 border-black shadow-[8px_8px_0px_0px_#FF6B00]"
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {activeService === "design" && windowWidth > 420 && (
        <section className="py-20 bg-gray-50 border-y-4 border-black">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">UI/UX Design</h2>
                <div className="w-16 h-1 bg-[#0066FF] mb-8"></div>
                <p className="text-lg mb-6">
                  Our UI/UX design services focus on creating intuitive,
                  engaging user experiences that balance aesthetic appeal with
                  functional efficiency to enhance user satisfaction and drive
                  conversions.
                </p>
                <p className="text-lg mb-6">
                  Through comprehensive user research, wireframing, prototyping,
                  and testing, we develop designs that not only look great but
                  also provide seamless interactions that keep users coming
                  back.
                </p>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Design Services Include:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                      User Research
                    </span>
                    <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                      Wireframing
                    </span>
                    <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                      Prototyping
                    </span>
                    <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                      Visual Design
                    </span>
                    <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                      Interaction Design
                    </span>
                    <span className="bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full">
                      Usability Testing
                    </span>
                  </div>
                </div>
                <button
                  className="bg-[#0066FF] text-white px-6 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
                  onClick={() => {
                    ReactGA.event({
                      category: "Portfolio",
                      action: "Clicked View  Design Portfolio button",
                    });
                  }}
                >
                  View Design Portfolio
                </button>
              </div>
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%2520UI%2520UX%2520design%2520workspace%2520with%2520digital%2520tablet%2520showing%2520wireframes%2520and%2520color%2520palettes%2520modern%2520office%2520setting%2520with%2520clean%2520desk%2520and%2520blue%2520accent%2520lighting%2520high%2520quality%2520professional%2520photograph%2520with%2520shallow%2520depth%2520of%2520field%2520and%2520excellent%2520composition&width=600&height=500&seq=303&orientation=landscape"
                  alt="UI/UX Design Services"
                  className="w-full h-auto border-4 border-black shadow-[8px_8px_0px_0px_#0066FF]"
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {activeService === "branding" && windowWidth > 420 && (
        <section className="py-20 bg-gray-50 border-y-4 border-black">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Branding Services</h2>
                <div className="w-16 h-1 bg-[#FF0099] mb-8"></div>
                <p className="text-lg mb-6">
                  Our branding services help businesses create memorable,
                  impactful brand identities that resonate with their target
                  audience and stand out in today's competitive market.
                </p>
                <p className="text-lg mb-6">
                  From logo design to complete brand guidelines, we develop
                  comprehensive branding solutions that communicate your unique
                  value proposition and build lasting connections with your
                  customers.
                </p>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Branding Services Include:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                      Logo Design
                    </span>
                    <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                      Brand Strategy
                    </span>
                    <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                      Visual Identity
                    </span>
                    <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                      Brand Guidelines
                    </span>
                    <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                      Marketing Materials
                    </span>
                    <span className="bg-[#FF0099]/10 text-[#FF0099] px-4 py-2 rounded-full">
                      Brand Voice
                    </span>
                  </div>
                </div>
                <button
                  className="bg-[#FF0099] text-white px-6 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
                  onClick={() => {
                    ReactGA.event({
                      category: "Portfolio",
                      action: "Clicked View Branding Portfolio button",
                    });
                  }}
                >
                  View Branding Portfolio
                </button>
              </div>
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%2520branding%2520design%2520workspace%2520showing%2520brand%2520identity%2520elements%2520logo%2520variations%2520color%2520palettes%2520and%2520typography%2520layouts%2520modern%2520office%2520setting%2520with%2520clean%2520desk%2520and%2520pink%2520accent%2520lighting%2520high%2520quality%2520professional%2520photograph%2520with%2520shallow%2520depth%2520of%2520field%2520and%2520excellent%2520composition&width=600&height=500&seq=304&orientation=landscape"
                  alt="Branding Services"
                  className="w-full h-auto border-4 border-black shadow-[8px_8px_0px_0px_#FF0099]"
                />
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Pricing</h2>
            <div className="w-16 h-1 bg-[#5D00FF] mx-auto mb-8"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Flexible packages designed to meet your specific needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="bg-white border-4 border-black p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#5D00FF]">
              <h3 className="text-2xl font-bold mb-2">Basic Package</h3>
              <div className="text-4xl font-bold mb-6">₹2,999</div>
              <p className="text-gray-700 mb-6">
                Perfect for small businesses and startups looking to establish
                their digital presence.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-[#5D00FF] mt-1 mr-3 h-4 w-4" />
                  <span>Custom design & development</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#5D00FF] mt-1 mr-3 h-4 w-4" />
                  <span>Responsive across all devices</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#5D00FF] mt-1 mr-3 h-4 w-4" />
                  <span>Basic SEO optimization</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#5D00FF] mt-1 mr-3 h-4 w-4" />
                  <span>Content management system</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#5D00FF] mt-1 mr-3 h-4 w-4" />
                  <span>1 month of support</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  ReactGA.event({
                    category: "Get Started",
                    action: "Clicked Get Started button",
                  });
                  openModal("basic");
                }}
                className="w-full bg-black text-white py-3 font-bold rounded-lg whitespace-nowrap cursor-pointer transform transition-all hover:bg-[#5D00FF]"
              >
                Get Started
              </button>
            </div>

            {/* Professional Package */}
            <div className="bg-white border-4 border-black p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#FF6B00] relative">
              <div className="absolute -top-4 -right-4 bg-[#FF6B00] text-white px-4 py-1 font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional Package</h3>
              <div className="text-4xl font-bold mb-6">₹5,999</div>
              <p className="text-gray-700 mb-6">
                Comprehensive solution for growing businesses with more complex
                requirements.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-[#FF6B00] mt-1 mr-3 h-4 w-4" />
                  <span>Everything in Basic package</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#FF6B00] mt-1 mr-3 h-4 w-4" />
                  <span>Advanced functionality</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#FF6B00] mt-1 mr-3 h-4 w-4" />
                  <span>E-commerce integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#FF6B00] mt-1 mr-3 h-4 w-4" />
                  <span>Advanced SEO package</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#FF6B00] mt-1 mr-3 h-4 w-4" />
                  <span>3 months of support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#FF6B00] mt-1 mr-3 h-4 w-4" />
                  <span>Performance optimization</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  ReactGA.event({
                    category: "Get Started for Proffesional Package",
                    action: "Clicked Get Started button",
                  });
                  openModal("professional");
                }}
                className="w-full bg-[#FF6B00] text-white py-3 font-bold rounded-lg whitespace-nowrap cursor-pointer transform transition-all hover:bg-black"
              >
                Get Started
              </button>
            </div>

            {/* Enterprise Package */}
            <div className="bg-white border-4 border-black p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#0066FF]">
              <h3 className="text-2xl font-bold mb-2">Enterprise Package</h3>
              <div className="text-4xl font-bold mb-6">₹9,999+</div>
              <p className="text-gray-700 mb-6">
                Tailored solutions for large businesses with specific
                requirements and integrations.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-[#0066FF] mt-1 mr-3 h-4 w-4" />
                  <span>Everything in Professional package</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#0066FF] mt-1 mr-3 h-4 w-4" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#0066FF] mt-1 mr-3 h-4 w-4" />
                  <span>Dedicated project manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#0066FF] mt-1 mr-3 h-4 w-4" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#0066FF] mt-1 mr-3 h-4 w-4" />
                  <span>6 months of support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#0066FF] mt-1 mr-3 h-4 w-4" />
                  <span>Comprehensive analytics</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  ReactGA.event({
                    category: "Contact us",
                    action: "Clicked Contact Us button",
                  });
                }}
                className="w-full bg-black text-white py-3 font-bold rounded-lg whitespace-nowrap cursor-pointer transform transition-all hover:bg-[#0066FF]"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-700 mb-4">
              Need a custom solution? We offer tailored packages to meet your
              specific requirements.
            </p>
            <button
              id="customQuoteBtn"
              className="bg-[#5D00FF] text-white px-8 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
              onClick={(e) => {
                ReactGA.event({
                  category: "Quotes",
                  action: "Clicked Request Custom Quote button",
                });

                e.stopPropagation();
                const modal = document.getElementById("customQuoteModal");
                const modalContent = modal?.querySelector("div");
                if (modal && modalContent) {
                  modal.style.display = "flex";
                  document.body.style.overflow = "hidden";
                  document.body.style.touchAction = "none";
                  requestAnimationFrame(() => {
                    modal.style.opacity = "1";
                    modalContent.style.opacity = "1";
                    modalContent.style.transform = "scale(1) translateZ(0)";
                  });
                }
              }}
            >
              Request Custom Quote
            </button>
            {/* Custom Quote Modal Dialog */}
            <div
              id="customQuoteModal"
              className="fixed inset-0 bg-black/80 hidden items-center justify-center p-4 transition-all duration-300 ease-in-out"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                minHeight: "100vh",
                width: "100vw",
                zIndex: 99999999999,
                backdropFilter: "blur(8px)",
                opacity: 0,
                transform: "translateZ(0)",
                WebkitBackfaceVisibility: "hidden",
                WebkitTransform: "translateZ(0)",
              }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.id === "customQuoteModal") {
                  const modal = document.getElementById("customQuoteModal");
                  const modalContent = modal?.querySelector("div");
                  if (modal && modalContent) {
                    modal.style.opacity = "0";
                    modalContent.style.opacity = "0";
                    modalContent.style.transform = "scale(0.95)";
                    setTimeout(() => {
                      modal.style.display = "none";
                      document.body.style.overflow = "auto";
                      document.body.style.touchAction = "auto";
                    }, 300);
                  }
                }
              }}
            >
              <div
                className="relative bg-white p-6 sm:p-8 rounded-lg w-full max-w-4xl mx-auto border-4 border-black shadow-[8px_8px_0px_0px_#5D00FF] transform transition-all duration-300 scale-95 opacity-0"
                style={{
                  maxHeight: "90vh",
                  overflowY: "auto",
                  transform: "scale(0.95) translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  WebkitTransform: "scale(0.95) translateZ(0)",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#5D00FF transparent",
                }}
              >
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-black">
                    Custom Quote Request
                  </h3>
                  <button
                    onClick={() => {
                      ReactGA.event({
                        category: "Modal",
                        action: "Closed Custom Quote Modal",
                      });

                      const modal = document.getElementById("customQuoteModal");
                      const modalContent = modal?.querySelector("div");
                      if (modal && modalContent) {
                        modal.style.opacity = "0";
                        modalContent.style.opacity = "0";
                        modalContent.style.transform = "scale(0.95)";
                        setTimeout(() => {
                          modal.style.display = "none";
                          document.body.style.overflow = "auto";
                        }, 300);
                      }
                    }}
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    <i className="fas fa-times text-2xl"></i>
                  </button>
                </div>
                <form id="customQuoteForm" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Project Description *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white resize-none"
                      placeholder="Please describe your project requirements, specific features needed, and any special considerations"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Budget Range *
                      </label>
                      <div className="relative">
                        <select
                          name="budget"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white appearance-none"
                        >
                          <option value="">Select budget range</option>
                          <option value="10000-25000">$10,000 - $25,000</option>
                          <option value="25000-50000">$25,000 - $50,000</option>
                          <option value="50000-100000">
                            $50,000 - $100,000
                          </option>
                          <option value="100000+">$100,000+</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <i className="fas fa-chevron-down text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Timeline Expectations *
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white appearance-none"
                        >
                          <option value="">Select timeline</option>
                          <option value="1-3">1-3 months</option>
                          <option value="3-6">3-6 months</option>
                          <option value="6-12">6-12 months</option>
                          <option value="12+">12+ months</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <i className="fas fa-chevron-down text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Preferred Contact Method
                    </label>
                    <div className="relative">
                      <select
                        name="contactMethod"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white appearance-none"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 border-t border-gray-200 pt-6">
                  <button
                    onClick={() => {
                      ReactGA.event({
                        category: "Modal",
                        action: "Clicked Cancel in Custom Quote Modal",
                      });
                      const modal = document.getElementById("customQuoteModal");
                      const modalContent = modal?.querySelector("div");
                      if (modal && modalContent) {
                        modal.style.opacity = "0";
                        modalContent.style.opacity = "0";
                        modalContent.style.transform = "scale(0.95)";
                        setTimeout(() => {
                          modal.style.display = "none";
                          document.body.style.overflow = "auto";
                        }, 300);
                      }
                    }}
                    className="px-6 py-3 border-2 border-black font-bold !rounded-button whitespace-nowrap hover:bg-black hover:text-white transition-all duration-300 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    id="submitRequestBtn"
                    onClick={async () => {
                      ReactGA.event({
                        category: "Form",
                        action: "Submitted Custom Quote Form",
                      });
                      const submitBtn = document.getElementById(
                        "submitRequestBtn"
                      ) as HTMLButtonElement;
                      const form = document.getElementById(
                        "customQuoteForm"
                      ) as HTMLFormElement;
                      const modal = document.getElementById("customQuoteModal");
                      const modalContent = modal?.querySelector("div");

                      if (form && form.checkValidity()) {
                        // Get form data
                        const formData = new FormData(form);
                        const data = {
                          name: formData.get("name"),
                          email: formData.get("email"),
                          phone: formData.get("phone"),
                          companyName: formData.get("company"),
                          projectDescription: formData.get("description"),
                          budgetRange: formData.get("budget"),
                          timelineExpectation: formData.get("timeline"),
                          preferContactMethod: formData.get("contactMethod"),
                        };

                        // Show loading state
                        if (submitBtn) {
                          submitBtn.disabled = true;
                          submitBtn.innerHTML =
                            '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
                        }

                        try {
                          // Send POST request to your backend
                          const res = await fetch(
                            `${serverUrl}/connect/projectInquiry`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(data),
                            }
                          );

                          if (!res.ok) throw new Error("Failed to submit form");

                          // Success: Close modal and show toast
                          if (modal && modalContent) {
                            modal.style.opacity = "0";
                            modalContent.style.opacity = "0";
                            modalContent.style.transform = "scale(0.95)";
                            setTimeout(() => {
                              modal.style.display = "none";
                              document.body.style.overflow = "auto";

                              const toast = document.createElement("div");
                              toast.className =
                                "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50   duration-300";
                              toast.innerHTML = `
            <div class="flex items-center">
              <i class="fas fa-check-circle mr-2"></i>
              <p>Your custom quote request has been submitted successfully. Our team will contact you within 24 hours.</p>
            </div>`;
                              document.body.appendChild(toast);

                              setTimeout(() => {
                                toast.style.transform = "translate(0)";
                                toast.style.opacity = "1";
                              }, 100);
                              setTimeout(() => {
                                toast.style.transform = "translate-y-full";
                                toast.style.opacity = "0";
                                setTimeout(() => toast.remove(), 300);
                              }, 5000);
                            }, 300);
                          }
                        } catch (error) {
                          console.error("Form submission error:", error);
                          alert(
                            "Something went wrong while submitting the form."
                          );
                        } finally {
                          if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = "Submit Request";
                          }
                        }
                      } else {
                        form?.reportValidity();
                      }
                    }}
                    className="px-6 py-3 bg-[#5D00FF] text-white font-bold !rounded-button whitespace-nowrap hover:bg-black transition-all duration-300 text-center shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#000000]"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Overlay */}
        {activeModal && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[9999] transition-all duration-300 ease-in-out"
            style={{ backdropFilter: "blur(8px)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              className="relative bg-white p-6 sm:p-8 rounded-lg w-full max-w-4xl mx-auto border-4 border-black transform transition-all duration-300 scale-100 opacity-100"
              style={{
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow:
                  activeModal === "basic"
                    ? "8px 8px 0px 0px #5D00FF"
                    : activeModal === "professional"
                    ? "8px 8px 0px 0px #FF6B00"
                    : "8px 8px 0px 0px #5D00FF",
              }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-black">
                  {activeModal === "basic" && "Basic Package Inquiry"}
                  {activeModal === "professional" &&
                    "Professional Package Inquiry"}
                  {activeModal === "custom" && "Custom Quote Request"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Package Features */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-6">Package Features</h4>
                  <ul className="space-y-4 mb-6">
                    {activeModal === "basic" && (
                      <>
                        <li className="flex items-start">
                          <Check className="text-[#5D00FF] mt-1 mr-3 h-5 w-5" />
                          <span className="text-gray-700">
                            Custom design & development
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-[#5D00FF] mt-1 mr-3 h-5 w-5" />
                          <span className="text-gray-700">
                            Responsive across all devices
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-[#5D00FF] mt-1 mr-3 h-5 w-5" />
                          <span className="text-gray-700">
                            Basic SEO optimization
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-[#5D00FF] mt-1 mr-3 h-5 w-5" />
                          <span className="text-gray-700">
                            Content management system
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-[#5D00FF] mt-1 mr-3 h-5 w-5" />
                          <span className="text-gray-700">
                            1 month of support
                          </span>
                        </li>
                      </>
                    )}
                    {activeModal === "professional" && (
                      <>
                        <li className="flex items-start">
                          <Check className="text-[#FF6B00] mt-1 mr-3 h-5 w-5" />
                          <span className="text-gray-700">
                            Everything in Basic package
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-[#FF6B00] mt-1 mr-3 h-5 w-5" />
                          <span className="text-gray-700">
                            Advanced functionality
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-[#FF6B00] mt-1 mr-3 h-5 w-5" />
                          <span className="text-gray-700">
                            E-commerce integration
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-[#FF6B00] mt-1 mr-3 h-5 w-5" />
                          <span className="text-gray-700">
                            Advanced SEO package
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-[#FF6B00] mt-1 mr-3 h-5 w-5" />
                          <span className="text-gray-700">
                            3 months of support
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Starting at</span>
                    <div
                      className={`text-3xl font-bold ${
                        activeModal === "basic"
                          ? "text-[#5D00FF]"
                          : activeModal === "professional"
                          ? "text-[#FF6B00]"
                          : "text-[#5D00FF]"
                      }`}
                    >
                      {activeModal === "basic" && "$2,999"}
                      {activeModal === "professional" && "$5,999"}
                      {activeModal === "custom" && "Custom"}
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div>
                  <form id={`${activeModal}PackageForm`} className="space-y-6">
                    {activeModal === "custom" ? (
                      // Custom Quote Form
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                              placeholder="Enter your email address"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                              placeholder="Enter your phone number"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="company"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                              placeholder="Enter your company name"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Project Description *
                          </label>
                          <textarea
                            name="description"
                            required
                            rows={4}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white resize-none"
                            placeholder="Please describe your project requirements"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Budget Range *
                            </label>
                            <select
                              name="budget"
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                            >
                              <option value="">Select budget range</option>
                              <option value="10000-25000">
                                $10,000 - $25,000
                              </option>
                              <option value="25000-50000">
                                $25,000 - $50,000
                              </option>
                              <option value="50000-100000">
                                $50,000 - $100,000
                              </option>
                              <option value="100000+">$100,000+</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Timeline *
                            </label>
                            <select
                              name="timeline"
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                            >
                              <option value="">Select timeline</option>
                              <option value="1-3">1-3 months</option>
                              <option value="3-6">3-6 months</option>
                              <option value="6-12">6-12 months</option>
                              <option value="12+">12+ months</option>
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Basic/Professional Package Form
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors text-gray-800 bg-white ${
                              activeModal === "basic"
                                ? "focus:border-[#5D00FF]"
                                : "focus:border-[#FF6B00]"
                            }`}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors text-gray-800 bg-white ${
                              activeModal === "basic"
                                ? "focus:border-[#5D00FF]"
                                : "focus:border-[#FF6B00]"
                            }`}
                            placeholder="Enter your email address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors text-gray-800 bg-white ${
                              activeModal === "basic"
                                ? "focus:border-[#5D00FF]"
                                : "focus:border-[#FF6B00]"
                            }`}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="company"
                            className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors text-gray-800 bg-white ${
                              activeModal === "basic"
                                ? "focus:border-[#5D00FF]"
                                : "focus:border-[#FF6B00]"
                            }`}
                            placeholder="Enter your company name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Project Description *
                          </label>
                          <textarea
                            name="description"
                            required
                            rows={4}
                            className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors text-gray-800 bg-white resize-none ${
                              activeModal === "basic"
                                ? "focus:border-[#5D00FF]"
                                : "focus:border-[#FF6B00]"
                            }`}
                            placeholder="Tell us about your project requirements"
                          />
                        </div>
                      </>
                    )}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Preferred Contact Method
                      </label>
                      <select
                        name="contactMethod"
                        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors text-gray-800 bg-white ${
                          activeModal === "basic"
                            ? "focus:border-[#5D00FF]"
                            : activeModal === "professional"
                            ? "focus:border-[#FF6B00]"
                            : "focus:border-[#5D00FF]"
                        }`}
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 border-t border-gray-200 pt-6">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border-2 border-black font-bold rounded-lg whitespace-nowrap hover:bg-black hover:text-white transition-all duration-300 text-center"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    ReactGA.event({
                      category: "Form",
                      action: "Submitted Package Inquiry",
                    });
                    handleSubmit(`${activeModal}PackageForm`, activeModal);
                  }}
                  className={`px-6 py-3 text-white font-bold rounded-lg whitespace-nowrap transition-all duration-300 text-center shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
                    activeModal === "basic"
                      ? "bg-[#5D00FF] hover:bg-black"
                      : activeModal === "professional"
                      ? "bg-[#FF6B00] hover:bg-black"
                      : "bg-[#5D00FF] hover:bg-black"
                  }`}
                >
                  Submit Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Process Section */}
      <section className="py-20 bg-gray-50 border-y-4 border-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Process</h2>
            <div className="w-16 h-1 bg-[#5D00FF] mx-auto mb-8"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Our streamlined approach ensures efficient delivery of
              high-quality solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#5D00FF] text-white flex items-center justify-center mx-auto mb-6 rounded-full">
                <i className="fas fa-comments text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Initial Consultation</h3>
              <p className="text-gray-700">
                We discuss your goals, requirements, and vision to understand
                your needs.
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FF6B00] text-white flex items-center justify-center mx-auto mb-6 rounded-full">
                <i className="fas fa-sitemap text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Planning & Strategy</h3>
              <p className="text-gray-700">
                We develop a detailed roadmap and strategy for your project.
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0066FF] text-white flex items-center justify-center mx-auto mb-6 rounded-full">
                <i className="fas fa-code text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Development</h3>
              <p className="text-gray-700">
                Our team brings your vision to life with clean, efficient code.
              </p>
            </div>
            {/* Step 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FF0099] text-white flex items-center justify-center mx-auto mb-6 rounded-full">
                <i className="fas fa-vial text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Testing & QA</h3>
              <p className="text-gray-700">
                Rigorous testing ensures your product is bug-free and performs
                optimally.
              </p>
            </div>
            {/* Step 5 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-black text-white flex items-center justify-center mx-auto mb-6 rounded-full">
                <i className="fas fa-rocket text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Launch & Support</h3>
              <p className="text-gray-700">
                We deploy your solution and provide ongoing support and
                maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Portfolio Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-16 h-1 bg-[#5D00FF] mx-auto mb-8"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Explore some of our recent work across different service
              categories.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#5D00FF] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Modern%2520e-commerce%2520website%2520interface%2520design%2520showcasing%2520a%2520sleek%2520fashion%2520product%2520page%2520with%2520clean%2520typography%2520and%2520minimalist%2520layout%2520professional%2520web%2520design%2520screenshot%2520against%2520simple%2520background&width=600&height=400&seq=401&orientation=landscape"
                alt="E-commerce Website"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  LuxeStyle E-commerce
                </h3>
                <p className="text-white/90">Web Development</p>
              </div>
            </div>
            {/* Project 2 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF6B00] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Modern%2520mobile%2520app%2520interface%2520design%2520showcasing%2520a%2520food%2520delivery%2520app%2520with%2520vibrant%2520food%2520photography%2520and%2520clean%2520UI%2520elements%2520professional%2520app%2520screenshot%2520on%2520latest%2520smartphone%2520device%2520against%2520simple%2520background&width=600&height=400&seq=402&orientation=landscape"
                alt="Food Delivery App"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  FoodFast Delivery App
                </h3>
                <p className="text-white/90">Mobile App Development</p>
              </div>
            </div>
            {/* Project 3 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0066FF] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Modern%2520dashboard%2520interface%2520design%2520showcasing%2520a%2520financial%2520analytics%2520platform%2520with%2520data%2520visualization%2520charts%2520and%2520clean%2520UI%2520elements%2520professional%2520web%2520app%2520screenshot%2520against%2520simple%2520background&width=600&height=400&seq=403&orientation=landscape"
                alt="Financial Dashboard"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  FinTrack Dashboard
                </h3>
                <p className="text-white/90">UI/UX Design & Web Development</p>
              </div>
            </div>
            {/* Project 4 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF0099] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Modern%2520mobile%2520app%2520interface%2520design%2520showcasing%2520a%2520fitness%2520tracking%2520app%2520with%2520activity%2520metrics%2520and%2520clean%2520UI%2520elements%2520professional%2520app%2520screenshot%2520on%2520latest%2520smartphone%2520device%2520against%2520simple%2520background&width=600&height=400&seq=404&orientation=landscape"
                alt="Fitness App"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  FitLife Tracker
                </h3>
                <p className="text-white/90">Mobile App Development</p>
              </div>
            </div>
            {/* Project 5 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#5D00FF] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Modern%2520website%2520interface%2520design%2520showcasing%2520a%2520real%2520estate%2520property%2520listing%2520with%2520elegant%2520photography%2520and%2520clean%2520UI%2520elements%2520professional%2520web%2520design%2520screenshot%2520against%2520simple%2520background&width=600&height=400&seq=405&orientation=landscape"
                alt="Real Estate Website"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  HomeFind Real Estate
                </h3>
                <p className="text-white/90">Web Development</p>
              </div>
            </div>
            {/* Project 6 */}
            <div className="group relative overflow-hidden border-4 border-black cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF6B00] opacity-0 group-hover:opacity-80 transition-all duration-500 z-10"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Modern%2520brand%2520identity%2520design%2520showcasing%2520logo%2520variations%2520color%2520palette%2520and%2520typography%2520for%2520a%2520tech%2520startup%2520professional%2520design%2520mockup%2520against%2520simple%2520background&width=600&height=400&seq=406&orientation=landscape"
                alt="Brand Identity"
                className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-white text-xl font-bold mb-2">
                  TechVision Branding
                </h3>
                <p className="text-white/90">UI/UX Design</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => {
                ReactGA.event({
                  category: "Navigation",
                  action: "Clicked View All Projects",
                });
              }}
              className="bg-black text-white px-8 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#5D00FF]"
            >
              View All Projects
            </button>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#5D00FF] to-[#8F00FF] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project requirements and how we can
            help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              id="startProjectBtn"
              className="bg-[#FF6B00] text-white px-8 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
              onClick={(e) => {
                ReactGA.event({
                  category: "Projects",
                  action: "Clicked Start a Project button",
                });
                e.stopPropagation();
                const modal = document.getElementById("startProjectModal");
                const modalContent = modal?.querySelector("div");
                if (modal && modalContent) {
                  modal.style.display = "flex";
                  document.body.style.overflow = "hidden";
                  document.body.style.touchAction = "none";
                  requestAnimationFrame(() => {
                    modal.style.opacity = "1";
                    modalContent.style.opacity = "1";
                    modalContent.style.transform = "scale(1) translateZ(0)";
                  });
                }
              }}
            >
              Start a Project
            </button>
            {/* Start Project Modal Dialog */}
            <div
              id="startProjectModal"
              className="fixed inset-0 bg-black/80 hidden items-center justify-center p-4 transition-all duration-300 ease-in-out"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                minHeight: "100vh",
                width: "100vw",
                zIndex: 99999999999,
                backdropFilter: "blur(8px)",
                opacity: 0,
                transform: "translateZ(0)",
                WebkitBackfaceVisibility: "hidden",
                WebkitTransform: "translateZ(0)",
              }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.id === "startProjectModal") {
                  const modal = document.getElementById("startProjectModal");
                  const modalContent = modal?.querySelector("div");
                  if (modal && modalContent) {
                    modal.style.opacity = "0";
                    modalContent.style.opacity = "0";
                    modalContent.style.transform = "scale(0.95)";
                    setTimeout(() => {
                      modal.style.display = "none";
                      document.body.style.overflow = "auto";
                      document.body.style.touchAction = "auto";
                    }, 300);
                  }
                }
              }}
            >
              <div
                className="relative bg-white p-6 sm:p-8 rounded-lg w-full max-w-4xl mx-auto border-4 border-black shadow-[8px_8px_0px_0px_#FF6B00] transform transition-all duration-300 scale-95 opacity-0"
                style={{
                  maxHeight: "90vh",
                  overflowY: "auto",
                  transform: "scale(0.95) translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  WebkitTransform: "scale(0.95) translateZ(0)",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#FF6B00 transparent",
                }}
              >
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-black">
                    Start Your Project
                  </h3>
                  <button
                    onClick={() => {
                      const modal =
                        document.getElementById("startProjectModal");
                      const modalContent = modal?.querySelector("div");
                      if (modal && modalContent) {
                        modal.style.opacity = "0";
                        modalContent.style.opacity = "0";
                        modalContent.style.transform = "scale(0.95)";
                        setTimeout(() => {
                          modal.style.display = "none";
                          document.body.style.overflow = "auto";
                        }, 300);
                      }
                    }}
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    <i className="fas fa-times text-2xl"></i>
                  </button>
                </div>
                <form id="startProjectForm" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Project Type *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#FF6B00] focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white text-center"
                        onClick={(e) => {
                          ReactGA.event({
                            category: "Services",
                            action: "Selected Web Development",
                          });
                          const buttons =
                            e.currentTarget.parentElement?.querySelectorAll(
                              "button"
                            );
                          buttons?.forEach((btn) =>
                            btn.classList.remove(
                              "border-[#FF6B00]",
                              "bg-[#FF6B00]/10"
                            )
                          );
                          e.currentTarget.classList.add(
                            "border-[#FF6B00]",
                            "bg-[#FF6B00]/10"
                          );
                        }}
                      >
                        Web Development
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#FF6B00] focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white text-center"
                        onClick={(e) => {
                          ReactGA.event({
                            category: "Services",
                            action: "Selected Mobile App",
                          });
                          const buttons =
                            e.currentTarget.parentElement?.querySelectorAll(
                              "button"
                            );
                          buttons?.forEach((btn) =>
                            btn.classList.remove(
                              "border-[#FF6B00]",
                              "bg-[#FF6B00]/10"
                            )
                          );
                          e.currentTarget.classList.add(
                            "border-[#FF6B00]",
                            "bg-[#FF6B00]/10"
                          );
                        }}
                      >
                        Mobile App
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#FF6B00] focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white text-center"
                        onClick={(e) => {
                          ReactGA.event({
                            category: "Services",
                            action: "Selected UI/UX Design",
                          });

                          const buttons =
                            e.currentTarget.parentElement?.querySelectorAll(
                              "button"
                            );
                          buttons?.forEach((btn) =>
                            btn.classList.remove(
                              "border-[#FF6B00]",
                              "bg-[#FF6B00]/10"
                            )
                          );
                          e.currentTarget.classList.add(
                            "border-[#FF6B00]",
                            "bg-[#FF6B00]/10"
                          );
                        }}
                      >
                        UI/UX Design
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#FF6B00] focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white text-center"
                        onClick={(e) => {
                          ReactGA.event({
                            category: "Services",
                            action: "Selected Branding",
                          });
                          const buttons =
                            e.currentTarget.parentElement?.querySelectorAll(
                              "button"
                            );
                          buttons?.forEach((btn) =>
                            btn.classList.remove(
                              "border-[#FF6B00]",
                              "bg-[#FF6B00]/10"
                            )
                          );
                          e.currentTarget.classList.add(
                            "border-[#FF6B00]",
                            "bg-[#FF6B00]/10"
                          );
                        }}
                      >
                        Branding
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Project Description *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white resize-none"
                      placeholder="Tell us about your project requirements and goals"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Budget Range *
                      </label>
                      <div className="relative">
                        <select
                          name="budget"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white appearance-none"
                        >
                          <option value="">Select budget range</option>
                          <option value="5000-10000">$5,000 - $10,000</option>
                          <option value="10000-25000">$10,000 - $25,000</option>
                          <option value="25000-50000">$25,000 - $50,000</option>
                          <option value="50000+">$50,000+</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <i className="fas fa-chevron-down text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Timeline *
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] focus:outline-none transition-colors text-gray-800 bg-white appearance-none"
                        >
                          <option value="">Select timeline</option>
                          <option value="1-2">1-2 months</option>
                          <option value="2-4">2-4 months</option>
                          <option value="4-6">4-6 months</option>
                          <option value="6+">6+ months</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <i className="fas fa-chevron-down text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 border-t border-gray-200 pt-6">
                  <button
                    onClick={() => {
                      ReactGA.event({
                        category: "Modal",
                        action: "Clicked Cancel in Start Project Modal",
                      });
                      const modal =
                        document.getElementById("startProjectModal");
                      const modalContent = modal?.querySelector("div");
                      if (modal && modalContent) {
                        modal.style.opacity = "0";
                        modalContent.style.opacity = "0";
                        modalContent.style.transform = "scale(0.95)";
                        setTimeout(() => {
                          modal.style.display = "none";
                          document.body.style.overflow = "auto";
                        }, 300);
                      }
                    }}
                    className="px-6 py-3 border-2 border-black font-bold !rounded-button whitespace-nowrap hover:bg-black hover:text-white transition-all duration-300 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    id="submitProjectBtn"
                    onClick={async () => {
                      ReactGA.event({
                        category: "Project Submit",
                        action: "Project Submitted ",
                      });
                      const submitBtn = document.getElementById(
                        "submitProjectBtn"
                      ) as HTMLButtonElement | null;
                      const form = document.getElementById(
                        "startProjectForm"
                      ) as HTMLFormElement | null;
                      const modal = document.getElementById(
                        "startProjectModal"
                      ) as HTMLElement | null;
                      const modalContent = modal?.querySelector(
                        "div"
                      ) as HTMLElement | null;

                      if (form && form.checkValidity()) {
                        // Show loading state
                        if (submitBtn) {
                          submitBtn.disabled = true;
                          submitBtn.innerHTML =
                            '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
                        }

                        try {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1500)
                          );

                          // Close modal with animation
                          if (modal && modalContent) {
                            modal.style.opacity = "0";
                            modalContent.style.opacity = "0";
                            modalContent.style.transform = "scale(0.95)";

                            setTimeout(() => {
                              modal.style.display = "none";
                              document.body.style.overflow = "auto";

                              const toast = document.createElement("div");
                              toast.className =
                                "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-y-full opacity-0 transition-all duration-300";
                              toast.innerHTML = `
<div class="flex items-center">
  <i class="fas fa-check-circle mr-2"></i>
  <p>Your project request has been submitted successfully. We'll contact you within 24 hours.</p>
</div>`;

                              document.body.appendChild(toast);

                              // Animate toast in
                              setTimeout(() => {
                                toast.style.transform = "translate(0)";
                                toast.style.opacity = "1";
                              }, 100);

                              // Remove toast after 5 seconds
                              setTimeout(() => {
                                toast.style.transform = "translate-y-full";
                                toast.style.opacity = "0";
                                setTimeout(() => toast.remove(), 300);
                              }, 5000);
                            }, 300);
                          }
                        } catch (error) {
                          console.error("Form submission error:", error);
                        } finally {
                          if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = "Submit Project";
                          }
                        }
                      } else {
                        form?.reportValidity(); // now safe
                      }
                    }}
                    className="px-6 py-3 bg-[#FF6B00] text-white font-bold !rounded-button whitespace-nowrap hover:bg-black transition-all duration-300 text-center shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#000000]"
                  >
                    Submit Project
                  </button>
                </div>
              </div>
            </div>
            <button
              id="scheduleConsultationBtn"
              className="bg-white text-[#5D00FF] px-8 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
              onClick={(e) => {
                ReactGA.event({
                  category: "Schedule Consultaion",
                  action: "Consultation Button Clicked",
                });
                e.stopPropagation();
                const modal = document.getElementById("consultationModal");
                const modalContent = modal?.querySelector("div");
                if (modal && modalContent) {
                  modal.style.display = "flex";
                  document.body.style.overflow = "hidden";
                  document.body.style.touchAction = "none";
                  requestAnimationFrame(() => {
                    modal.style.opacity = "1";
                    modalContent.style.opacity = "1";
                    modalContent.style.transform = "scale(1) translateZ(0)";
                  });
                }
              }}
            >
              Schedule Consultation
            </button>
            {/* Consultation Modal Dialog */}
            <div
              id="consultationModal"
              className="fixed inset-0 bg-black/80 hidden items-center justify-center p-4 transition-all duration-300 ease-in-out"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                minHeight: "100vh",
                width: "100vw",
                zIndex: 99999999999,
                backdropFilter: "blur(8px)",
                opacity: 0,
                transform: "translateZ(0)",
                WebkitBackfaceVisibility: "hidden",
                WebkitTransform: "translateZ(0)",
              }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.id === "consultationModal") {
                  const modal = document.getElementById("consultationModal");
                  const modalContent = modal?.querySelector("div");
                  if (modal && modalContent) {
                    modal.style.opacity = "0";
                    modalContent.style.opacity = "0";
                    modalContent.style.transform = "scale(0.95)";
                    setTimeout(() => {
                      modal.style.display = "none";
                      document.body.style.overflow = "auto";
                      document.body.style.touchAction = "auto";
                    }, 300);
                  }
                }
              }}
            >
              <div
                className="relative bg-white p-6 sm:p-8 rounded-lg w-full max-w-4xl mx-auto border-4 border-black shadow-[8px_8px_0px_0px_#5D00FF] transform transition-all duration-300 scale-95 opacity-0"
                style={{
                  maxHeight: "90vh",
                  overflowY: "auto",
                  transform: "scale(0.95) translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  WebkitTransform: "scale(0.95) translateZ(0)",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#5D00FF transparent",
                }}
              >
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-black">
                    Schedule a Free Consultation
                  </h3>
                  <button
                    onClick={() => {
                      const modal =
                        document.getElementById("consultationModal");
                      const modalContent = modal?.querySelector("div");
                      if (modal && modalContent) {
                        modal.style.opacity = "0";
                        modalContent.style.opacity = "0";
                        modalContent.style.transform = "scale(0.95)";
                        setTimeout(() => {
                          modal.style.display = "none";
                          document.body.style.overflow = "auto";
                        }, 300);
                      }
                    }}
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    <i className="fas fa-times text-2xl"></i>
                  </button>
                </div>
                <form id="consultationForm" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white appearance-none"
                      >
                        <option value="">Select preferred time</option>
                        <option value="9:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      What would you like to discuss? *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white resize-none"
                      placeholder="Please briefly describe what you'd like to discuss during the consultation"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5D00FF] focus:outline-none transition-colors text-gray-800 bg-white appearance-none"
                    >
                      <option value="PT">Pacific Time (PT)</option>
                      <option value="MT">Mountain Time (MT)</option>
                      <option value="CT">Central Time (CT)</option>
                      <option value="ET">Eastern Time (ET)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </form>
                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 border-t border-gray-200 pt-6">
                  <button
                    onClick={() => {
                      ReactGA.event({
                        category: "Modal",
                        action: "Clicked Cancel in Consultation Modal",
                      });

                      const modal =
                        document.getElementById("consultationModal");
                      const modalContent = modal?.querySelector("div");
                      if (modal && modalContent) {
                        modal.style.opacity = "0";
                        modalContent.style.opacity = "0";
                        modalContent.style.transform = "scale(0.95)";
                        setTimeout(() => {
                          modal.style.display = "none";
                          document.body.style.overflow = "auto";
                        }, 300);
                      }
                    }}
                    className="px-6 py-3 border-2 border-black font-bold !rounded-button whitespace-nowrap hover:bg-black hover:text-white transition-all duration-300 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    id="submitConsultationBtn"
                    onClick={async () => {
                      const submitBtn = document.getElementById(
                        "submitConsultationBtn"
                      ) as HTMLButtonElement | null;
                      const form = document.getElementById(
                        "consultationForm"
                      ) as HTMLFormElement | null;
                      const modal = document.getElementById(
                        "consultationModal"
                      ) as HTMLElement | null;
                      const modalContent = modal?.querySelector(
                        "div"
                      ) as HTMLElement | null;

                      if (!form?.checkValidity()) {
                        form?.reportValidity();
                        return;
                      }

                      const formData = new FormData(form);

                      const data = {
                        name: formData.get("name"),
                        email: formData.get("email"),
                        phone: formData.get("phone"),
                        companyName: formData.get("company"),
                        preferredDate: formData.get("date"),
                        preferredTime: formData.get("time"),
                        discuss: formData.get("description"),
                        timezone:
                          formData.get("timezone") ||
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                      };

                      // Loading state
                      if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML =
                          '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
                      }

                      try {
                        const res = await fetch(
                          `${serverUrl}/connect/schedule`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(data),
                          }
                        );

                        if (!res.ok) throw new Error("Form submission failed");

                        // Success: close modal + show toast
                        if (modal && modalContent) {
                          modal.style.opacity = "0";
                          modalContent.style.opacity = "0";
                          modalContent.style.transform = "scale(0.95)";
                          setTimeout(() => {
                            modal.style.display = "none";
                            document.body.style.overflow = "auto";
                            form.reset();
                            const toast = document.createElement("div");
                            toast.className =
                              "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50   duration-300";
                            toast.innerHTML = `
<div class="flex items-center">
  <i class="fas fa-check-circle mr-2"></i>
  <p>Your consultation request has been submitted successfully. We'll reach out shortly.</p>
</div>`;
                            document.body.appendChild(toast);

                            setTimeout(() => {
                              toast.style.transform = "translate(0)";
                              toast.style.opacity = "1";
                            }, 100);

                            setTimeout(() => {
                              toast.style.transform = "translate-y-full";
                              toast.style.opacity = "0";
                              setTimeout(() => toast.remove(), 300);
                            }, 5000);
                          }, 300);
                        }
                      } catch (error) {
                        console.error("Error submitting consultation:", error);
                        alert(
                          "Something went wrong while submitting the form."
                        );
                      } finally {
                        if (submitBtn) {
                          submitBtn.disabled = false;
                          submitBtn.innerHTML = "Submit Consultation";
                        }
                      }
                    }}
                    className="px-6 cursor-pointer py-3 bg-[#5D00FF] text-white font-bold !rounded-button whitespace-nowrap hover:bg-black transition-all duration-300 text-center shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#000000]"
                  >
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Services;
