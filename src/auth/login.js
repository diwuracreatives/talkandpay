
import { useState, useEffect } from "react";
import { useSpeechToText } from "../utils/speech_to_text_util";
import { TextToSpeech } from "../utils/text_to_speech_util";
import Navbar from "../pages/navbar";
import PulsingMicrophone from "../elements/microphone";
import PulsingSpeaker from "../elements/speaker";


export default function PerformLogin() {

  const [loginStep, setLoginStep] = useState(1); // Track login progress
  const [userData, setUserData] = useState({ phone: "", password: "" }); // Store user input
  const { recognizedText, isSpeaking } = useSpeechToText(); // Get speech input

  useEffect(() => {
    if (!recognizedText) return; // Ignore empty speech input

    if (loginStep === 1) {
      setUserData((prev) => ({ ...prev, phone: recognizedText })); // Save phone
      setLoginStep(2);
    } else if (loginStep === 2) {
      setUserData((prev) => ({ ...prev, password: recognizedText })); // Save password
      setLoginStep(3);
    }
  }, [recognizedText]);


  useEffect(() => {
    if (loginStep === 1) {
      TextToSpeech("Please say your phone number.");
    } else if (loginStep === 2) {
      TextToSpeech("Now, please say your password.");
    } else if (loginStep === 3) {
      TextToSpeech(`Your phone number is ${userData.phone} and your password is saved. Login complete.`);
      console.log("User Data:", userData); // Simulate sending data to backend
    }
  }, [loginStep]);



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
              <strong>Login Text:</strong> {recognizedText || "Start speaking..."}
            </p>
          </div>
        </div>
  
      </>
    );


}


