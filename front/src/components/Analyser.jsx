import { useState, useRef, useEffect } from "react";

import axios from "axios";

function Analyser() {
  return (
    <div className="flex h-full gap-10 justify-center">
      {/*  left part   */}
      <div className="flex w-6/12 flex-col justify-center items-center relative">
        <h2 className="text-stone-900 text-center  leading-10 text-4xl ">
          Discuss about your document with an IA
        </h2>
        <div className="cursor-pointer mt-9 gap-4 flex justify-center items-center capitalize shadow-md text-xl bg-stone-900 text-white font-medium px-8 py-3 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <span>Upload File</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
      </div>
      <div className="relative flex flex-col h-full justify-center bg-white rounded-xl w-4/5 shadow-xl overflow-hidden">
        <div className="relative flex justify-between items-center bg-stone-900 text-white font-semibold px-8 py-3 ">
          <div className="italic capitalize">Text Analyser</div>
          <form>
            <input className="" type="file" />
            <div className="px-2 py-2 cursor-pointer transition-all duration-300 hover:text-stone-900 hover:bg-white hover:rounded-full ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-5 mt-10 px-10 h-full overflow-scroll">
          <div className="flex justify-start">
            <div className="px-5 py-3 rounded-xl shadow-md max-w-md">
              Hi, I'm your personal assistant. Import your document and ask me
              something about it.
            </div>
          </div>

          <div className="flex justify-end">
            <p className="px-5 py-3 rounded-xl shadow-md max-w-md">
              What is the main topic of this document?
            </p>
          </div>
        </div>

        <div className="w-full h-min py-6 border-t flex items-center justify-center bg-gradient-to-r from-blue-300 to-lime-300">
          <form className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Your message..."
              className="w-4/5 p-4 border border-blue-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Analyser;
