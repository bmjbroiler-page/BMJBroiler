import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

export default function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: 'Halo! Selamat datang di CV Baroqah Maju Jaya. Ada yang bisa kami bantu terkait pemesanan ayam broiler skala besar atau kecil?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = async () => {
    const q = input.trim()
    if (!q) return
    setInput('')
    setMessages((prev) => [...prev, { sender: 'user', text: q }])
    setLoading(true)

    try {
      // Endpoint yang sama seperti versi Laravel kamu: POST /api/ai-assistant { query }
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { sender: 'agent', text: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'agent', text: 'Maaf, terjadi gangguan koneksi ke asisten AI. Silakan coba lagi.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Buka chat AI"
        className="w-14 h-14 rounded-full bg-brand-green text-white flex items-center justify-center shadow-2xl hover:bg-[#2e1c10] transition-all focus:outline-none border-2 border-brand-gold animate-pulse-ring"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} className="animate-wiggle" />}
      </button>

      {open && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
          <div className="bg-brand-dark p-4 text-white flex items-center justify-between border-b border-brand-green">
            <div className="flex items-center gap-2">
              <img src="/logo.png" className="w-7 h-7 object-contain bg-white rounded-lg p-0.5 shadow-sm" alt="" />
              <div>
                <h4 className="font-bold text-sm">Layanan Pelanggan BMJ</h4>
                <span className="text-xs text-brand-gold">Online | Siap Membantu</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200 text-lg font-bold">
              &times;
            </button>
          </div>

          <div ref={scrollRef} className="p-4 h-80 overflow-y-auto space-y-3 bg-gray-50 flex flex-col text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-[80%] shadow-sm ${
                  m.sender === 'user'
                    ? 'ml-auto bg-brand-green text-white'
                    : 'mr-auto bg-white text-gray-800 border border-gray-100'
                }`}
              >
                <p>{m.text}</p>
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-white text-gray-400 border border-gray-100 p-3 rounded-xl text-xs">
                Mengetik...
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ketik pertanyaan..."
              className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-green"
            />
            <button
              onClick={sendMessage}
              className="bg-brand-green text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#2e1c10] flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
