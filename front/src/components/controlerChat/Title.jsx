import { useState } from "react";
import axios from "axios";

function Title({ setMessages, selectedCharacter }) {
  const [isReset, setIsReset] = useState(false);

  //reset conversation
  const resetConversation = async () => {
    setIsReset(true);

    //call api to reset conversation empty messages
    await axios
      .get("http://localhost:8000/reset")
      .then((res) => {
        if (res.status === 200) {
          setMessages([]);
        } else {
          console.log("error backend reset conversation");
        }
      })
      .catch((err) => {
        console.log("error reset conversation", err.message);
      });

    setIsReset(false);
  };
  return (
    <div>
      <div className="flex justify-between items-center bg-stone-900 text-white font-semibold px-8 py-3 ">
        <div className="italic capitalize">
          {" "}
          {selectedCharacter ? selectedCharacter.name : "No character selected"}
        </div>
        <button
          className={
            "px-2 py-2 transition-all duration-300 hover:text-stone-900 hover:bg-white hover:rounded-full " +
            (isReset && "animate-pusle")
          }
          onClick={resetConversation}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Title;
