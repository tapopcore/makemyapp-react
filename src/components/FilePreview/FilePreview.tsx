import React from "react";
import { RiCloseFill } from "react-icons/ri";

interface FilePreviewProps {
  pdf?: string;
  image?: string;
  onClick: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ pdf, image, onClick }) => {
  return (
    <div style={{ zIndex: 998 }}>
      <div
        className="modal-wrapper bg-[#00000054] backdrop-blur-md"
        style={{ zIndex: 998 }}
      ></div>

      <div
        className="bg-transparent fixed bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full"
        style={{ zIndex: 998 }}
      >
        <div className="w-[95%] lg:w-4/5 2xl:w-2/3 h-[85%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {pdf && (
            <div className="w-full h-full">
              <iframe
                src={pdf}
                width="100%"
                height="100%"
                title="PDF Viewer"
              />
              <p>
                <a href={pdf} target="_blank" rel="noopener noreferrer">
                  here
                </a>
                .
              </p>
            </div>
          )}

          {image && (
            <img
              src={image}
              className="w-full h-full"
              style={{ objectFit: "contain" }}
              alt="Preview"
            />
          )}
        </div>

        <button
          className="absolute top-5 right-5 rounded-full p-3 bg-[#cbc7c7] text-black text-xl active:scale-95 duration-150"
          style={{ zIndex: 998 }}
          onClick={onClick}
        >
          <RiCloseFill />
        </button>
      </div>
    </div>
  );
};

export default FilePreview;
