export const LANGUAGES = {
  en: {
    onboarding: {
      slides: [
        { title: "Hello! Welcome to the best movies.", description: "Start exploring immediately." },
        { title: "If you want to record and discover your favorite movies", description: "Find movies, series and more." },
        { title: "Your taste, our recommendations!", description: "The more you use, the better we get to know you." },
        { title: "Ready to dive into the movie world?", description: "Find, watch, and share your favorite films anytime, anywhere." }
      ],
      skip: "Skip"
    },
    common: {
      appName: "Speedometer"
    }
  },

  tr: {
    onboarding: {
      slides: [
        { title: "Merhaba! En iyi filmlere hoş geldin.", description: "Hemen keşfetmeye başla." },
        { title: "Favori filmlerini kaydetmek ve keşfetmek istersen", description: "Film, dizi ve daha fazlasını bul." },
        { title: "Senin zevkin, bizim önerilerimiz!", description: "Kullandıkça seni daha iyi tanırız." },
        { title: "Film dünyasına dalmaya hazır mısın?", description: "İstediğin zaman, istediğin yerde keşfet ve paylaş." }
      ],
      skip: "Geç"
    },
    common: {
      appName: "Speedometer"
    }
  },

  es: {
    onboarding: {
      slides: [
        { title: "¡Hola! Bienvenido a las mejores películas.", description: "Empieza a explorar de inmediato." },
        { title: "Si quieres guardar y descubrir tus películas favoritas", description: "Encuentra películas, series y más." },
        { title: "¡Tus gustos, nuestras recomendaciones!", description: "Cuanto más uses la app, mejor te conoceremos." },
        { title: "¿Listo para sumergirte en el mundo del cine?", description: "Encuentra, mira y comparte tus películas favoritas en cualquier momento y lugar." }
      ],
      skip: "Saltar"
    },
    common: {
      appName: "Speedometer"
    }
  }
} as const;

export type SupportedLang = keyof typeof LANGUAGES;
export const NAMESPACES = ['common', 'onboarding'] as const; 
