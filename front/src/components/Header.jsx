import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const Header = () => {
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const textRef = useRef(null);
  const linerRef = useRef(null);

  useEffect(() => {
    const title = new SplitType(titleRef.current, { types: "chars" });
    const subTitle = new SplitType(subTitleRef.current, { types: "chars" });

    const tl = gsap.timeline();
    tl.fromTo(
      subTitle.chars[0],
      {
        rotateX: "180deg",
        transformOrigin: "bottom",
      },
      {
        rotateX: 0,
        duration: 0.3,
      }
    )
      .fromTo(
        subTitle.chars[1],
        {
          x: -10,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
        }
      )
      .fromTo(
        [subTitle.chars[2], subTitle.chars[3]],
        {
          y: -50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
        }
      )
      .fromTo(
        subTitle.chars[4],
        { scale: 0 },
        {
          rotateY: "1080deg",
          scale: 1,
          duration: 0.3,
        }
      )
      .fromTo(
        subTitle.chars[5],
        {
          x: 200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "elastic.out(1,1)",
        }
      )
      .to(linerRef.current, {
        scaleX: 1,
        ease: "power3.inOut",
        transformOrigin: "bottom left",
      })
      .to(linerRef.current, {
        scaleX: 0,
        ease: "power3.inOut",
        transformOrigin: "bottom right",
      })
      .to(
        subTitle.chars[5],
        {
          rotateY: "1080deg",

          duration: 2,
          ease: "power3.out",
        },
        "-=0.1"
      );

    gsap.fromTo(
      title.chars,
      { y: -150, opacity: 0.5 },
      {
        duration: 0.3,
        opacity: 1,
        y: 0,
        stagger: 0.05,
      }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power3.in" }
    );
  }, []);

  return (
    <div className="relative text-stone-900 grow flex flex-col align-items justify-between pl-8 py-16 ">
      <div>
        {" "}
        <h1
          ref={titleRef}
          className="title font-semibold uppercase leading-tight tracking-wider  "
        >
          exploring
        </h1>
        <div className="inline-block relative w-fit ">
          <h1
            ref={subTitleRef}
            className="subtitle font-semibold tracking-wide  overflow-hidden inline-block "
          >
            openai
          </h1>

          <div
            ref={linerRef}
            className="bg-gradient-to-r from-blue-300 to-lime-300  h-4 absolute left-0 -bottom-3 w-full scale-x-0"
          ></div>
        </div>
      </div>
      <div className="flex justify-between w-full mt-8">
        <h2 ref={textRef} className=" text-4xl w-4/12">
          Creative and interactive tools
        </h2>
        <h3 className="text-2xl pr-8 ">Explore &#x2193; </h3>
      </div>
    </div>
  );
};

export default Header;
