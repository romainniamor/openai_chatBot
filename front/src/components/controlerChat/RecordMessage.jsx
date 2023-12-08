import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";

function RecordMessage({ handleStop }) {
  return (
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div className="mt-2">
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            className=" rounded-full p-5 shadow-md bg-white text-slate-400 hover:shadow-lg"
          >
            <RecordIcon
              status={
                status === "recording"
                  ? " h-11 w-11 text-sky-500"
                  : " text-sky-300"
              }
            ></RecordIcon>
          </button>
        </div>
      )}
    />
  );
}
export default RecordMessage;
