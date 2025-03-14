import { useState, useEffect } from "react";
import { useSpeechToText } from "../../utils/speech_to_text_util";
import { TextToSpeech } from "../../utils/text_to_speech_util";
import Navbar from "../../pages/navbar";
import PulsingMicrophone from "../../elements/microphone";
import PulsingSpeaker from "../../elements/speaker";

export default function PerformTransfer() {
  const [transferStep, settransferStep] = useState(1); // Track login progress
  const [userData, setUserData] = useState({
    bank_name: "",
    account_number: "",
    account_name: "",
    amount: "",
    passcode: "",
  }); // Store user input
  const { recognizedText, isSpeaking } = useSpeechToText(); // Get speech input

  useEffect(() => {
    if (!recognizedText) return; // Ignore empty speech input

    if (transferStep === 1) {
      setUserData((prev) => ({ ...prev, bank_name: recognizedText }));
    } else if (transferStep === 2) {
      setUserData((prev) => ({ ...prev, account_number: recognizedText }));
      //   Make a call to the backend to do the account lookup and returns the name
      let name = fetch("");
      setUserData((prev) => ({ ...prev, account_name: name }));
      settransferStep(3);
    } else if (transferStep === 3) {
      setUserData((prev) => ({ ...prev, amount: recognizedText })); // Save amount
      settransferStep(4);
    } else if (transferStep === 4) {
      setUserData((prev) => ({ ...prev, passcode: recognizedText })); // Save passcode
      settransferStep(5);
    }
  }, [recognizedText]);

  useEffect(() => {
    if (transferStep === 1) {
      TextToSpeech("Please say the bank name you're transfering to");
    } else if (transferStep === 2) {
      TextToSpeech(
        "Now, please say the account number you want to transfer to."
      );
    } else if (transferStep === 3) {
      TextToSpeech(`Performing an Account Lookup...`);
      //   After some seconds
      if (!userData.account_name) {
        TextToSpeech(
          "Account name not found, kindly say your account number again"
        );
        settransferStep(1);
      } else {
        TextToSpeech(`The Bank Account name is ${userData.account_name}`);
      }
    } else if (transferStep === 4) {
      TextToSpeech(`How much would you like to transfer?`);
    } else if (transferStep === 5) {
      TextToSpeech(`Kindly say your passcode`);
      console.log("User Data:", userData);
    } else if (transferStep === 6) {
      TextToSpeech(`Transaction successful`);
      console.log("User Data:", userData);
    }
  }, [transferStep]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Bank Account Details
            </h2>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bankName"
              >
                Bank Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                id="bankName"
                name="bankName"
                type="text"
                placeholder="Enter bank name"
                value={userData.bank_name}
                readOnly
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="accountNumber"
              >
                Account Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                id="accountNumber"
                name="accountNumber"
                type="text"
                placeholder="Enter account number"
                value={userData.account_number}
                required
                readOnly
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="accountName"
              >
                Account Name
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight"
                id="accountName"
                rows={2}
                value={userData.account_name}
                readOnly
              />
            </div>

            <div className="flex items-center justify-end">
              <div className="content flex flex-col items-center justify-center mt-36">
                <div className="event-status-icon">
                  {isSpeaking ? <PulsingMicrophone /> : <PulsingSpeaker />}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
