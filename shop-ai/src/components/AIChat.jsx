import { useState, useRef, useEffect } from "react";
import { askAI } from "../services/aiService";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! How can I help you today? 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await askAI(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full chat-gradient text-white shadow-2xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110 hover:shadow-indigo-400/40"
        aria-label="Toggle AI Chat"
        style={{ boxShadow: "0 8px 32px rgba(99,102,241,0.45)" }}
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-indigo-100 flex flex-col z-50 overflow-hidden"
          style={{ height: "480px", boxShadow: "0 24px 64px rgba(99,102,241,0.18)" }}
        >
          {/* Header */}
          <div className="chat-gradient px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-lg shadow-inner">
              🤖
            </div>
            <div className="flex-1">
              <p className="text-white font-display font-bold text-sm">ShopAI Assistant</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <p className="text-indigo-200 text-xs">Online • Ask me anything</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full chat-gradient flex items-center justify-center text-xs shrink-0 mb-0.5">🤖</div>
                )}
                <div
                  className={`max-w-[78%] text-sm px-3.5 py-2.5 rounded-2xl leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "chat-gradient text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-full chat-gradient flex items-center justify-center text-xs shrink-0">🤖</div>
                <div className="bg-white border border-gray-100 text-gray-500 text-sm px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center shadow-sm">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 px-4 py-3 flex gap-2 shrink-0 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your message..."
              className="flex-1 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 focus:bg-white transition-all"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="btn-primary disabled:opacity-40 text-white w-10 h-10 rounded-2xl transition-all flex items-center justify-center shadow-md shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
