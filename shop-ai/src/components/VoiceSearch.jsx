import { useState } from "react";

export default function VoiceSearch({ setSearch }) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    setListening(true);
    recognition.onresult = (event) => {
      setSearch(event.results[0][0].transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <button
      onClick={startListening}
      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border-2 ${
        listening
          ? "border-indigo-600 bg-indigo-600 text-white animate-pulse"
          : "border-gray-200 bg-white text-gray-500 hover:border-indigo-400 hover:text-indigo-600"
      }`}
      title={listening ? "Listening..." : "Voice Search"}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    </button>
  );
}
