import { useState, useRef } from "react";
import Title from "./controlerChat/Title";
import RecordMessage from "./controlerChat/RecordMessage";
import axios from "axios";
import CharacterSelect from "./controlerForm/CharacterSelect";

function Controler() {
  const iaCharacters = [
    {
      name: "Walter",
      nickName: "The Wise Man",
      description:
        " Walter is an elderly gentleman, known for concise sentences.lending an ear to othleman, known for concise sentences.lending an ear to othleman, known for concise sentences.lending an ear to others.",
    },
    {
      name: "Samantha",
      nickName: "The Pretty B",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
  ];

  const [hoveredCharacter, setHoveredCharacter] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(iaCharacters[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [blob, setBlob] = useState(null);

  const chatRef = useRef(null);

  const createBlobUrl = (data) => {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  };

  const handlStop = async (blobUrl) => {
    setIsLoading(true);
    //append message recorded to [messages]
    const myMessage = { sender: "me", blobUrl: blobUrl };
    const messaagesArray = [...messages, myMessage];

    //convert blobUrl to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // construct audi to send file

        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        //send file to server
        await axios
          .post("http://localhost:8000/audio-post", formData, {
            headers: { "content-type": "audio/mpeg" },
            responseType: "arraybuffer",
          })
          .then((res) => {
            // create blob url from response
            const blob = res.data;
            const audio = new Audio();
            audio.src = createBlobUrl(blob);

            //append audio
            const iaMessage = { sender: "bob", blobUrl: audio.src };
            messaagesArray.push(iaMessage);
            setMessages(messaagesArray);

            //play audio
            setIsLoading(false);
            audio.play();
          })
          .catch((err) => {
            console.log(err.message);
            setIsLoading(false);
          });
      });
  };

  const handleCharacterHover = (character) => {
    const foundCharacter = iaCharacters.find((c) => c.name === character);
    setHoveredCharacter(foundCharacter); // Mettre à jour le personnage survolé
  };

  const handleCharacterSelect = (character) => {
    const foundCharacter = iaCharacters.find((c) => c.name === character);
    setSelectedCharacter(foundCharacter);
  };

  return (
    <div className="flex h-full gap-10 justify-center">
      {/*  left part   */}
      <div className="h-full w-4/12 bg-white rounded-xl overflow-hidden relative shadow-xl">
        <Title
          setMessages={setMessages}
          selectedCharacter={selectedCharacter}
        />
        <div
          className="flex flex-col justify-between h-full overflow-y-scroll"
          style={{ paddingBottom: "4rem" }}
          ref={chatRef}
        >
          {/* conversation */}
          <div className="mt-4 px-3 ">
            {messages.map((audio, index) => {
              return (
                <div
                  key={index + audio.sender}
                  className={
                    "flex flex-col " +
                    (audio.sender == "bob" && "flex items-end")
                  }
                >
                  {/* sender */}
                  <div className="mt-4 capitalize">
                    <p
                      className={
                        "mb-2 " +
                        (audio.sender == "bob"
                          ? "text-right mr-2 italic"
                          : "ml-2 italic")
                      }
                    >
                      {audio.sender}
                    </p>
                    <audio
                      src={audio.blobUrl}
                      className="appearance-none"
                      controls
                    />
                  </div>
                </div>
              );
            })}

            {messages.length === 0 && !isLoading && (
              <div className="text-center uppercase font-light mt-9">
                send a message
              </div>
            )}
            {isLoading && (
              <div className="text-center uppercase font-light mt-9 animate-pulse">
                loading
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-44 border-t flex items-center justify-center bg-gradient-to-r from-blue-300 to-lime-300">
          <RecordMessage handleStop={handlStop}></RecordMessage>
        </div>
      </div>

      {/*  right part  */}
      <div className="flex w-6/12 flex-col justify-center items-center relative">
        <h2 className="text-stone-900  leading-10 text-4xl ">
          Speak and listen to artificial personalities
        </h2>

        {/* ia characters selector */}
        <CharacterSelect
          iaCharacters={iaCharacters}
          handleCharacterSelect={handleCharacterSelect}
          selectedCharacter={selectedCharacter}
          handleCharacterHover={handleCharacterHover}
          setHoveredCharacter={setHoveredCharacter}
          hoveredCharacter={hoveredCharacter}
        ></CharacterSelect>
      </div>
    </div>
  );
}

export default Controler;
