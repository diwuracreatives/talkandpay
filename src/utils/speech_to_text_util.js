import { useState } from "react";
import { useMicVAD } from "@ricky0123/vad-react";

export const useSpeechToText = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);
  let silenceTimeout = null; // Track silence duration

  // Initialize SpeechRecognition
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const newTranscript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join(" ");

    setRecognizedText(newTranscript); // Only store the latest speech
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setIsRecognitionActive(false);
  };

  recognition.onend = () => {
    console.log("STT stopped.");
    setIsSpeaking(false);
    setIsRecognitionActive(false);
  };

  // Voice Activity Detection (VAD)
  useMicVAD({
    onSpeechStart: () => {
      if (!isRecognitionActive) {
        console.log("User started speaking...");
        setIsSpeaking(true);
        setIsRecognitionActive(true);
        recognition.start();
        if (silenceTimeout) clearTimeout(silenceTimeout); // Reset silence timer if user speaks again
      }
    },
    onSpeechEnd: () => {
      console.log("User stopped speaking. Checking for silence...");

      setIsSpeaking(false);
      
      silenceTimeout = setTimeout(() => {
        if (!isSpeaking) {
          console.log("30 seconds of silence detected. Clearing text.");
          setRecognizedText(""); // Clear text after 30 seconds
          recognition.stop();
        }
      }, 5000); // Wait 30 seconds before clearing text
    },
  });

  return { isSpeaking, recognizedText };
};
