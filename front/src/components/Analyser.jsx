import { useState, useRef, useEffect, onChange } from "react";

import axios from "axios";

function Analyser() {
  const [fileInfo, setFileInfo] = useState(null); //file info for upload input
  const [isUploaded, setIsUploaded] = useState(false); //file is uploaded or not

  //upload file to server
  const handleFileUpload = async (e) => {
    console.log("handleFileUpload");
    const file = e.target.files[0]; // Récupération du fichier sélectionné
    if (file) {
      setFileInfo({
        fileName: file.name,
      });
    }

    const formData = new FormData();
    formData.append("file", file); // Ajout du fichier à formData
    console.log("formData", formData.get("file"));

    await axios
      .post("http://localhost:8000/upload-pdf", formData)
      .then((res) => {
        const fileData = res.data;
        console.log(fileData);
        setIsUploaded(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [userMessage, setUserMessage] = useState(""); // stock user message
  const [messages, setMessages] = useState([]); // stock all messages

  const handleChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_request", userMessage);
    console.log("formData", formData.get("user_request"));
    setUserMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/get-request",
        formData
      );
      console.log("response", response.data);

      setMessages([...messages, response.data]);

      // Réinitialiser l'input après l'envoi
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-full gap-10 justify-center">
      {/*  left part   */}
      <div className="flex w-6/12 flex-col justify-center items-center relative">
        <h2 className="text-stone-900 text-center  leading-10 text-4xl ">
          Discuss about your document with an IA
        </h2>
        <input
          id="fileInput"
          className="hidden"
          name="pdfFile"
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer mt-9 gap-4 flex justify-center items-center capitalize shadow-md text-xl bg-stone-900 text-white font-medium px-8 py-3 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <span>Upload File</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </label>
        {fileInfo && <p>{fileInfo.fileName}</p>}
      </div>
      <div className="relative flex flex-col h-full justify-center bg-white rounded-xl w-4/5 shadow-xl overflow-hidden">
        <div className="flex justify-between items-center bg-stone-900 text-white font-semibold px-8 py-3 ">
          <div className="italic capitalize">Analiza</div>
          <button className="px-2 py-2 transition-all duration-300 hover:text-stone-900 hover:bg-white hover:rounded-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
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

        <div className="flex flex-col gap-5 mt-10 px-10 h-full overflow-scroll">
          <div className="flex justify-end">
            <p className="px-5 py-3 rounded-xl shadow-md max-w-md">
              Hi there, i'm Analysa your personal assistant and a very fast
              reader, upload a pdf doc and let see what i can do for you!
            </p>
          </div>
          {isUploaded && (
            <div className="flex justify-end">
              <p className="px-5 py-3 rounded-xl shadow-md max-w-md">
                Nice, your doc is now uploaded, ask me something about it.
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index}>
              {/* Message de l'utilisateur */}
              <div className="flex justify-start">
                <p className="px-5 py-3 rounded-xl shadow-md max-w-md">
                  {message.user}
                </p>
              </div>

              {/* Réponse de l'IA */}
              <div className="flex justify-end">
                <p className="px-5 py-3 rounded-xl shadow-md max-w-md">
                  {message.bot}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-min py-6 border-t flex items-center justify-center bg-gradient-to-r from-blue-300 to-lime-300">
          <form
            onSubmit={handleSubmitRequest}
            className="w-full flex justify-center"
          >
            <input
              // disabled={!isUploaded}
              type="text"
              placeholder="Your message..."
              name="user_request" // This should match the key in your state
              value={userMessage || ""} // Bind the input value to the state
              onChange={handleChange}
              className="w-4/5 p-4 border border-blue-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Analyser;
