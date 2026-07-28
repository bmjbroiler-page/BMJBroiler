/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0E2A5E',     // navy biru utama (header/hero/footer)
          navy2: '#163a75',    // biru sekunder untuk gradient
          green: '#3B2415',    // aksen coklat pengganti "green" (border/aksen sekunder)
          brown: '#4A2E1A',    // coklat utama
          brownlight: '#6b4527', // coklat lebih terang untuk gradient/hover
          card: '#3B2415',     // card gelap coklat (admin kontak)
          footer: '#081b3d',   // footer paling gelap (navy tua)
          gold: '#D4AF37',     // aksen emas dipertahankan
          goldhover: '#c29f31',
          bg: '#F4F5F7',       // background section terang
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0.8' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s infinite',
      },
    },
  },
  plugins: [],
}
