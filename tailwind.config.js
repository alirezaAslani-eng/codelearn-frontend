/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        _840px: "30px",
        xl: "45px",
      },
      screens: {
        "3xs": "450px",
        sm: "580px",
        md: "730px",
        _840px: "840px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      screens: {
        xs: "580px",
        "2xs": "480px",
        "3xs": "390px",
        _350: "350px",
        _330: "330px",
        _840: "840px", // mobile brake piont
        xx: "840px",
        _1140: "1140px",
        _1400: "1400px",
        _980: "980px",
        _730: "730px",
      },
      keyframes: {
        reaminingLine: {
          to: {
            width: "0px",
          },
        },
        rippleEffect: {
          to: {
            transform: "scale(500.0)",
            opacity: "0",
          },
        },
        initialShow: {
          from: {
            opacity: 0,
            transform: "scale(.95)",
          },
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        initialShowWithOpacity: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        initShowFromRight: {
          from: {
            opacity: 0,
            transform: "translateX(10%) scale(.95)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0) scale(1)",
          },
        },
        initShowFromLeft: {
          from: {
            opacity: 0,
            transform: "translateX(-10%) scale(.95)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0) scale(1)",
          },
        },
        noneToBlock: {
          from: {
            display: "none",
            opacity: "0",
          },
          to: {
            display: "block",
            opacity: "1",
          },
        },
        noneToFlex: {
          from: {
            display: "none",
            opacity: "0",
          },
          to: {
            display: "flex",
            opacity: "1",
          },
        },
        flexToNone: {
          from: {
            display: "flex",
            opacity: "1",
          },
          to: {
            display: "none",
            opacity: "0",
          },
        },
        blockToNone: {
          from: {
            display: "block",
            opacity: "1",
          },
          to: {
            display: "none",
            opacity: "0",
          },
        },
      },

      animation: {
        reaminingLine: "reaminingLine 4s linear forwards  ",
        riple: "rippleEffect ease forwards ",
        initialShow: "initialShow 250ms forwards",
        initShowFromRight: "initShowFromRight 500ms forwards",
        initShowFromLeft: "initShowFromLeft 500ms forwards",
        noneToBlock: "noneToBlock 200ms forwards",
        noneToFlex: "noneToFlex 200ms forwards",
        blockToNone: "blockToNone 200ms forwards",
        flexToNone: "flexToNone 200ms forwards",
        initialShowWithOpacity: "initialShowWithOpacity 200ms forwards",
      },
      fontFamily: {
        "dana-sm": "dana-sm",
        "dana-md": "dana-md",
        "dana-bold": "dana-bold",
        "peyda-md": "peyda-md",
        "peyda-bold": "peyda-bold",
      },
      colors: {
        // bg
        "primary-light": "#f1f5f9", //bg-slate-100
        "secondary-light": "#f8fafc", //bg-slate-50
        "primary-dark": "#0f172a", //bg-slate-50
        "secondary-dark": "#1e293b ", //bg-slate-50
        // text
        "light": "#f1f5f9", // slate-100
        "dark": "#1e293b", // slate-800
        // accent
        "bg-accent": "#fcd34d", //amber-300
        "text-accent": "#b45309", //amber-700
      },
    },
  },
  plugins: [],
};
// #f8fafc>>secondary=bg-slate-50     #f1f5f9>>primary=bg-slate-100    #fcd34d>>accent=amber-300
// texts -> text-dark=#1e293b-slate-800  text-light=#f1f5f9=slate-100 text-accent=#b45309-amber-700
