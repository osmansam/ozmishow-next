import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  buttonLink: string;
  text: string;
};

const ButtonUnderline = ({ buttonLink, text }: Props) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const textColor = "black";
  const underlineColorBefore = "#e5e5e5";
  const underlineColorAfter = "#414141";
  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };
  return (
    <motion.div
      className="relative inline-block"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => navigate(`/${buttonLink}`)}
    >
      <button className="leading-8" style={{ color: textColor }}>
        {text}
      </button>
      <div
        className={`relative  h-px`}
        style={{ background: underlineColorBefore }}
      >
        <motion.div
          className={`relative h-full`}
          style={{
            width: isHover ? "100%" : "0%",
            transition: "width 0.4s ease-in-out, background 1s ease-in-out",
            background: isHover ? underlineColorAfter : underlineColorBefore,
          }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default ButtonUnderline;
