import React from "react";
import { RiCloseFill } from "react-icons/ri";
import PdfViewer from "./FilePreview/PdfView";
import brochure from "./assets/make.pdf";
import ReactGA from "react-ga4";

interface Props {
  onClose: () => void;
}

const PreviewModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 backdrop-blur-md px-4 overflow-y-auto py-8">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-lg">
        {/* Sticky Header with Download and Close */}
        <div className="sticky top-0 z-10 bg-white flex justify-between items-center px-6 py-4 border-b">
          <a
            href={brochure}
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5D00FF] text-white font-semibold rounded-md hover:bg-[#4b00d1] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PDF
          </a>

          <button
            onClick={() => {
              ReactGA.event({
                category: "Modal",
                action: "Closed Modal with Close Icon",
              });
              onClose()
            }}
            className="text-gray-500 cursor-pointer hover:text-black text-2xl"
          >
            <RiCloseFill />
          </button>
        </div>

        {/* Scrollable PDF Viewer */}
        <div className="overflow-y-auto max-h-[calc(90vh-72px)] px-6 pb-6">
          <PdfViewer pdfUrl={brochure} />
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
