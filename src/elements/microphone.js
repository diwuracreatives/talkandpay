

import { MicrophoneIcon } from "@heroicons/react/24/solid";

export default function PulsingMicrophone() {
  return (
    <div className="flex items-center justify-center bg-gray-200">
      <div className="relative">
        {/* Pulsing Ring */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-36 h-36 rounded-full bg-[#D9D9D9] opacity-75 animate-ping"></span>
        </span>

        {/* Microphone Icon */}
        <button className="relative flex items-center justify-center w-36 h-36 bg-white border border-[#D9D9D9] text-white rounded-full shadow-sm">
          <MicrophoneIcon className="w-20 h-20 text-[#212121]" />
        </button>
      </div>
    </div>
  );
}
