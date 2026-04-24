import { useEffect, useState } from "react";

type Props = {
  texts: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
};

const TypingEffect = ({
  texts,
  typingSpeed = 100,
  deleteSpeed = 60,
  delay = 2000,
}: Props) => {
  const [textIndex, setTextIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  let currentIndex = typingText.length;
  let currentText = texts[textIndex];

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const typeText = () => {
      if (isDeleting) {
        if (currentIndex > 0) {
          setTypingText((prevText) => prevText.slice(0, currentIndex - 1));
          timerId = setTimeout(typeText, deleteSpeed);
        } else {
          setIsDeleting(false);
          if (
            currentIndex === currentText.length &&
            textIndex === texts.length - 1
          ) {
            // Reached the end of the last element in the texts array
            // Restart from the beginning
            setTextIndex(0);
            timerId = setTimeout(typeText, delay);
          } else {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
            timerId = setTimeout(typeText, delay);
          }
        }
      } else {
        if (currentIndex < currentText.length) {
          setTypingText((prevText) => currentText.slice(0, currentIndex + 1));
          timerId = setTimeout(typeText, typingSpeed);
        } else {
          setIsDeleting(true);
          timerId = setTimeout(typeText, typingSpeed);
        }
      }

      currentIndex = typingText.length; // Update currentIndex based on the current state
    };

    if (!isDeleting && currentIndex === currentText.length) {
      timerId = setTimeout(typeText, delay);
    } else {
      timerId = setTimeout(typeText, isDeleting ? deleteSpeed : typingSpeed);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [
    texts,
    textIndex,
    typingSpeed,
    deleteSpeed,
    delay,
    typingText,
    isDeleting,
  ]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setIsCursorVisible((prevVisible) => !prevVisible);
    }, 500);

    return () => {
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <div className="h-fit text-center ">
      <span
        contentEditable
        suppressContentEditableWarning
        className="relative text-3xl font-mono"
      >
        {typingText}
        {/* cursor not working properly */}
        {/* <span
          className={`absolute h-8 w-1 bg-white ${
            isCursorVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: "blink 1s step-end infinite" }}
        ></span> */}
      </span>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 0 }
            50% { opacity: 1 }
          }
        `}
      </style>
    </div>
  );
};

export default TypingEffect;
