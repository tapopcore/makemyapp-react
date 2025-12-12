// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from 'react-router-dom';
import akutee from "./assets/web/akutee.png"
import athlab from "./assets/web/athlab.png"
import chapterskeen from "./assets/web/chapterskeen.png"
import fleurons from "./assets/web/fleurons.png"
import funkvibe from "./assets/web/funkvibes.png"
import gaffit from "./assets/web/gaffit.png"
import gossipconfetti from "./assets/web/Gossipconfetti.png"
import heatronics from "./assets/web/heatronics.png"
import kyxaindia from "./assets/web/kyzaindia.png"
import laadindia from "./assets/web/laadindia.png"
import littlethingstudio from "./assets/web/littlethingstudio.png"
import meethielaichi from "./assets/web/Meethielaiechi.png"
import Regaplus from "./assets/web/Regaplus.png"

import ReactGA from "react-ga4";
const Projects: React.FC = () => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const projectsPerPage = 9;
  const filters = ["All", "Website", "Mobile App", "CRM/ERP", "Branding"];
  const projects = [
    {
      title: "The beauty and elegance",
      description:
        "Elevate your fashion narrative with our hand painted florals — where Indian heritage blooms in every stitch.",
      category: "Website",
      imageUrl:akutee,
      url : "https://akutee.store/"
    },
    {
      title: "E-commerce App",
      description:
        "Mobile shopping experience with personalized recommendations and seamless checkout process.",
      category: "Mobile App",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520clean%2520brutalist%2520mobile%2520app%2520interface%2520for%2520e-commerce%2520with%2520product%2520grid%2520layout%252C%2520purple%2520and%2520orange%2520accent%2520colors%252C%2520flat%2520design%2520elements%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520minimalist%2520product%2520cards%2520on%2520white%2520background&width=600&height=400&seq=2&orientation=landscape",
    },
    {
      title: "SaaS Platform",
      description:
        "Enterprise management solution with powerful analytics and team collaboration features.",
      category: "CRM/ERP",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520brutalist%2520style%2520SaaS%2520platform%2520interface%2520with%2520data%2520tables%2520and%2520analytics%252C%2520featuring%2520purple%2520and%2520orange%2520accent%2520colors%252C%2520flat%2520design%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520black%2520text%2520on%2520white%2520background%252C%2520grid%2520layout&width=600&height=400&seq=3&orientation=landscape",
    },
    {
      title: "Health & Fitness App",
      description:
        "Personalized workout tracking with nutrition planning and progress visualization.",
      category: "Mobile App",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520brutalist%2520style%2520fitness%2520app%2520interface%2520showing%2520workout%2520tracking%2520and%2520health%2520metrics%252C%2520with%2520purple%2520and%2520orange%2520accent%2520colors%252C%2520flat%2520design%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520minimalist%2520UI%2520elements%2520on%2520clean%2520background&width=600&height=400&seq=4&orientation=landscape",
    },
    {
      title: "Corporate Rebrand",
      description:
        "Complete visual identity redesign for a technology company entering new markets.",
      category: "Branding",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520brutalist%2520style%2520brand%2520identity%2520presentation%2520with%2520logo%2520variations%2520and%2520brand%2520guidelines%252C%2520featuring%2520purple%2520and%2520orange%2520color%2520palette%252C%2520flat%2520design%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520minimalist%2520layout%2520on%2520white%2520background&width=600&height=400&seq=5&orientation=landscape",
    },
    {
      title: "Restaurant Ordering System",
      description:
        "Integrated POS and inventory management system for multi-location restaurants.",
      category: "CRM/ERP",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520brutalist%2520style%2520restaurant%2520management%2520interface%2520showing%2520order%2520processing%2520and%2520inventory%2520tracking%252C%2520with%2520purple%2520and%2520orange%2520accent%2520colors%252C%2520flat%2520design%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520clean%2520layout%2520on%2520white%2520background&width=600&height=400&seq=6&orientation=landscape",
    },
    {
      title: "NATURAL SUPPLEMENTS YOU CAN TRUST",
      description:
        "Athlab is India's first clean label supplements brand for athletes and gym goers.",
      category: "Website",
      imageUrl:athlab,
      url: "https://athlab.in/"
    },
    {
      title: "Crypto Trading App",
      description:
        "Secure cryptocurrency trading platform with real-time market data and portfolio tracking.",
      category: "Mobile App",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520brutalist%2520style%2520cryptocurrency%2520trading%2520app%2520interface%2520showing%2520price%2520charts%2520and%2520trading%2520options%252C%2520with%2520purple%2520and%2520orange%2520accent%2520colors%252C%2520flat%2520design%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520dark%2520mode%2520UI%2520with%2520vibrant%2520data%2520visualizations&width=600&height=400&seq=8&orientation=landscape",
    },
    {
      title: "Smart Home Control",
      description:
        "IoT control center for managing connected home devices with automation capabilities.",
      category: "Mobile App",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520brutalist%2520style%2520smart%2520home%2520control%2520app%2520interface%2520showing%2520device%2520management%2520and%2520automation%2520controls%252C%2520with%2520purple%2520and%2520orange%2520accent%2520colors%252C%2520flat%2520design%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520clean%2520UI%2520with%2520device%2520icons%2520on%2520white%2520background&width=600&height=400&seq=9&orientation=landscape",
    },
    {
      title: "Product Launch Campaign",
      description:
        "Comprehensive brand and marketing campaign for new tech product launch.",
      category: "Branding",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520brutalist%2520style%2520product%2520marketing%2520campaign%2520presentation%2520showing%2520brand%2520assets%2520and%2520marketing%2520materials%252C%2520with%2520purple%2520and%2520orange%2520accent%2520colors%252C%2520flat%2520design%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520minimalist%2520layout%2520on%2520white%2520background&width=600&height=400&seq=10&orientation=landscape",
    },
    {
      title: "HR Management System",
      description:
        "Comprehensive employee management platform with performance tracking and onboarding.",
      category: "CRM/ERP",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520brutalist%2520style%2520HR%2520management%2520system%2520interface%2520showing%2520employee%2520profiles%2520and%2520performance%2520metrics%252C%2520with%2520purple%2520and%2520orange%2520accent%2520colors%252C%2520flat%2520design%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520clean%2520data%2520presentation%2520on%2520white%2520background&width=600&height=400&seq=11&orientation=landscape",
    },
    {
      title: "Luxury in Simplicity",
      description:
        "Natural skincare and cosmetics.",
      category: "Website",
      imageUrl:chapterskeen,
      url:"https://chapterskin.in/"
    },
    {
      title: "Event Management App",
      description:
        "Comprehensive platform for planning, promoting and managing events with ticketing.",
      category: "Mobile App",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520brutalist%2520style%2520event%2520management%2520app%2520interface%2520showing%2520event%2520listings%2520and%2520scheduling%2520features%252C%2520with%2520purple%2520and%2520orange%2520accent%2520colors%252C%2520flat%2520design%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520calendar%2520view%2520and%2520event%2520cards%2520on%2520clean%2520background&width=600&height=400&seq=13&orientation=landscape",
    },
    {
      title: "Fashion Brand Identity",
      description:
        "Complete visual identity system for an emerging sustainable fashion brand.",
      category: "Branding",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%2520brutalist%2520style%2520fashion%2520brand%2520identity%2520presentation%2520showing%2520logo%2520design%2520and%2520brand%2520applications%252C%2520with%2520purple%2520and%2520orange%2520accent%2520colors%252C%2520flat%2520design%252C%2520sharp%2520corners%252C%2520high%2520contrast%252C%2520minimalist%2520fashion%2520photography%2520on%2520white%2520background&width=600&height=400&seq=14&orientation=landscape",
    },
    {
      title: "Fleaurons",
      description:
        "At Fleurons, we believe that every cake tells a story. What started as a passion for crafting beautiful, eggless desserts has grown into a Leading brand in Premium Cakes known for artistry, innovation, and impeccable quality.",
      category: "Website",
      imageUrl:fleurons,
      url:'https://fleurons.in/'
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      // if (window.scrollY > 50) {
      //   setIsScrolled(true);
      // } else {
      //   setIsScrolled(false);
      // }
    };
    window.addEventListener("scroll", handleScroll);
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === activeFilter)
      );
    }
    setCurrentPage(1);
  }, [activeFilter]);
  // Get current projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProjects.length / projectsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
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
      {/* Page Title Section */}
      <section className="pt-32 pb-16 bg-[#5D00FF]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
           <Link
               to="/"
                className="self-start mb-6 flex items-center text-white hover:text-gray-200 transition-colors cursor-pointer"
                  >
                 <i className="fas fa-arrow-left mr-2"></i>
                 <span>Back to Home</span>
                    </Link>

            <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
              Our Projects
            </h1>
            <div className="w-24 h-1 bg-white mb-6"></div>
            <p className="text-white/90 text-xl text-center max-w-2xl">
              Explore our complete portfolio of digital solutions across various
              industries and technologies.
            </p>
          </div>
        </div>
      </section>
      {/* Filter Section */}
      <section className="py-8 border-b-4 border-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  ReactGA.event({
      category: "Filters",
      action: "Selected Filter",
                  });
                  setActiveFilter(filter);
                }}
                className={`px-6 py-3 font-bold border-4 border-black !rounded-button whitespace-nowrap cursor-pointer transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-[#5D00FF] text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            // Skeleton loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="border-4 border-gray-200 h-[450px] animate-pulse"
                  >
                    <div className="h-[240px] bg-gray-200"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-10 bg-gray-200 rounded w-1/2 mt-6"></div>
                    </div>
                  </div>
                ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project, index) => (
                  <div
                    key={index}
                    className="group border-4 border-black overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000000]"
                  >
                    <div className="h-[240px] overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transform transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <span
                          className={`inline-block px-3 py-1 text-sm font-medium text-white ${
                            project.category === "Website"
                              ? "bg-[#5D00FF]"
                              : project.category === "Mobile App"
                              ? "bg-[#FF6B00]"
                              : project.category === "CRM/ERP"
                              ? "bg-[#0066FF]"
                              : "bg-[#FF0099]"
                          }`}
                        >
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-700 mb-6 line-clamp-2">
                        {project.description}
                      </p>
                      <button 
                       onClick={() => {
    ReactGA.event({
      category: "Button",
      action: "Clicked View Details",
    });
  }}
                      className="bg-[#FF6B00] text-white px-6 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              {pageNumbers.length > 1 && (
                <div className="mt-16 flex justify-center">
                  <div className="flex items-center border-4 border-black">
                    <button
                      onClick={() => {
                        ReactGA.event({
      category: "Pagination",
      action: "Clicked Previous Page",
                        });
                        paginate(Math.max(1, currentPage - 1));
                      }}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 border-r-4 border-black font-bold cursor-pointer ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => {
                          ReactGA.event({
        category: "Pagination",
        action: "Clicked Page Number",
        label: `Page ${number}`,
      });
      paginate(number);
                        }}
                        className={`px-4 py-2 border-r-4 border-black font-bold cursor-pointer ${
                          currentPage === number
                            ? "bg-[#5D00FF] text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() =>{
                        ReactGA.event({
      category: "Pagination",
      action: "Clicked Next Page",
                      });
                        paginate(Math.min(pageNumbers.length, currentPage + 1));
                      }}
                      disabled={currentPage === pageNumbers.length}
                      className={`px-4 py-2 font-bold cursor-pointer ${
                        currentPage === pageNumbers.length
                          ? "bg-gray-100 text-gray-400"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Empty state
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 mb-6 flex items-center justify-center border-4 border-gray-300">
                <i className="fas fa-search text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">No Projects Found</h3>
              <p className="text-gray-600 mb-8 max-w-md">
                We couldn't find any projects matching your selected filter. Try
                selecting a different category.
              </p>
              <button
                onClick={() => {
                  ReactGA.event({
      category: "Filters",
      action: "Clicked View All Projects",
                  });
                  setActiveFilter("All");
                }}
                className="bg-[#5D00FF] text-white px-6 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-[#5D00FF] text-white border-t-4 border-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with our
            expertise in design and development.
          </p>
          <button  onClick={() =>{

           ReactGA.event({
      category: "calendly",
      action: "Clicked Book a Free Consultation", 
          });
              window.open("https://calendly.com/makemyapp-co/30min", "_blank");
        }
            } className="bg-[#FF6B00] text-white px-8 py-3 font-bold !rounded-button whitespace-nowrap cursor-pointer transform transition-all hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]">
            Book a Free Consultation
          </button>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Projects;
