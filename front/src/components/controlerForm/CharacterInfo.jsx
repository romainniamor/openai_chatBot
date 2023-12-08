import gsap from "gsap";
import { useEffect, useState, useRef } from "react";

function CharcterInfo({ iaCharacter }) {
  const characterBio = useRef(null);

  useEffect(() => {
    console.log(!iaCharacter ? "no character" : "character");
    if (iaCharacter) {
      gsap.fromTo(
        characterBio.current,
        { opacity: 0 },
        {
          duration: 1,
          opacity: 1,
          y: -20,

          ease: "sine.out",
        }
      );
    }
  }, [iaCharacter]);
  return (
    <div className="w-full h-96 p-10 flex items-start justify-center">
      {iaCharacter && (
        <p
          ref={characterBio}
          className="biography text-l px-5 text-stone-600 leading-8 text-center italic"
        >
          {iaCharacter.description}
        </p>
      )}
    </div>
  );
}

export default CharcterInfo;
