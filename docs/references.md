<<<<<<< HEAD
# 📚 Referencias Científicas y Fuentes

## 📖 Papers Académicos Fundamentales

### 🎯 Estudios Pioneros en Huella de Carbono de IA

#### 1. Strubell et al. (2019) - Energy and Policy Considerations for Deep Learning in NLP
- **DOI**: 10.18653/v1/P19-1355
- **Cita**: Strubell, E., Ganesh, A., & McCallum, A. (2019). Energy and policy considerations for deep learning in NLP. Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics, 3645-3650.
- **Contribución**: Primer estudio sistemático de emisiones de CO2 en NLP
- **Hallazgo clave**: BERT entrenamiento = 626,155 libras CO2 (5 autos durante su vida útil)
- **Disponible en**: [ACL Anthology](https://aclanthology.org/P19-1355/)

#### 2. Patterson et al. (2021) - Carbon Emissions and Large Neural Network Training
- **DOI**: arXiv:2104.10350
- **Cita**: Patterson, D., Gonzalez, J., Le, Q., Liang, C., Munguia, L. M., Rothchild, D., ... & Dean, J. (2021). Carbon emissions and large neural network training. arXiv preprint arXiv:2104.10350.
- **Contribución**: Análisis detallado de GPT-3 y factores de optimización
- **Hallazgo clave**: Ubicación del centro de datos puede variar emisiones 5-10x
- **Disponible en**: [arXiv](https://arxiv.org/abs/2104.10350)

#### 3. Luccioni et al. (2022) - Estimating the Carbon Footprint of BLOOM
- **DOI**: arXiv:2211.02001
- **Cita**: Luccioni, A. S., Viguier, S., & Ligozat, A. L. (2022). Estimating the carbon footprint of BLOOM, a 176B parameter language model. arXiv preprint arXiv:2211.02001.
- **Contribución**: Metodología detallada para modelos de 100B+ parámetros
- **Hallazgo clave**: BLOOM: 25 toneladas CO2 (energía nuclear francesa)
- **Disponible en**: [arXiv](https://arxiv.org/abs/2211.02001)

### 🔬 Estudios Metodológicos

#### 4. Henderson et al. (2020) - Systematic Reporting of Energy and Carbon Footprints
- **DOI**: 10.5555/3455716.3455856
- **Cita**: Henderson, P., Hu, J., Romoff, J., Brunskill, E., Jurafsky, D., & Pineau, J. (2020). Towards the systematic reporting of the energy and carbon footprints of machine learning. Journal of Machine Learning Research, 21(248), 1-43.
- **Contribución**: Framework estándar para reportar emisiones en ML
- **Herramientas**: Experiment-impact-tracker
- **Disponible en**: [JMLR](https://www.jmlr.org/papers/v21/20-312.html)

#### 5. Lacoste et al. (2019) - Quantifying the Carbon Emissions of Machine Learning
- **DOI**: arXiv:1910.09700
- **Cita**: Lacoste, A., Luccioni, A., Schmidt, V., & Dandres, T. (2019). Quantifying the carbon emissions of machine learning. arXiv preprint arXiv:1910.09700.
- **Contribución**: Desarrollo de CodeCarbon para tracking automático
- **Herramientas**: codecarbon package
- **Disponible en**: [arXiv](https://arxiv.org/abs/1910.09700)

### 🌍 Estudios de Impacto Ambiental

#### 6. Schwartz et al. (2020) - Green AI
- **DOI**: 10.1145/3381831
- **Cita**: Schwartz, R., Dodge, J., Smith, N. A., & Etzioni, O. (2020). Green AI. Communications of the ACM, 63(12), 54-63.
- **Contribución**: Concepto de "Green AI" vs "Red AI"
- **Propuesta**: Incluir eficiencia como métrica en papers
- **Disponible en**: [ACM](https://dl.acm.org/doi/10.1145/3381831)

#### 7. Bender et al. (2021) - On the Dangers of Stochastic Parrots
- **DOI**: 10.1145/3442188.3445922
- **Cita**: Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers of stochastic parrots: Can language models be too big? Proceedings of the 2021 ACM conference on fairness, accountability, and transparency, 610-623.
- **Contribución**: Análisis crítico del crecimiento exponencial de modelos
- **Enfoque**: Impacto ambiental y social
- **Disponible en**: [ACM](https://dl.acm.org/doi/10.1145/3442188.3445922)

## 📊 Papers de Modelos Específicos

### 🤖 Modelos de Lenguaje

#### GPT Series (OpenAI)
- **GPT-3**: Brown, T., et al. (2020). Language models are few-shot learners. NeurIPS 2020.
  - **Datos**: 175B parámetros, entrenamiento en V100s
  - **Energía**: 1,287 MWh reportados oficialmente
  - **DOI**: arXiv:2005.14165

- **GPT-4**: OpenAI (2023). GPT-4 Technical Report
  - **Datos**: Parámetros no revelados oficialmente
  - **Estimaciones**: Basadas en scaling laws
  - **DOI**: arXiv:2303.08774

#### BERT Series (Google)
- **BERT Original**: Devlin, J., et al. (2018). BERT: Pre-training of deep bidirectional transformers for language understanding. NAACL 2019.
  - **Datos**: Base (110M), Large (340M) parámetros
  - **Hardware**: TPUs, entrenamiento distribuido
  - **DOI**: arXiv:1810.04805

#### LLaMA (Meta)
- **LLaMA**: Touvron, H., et al. (2023). LLaMA: Open and Efficient Foundation Language Models
  - **Datos**: 7B, 13B, 30B, 65B parámetros
  - **Eficiencia**: Optimizado para inference
  - **DOI**: arXiv:2302.13971

#### Claude (Anthropic)
- **Constitutional AI**: Bai, Y., et al. (2022). Constitutional AI: Harmlessness from AI Feedback
  - **Metodología**: RLHF optimizado
  - **Eficiencia**: Menor consumo reportado
  - **DOI**: arXiv:2212.08073

### 🎨 Modelos de Generación de Imágenes

#### Stable Diffusion
- **Paper**: Rombach, R., et al. (2022). High-resolution image synthesis with latent diffusion models. CVPR 2022.
- **Datos**: 860M parámetros, entrenamiento en V100
- **Eficiencia**: Latent space optimization
- **DOI**: arXiv:2112.10752

#### DALL-E Series
- **DALL-E 2**: Ramesh, A., et al. (2022). Hierarchical text-conditional image generation with CLIP latents
- **Datos**: 3.5B parámetros estimados
- **Hardware**: Configuración no revelada completamente
- **DOI**: arXiv:2204.06125

## 🏢 Reportes Corporativos y Técnicos

### 🌱 Reportes de Sostenibilidad

#### Google/Alphabet
- **Environmental Report 2024**: [Google Sustainability](https://sustainability.google/)
- **Carbon Neutral since 2007**, objetivo Carbon Free 2030
- **PUE promedio**: 1.10 (mejor de la industria)
- **Inversión renovable**: 5+ GW contratados

#### Microsoft
- **Sustainability Report 2024**: [Microsoft Sustainability](https://sustainability.microsoft.com/)
- **Carbon Negative by 2030** commitment
- **Azure Carbon Benefits**: Herramientas de tracking
- **PUE promedio**: 1.125 en nuevos centros

#### OpenAI
- **AI and Compute Blog Post**: [OpenAI Blog](https://openai.com/blog/ai-and-compute/)
- **Escaling Laws**: Kaplan et al. (2020) - Scaling Laws for Neural Language Models
- **GPT-3 Energy Data**: Reportado en Patterson et al. (2021)

#### Meta/Facebook
- **Sustainability Report 2024**: [Meta Sustainability](https://sustainability.fb.com/)
- **Net Zero by 2030** commitment
- **OPT Papers**: Zhang, S., et al. (2022). OPT: Open Pre-trained Transformer Language Models

### 🔧 Especificaciones Técnicas

#### NVIDIA
- **GPU Technical Specifications**: [NVIDIA Developer](https://developer.nvidia.com/)
- **V100 Datasheet**: 300W TDP, 32GB HBM2
- **A100 Datasheet**: 400W TDP, 80GB HBM2
- **H100 Datasheet**: 700W TDP, 80GB HBM3

#### AMD
- **Instinct MI Series**: [AMD Instinct](https://www.amd.com/en/graphics/instinct-server-accelerators)
- **MI250X**: 560W TDP, 128GB HBM2e
- **Competing with NVIDIA** in AI training

## 🌍 Fuentes de Datos Energéticos

### 📊 Agencias Internacionales

#### International Energy Agency (IEA)
- **Electricity Information 2024**: [IEA Statistics](https://www.iea.org/data-and-statistics)
- **Global energy mix**, factores de emisión por país
- **Renewable Energy Statistics**: Capacidad instalada global

#### European Environment Agency (EEA)
- **European Union Emission Inventory Report 2024**
- **Factores de emisión** específicos por país europeo
- **Datos**: [EEA Greenhouse Gas Data](https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer)

### 🇺🇸 Estados Unidos

#### U.S. Energy Information Administration (EIA)
- **Electric Power Monthly**: [EIA Electricity](https://www.eia.gov/electricity/)
- **Factor promedio EE.UU.**: ~0.5 kg CO2/kWh (2024)
- **Variación regional**: 0.2-0.9 kg CO2/kWh según estado

#### Environmental Protection Agency (EPA)
- **eGRID Database**: [EPA eGRID](https://www.epa.gov/egrid)
- **Factores de emisión por región** eléctrica
- **Actualización anual** con datos verificados

### 🇪🇺 Europa

#### European Network of Transmission System Operators (ENTSO-E)
- **Transparency Platform**: [ENTSO-E Data](https://transparency.entsoe.eu/)
- **Datos en tiempo real** de generación por fuente
- **Carbon Intensity**: Tracking hora por hora

#### RTE France
- **Bilan Électrique 2024**: [RTE France](https://www.rte-france.com/)
- **Factor Francia**: 0.06 kg CO2/kWh (nuclear 70%)
- **Datos detallados** de mix energético

### 🇨🇳 China

#### China Electricity Council
- **National Electric Power Industry Statistics 2024**
- **Factor China**: ~0.7 kg CO2/kWh (carbón 60%)
- **Planes renovables**: Objetivo carbón neutralidad 2060

### 🌏 Otras Regiones

#### Australia - AEMO
- **National Electricity Market**: [AEMO](https://aemo.com.au/)
- **Factor Australia**: ~0.9 kg CO2/kWh (carbón 65%)
- **Transición renovable**: Planes 2030

#### Brasil - ONS
- **Operador Nacional do Sistema**: [ONS Brasil](http://www.ons.org.br/)
- **Factor Brasil**: ~0.4 kg CO2/kWh (hidro 65%)
- **Variación estacional**: Seco vs húmedo

## 🛠️ Herramientas y Software

### 📈 Calculadoras de Referencia

#### ML CO2 Impact
- **Sitio**: [mlco2.github.io](https://mlco2.github.io/impact/)
- **Autores**: Lacoste et al. (2019)
- **Función**: Estimación rápida de modelos ML
- **Limitaciones**: Datos estáticos, modelos limitados

#### Green Algorithms
- **Sitio**: [green-algorithms.org](https://green-algorithms.org/)
- **Autores**: Lannelongue et al. (2021)
- **Función**: Cálculo para HPC y computación científica
- **Paper**: DOI: 10.1002/advs.202100707

#### Carbon Tracker
- **GitHub**: [carbon-tracker](https://github.com/lfwa/carbontracker)
- **Función**: Monitoring en tiempo real durante entrenamiento
- **Integración**: PyTorch, TensorFlow
- **Paper**: Anthony et al. (2020)

### 📱 APIs y Servicios

#### Electricity Map API
- **Sitio**: [electricitymap.org](https://www.electricitymap.org/)
- **Función**: Carbon intensity en tiempo real
- **Cobertura**: 200+ regiones globalmente
- **Uso**: Optimización temporal de entrenamientos

#### WattTime API
- **Sitio**: [watttime.org](https://www.watttime.org/)
- **Función**: Marginal emissions data
- **Enfoque**: Optimización para máximo impacto
- **Colaboraciones**: Google, Microsoft

#### CodeCarbon
- **GitHub**: [codecarbon](https://github.com/mlco2/codecarbon)
- **Función**: Tracking automático de emisiones
- **Integración**: Python, fácil implementación
- **Output**: Reportes detallados en tiempo real

## 📈 Estudios de Casos Industriales

### 🏢 Implementaciones Empresariales

#### Google - Carbon-Intelligent Computing
- **Paper**: "Carbon-intelligent computing" (Google AI Blog, 2021)
- **Estrategia**: Shifting workloads to low-carbon times/regions
- **Resultados**: 50% reducción en carbon footprint
- **Herramientas**: Internal carbon optimization algorithms

#### Microsoft - Sustainability Calculator
- **Tool**: [Microsoft Sustainability Calculator](https://aka.ms/SustainabilityCalculator)
- **Función**: Carbon accounting for Azure workloads
- **Integración**: Azure Cost Management
- **Reporting**: Automated ESG reports

#### Hugging Face - Model Cards
- **Initiative**: Carbon emissions tracking in model cards
- **Database**: 15,000+ models with carbon data
- **Tool**: Integrated in transformers library
- **Paper**: Mitchell et al. (2019) - Model Cards for Model Reporting

## 🎓 Recursos Educativos

### 📚 Cursos y Materiales

#### MIT Course: "Environmental Impacts of Computation"
- **Instructor**: Prof. Elsa Olivetti
- **Contenido**: LCA, carbon accounting, optimization
- **Disponible**: MIT OpenCourseWare

#### Stanford CS25: "Transformers United"
- **Instructores**: Andrej Karpathy, et al.
- **Módulo**: Efficiency and environmental impact
- **Guest lectures**: Industry experts on green AI

#### Climate Change AI Summer School
- **Organización**: Climate Change AI
- **Contenido**: AI applications for climate + environmental impact
- **Materiales**: [Climate Change AI](https://www.climatechange.ai/)

### 📖 Libros y Guías

#### "Green Software Foundation Handbook"
- **Autores**: Green Software Foundation
- **Contenido**: Principios de software sostenible
- **Disponible**: [Green Software Foundation](https://greensoftware.foundation/)

#### "Sustainable AI: Environmental Implications, Challenges and Opportunities"
- **Editors**: Verdecchia et al. (2023)
- **Publisher**: Springer
- **ISBN**: 978-3-031-16314-7

## 🔗 Enlaces y Recursos Adicionales

### 🌐 Organizaciones y Comunidades

#### Climate Change AI
- **Sitio**: [climatechange.ai](https://www.climatechange.ai/)
- **Función**: Research community, conferences, workshops
- **Publicaciones**: State-of-the-art reviews

#### Green Software Foundation
- **Sitio**: [greensoftware.foundation](https://greensoftware.foundation/)
- **Miembros**: Microsoft, GitHub, Goldman Sachs, etc.
- **Estándares**: Software Carbon Intensity (SCI) specification

#### Partnership on AI - Environmental Initiative
- **Sitio**: [partnershiponai.org](https://www.partnershiponai.org/)
- **Enfoque**: Responsible AI development
- **Miembros**: OpenAI, Google, Microsoft, Meta

### 📊 Dashboards y Monitoring

#### Real-time Carbon Intensity
- **Global**: [electricitymap.org](https://www.electricitymap.org/)
- **US**: [WattTime.org](https://www.watttime.org/)
- **EU**: [electricitymap.org/zone/DE](https://www.electricitymap.org/zone/DE)

#### Cloud Provider Dashboards
- **Google**: [Cloud Carbon Footprint](https://cloud.google.com/carbon-footprint)
- **Microsoft**: [Emissions Impact Dashboard](https://aka.ms/EID)
- **AWS**: [Customer Carbon Footprint Tool](https://aws.amazon.com/aws-cost-management/aws-customer-carbon-footprint-tool/)

---

**Nota sobre Actualizaciones**: Esta lista se actualiza trimestralmente. Para las últimas referencias, consultar [GitHub Issues](https://github.com/Lizzy0981/calculadora-huella-carbono-ia/issues) del proyecto.

**Contribuciones**: ¿Conoces una referencia importante que falta? [Crear Pull Request](https://github.com/Lizzy0981/calculadora-huella-carbono-ia/pulls) o contactar via email.

**Última actualización**: 12 de enero de 2025  
=======
# 📚 Referencias Científicas y Fuentes

## 📖 Papers Académicos Fundamentales

### 🎯 Estudios Pioneros en Huella de Carbono de IA

#### 1. Strubell et al. (2019) - Energy and Policy Considerations for Deep Learning in NLP
- **DOI**: 10.18653/v1/P19-1355
- **Cita**: Strubell, E., Ganesh, A., & McCallum, A. (2019). Energy and policy considerations for deep learning in NLP. Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics, 3645-3650.
- **Contribución**: Primer estudio sistemático de emisiones de CO2 en NLP
- **Hallazgo clave**: BERT entrenamiento = 626,155 libras CO2 (5 autos durante su vida útil)
- **Disponible en**: [ACL Anthology](https://aclanthology.org/P19-1355/)

#### 2. Patterson et al. (2021) - Carbon Emissions and Large Neural Network Training
- **DOI**: arXiv:2104.10350
- **Cita**: Patterson, D., Gonzalez, J., Le, Q., Liang, C., Munguia, L. M., Rothchild, D., ... & Dean, J. (2021). Carbon emissions and large neural network training. arXiv preprint arXiv:2104.10350.
- **Contribución**: Análisis detallado de GPT-3 y factores de optimización
- **Hallazgo clave**: Ubicación del centro de datos puede variar emisiones 5-10x
- **Disponible en**: [arXiv](https://arxiv.org/abs/2104.10350)

#### 3. Luccioni et al. (2022) - Estimating the Carbon Footprint of BLOOM
- **DOI**: arXiv:2211.02001
- **Cita**: Luccioni, A. S., Viguier, S., & Ligozat, A. L. (2022). Estimating the carbon footprint of BLOOM, a 176B parameter language model. arXiv preprint arXiv:2211.02001.
- **Contribución**: Metodología detallada para modelos de 100B+ parámetros
- **Hallazgo clave**: BLOOM: 25 toneladas CO2 (energía nuclear francesa)
- **Disponible en**: [arXiv](https://arxiv.org/abs/2211.02001)

### 🔬 Estudios Metodológicos

#### 4. Henderson et al. (2020) - Systematic Reporting of Energy and Carbon Footprints
- **DOI**: 10.5555/3455716.3455856
- **Cita**: Henderson, P., Hu, J., Romoff, J., Brunskill, E., Jurafsky, D., & Pineau, J. (2020). Towards the systematic reporting of the energy and carbon footprints of machine learning. Journal of Machine Learning Research, 21(248), 1-43.
- **Contribución**: Framework estándar para reportar emisiones en ML
- **Herramientas**: Experiment-impact-tracker
- **Disponible en**: [JMLR](https://www.jmlr.org/papers/v21/20-312.html)

#### 5. Lacoste et al. (2019) - Quantifying the Carbon Emissions of Machine Learning
- **DOI**: arXiv:1910.09700
- **Cita**: Lacoste, A., Luccioni, A., Schmidt, V., & Dandres, T. (2019). Quantifying the carbon emissions of machine learning. arXiv preprint arXiv:1910.09700.
- **Contribución**: Desarrollo de CodeCarbon para tracking automático
- **Herramientas**: codecarbon package
- **Disponible en**: [arXiv](https://arxiv.org/abs/1910.09700)

### 🌍 Estudios de Impacto Ambiental

#### 6. Schwartz et al. (2020) - Green AI
- **DOI**: 10.1145/3381831
- **Cita**: Schwartz, R., Dodge, J., Smith, N. A., & Etzioni, O. (2020). Green AI. Communications of the ACM, 63(12), 54-63.
- **Contribución**: Concepto de "Green AI" vs "Red AI"
- **Propuesta**: Incluir eficiencia como métrica en papers
- **Disponible en**: [ACM](https://dl.acm.org/doi/10.1145/3381831)

#### 7. Bender et al. (2021) - On the Dangers of Stochastic Parrots
- **DOI**: 10.1145/3442188.3445922
- **Cita**: Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers of stochastic parrots: Can language models be too big? Proceedings of the 2021 ACM conference on fairness, accountability, and transparency, 610-623.
- **Contribución**: Análisis crítico del crecimiento exponencial de modelos
- **Enfoque**: Impacto ambiental y social
- **Disponible en**: [ACM](https://dl.acm.org/doi/10.1145/3442188.3445922)

## 📊 Papers de Modelos Específicos

### 🤖 Modelos de Lenguaje

#### GPT Series (OpenAI)
- **GPT-3**: Brown, T., et al. (2020). Language models are few-shot learners. NeurIPS 2020.
  - **Datos**: 175B parámetros, entrenamiento en V100s
  - **Energía**: 1,287 MWh reportados oficialmente
  - **DOI**: arXiv:2005.14165

- **GPT-4**: OpenAI (2023). GPT-4 Technical Report
  - **Datos**: Parámetros no revelados oficialmente
  - **Estimaciones**: Basadas en scaling laws
  - **DOI**: arXiv:2303.08774

#### BERT Series (Google)
- **BERT Original**: Devlin, J., et al. (2018). BERT: Pre-training of deep bidirectional transformers for language understanding. NAACL 2019.
  - **Datos**: Base (110M), Large (340M) parámetros
  - **Hardware**: TPUs, entrenamiento distribuido
  - **DOI**: arXiv:1810.04805

#### LLaMA (Meta)
- **LLaMA**: Touvron, H., et al. (2023). LLaMA: Open and Efficient Foundation Language Models
  - **Datos**: 7B, 13B, 30B, 65B parámetros
  - **Eficiencia**: Optimizado para inference
  - **DOI**: arXiv:2302.13971

#### Claude (Anthropic)
- **Constitutional AI**: Bai, Y., et al. (2022). Constitutional AI: Harmlessness from AI Feedback
  - **Metodología**: RLHF optimizado
  - **Eficiencia**: Menor consumo reportado
  - **DOI**: arXiv:2212.08073

### 🎨 Modelos de Generación de Imágenes

#### Stable Diffusion
- **Paper**: Rombach, R., et al. (2022). High-resolution image synthesis with latent diffusion models. CVPR 2022.
- **Datos**: 860M parámetros, entrenamiento en V100
- **Eficiencia**: Latent space optimization
- **DOI**: arXiv:2112.10752

#### DALL-E Series
- **DALL-E 2**: Ramesh, A., et al. (2022). Hierarchical text-conditional image generation with CLIP latents
- **Datos**: 3.5B parámetros estimados
- **Hardware**: Configuración no revelada completamente
- **DOI**: arXiv:2204.06125

## 🏢 Reportes Corporativos y Técnicos

### 🌱 Reportes de Sostenibilidad

#### Google/Alphabet
- **Environmental Report 2024**: [Google Sustainability](https://sustainability.google/)
- **Carbon Neutral since 2007**, objetivo Carbon Free 2030
- **PUE promedio**: 1.10 (mejor de la industria)
- **Inversión renovable**: 5+ GW contratados

#### Microsoft
- **Sustainability Report 2024**: [Microsoft Sustainability](https://sustainability.microsoft.com/)
- **Carbon Negative by 2030** commitment
- **Azure Carbon Benefits**: Herramientas de tracking
- **PUE promedio**: 1.125 en nuevos centros

#### OpenAI
- **AI and Compute Blog Post**: [OpenAI Blog](https://openai.com/blog/ai-and-compute/)
- **Escaling Laws**: Kaplan et al. (2020) - Scaling Laws for Neural Language Models
- **GPT-3 Energy Data**: Reportado en Patterson et al. (2021)

#### Meta/Facebook
- **Sustainability Report 2024**: [Meta Sustainability](https://sustainability.fb.com/)
- **Net Zero by 2030** commitment
- **OPT Papers**: Zhang, S., et al. (2022). OPT: Open Pre-trained Transformer Language Models

### 🔧 Especificaciones Técnicas

#### NVIDIA
- **GPU Technical Specifications**: [NVIDIA Developer](https://developer.nvidia.com/)
- **V100 Datasheet**: 300W TDP, 32GB HBM2
- **A100 Datasheet**: 400W TDP, 80GB HBM2
- **H100 Datasheet**: 700W TDP, 80GB HBM3

#### AMD
- **Instinct MI Series**: [AMD Instinct](https://www.amd.com/en/graphics/instinct-server-accelerators)
- **MI250X**: 560W TDP, 128GB HBM2e
- **Competing with NVIDIA** in AI training

## 🌍 Fuentes de Datos Energéticos

### 📊 Agencias Internacionales

#### International Energy Agency (IEA)
- **Electricity Information 2024**: [IEA Statistics](https://www.iea.org/data-and-statistics)
- **Global energy mix**, factores de emisión por país
- **Renewable Energy Statistics**: Capacidad instalada global

#### European Environment Agency (EEA)
- **European Union Emission Inventory Report 2024**
- **Factores de emisión** específicos por país europeo
- **Datos**: [EEA Greenhouse Gas Data](https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer)

### 🇺🇸 Estados Unidos

#### U.S. Energy Information Administration (EIA)
- **Electric Power Monthly**: [EIA Electricity](https://www.eia.gov/electricity/)
- **Factor promedio EE.UU.**: ~0.5 kg CO2/kWh (2024)
- **Variación regional**: 0.2-0.9 kg CO2/kWh según estado

#### Environmental Protection Agency (EPA)
- **eGRID Database**: [EPA eGRID](https://www.epa.gov/egrid)
- **Factores de emisión por región** eléctrica
- **Actualización anual** con datos verificados

### 🇪🇺 Europa

#### European Network of Transmission System Operators (ENTSO-E)
- **Transparency Platform**: [ENTSO-E Data](https://transparency.entsoe.eu/)
- **Datos en tiempo real** de generación por fuente
- **Carbon Intensity**: Tracking hora por hora

#### RTE France
- **Bilan Électrique 2024**: [RTE France](https://www.rte-france.com/)
- **Factor Francia**: 0.06 kg CO2/kWh (nuclear 70%)
- **Datos detallados** de mix energético

### 🇨🇳 China

#### China Electricity Council
- **National Electric Power Industry Statistics 2024**
- **Factor China**: ~0.7 kg CO2/kWh (carbón 60%)
- **Planes renovables**: Objetivo carbón neutralidad 2060

### 🌏 Otras Regiones

#### Australia - AEMO
- **National Electricity Market**: [AEMO](https://aemo.com.au/)
- **Factor Australia**: ~0.9 kg CO2/kWh (carbón 65%)
- **Transición renovable**: Planes 2030

#### Brasil - ONS
- **Operador Nacional do Sistema**: [ONS Brasil](http://www.ons.org.br/)
- **Factor Brasil**: ~0.4 kg CO2/kWh (hidro 65%)
- **Variación estacional**: Seco vs húmedo

## 🛠️ Herramientas y Software

### 📈 Calculadoras de Referencia

#### ML CO2 Impact
- **Sitio**: [mlco2.github.io](https://mlco2.github.io/impact/)
- **Autores**: Lacoste et al. (2019)
- **Función**: Estimación rápida de modelos ML
- **Limitaciones**: Datos estáticos, modelos limitados

#### Green Algorithms
- **Sitio**: [green-algorithms.org](https://green-algorithms.org/)
- **Autores**: Lannelongue et al. (2021)
- **Función**: Cálculo para HPC y computación científica
- **Paper**: DOI: 10.1002/advs.202100707

#### Carbon Tracker
- **GitHub**: [carbon-tracker](https://github.com/lfwa/carbontracker)
- **Función**: Monitoring en tiempo real durante entrenamiento
- **Integración**: PyTorch, TensorFlow
- **Paper**: Anthony et al. (2020)

### 📱 APIs y Servicios

#### Electricity Map API
- **Sitio**: [electricitymap.org](https://www.electricitymap.org/)
- **Función**: Carbon intensity en tiempo real
- **Cobertura**: 200+ regiones globalmente
- **Uso**: Optimización temporal de entrenamientos

#### WattTime API
- **Sitio**: [watttime.org](https://www.watttime.org/)
- **Función**: Marginal emissions data
- **Enfoque**: Optimización para máximo impacto
- **Colaboraciones**: Google, Microsoft

#### CodeCarbon
- **GitHub**: [codecarbon](https://github.com/mlco2/codecarbon)
- **Función**: Tracking automático de emisiones
- **Integración**: Python, fácil implementación
- **Output**: Reportes detallados en tiempo real

## 📈 Estudios de Casos Industriales

### 🏢 Implementaciones Empresariales

#### Google - Carbon-Intelligent Computing
- **Paper**: "Carbon-intelligent computing" (Google AI Blog, 2021)
- **Estrategia**: Shifting workloads to low-carbon times/regions
- **Resultados**: 50% reducción en carbon footprint
- **Herramientas**: Internal carbon optimization algorithms

#### Microsoft - Sustainability Calculator
- **Tool**: [Microsoft Sustainability Calculator](https://aka.ms/SustainabilityCalculator)
- **Función**: Carbon accounting for Azure workloads
- **Integración**: Azure Cost Management
- **Reporting**: Automated ESG reports

#### Hugging Face - Model Cards
- **Initiative**: Carbon emissions tracking in model cards
- **Database**: 15,000+ models with carbon data
- **Tool**: Integrated in transformers library
- **Paper**: Mitchell et al. (2019) - Model Cards for Model Reporting

## 🎓 Recursos Educativos

### 📚 Cursos y Materiales

#### MIT Course: "Environmental Impacts of Computation"
- **Instructor**: Prof. Elsa Olivetti
- **Contenido**: LCA, carbon accounting, optimization
- **Disponible**: MIT OpenCourseWare

#### Stanford CS25: "Transformers United"
- **Instructores**: Andrej Karpathy, et al.
- **Módulo**: Efficiency and environmental impact
- **Guest lectures**: Industry experts on green AI

#### Climate Change AI Summer School
- **Organización**: Climate Change AI
- **Contenido**: AI applications for climate + environmental impact
- **Materiales**: [Climate Change AI](https://www.climatechange.ai/)

### 📖 Libros y Guías

#### "Green Software Foundation Handbook"
- **Autores**: Green Software Foundation
- **Contenido**: Principios de software sostenible
- **Disponible**: [Green Software Foundation](https://greensoftware.foundation/)

#### "Sustainable AI: Environmental Implications, Challenges and Opportunities"
- **Editors**: Verdecchia et al. (2023)
- **Publisher**: Springer
- **ISBN**: 978-3-031-16314-7

## 🔗 Enlaces y Recursos Adicionales

### 🌐 Organizaciones y Comunidades

#### Climate Change AI
- **Sitio**: [climatechange.ai](https://www.climatechange.ai/)
- **Función**: Research community, conferences, workshops
- **Publicaciones**: State-of-the-art reviews

#### Green Software Foundation
- **Sitio**: [greensoftware.foundation](https://greensoftware.foundation/)
- **Miembros**: Microsoft, GitHub, Goldman Sachs, etc.
- **Estándares**: Software Carbon Intensity (SCI) specification

#### Partnership on AI - Environmental Initiative
- **Sitio**: [partnershiponai.org](https://www.partnershiponai.org/)
- **Enfoque**: Responsible AI development
- **Miembros**: OpenAI, Google, Microsoft, Meta

### 📊 Dashboards y Monitoring

#### Real-time Carbon Intensity
- **Global**: [electricitymap.org](https://www.electricitymap.org/)
- **US**: [WattTime.org](https://www.watttime.org/)
- **EU**: [electricitymap.org/zone/DE](https://www.electricitymap.org/zone/DE)

#### Cloud Provider Dashboards
- **Google**: [Cloud Carbon Footprint](https://cloud.google.com/carbon-footprint)
- **Microsoft**: [Emissions Impact Dashboard](https://aka.ms/EID)
- **AWS**: [Customer Carbon Footprint Tool](https://aws.amazon.com/aws-cost-management/aws-customer-carbon-footprint-tool/)

---

**Nota sobre Actualizaciones**: Esta lista se actualiza trimestralmente. Para las últimas referencias, consultar [GitHub Issues](https://github.com/Lizzy0981/calculadora-huella-carbono-ia/issues) del proyecto.

**Contribuciones**: ¿Conoces una referencia importante que falta? [Crear Pull Request](https://github.com/Lizzy0981/calculadora-huella-carbono-ia/pulls) o contactar via email.

**Última actualización**: 12 de enero de 2025  
>>>>>>> 89add969cbfd450c5eddc687f0406f657f414158
**Curador**: Elizabeth Diaz Familia - lizzyfamilia@gmail.com