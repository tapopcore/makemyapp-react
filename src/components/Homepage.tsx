// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactGA from "react-ga4";
import qviqBg from "./assets/qviq-bg.png";
import dma from "./assets/dma.png";
import inhunger from "./assets/inhunger.png";
import PreviewModal from "./PreviewModal";
interface TypewriterTextProps {
  texts: string[];
}
const TypewriterText: React.FC<TypewriterTextProps> = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const text = texts[currentTextIndex];
    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(text.substring(0, currentText.length - 1));
        }, 50);
      }
    } else {
      if (currentText === text) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(text.substring(0, currentText.length + 1));
        }, 100);
      }
    }
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);
  return (
    <h2 className="text-2xl md:text-3xl font-mono h-full flex items-center">
      {currentText}
      <span className="border-r-4 border-[#5D00FF] ml-1 animate-pulse"></span>
    </h2>
  );
};
interface ServiceModalProps {
  service: {
    title: string;
    description: string;
    icon: string;
    color: string;
    features?: string[];
    process?: string[];
    technologies?: string[];
    examples?: { name: string; description: string }[];
  };
  isOpen: boolean;
  onClose: () => void;
}
const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/30 backdrop-blur-md">
      <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto border-4 border-black">
        <div
          className="p-6 border-b-4 border-black"
          style={{ backgroundColor: service.color }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <i className={`fas ${service.icon} text-3xl text-white`}></i>
              <h2 className="text-3xl font-bold text-white">{service.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 cursor-pointer"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>
        <div className="p-8">
          <p className="text-xl mb-8">{service.description}</p>
          {service.features && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-[#5D00FF] mt-1"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {service.process && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Our Process</h3>
              <ol className="space-y-4">
                {service.process.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#5D00FF] text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {service.technologies && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Technologies We Use</h3>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 border-2 border-gray-300 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          {service.examples && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Example Projects</h3>
              <div className="space-y-4">
                {service.examples.map((example, index) => (
                  <div key={index} className="border-l-4 border-[#5D00FF] pl-4">
                    <h4 className="font-bold text-lg">{example.name}</h4>
                    <p>{example.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                ReactGA.event({
                  category: "Quotes",
                  action: `Requested Quote for ${service.title}`,
                });

                const message = encodeURIComponent(`Requested Quote for ${service.title}`);
                window.location.href = `https://wa.me/+919999396619?text=${message}`;
              }}
              className="bg-[#FF6B00] text-white px-8 py-3 font-bold !rounded-button  cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]"
            >
              Request a Quote for {service.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const HomePage: React.FC = () => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [visibleSection, setVisibleSection] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    // const handleScroll = () => {
    //   if (window.scrollY > 50) {
    //     setIsScrolled(true);
    //   } else {
    //     setIsScrolled(false);
    //   }
    // };
    // window.addEventListener("scroll", handleScroll);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
    return () => {
      // window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);
  const services = [
    {
      title: "Website Dev",
      description:
        "Custom websites built with modern tech stack and optimized performance.",
      icon: "fa-globe",
      color: "#5D00FF",
      hoverColor: "#4700CC",
      features: [
        "Responsive design for all devices",
        "SEO optimization",
        "Custom CMS integration",
        "Performance optimization",
        "Analytics and tracking setup",
      ],
      process: [
        "Discovery and requirements gathering",
        "Wireframing and design mockups",
        "Development and coding",
        "Testing and quality assurance",
        "Deployment and launch",
      ],
      technologies: [
        "React",
        "Next.js",
        "Vue",
        "Angular",
        "WordPress",
        "Shopify",
        "Node.js",
        "PHP",
      ],
      examples: [
        {
          name: "E-commerce Platform",
          description:
            "Custom online store with inventory management and payment processing",
        },
        {
          name: "Corporate Website",
          description: "Brand-focused website with content management system",
        },
        {
          name: "Landing Page",
          description:
            "High-converting landing page with A/B testing capabilities",
        },
      ],
    },
    {
      title: "Mobile App Dev",
      description:
        "Native and cross-platform mobile applications for iOS and Android.",
      icon: "fa-mobile-alt",
      color: "#FF6B00",
      hoverColor: "#CC5500",
      features: [
        "Native iOS and Android development",
        "Cross-platform solutions",
        "Offline functionality",
        "Push notifications",
        "In-app purchases",
      ],
      process: [
        "User experience research",
        "UI/UX design",
        "Development and coding",
        "Testing on multiple devices",
        "App store submission and launch",
      ],
      technologies: [
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Firebase",
        "AWS Amplify",
      ],
      examples: [
        {
          name: "Fitness Tracker",
          description:
            "Mobile app for tracking workouts and nutrition with social features",
        },
        {
          name: "Delivery Service",
          description: "On-demand delivery app with real-time tracking",
        },
        {
          name: "Social Network",
          description: "Community platform with messaging and content sharing",
        },
      ],
    },
    {
      title: "CRM/ERP",
      description:
        "Custom business solutions to streamline your operations and workflows.",
      icon: "fa-database",
      color: "#0066FF",
      hoverColor: "#0052CC",
      features: [
        "Custom workflow automation",
        "Data visualization and reporting",
        "Integration with existing systems",
        "User role management",
        "Cloud-based solutions",
      ],
      process: [
        "Business process analysis",
        "System architecture design",
        "Development and customization",
        "Data migration",
        "Training and deployment",
      ],
      technologies: [
        "Salesforce",
        "Microsoft Dynamics",
        "Custom Solutions",
        "PostgreSQL",
        "MongoDB",
        "Express.js",
      ],
      examples: [
        {
          name: "Inventory Management",
          description:
            "Real-time inventory tracking system for manufacturing company",
        },
        {
          name: "Sales Pipeline",
          description:
            "Custom CRM for sales team with forecasting capabilities",
        },
        {
          name: "HR Management",
          description: "Employee management system with performance tracking",
        },
      ],
    },
    {
      title: "Branding",
      description:
        "Complete brand identity design including logos, guidelines and assets.",
      icon: "fa-paint-brush",
      color: "#FF0099",
      hoverColor: "#CC007A",
      features: [
        "Logo design",
        "Brand guidelines",
        "Marketing materials",
        "Social media assets",
        "Brand strategy",
      ],
      process: [
        "Brand discovery workshop",
        "Concept development",
        "Design refinement",
        "Asset creation",
        "Brand guide delivery",
      ],
      technologies: [
        "Adobe Creative Suite",
        "Figma",
        "Sketch",
        "Brand Strategy Tools",
      ],
      examples: [
        {
          name: "Tech Startup Rebrand",
          description: "Complete brand refresh for growing technology company",
        },
        {
          name: "Product Branding",
          description: "Brand identity for new product launch",
        },
        {
          name: "Corporate Identity",
          description:
            "Comprehensive branding package for established business",
        },
      ],
    },
  ];
  const projects = [
    {
      title: "Qviq",
      description: "Create a website that reflects your personality and grows your brand quickly and easily",
      imageUrl: qviqBg,
      link : "https://qviq.io/" ,
    },
    {
      title: "DMA Associates",
      description: "Expertise in Corporate and Allied Laws, Delivered by Seasoned In-House Professionals",
      imageUrl: dma,
      link: "https://dmassociates.in/",
    },
    {
      title: "Inhunger",
      description: "Delivering Fresh, Chef-Curated Meals Straight to Your Doorstep",
      imageUrl: inhunger,
      link:"https://inhunger.com/",
    },
  ];
  const testimonials = [
    {
      quote:
        "MakeMyApp delivered our project on time and exceeded our expectations. Their technical expertise and design sensibility set them apart.",
      author: "Sarah Johnson",
      company: "TechVenture Inc.",
    },
    {
      quote:
        "Working with this team was refreshing. They understood our business needs and translated them into a powerful digital solution.",
      author: "Michael Chen",
      company: "Innovate Solutions",
    },
  ];
  const handleServiceLearnMore = (index: number) => {
    setSelectedService(index);
    setModalOpen(true);
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
      <section
        id="hero"
        className="relative min-h-screen flex items-center bg-white overflow-hidden"
      >
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-8 p-8 opacity-5 pointer-events-none">
          {Array(144)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="border border-black"></div>
            ))}
        </div>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center pt-32 pb-20">
          <div
            className={`space-y-12 transform transition-all duration-1000 ${
              visibleSection === "hero"
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight">
                We Build What{" "}
                <span className="text-[#5D00FF] inline-block transform hover:translate-x-2 transition-transform">
                  You
                </span>{" "}
                Imagine.
              </h1>
              <div className="h-12">
                <TypewriterText
                  texts={[
                    "Websites that convert.",
                    "Apps that engage.",
                    "Software that scales.",
                  ]}
                />
              </div>
            </div>
            <div className="space-y-8">
              <p className="text-xl border-l-4 border-[#5D00FF] pl-6">
                Transform your vision into digital reality with our expert team
                of designers and developers.
              </p>
              <div className="flex flex-wrap gap-6">
                <button
                  onClick={() => {
                    ReactGA.event({
                      category: "Booking",
                      action: "Clicked Book a Free Call",
                    });

                    window.open(
                      "https://calendly.com/makemyapp-co/30min",
                      "_blank"
                    );
                  }}
                  className="bg-[#FF6B00] text-white px-10 py-4 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[8px_8px_0px_0px_#000000] active:translate-y-0 active:translate-x-0 active:shadow-none"
                >
                  Book a Free Call
                </button>
                <button
                  onClick={() => {
                    ReactGA.event({
                      category: "Portfolio",
                      action: "Clicked View Work",
                    });
                    setOpenPreview(true);
                  }}
                  className="border-4 border-[#5D00FF] text-[#5D00FF] px-10 py-4 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[8px_8px_0px_0px_#5D00FF] active:translate-y-0 active:translate-x-0 active:shadow-none"
                >
                  View Work
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-5 transform -translate-x-4 -translate-y-4"></div>
            <div className="relative w-full h-[600px] border-4 border-black overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=A%20futuristic%20workspace%20in%20neo-brutalist%20style%20with%20multiple%20floating%20UI%20screens%20and%20design%20elements%2C%20featuring%20sharp%20geometric%20shapes%2C%20high%20contrast%2C%20flat%20design%20with%20purple%20and%20orange%20accents%20on%20white%20background%2C%20showing%20motion%20lines%20and%20digital%20interface%20elements&width=800&height=800&seq=6&orientation=squarish"
                alt="Futuristic Workspace"
                className="w-full h-full object-cover object-top transform transition-all duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
      {openPreview && <PreviewModal onClose={() => setOpenPreview(false)} />}
      {/* Services Section */}
      <section
        id="services"
        className="py-24 sm:py-28 md:py-32 bg-white border-t-4 border-b-4 border-black"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 sm:mb-20 text-center tracking-tight">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            {services.map((service, index) => {
              const isMobile =
                typeof window !== "undefined" && window.innerWidth < 420;
              return (
                <div
                  key={index}
                  className="group relative p-6 sm:p-8 md:p-10 border-4 border-black transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                  onMouseEnter={() => !isMobile && setActiveService(index)}
                  onMouseLeave={() => !isMobile && setActiveService(null)}
                  onClick={() => isMobile && handleServiceLearnMore(index)}
                  style={{
                    backgroundColor:
                      activeService === index
                        ? service.hoverColor
                        : service.color,
                  }}
                >
                  <div className="flex items-center mb-4 sm:mb-6">
                    <i
                      className={`fas ${service.icon} text-3xl sm:text-4xl text-white transform transition-all duration-500 group-hover:rotate-12`}
                    ></i>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-white">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                    {service.description}
                  </p>

                  {/* Plus icon (always visible on mobile, visible on hover for desktop) */}
                  <div
                    className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-10
              opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click on mobile
                      handleServiceLearnMore(index);
                    }}
                  >
                    <i className="fas fa-plus text-white/80"></i>
                  </div>

                  {/* Bottom-left decorative circle */}
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white/30 transition-opacity duration-300 opacity-0 sm:group-hover:opacity-100"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold tracking-tight">
                  Why Work
                  <br />
                  With Us?
                </h2>
                <div className="w-24 h-2 bg-[#FF6B00]"></div>
              </div>
              <div className="space-y-8">
                {[
                  {
                    icon: "fa-object-ungroup",
                    color: "#5D00FF",
                    title: "Design + Tech in One",
                    desc: "Full-service team handling both design and development.",
                  },
                  {
                    icon: "fa-calendar-check",
                    color: "#FF6B00",
                    title: "Fixed Timelines",
                    desc: "Clear project schedules with guaranteed delivery dates.",
                  },
                  {
                    icon: "fa-users",
                    color: "#0066FF",
                    title: "75+ Clients",
                    desc: "Extensive experience across various industries and projects.",
                  },
                  {
                    icon: "fa-bolt",
                    color: "#FF0099",
                    title: "Fast Turnaround",
                    desc: "Efficient processes to deliver quality work quickly.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-6 transform transition-all duration-700 opacity-0 translate-y-4"
                    style={{
                      animationName: "fadeInUp",
                      animationDuration: "0.7s",
                      animationDelay: `${index * 0.2}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div
                      className="w-16 h-16 flex items-center justify-center border-4 border-black transform transition-transform hover:scale-110"
                      style={{ backgroundColor: item.color }}
                    >
                      <i className={`fas ${item.icon} text-2xl text-white`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-700 text-lg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative space-y-8 mt-12">
              {[
                {
                  step: "Ideation",
                  icon: "fa-lightbulb",
                  desc: "We transform your vision into actionable plans",
                  color: "#5D00FF",
                  delay: 0,
                },
                {
                  step: "Design",
                  icon: "fa-pen-ruler",
                  desc: "Crafting pixel-perfect interfaces and experiences",
                  color: "#FF6B00",
                  delay: 200,
                },
                {
                  step: "Launch",
                  icon: "fa-rocket",
                  desc: "Deploying and scaling your solution",
                  color: "#5D00FF",
                  delay: 400,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative flex items-center gap-6 p-8 border-4 border-black bg-white transform transition-all duration-500 hover:-translate-y-2"
                  style={{
                    opacity: 0,
                    animation: `fadeInUp 0.7s ${item.delay}ms forwards`,
                  }}
                >
                  <div
                    className="relative w-20 h-20 flex items-center justify-center border-4 border-black transform transition-all duration-500 group-hover:scale-110"
                    style={{ backgroundColor: item.color }}
                  >
                    <i className={`fas ${item.icon} text-3xl text-white`}></i>
                    <div className="absolute -top-4 -left-4 w-4 h-4 border-t-4 border-l-4 border-black"></div>
                    <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b-4 border-r-4 border-black"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold">{`0${
                        index + 1
                      }`}</span>
                      <h3 className="text-2xl font-bold">{item.step}</h3>
                    </div>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
              <style>
                {`
@keyframes fadeInUp {
from {
opacity: 0;
transform: translateY(40px);
}
to {
opacity: 1;
transform: translateY(0);
}
}
`}
              </style>
            </div>
            <style>
              {`
@keyframes fadeInUp {
from {
opacity: 0;
transform: translateY(20px);
}
to {
opacity: 1;
transform: translateY(0);
}
}
@keyframes floatParallax {
0% {
transform: translateY(0);
}
100% {
transform: translateY(-30px);
}
}
`}
            </style>
          </div>
        </div>
      </section>
      {/* Work Showcase */}
      <section id="work" className="py-12 bg-[#5D00FF] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="grid grid-cols-12 gap-4 opacity-10">
            {Array(48)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="h-24 border border-white"></div>
              ))}
          </div>
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-white opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-8 border-white opacity-5 rotate-45"></div>
        </div>
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-extrabold mb-16 text-white text-center tracking-tight font-['Poppins']">
            Our Work
            <div className="w-24 h-1 bg-white mx-auto mt-6"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative border-[6px] border-white overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000000]"
                style={{
                  animation: "slideIn 0.6s ease-out forwards",
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0,
                }}
              >
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white opacity-50"></div>
                <div className="h-[420px] overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-95 transition-all duration-500">
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-4xl font-extrabold mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-center">
                      {project.title}
                    </h3>
                    <p className="text-white/80 mb-8 text-center text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      {project.description}
                    </p>
                    <button
                      onClick={() => {
                        ReactGA.event({
                          category: "Projects",
                          action: "Clicked View Project",
                        });
                        window.open(project.link, "_blank");
                      }}
                      className="bg-[#FF6B00] text-white px-10 py-4 font-bold whitespace-nowrap transform transition-all duration-300 opacity-0 group-hover:opacity-100 delay-300 hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[4px_4px_0px_0px_#ffffff]"
                    >
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => {
                ReactGA.event({
                  category: "Portfolio",
                  action: "Clicked Explore All Projects",
                });
                setOpenPreview(true);
              }}
              className="relative bg-white text-[#5D00FF] px-12 py-5 font-extrabold text-lg whitespace-nowrap border-4 border-white transform transition-all duration-300 hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[8px_8px_0px_0px_#000000] active:translate-y-0 active:translate-x-0 active:shadow-none"
            >
              Explore All Projects
            </button>
          </div>
        </div>
        <style>
          {`
@keyframes slideIn {
from {
opacity: 0;
transform: translateY(20px);
}
to {
opacity: 1;
transform: translateY(0);
}
}
`}
        </style>
      </section>
      {/* Testimonials */}
      <section id="testimonials" className="py-12 bg-[#FAFAFA]">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-extrabold mb-12 text-center tracking-tight">
            <span className="text-[#FF6B00]">What Our</span> Clients Say
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transform transition-all duration-1000 ${
              visibleSection === "testimonials"
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative border-4 border-black p-10 bg-white transform transition-all duration-500 hover:scale-[1.02] hover:border-[#FF6B00] hover:shadow-[8px_8px_0px_0px_#000000]"
              >
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#5D00FF] flex items-center justify-center">
                  <i className="fas fa-quote-left text-2xl text-white"></i>
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-black"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-black"></div>
                <p className="text-2xl mb-8 font-serif italic leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="border-t-4 border-black pt-6">
                  <p className="text-xl font-bold">{testimonial.author}</p>
                  <p className="text-[#5D00FF] font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Banner */}
      <section className="py-24 bg-[#5D00FF] text-white border-t-4 border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-10">
          {Array(24)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="h-24 border border-white"></div>
            ))}
        </div>
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-white opacity-20"></div>
        <div className="container mx-auto px-6 text-center relative">
          <div className="h-16 mb-8 flex items-center justify-center">
            <TypewriterText
              texts={[
                "Got a Project in Mind?",
                "Let's Build It Together.",
                "Start Your Journey Today.",
              ]}
            />
          </div>
          <style>
            {`
section.py-24.bg-\\[\\#5D00FF\\] .h-16 h2 {
font-weight: 600;
font-size: 2.5rem;
}
`}
          </style>
          <button
            onClick={() => {
              ReactGA.event({
                category: "Booking",
                action: "Clicked Talk to Us Today",
              });

              window.open("https://calendly.com/makemyapp-co/30min", "_blank");
            }}
            className="bg-[#FF6B00] text-white px-12 py-4 font-bold text-lg !rounded-button whitespace-nowrap cursor-pointer transform transition-all duration-300 hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[8px_8px_0px_0px_#000000] active:translate-y-0 active:translate-x-0 active:shadow-none"
          >
            Talk to Us Today
          </button>
        </div>
      </section>
      {/* Footer */}
      <Footer />
      {/* Service Modal */}
      {selectedService !== null && (
        <ServiceModal
          service={services[selectedService]}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
export default HomePage;
