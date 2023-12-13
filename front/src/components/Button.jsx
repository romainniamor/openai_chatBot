import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Button = ({ title }) => {
  const [hovered, setHovered] = useState(false);
  const buttonArrowRef = useRef(false);
  const buttonTitleRef = useRef(null);

  useEffect(() => {
    gsap.set([buttonArrowRef.current, buttonTitleRef.current], {});
  }, []);

  const startAnimation = () => {
    gsap.to(buttonArrowRef.current, {
      duration: 1,
      scale: 1,
      ease: "power3.inOut",
      x: "1rem",
    });

    gsap.to(buttonTitleRef.current, {
      duration: 0.5,
      x: "-1rem",
    });
  };
  const endAnimation = () => {
    gsap.to(buttonArrowRef.current, {
      duration: 0.8,
      scale: 0,
      ease: "power3.inOut",
    });

    gsap.to(buttonTitleRef.current, {
      duration: 1,
      x: 0,
    });
  };

  return (
    <a
      href="https://openai.com/"
      target="_blank"
      className="px-8 py-2 bg-stone-900 rounded-3xl text-white flex items-center w-min cursor-pointer"
      onMouseEnter={() => {
        setHovered(true);
        startAnimation();
      }}
      onMouseLeave={() => {
        setHovered(false);
        endAnimation();
      }}
    >
      <div className="" ref={buttonTitleRef}>
        {title}{" "}
      </div>
      <div
        ref={buttonArrowRef}
        className="bg-gradient-to-r from-blue-300 to-yellow-300 -ml-6  scale-0 text-stone-900 rounded-full px-2 py-1"
      >
        &#8594;
      </div>
    </a>
  );
};

export default Button;
