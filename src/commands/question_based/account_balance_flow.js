import { useState, useEffect } from "react";
import { useSpeechToText } from "../../utils/speech_to_text_util";
import { TextToSpeech } from "../../utils/text_to_speech_util";

import wordSearch from "../../logic/find_words";
import Navbar from "../../pages/navbar";
import PulsingMicrophone from "../../elements/microphone";
import PulsingSpeaker from "../../elements/speaker";

export default function CheckBalance() {
  const { recognizedText, isSpeaking } = useSpeechToText(); // Get speech input
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        let res = await fetch("https://api.example.com/account/balance");
        let dat = await res.json();
        let data = dat.balance;
        setBalance(data);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [recognizedText]);

  useEffect(() => {
    const processing = () => {
      if (!balance) {
        TextToSpeech("Checking your account Balance");
      }
    };

    processing();
  }, [balance]);

  return (
    <>
      <Navbar />

      <div className="content flex flex-col items-center justify-center mt-36">
        <div className="event-status-icon">
          {isSpeaking ? <PulsingMicrophone /> : <PulsingSpeaker />}
        </div>

        <div className="transcript mt-10 text-center">
          {TextToSpeech(`Your account balance is ${balance} Naira`)}
        </div>
      </div>
    </>
  );
}
