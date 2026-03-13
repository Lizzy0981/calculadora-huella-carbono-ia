# 🌍 Calculadora de Huella de Carbono de IA

Herramienta interactiva para calcular y analizar el impacto ambiental de modelos de inteligencia artificial en 5 dimensiones: carbono, energía, agua, residuos electrónicos y minerales críticos.

---

## 📱 Demo en Vivo

🔗 **[lizzy0981.github.io/calculadora-huella-carbono-ia/](https://lizzy0981.github.io/calculadora-huella-carbono-ia/)**

---

## ✨ Características

- 🧮 **5 dimensiones de impacto** — CO₂ (kg), Energía (kWh), Agua (L), E-Waste (kg), Minerales críticos (kg)
- 🤖 **50 modelos de IA** con datos precargados y autocomplete
- 🌍 **11 idiomas** — Español, English, Français, Português, Русский, 中文, 日本語, 한국어, العربية, עברית, Türkçe
- 📊 **Gráfica comparativa** con Chart.js — tu modelo vs referencias
- 🏆 **Rating A+/A/B/C/D/F** con contexto explicativo
- 🔄 **6 equivalencias animadas** — autos, vuelos, hogares, árboles, cargas de teléfono, costo USD
- 🌐 **APIs en tiempo real** — geolocalización automática + intensidad de carbono UK live
- 📡 **Modo Offline** — Service Worker con caché de 30 minutos
- 🌱 **Modo Eco** — pausa APIs y reduce animaciones
- 📱 **Diseño responsive** — funciona en todos los dispositivos
- 🖨️ **Exportación a PDF** — reporte completo optimizado para impresión

---

## 🤖 Modelos Incluidos (50)

### Grandes Modelos de Lenguaje (LLM)
| Empresa | Modelos |
|---------|---------|
| OpenAI | GPT-4, GPT-4o, GPT-4o mini, o1, o3-mini, GPT-3, GPT-2 |
| Anthropic | Claude 3 Opus, Claude 3.5 Sonnet, Claude Sonnet, Claude Haiku |
| Google | Gemini Ultra, Gemini Pro, Bard/Gemini, PaLM 2, Gemma 2 27B, Gemma 2B, T5-XXL |
| Meta | LLaMA 3.1 405B, LLaMA 3 70B, LLaMA 3 8B, LLaMA 3.2 3B, LLaMA 2 70B, CodeLlama 34B |
| xAI | Grok-1, Grok-2 |
| Alibaba | Qwen 2, Qwen 2.5 72B |
| Mistral AI | Mistral 7B, Mixtral 8×7B |
| DeepSeek | DeepSeek-R1 |
| TII | Falcon 180B, Falcon 40B |
| Cohere | Command R+, Command R |
| Microsoft | Phi-3 Mini, Phi-2, GitHub Copilot |
| Otros | Yi-34B, Vicuna 13B, StarCoder2 15B, Titan Text (AWS), BERT-Large |

### Generación de Imágenes
| Empresa | Modelos |
|---------|---------|
| OpenAI | DALL-E 3 |
| Stability AI | Stable Diffusion, Stable Diffusion XL |
| Black Forest Labs | FLUX.1 |
| Midjourney | Midjourney |

### Audio y Visión
| Empresa | Modelos |
|---------|---------|
| OpenAI | Whisper Large v3, CLIP ViT-L/14 |

---

## 🔬 Metodología

Las estimaciones se basan en la metodología **Díaz Familia (2026)**, con la fórmula:

```
CO₂ (kg) = GPUs × Potencia (kW) × Tiempo (h) × PUE × Factor_Emisión
Agua (L)  = Energía (kWh) × 1.8 L/kWh
```

**Fuentes de datos:** IEA 2025, Li et al. UC Riverside (2023), Patterson et al. Google (2021), Luccioni et al. (2023), Strubell et al. UMass (2019), de Vries-Gao Cell Reports Sustainability (2025), Nature Computational Science (2024).

### 🌍 Factores de Emisión Incluidos (IEA 2025)

| País/Región | kg CO₂/kWh |
|-------------|------------|
| Islandia | 0.012 |
| Francia | 0.058 |
| Noruega | 0.026 |
| Suecia | 0.045 |
| Canadá | 0.150 |
| Brasil | 0.074 |
| Rep. Dominicana | 0.276 |
| Reino Unido | 0.233 |
| Alemania | 0.350 |
| Estados Unidos | 0.386 |
| Japón | 0.471 |
| Australia | 0.550 |
| India | 0.630 |
| China | 0.700 |
| Polonia | 0.810 |

---

## 💡 Cómo usar

1. **Escribe o selecciona un modelo** — autocomplete con 50 modelos, o ingresa uno personalizado
2. **Ajusta los parámetros** — GPUs, horas de entrenamiento, país, PUE
3. **Obtén resultados** — 5 dimensiones de impacto + rating + equivalencias
4. **Compara** — gráfica y tabla con modelos de referencia
5. **Exporta** — genera un PDF con el reporte completo

---

## 💥 Datos Destacados

- **GPT-4 vs Claude Sonnet**: GPT-4 genera ~100× más CO₂ (1.8M kg vs 18K kg)
- **Variación geográfica**: entrenar en Islandia vs Polonia puede reducir emisiones hasta **90×**
- **DeepSeek-R1**: rendimiento comparable a GPT-4o con ~96% menos recursos
- **Agua**: entrenar GPT-3 requirió aproximadamente 700,000 litros de agua dulce

---

## 🛠️ Tecnologías

- **HTML5 + CSS3 + JavaScript (ES6+)** — sin frameworks, máximo rendimiento
- **Chart.js 4.4.0** — gráficas interactivas
- **Service Worker** — modo offline con caché inteligente
- **APIs externas** — ipapi.co (geolocalización) + api.carbonintensity.org.uk (intensidad carbono UK)
- **CSS custom properties** + **Grid/Flexbox** — diseño responsivo
- **i18n propio** — sistema de traducción con `data-i18n` + RTL para árabe/hebreo

---

## 🗂️ Estructura del proyecto

```
   calculadora-huella-carbono-ia/
├── index.html
├── .gitignore
├── README.md
├── LICENSE
└── assets/
    └── images/
        ├── favicon.svg
        ├── screenshot-calculadora.svg
        └── screenshot-graficos.svg
```

> La calculadora es un único archivo HTML autocontenido — sin dependencias externas críticas, sin build steps.

---

## 📄 Licencia

**CC BY 4.0** — puedes usar, compartir y adaptar este trabajo siempre que cites la fuente:

> Díaz Familia, E. (2026). *Calculadora de Huella de Carbono en Modelos de IA*. Investigación Independiente.

---

## 👩‍💻 Desarrollado por

**Elizabeth Díaz Familia**
Sustainable AI Scientist · AI Data Scientist · Sustainable Intelligence & BI

[![Portfolio](https://img.shields.io/badge/Portfolio-lizzy0981.github.io-green?style=flat)](https://lizzy0981.github.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-eli--familia-blue?style=flat&logo=linkedin)](https://linkedin.com/in/eli-familia/)
[![GitHub](https://img.shields.io/badge/GitHub-Lizzy0981-black?style=flat&logo=github)](https://github.com/Lizzy0981)
[![Twitter](https://img.shields.io/badge/Twitter-@Lizzyfamilia-1DA1F2?style=flat&logo=twitter)](https://twitter.com/Lizzyfamilia)

---

*¿Preguntas o sugerencias? Abre un issue o escribe a lizzyfamilia@gmail.com*
