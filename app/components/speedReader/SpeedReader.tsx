import "pdfjs-dist/build/pdf.worker.entry";
import React, { useEffect, useRef, useState } from "react";
const SpeedReader = () => {
  const [text, setText] = useState("Hello world!");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressHandleRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const togglePlay = () => {
    if (currentIndex >= words.length - 1) {
      setCurrentIndex(0);
      setProgress(0);
    }
    setIsPlaying((prevState) => !prevState);
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };
  const handleTextareaPDFDrop = async (
    e: React.DragEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        // ... (rest of the code to extract PDF text)
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDivPDFDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        // ... (rest of the code to extract PDF text)
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || e.buttons !== 1 || !progressBarRef.current)
      return;

    const progressBarWidth = progressBarRef.current.offsetWidth;
    const clickX =
      e.clientX - progressBarRef.current.getBoundingClientRect().left;
    const newProgress = (clickX / progressBarWidth) * 100;

    if (newProgress >= 0 && newProgress <= 100) {
      setProgress(newProgress);
      setCurrentIndex(Math.floor((newProgress / 100) * words.length));
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;

    const progressBarWidth = progressBarRef.current.offsetWidth;
    const clickX =
      e.clientX - progressBarRef.current.getBoundingClientRect().left;
    const newProgress = (clickX / progressBarWidth) * 100;

    if (newProgress >= 0 && newProgress <= 100) {
      setProgress(newProgress);
      setCurrentIndex(Math.floor((newProgress / 100) * words.length));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        if (currentIndex === words.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
        } else {
          setProgress(
            (prevProgress) => (prevProgress + 100 / words.length) % 100
          );
        }
      }, (60 / 300) * 1000); // 300 WPM = 200 ms per word

      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying, currentIndex, words.length]);

  useEffect(() => {
    if (progressHandleRef.current) {
      progressHandleRef.current.style.left = `${progress}%`;
    }
  }, [progress]);

  return (
    <div className="flex flex-col gap-4 items-center p-4 py-10 md:py-20 w-full ">
      {/* text area */}
      {!isPlaying && (
        <div
          className="w-1/2 h-80 p-4 border border-gray-300 rounded-md"
          onDrop={handleDivPDFDrop} // Attach the event to the div
          onDragOver={(e) => e.preventDefault()}
        >
          <textarea
            className="w-full h-full p-2 bg-gray-100 border border-gray-300 rounded-md"
            value={text}
            onDrop={handleTextareaPDFDrop} // Attach the event to the textarea
            onChange={(e) => {
              setText(e.target.value);
              setCurrentIndex(0);
              setProgress(0);
            }}
          />
        </div>
      )}
      {/* show area */}
      {isPlaying && (
        <div className="flex flex-col w-1/2 h-80 justify-center items-center border-2 rounded-md p-4 ">
          <p className="text-center font-semibold text-lg">
            {words[currentIndex]}
          </p>
        </div>
      )}
      <div className="flex flex-row gap-4 w-full justify-center ">
        {/* buttons */}
        <div className="flex flex-row  gap-4">
          <button
            className="py-1 px-3 bg-blue-500 text-white rounded-md"
            onClick={() => {
              setCurrentIndex(0);
              setProgress(0);
              setIsPlaying(false);
            }}
          >
            {"|<"}
          </button>
          <button
            className="py-1 px-3 bg-blue-500 text-white rounded-md"
            onClick={togglePlay}
          >
            {isPlaying ? "||" : ">"}
          </button>
        </div>
        {/* progress  */}
        <div
          className="w-full max-w-md border border-gray-300 rounded-md p-4"
          // style={{ width: "" }}
        >
          <div
            className="progress-bar cursor-pointer relative border-2 border-gray-300  bg-slate-300"
            ref={progressBarRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onClick={handleProgressBarClick}
          >
            <div
              className="played-progress h-2 bg-green-500 "
              style={{ width: `${progress}%` }}
            />

            <div
              className="progress-handle h-4 w-4 bg-blue-500 rounded-full cursor-pointer absolute top-1/2 -translate-y-1/2"
              ref={progressHandleRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedReader;
