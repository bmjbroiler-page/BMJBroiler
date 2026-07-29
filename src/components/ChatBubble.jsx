import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// PROMPT BARU: MODE SALES & CLOSING 🚀
const SYSTEM_PROMPT = `Kamu adalah Asisten Sales representatif dari CV. BAROQAH MAJU JAYA, distributor ayam broiler, karkas, dan fillet terbaik di Palembang.
Tujuan Utamamu: Menarik minat pelanggan, meyakinkan mereka tentang kualitas ayam, dan membuat mereka SEGERA memesan via WhatsApp.

Informasi Perusahaan:
- Operasional RPU: 05:00 WIB sampai 17:00 WIB.
- Alamat: JL Panti Sosial Rt 24 Rw 09 Kel. Kebun Bunga, Sukarami, Palembang.
- Kontak Admin Utama: 0853-7307-8847.

Gaya Bahasa: Ramah, antusias, persuasif (meyakinkan), dan singkat (maksimal 3 kalimat). Gunakan sapaan "Kak" atau "Bapak/Ibu".

Aturan Sales (WAJIB DIIKUTI):
1. Selalu tonjolkan keunggulan: "Ayam kami potong dadakan tiap subuh, dijamin segar, timbangan pas, dan higienis."
2. Jika ditanya harga: Jangan sebut nominal pasti. Jawab bahwa harga fluktuatif tapi BMJ selalu berani kasih HARGA SPESIAL/GROSIR terbaik hari ini.
3. Teknik Closing: Di setiap akhir jawaban, pancing pelanggan untuk memesan. Contoh: "Berapa kilo kebutuhannya Kak hari ini? Yuk, langsung amankan stok dan harga spesialnya via WhatsApp Admin kami di 0853-7307-8847 sebelum kehabisan!"
4. Jangan menjawab topik di luar ayam. Kalau di luar topik, arahkan kembali ke pemesanan ayam.`

export default function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: 'Halo! Selamat datang di CV Baroqah Maju Jaya. Cari ayam broiler segar atau fillet berkualitas? Kasih tau kami kebutuhannya, nanti kami kasih harga spesial hari ini!',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // FITUR BARU: Pembatas Jumlah Chat agar API tidak kena limit/bayar
  const [chatCount, setChatCount] = useState(0)
  const MAX_CHATS = 4; // Maksimal 4 kali interaksi per sesi

  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, open])

  const sendMessage = async () => {
    const q = input.trim()
    if (!q) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: q }])

    // CEK LIMIT CHAT (Biaya & Token Saver)
    if (chatCount >= MAX_CHATS) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            text: 'Biar ngobrolnya makin enak dan bisa langsung nego harga, yuk langsung lanjut via WhatsApp aja Kak di 0853-7307-8847. Admin kami udah *standby* nunggu pesanan Kakak! 🚀'
          },
        ])
      }, 500); // Jeda sedikit biar natural
      return; // Berhenti di sini, tidak nembak ke API Google lagi
    }

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: '🚨 ERROR: API Key belum dimasukkan di file .env.local.' },
      ])
      return;
    }

    setLoading(true)

    try {
      const currentChatHistory = messages.slice(1).map((msg) => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      }))

      currentChatHistory.push({
        role: 'user',
        parts: [{ text: q }],
      })

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: currentChatHistory
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Server Google menolak permintaan.');
      }

      let aiResponse = data.candidates[0].content.parts[0].text;

      // Bersihkan bintang bold markdown dari output AI biar rapi di chat
      aiResponse = aiResponse.replace(/\*\*/g, '');

      setMessages((prev) => [...prev, { role: 'model', text: aiResponse }]);

      // Tambah counter setiap kali AI berhasil balas
      setChatCount(prev => prev + 1);

    } catch (error) {
      console.error("Fetch Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: `🚨 Mohon maaf sistem sedang sibuk. Langsung chat WA Admin kami ya di 0853-7307-8847.` },
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
              <img src="/logo.png" className="w-7 h-7 object-contain bg-white rounded-lg p-0.5 shadow-sm" alt="Logo BMJ" />
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
                className={`p-3 rounded-xl max-w-[80%] shadow-sm ${m.role === 'user'
                  ? 'ml-auto bg-brand-green text-white rounded-br-none'
                  : 'mr-auto bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
              </div>
            ))}

            {loading && (
              <div className="mr-auto bg-white border border-gray-100 p-4 rounded-xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
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
              className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-green disabled:bg-gray-100"
              disabled={loading || chatCount >= MAX_CHATS}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim() || chatCount >= MAX_CHATS}
              className="bg-brand-green text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#2e1c10] flex items-center justify-center disabled:opacity-50 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}