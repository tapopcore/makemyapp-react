import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { isMobile } from "react-device-detect";
import "./PdfViewer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState<number>(isMobile ? 1 : 1.5);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  // Handle document loading
  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
  };

  // Update width on window resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setContainerWidth(width);

      if (width < 640) {
        setScale(0.8);
      } else if (width < 1024) {
        setScale(1.0);
      } else if (width < 1280) {
        setScale(1.2);
      } else {
        setScale(1.5);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="pdf-viewer-wrapper w-full">
      {pdfUrl !== "" && (
        <div className="pdf-content w-full flex justify-center mt-4">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="w-full"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={`page_${index + 1}`}
                className="mb-6 flex justify-center w-full"
              >
                <Page
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={scale}
                  width={isMobile ? undefined : containerWidth ? containerWidth * 0.9 : undefined}
                  className="shadow-xl"
                />
              </div>
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
