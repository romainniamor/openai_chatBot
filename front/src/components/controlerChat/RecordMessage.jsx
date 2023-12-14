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
            className={`rounded-full p-5 shadow-md bg-white text-slate-400 transition-all duration-300 hover:shadow-lg ${
              status === "recording" ? "recording" : ""
            } `}
          >
            <RecordIcon status={status === "recording"}></RecordIcon>
          </button>
        </div>
      )}
    />
  );
}
export default RecordMessage;
