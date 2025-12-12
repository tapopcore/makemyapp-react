// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ReactGA from "react-ga4"
import { Link } from 'react-router-dom';
import Logo from "./assets/logo.png";
import {serverUrl} from "../config"

const ContactUS: React.FC = () => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null); // Only one question open

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when typing
    if (name === "name" || name === "email") {
      setFormErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "" || !formData.email.includes("@"),
    };

    setFormErrors(errors);

    if (!errors.name && !errors.email) {
      setIsSubmitting(true);

      try {
        const response = await fetch(`${serverUrl}/connect/connect`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("✅ Submitted:", result);

          setIsSubmitted(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        console.error(" Server Error:", result);
      }
    } catch (error) {
      console.error(" Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
};


  const faqCategories = [
    {
      title: "Services & Pricing",
      questions: [
        {
          question: "What services does MakeMyApp offer?",
          answer:
            "MakeMyApp offers a comprehensive range of digital services including mobile app development, web development, UI/UX design, branding, e-commerce solutions, and custom software development. We work with businesses of all sizes to create tailored digital solutions.",
        },
        {
          question: "How much does it cost to build an app or website?",
          answer:
            "Project costs vary based on complexity, features, platforms, and timeline. We offer customized quotes after understanding your specific requirements. Contact us for a free consultation to discuss your project and receive a detailed estimate.",
        },
        {
          question: "Do you offer maintenance and support after launch?",
          answer:
            "Yes, we provide ongoing maintenance and support packages to ensure your digital products remain up-to-date and function optimally. Our support plans include regular updates, bug fixes, security patches, and technical assistance.",
        },
      ],
    },
    {
      title: "Process & Timeline",
      questions: [
        {
          question: "How long does it take to develop an app or website?",
          answer:
            "Development timelines depend on project scope and complexity. A simple website might take 4-6 weeks, while complex applications can take 3-6 months or more. During our initial consultation, we'll provide a more accurate timeline based on your specific requirements.",
        },
        {
          question: "What is your development process?",
          answer:
            "Our process includes discovery (requirements gathering), planning, design, development, testing, deployment, and post-launch support. We follow agile methodologies with regular client check-ins and iterative development to ensure transparency and quality.",
        },
        {
          question:
            "Will I be able to make changes during the development process?",
          answer:
            "Yes, we embrace an iterative approach that allows for feedback and adjustments throughout the development process. We schedule regular review sessions to gather your input and implement changes accordingly.",
        },
      ],
    },
    {
      title: "Technology & Platforms",
      questions: [
        {
          question: "Which platforms do you develop for?",
          answer:
            "We develop for all major platforms including iOS, Android, and web. For mobile applications, we can create native apps for specific platforms or cross-platform solutions that work across multiple devices, depending on your needs and budget.",
        },
        {
          question: "What technologies do you use?",
          answer:
            "We work with a wide range of technologies including React, React Native, Flutter, Swift, Kotlin, Node.js, Python, and more. Our technology choices are guided by your project requirements, ensuring the best solution for your specific needs.",
        },
        {
          question: "Can you update or redesign my existing app or website?",
          answer:
            "Absolutely. We specialize in modernizing existing digital products. Our team can assess your current application, recommend improvements, and implement updates or complete redesigns to enhance functionality, user experience, and visual appeal.",
        },
      ],
    },
  ];

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
              Contact Us
            </h1>
            <div className="w-24 h-1 bg-white mb-6"></div>
            <p className="text-white/90 text-xl text-center max-w-2xl">
              Have a question or want to work together? We'd love to hear from
              you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 border-b-4 border-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
              <div className="w-16 h-1 bg-[#5D00FF] mb-8"></div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#5D00FF] text-white flex items-center justify-center rounded-full flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                    <p className="text-gray-700">
                      2-A/3, Kundan mansion, Asaf ali road, Daryaganj, Delhi-110002
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#FF6B00] text-white flex items-center justify-center rounded-full flex-shrink-0">
                    <i className="fas fa-phone-alt text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                    <p className="text-gray-700">
                     +91 9999396619
                      {/* <br />
                      +1 (555) 987-6543 */}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#0066FF] text-white flex items-center justify-center rounded-full flex-shrink-0">
                    <i className="fas fa-envelope text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-gray-700">
                      makemyapp.co@gmail.com
                      {/* <br />
                      support@makemyapp.co */}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#FF0099] text-white flex items-center justify-center rounded-full flex-shrink-0">
                    <i className="fas fa-clock text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                    <p className="text-gray-700">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 2:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {/*<a href="#" className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#5D00FF] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer">
                    <i className="fab fa-linkedin-in text-lg"></i>
                  </a>*/}
                  {/*<a href="#" className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#FF6B00] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer">
                    <i className="fab fa-twitter text-lg"></i>
                  </a>*/}
                  <a href="#" className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#0066FF] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer">
                    <i className="fab fa-instagram text-lg"></i>
                  </a>
                   <a
      href="http://makemyapp.qviq.io"
      target="_blank"
      className="w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
    >
      <img src={Logo} alt="MakeMyApp Logo" className="h-[25px] w-[25px]" />
    </a>
                  {/*<a href="#" className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#FF0099] transition-all duration-300 border-2 border-gray-200 rounded-full cursor-pointer">
                    <i className="fab fa-facebook-f text-lg"></i>
                  </a>*/}
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="relative h-[450px] border-4 border-black overflow-hidden">
                {/* <div className="absolute -top-6 -right-6 w-full h-full border-4 border-[#5D00FF]"></div> */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6398181016593!2d77.23912437780204!3d28.649583620557774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfce08f8e147f%3A0x1b1829897b44db45!2s2-A%2C%202-A%2C%20Daryaganj%2C%20Delhi%2C%20110002!5e1!3m2!1sen!2sin!4v1752129463692!5m2!1sen!2sin" width="100%" height="450"  loading="lazy"></iframe>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50 border-b-4 border-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Send Us a Message</h2>
            <div className="w-16 h-1 bg-[#5D00FF] mx-auto mb-8"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <div className="bg-green-50 border-2 border-green-500 p-8 text-center rounded-lg">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-green-700">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_#5D00FF]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${
                        formErrors.name ? "border-red-500" : "border-gray-200"
                      } focus:border-[#5D00FF] focus:outline-none transition-colors`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter your name
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${
                        formErrors.email ? "border-red-500" : "border-gray-200"
                      } focus:border-[#5D00FF] focus:outline-none transition-colors`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter a valid email address
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#5D00FF] focus:outline-none transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#5D00FF] focus:outline-none transition-colors appearance-none bg-white"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Quote">Project Quote</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Support">Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#5D00FF] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  onClick={() => {
                    ReactGA.event({
                      category: "Form",
                      action: "Submitted Contact Form",
                    });
                  }}
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 font-bold text-white bg-[#5D00FF] !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000] ${
                    isSubmitting ? "opacity-70" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-[#5D00FF] mx-auto mb-8"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Find answers to common questions about our services and process.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap mb-8">
              {faqCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => 
                     {
    ReactGA.event({
      category: "Tabs",
      action: `Switched to ${category.title} Tab`,
    });
                    setActiveTab(index);
                  setOpenQuestionIndex(null);}}
                  className={`px-6 py-3 font-medium !rounded-button whitespace-nowrap cursor-pointer mr-4 mb-4 transition-all ${
                    activeTab === index
                      ? "bg-[#5D00FF] text-white"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#5D00FF]"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <div className="space-y-4">
             {faqCategories[activeTab].questions.map((faq, index) => (
  <div key={index} className="border-2 border-gray-200 hover:border-[#5D00FF] transition-colors">
    <div
      onClick={() => setOpenQuestionIndex(openQuestionIndex === index ? null : index)}
      className="flex justify-between items-center font-medium cursor-pointer list-none p-4 border-b-2 border-gray-200"
    >
      <span className="text-lg font-semibold">{faq.question}</span>
      <span className={`transition ${openQuestionIndex === index ? "rotate-180" : ""}`}>
        <i className="fas fa-chevron-down text-[#5D00FF]"></i>
      </span>
    </div>
    {openQuestionIndex === index && (
      <div className="p-4 pt-0 text-gray-700">
        <p>{faq.answer}</p>
      </div>
    )}
  </div>
))}

            </div>

            <div className="mt-12 text-center">
              <p className="text-lg mb-6">Still have questions? We're here to help!</p>
<a
  href="https://api.whatsapp.com/send?phone=919999396619&text=I%20want%20to%20contact%20the%20support%20team"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => {
    ReactGA.event({
      category: "Support",
      action: "User clicked Contact Our Support Team",
    });
  }}
  className="inline-block bg-black text-white px-8 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#5D00FF]"
>
  Contact Our Support Team
</a>



            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#5D00FF] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Book a free consultation call with our team to discuss your ideas
            and requirements.
          </p>
          <button
            onClick={() => {
              ReactGA.event({
                category: "Booking",
                action: "Clicked Book Free Call button",
              });

              window.open("https://calendly.com/makemyapp-co/30min", "_blank");
            }}
            className="inline-block bg-[#FF6B00] text-white px-8 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
          >
            Book Free Call
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUS;
