/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,jsx}"],
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))'
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))'
      },
      accent1: 'var(--accent1-color)',
      accent2: 'var(--accent2-color)',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))'
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))'
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))'
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))'
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))'
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      chart: {
        '1': 'hsl(var(--chart-1))',
        '2': 'hsl(var(--chart-2))',
        '3': 'hsl(var(--chart-3))',
        '4': 'hsl(var(--chart-4))',
        '5': 'hsl(var(--chart-5))'
      }
    },
    transformStyle: {
      '3d': 'preserve-3d'
    },
    backfaceVisibility: {
      hidden: 'hidden'
    },
    rotate: {
      'y-180': 'rotateY(180deg)'
    },
    perspective: {
      '1000': '1000px'
    },
    boxShadow: {
      '3xl': '0 10px 20px rgba(0, 0, 0, 0.25)'
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    }
  }
},
variants: {
  extend: {
    transform: ['group-hover'],
    rotate: ['group-hover'],
  },
},
plugins: [
  function({ addUtilities }) {
    const newUtilities = {
      '.transform-style-3d': {
        'transform-style': 'preserve-3d',
      },
      '.backface-hidden': {
        'backface-visibility': 'hidden',
      },
      '.rotate-y-180': {
        'transform': 'rotateY(180deg)',
      },
      '.perspective-1000': {
        'perspective': '1000px',
      },
    }
    addUtilities(newUtilities)
  },
    require("tailwindcss-animate")
],
}
