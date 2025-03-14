import { useEffect, useState } from "react";
import { TextToSpeech } from "../utils/text_to_speech_util";
import Navbar from "./navbar";
import { useSpeechToText } from "../utils/speech_to_text_util";
import PulsingMicrophone from "../elements/microphone";
import PulsingSpeaker from "../elements/speaker";
import wordSearch from "../logic/find_words";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const greetingText =
    "Welcome to Talk and Pay, is this your first time here? Reply with Yes or No.";

  useEffect(() => {
    TextToSpeech(greetingText);
  }, []);

  const { isSpeaking, recognizedText } = useSpeechToText();

  useEffect(() => {
    if (!recognizedText) return; // Avoid running on empty text
    if (wordSearch(recognizedText, "no")) {
      navigate("/login"); // Navigate to login page
    } else {
      console.log(recognizedText);
    }
  }, [recognizedText, navigate]);

  return (
    <>
      <Navbar />
      <div className="content flex flex-col items-center justify-center mt-36">
        <div className="event-status-icon">
          {isSpeaking ? <PulsingMicrophone /> : <PulsingSpeaker />}
        </div>

        <div className="transcript mt-10 text-center">
          <p>{isSpeaking ? "Listening..." : "Waiting for Speech..."}</p>
          <p>
            <strong>Recognized Text:</strong>{" "}
            {recognizedText || "Start speaking..."}
          </p>
        </div>
      </div>
    </>
  );
}
