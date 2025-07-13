<<<<<<< HEAD
/**
 * 🌍 Calculadora de Huella de Carbono de IA
 * Autor: Elizabeth Diaz Familia
 * Email: lizzyfamilia@gmail.com
 * Versión: 1.0
 */

// ========================================
// CONFIGURACIÓN Y CONSTANTES
// ========================================

const CONFIG = {
    // Factores de conversión para equivalencias
    EQUIVALENCES: {
        CAR_EMISSIONS_PER_YEAR: 4600, // kg CO2 por auto por año
        FLIGHT_TRANSATLANTIC: 920,    // kg CO2 por vuelo Madrid-NY
        HOME_ELECTRICITY_PER_MONTH: 350, // kg CO2 por hogar por mes
        TREE_ABSORPTION_PER_YEAR: 25,    // kg CO2 por árbol por año
        GASOLINE_PER_LITER: 2.3,         // kg CO2 por litro gasolina
    },
    
    // Animaciones y timing
    ANIMATION_DURATION: 600,
    CHART_UPDATE_DELAY: 300,
    
    // Precisión de cálculos
    DECIMAL_PRECISION: 2,
    
    // Límites de validación
    VALIDATION: {
        MIN_PARAMETERS: 1,
        MAX_PARAMETERS: 10000000, // 10M parámetros máximo
        MIN_GPUS: 1,
        MAX_GPUS: 100000,
        MIN_HOURS: 0.1,
        MAX_HOURS: 10000,
        MIN_ENERGY_COST: 0.01,
        MAX_ENERGY_COST: 1.0
    }
};

// ========================================
// PRESETS DE MODELOS POPULARES
// ========================================

const MODEL_PRESETS = {
    gpt4: {
        name: "ChatGPT-4",
        params: 1700000,
        gpus: 25000,
        power: 0.7,
        hours: 2000,
        pue: 1.3,
        location: 0.4,
        description: "Modelo más grande de OpenAI"
    },
    claude: {
        name: "Claude Sonnet 4",
        params: 70000,
        gpus: 1024,
        power: 0.4,
        hours: 120,
        pue: 1.2,
        location: 0.3,
        description: "Modelo eficiente de Anthropic"
    },
    bard: {
        name: "Bard",
        params: 137000,
        gpus: 2048,
        power: 0.4,
        hours: 200,
        pue: 1.1,
        location: 0.3,
        description: "Modelo de Google con TPUs"
    },
    midjourney: {
        name: "Midjourney",
        params: 10000,
        gpus: 256,
        power: 0.3,
        hours: 150,
        pue: 1.4,
        location: 0.5,
        description: "Generador de imágenes popular"
    },
    stable: {
        name: "Stable Diffusion",
        params: 860,
        gpus: 256,
        power: 0.3,
        hours: 150,
        pue: 1.4,
        location: 0.5,
        description: "Modelo open source eficiente"
    },
    bert: {
        name: "BERT-Large",
        params: 340,
        gpus: 64,
        power: 0.3,
        hours: 96,
        pue: 1.4,
        location: 0.5,
        description: "Modelo clásico de Google"
    }
};

// ========================================
// DATOS DE REFERENCIA
// ========================================

const REFERENCE_MODELS = [
    { name: "ChatGPT-4", co2: 1820000, color: "#e74c3c" },
    { name: "Claude Sonnet", co2: 18200, color: "#9b59b6" },
    { name: "GPT-3", co2: 1713600, color: "#e67e22" },
    { name: "Bard", co2: 62335, color: "#f39c12" },
    { name: "BERT-Large", co2: 7741, color: "#3498db" },
    { name: "Midjourney", co2: 45500, color: "#27ae60" }
];

// ========================================
// CLASE PRINCIPAL DE LA CALCULADORA
// ========================================

class CarbonCalculator {
    constructor() {
        this.currentResults = null;
        this.comparisonChart = null;
        this.initializeEventListeners();
        this.loadDefaultPreset();
    }

    /**
     * Inicializa los event listeners
     */
    initializeEventListeners() {
        // Botones de preset
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const presetKey = e.target.textContent.toLowerCase().replace(/[^a-z]/g, '');
                this.loadPreset(presetKey);
            });
        });

        // Botón de cálculo
        const calculateBtn = document.querySelector('.calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateCarbon());
        }

        // Validación en tiempo real
        this.setupInputValidation();
    }

    /**
     * Configura validación de inputs en tiempo real
     */
    setupInputValidation() {
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
            input.addEventListener('blur', () => this.validateInput(input, true));
        });
    }

    /**
     * Valida un input específico
     */
    validateInput(input, showErrors = false) {
        const value = parseFloat(input.value);
        const field = input.id;
        let isValid = true;
        let errorMessage = '';

        // Validaciones específicas por campo
        switch (field) {
            case 'parameters':
                if (value < CONFIG.VALIDATION.MIN_PARAMETERS || value > CONFIG.VALIDATION.MAX_PARAMETERS) {
                    isValid = false;
                    errorMessage = `Parámetros deben estar entre ${CONFIG.VALIDATION.MIN_PARAMETERS} y ${CONFIG.VALIDATION.MAX_PARAMETERS.toLocaleString()}`;
                }
                break;
            case 'gpuCount':
                if (value < CONFIG.VALIDATION.MIN_GPUS || value > CONFIG.VALIDATION.MAX_GPUS) {
                    isValid = false;
                    errorMessage = `GPUs deben estar entre ${CONFIG.VALIDATION.MIN_GPUS} y ${CONFIG.VALIDATION.MAX_GPUS.toLocaleString()}`;
                }
                break;
            case 'trainingHours':
                if (value < CONFIG.VALIDATION.MIN_HOURS || value > CONFIG.VALIDATION.MAX_HOURS) {
                    isValid = false;
                    errorMessage = `Horas deben estar entre ${CONFIG.VALIDATION.MIN_HOURS} y ${CONFIG.VALIDATION.MAX_HOURS}`;
                }
                break;
            case 'energyCost':
                if (value < CONFIG.VALIDATION.MIN_ENERGY_COST || value > CONFIG.VALIDATION.MAX_ENERGY_COST) {
                    isValid = false;
                    errorMessage = `Costo debe estar entre $${CONFIG.VALIDATION.MIN_ENERGY_COST} y $${CONFIG.VALIDATION.MAX_ENERGY_COST}`;
                }
                break;
        }

        // Aplicar estilos de validación
        if (isValid) {
            input.style.borderColor = '#27ae60';
            this.removeErrorMessage(input);
        } else if (showErrors) {
            input.style.borderColor = '#e74c3c';
            this.showErrorMessage(input, errorMessage);
        }

        return isValid;
    }

    /**
     * Muestra mensaje de error para un input
     */
    showErrorMessage(input, message) {
        this.removeErrorMessage(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    /**
     * Remueve mensaje de error de un input
     */
    removeErrorMessage(input) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    /**
     * Carga un preset de modelo
     */
    loadPreset(presetKey) {
        const preset = MODEL_PRESETS[presetKey];
        if (!preset) {
            console.warn(`Preset ${presetKey} no encontrado`);
            return;
        }

        // Actualizar campos del formulario
        this.setFieldValue('modelName', preset.name);
        this.setFieldValue('parameters', preset.params);
        this.setFieldValue('gpuCount', preset.gpus);
        this.setFieldValue('gpuType', preset.power);
        this.setFieldValue('trainingHours', preset.hours);
        this.setFieldValue('pue', preset.pue);
        this.setFieldValue('location', preset.location);

        // Efecto visual en el botón seleccionado
        this.highlightSelectedPreset(presetKey);

        // Mostrar información del preset
        this.showPresetInfo(preset);
    }

    /**
     * Carga preset por defecto
     */
    loadDefaultPreset() {
        this.loadPreset('claude');
    }

    /**
     * Establece el valor de un campo
     */
    setFieldValue(fieldId, value) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = value;
            // Disparar evento para validación
            field.dispatchEvent(new Event('input'));
        }
    }

    /**
     * Resalta el preset seleccionado
     */
    highlightSelectedPreset(selectedKey) {
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.style.opacity = '0.7';
            btn.style.transform = 'scale(0.95)';
        });

        // Encontrar y resaltar el botón correcto
        const selectedBtn = Array.from(document.querySelectorAll('.preset-btn'))
            .find(btn => btn.textContent.toLowerCase().includes(MODEL_PRESETS[selectedKey].name.toLowerCase().split(' ')[0]));
        
        if (selectedBtn) {
            selectedBtn.style.opacity = '1';
            selectedBtn.style.transform = 'scale(1.05)';
            selectedBtn.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
        }

        // Resetear después de 2 segundos
        setTimeout(() => {
            document.querySelectorAll('.preset-btn').forEach(btn => {
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = '';
            });
        }, 2000);
    }

    /**
     * Muestra información del preset seleccionado
     */
    showPresetInfo(preset) {
        // Crear tooltip temporal
        const tooltip = document.createElement('div');
        tooltip.className = 'preset-info-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            z-index: 1000;
            font-size: 14px;
            text-align: center;
            animation: fadeInScale 0.3s ease-out;
        `;
        tooltip.innerHTML = `
            <strong>${preset.name}</strong><br>
            <small>${preset.description}</small>
        `;

        document.body.appendChild(tooltip);

        // Remover después de 2 segundos
        setTimeout(() => {
            tooltip.style.animation = 'fadeOutScale 0.3s ease-in';
            setTimeout(() => tooltip.remove(), 300);
        }, 2000);
    }

    /**
     * Función principal de cálculo
     */
    calculateCarbon() {
        try {
            // Validar todos los inputs antes de calcular
            if (!this.validateAllInputs()) {
                this.showError('Por favor corrige los errores en el formulario antes de calcular.');
                return;
            }

            // Obtener valores de entrada
            const inputs = this.getInputValues();
            
            // Realizar cálculos
            const results = this.performCalculations(inputs);
            
            // Guardar resultados
            this.currentResults = results;
            
            // Mostrar resultados con animación
            this.displayResults(results);
            
            // Actualizar gráfico comparativo
            this.updateComparisonChart(inputs.modelName, results.totalCO2);
            
            // Scroll suave a resultados
            this.scrollToResults();
            
            // Analytics (si se implementa)
            this.trackCalculation(inputs, results);

        } catch (error) {
            console.error('Error en cálculo:', error);
            this.showError('Ocurrió un error durante el cálculo. Por favor intenta nuevamente.');
        }
    }

    /**
     * Valida todos los inputs del formulario
     */
    validateAllInputs() {
        const inputs = document.querySelectorAll('input[type="number"]');
        let allValid = true;

        inputs.forEach(input => {
            if (!this.validateInput(input, true)) {
                allValid = false;
            }
        });

        return allValid;
    }

    /**
     * Obtiene todos los valores de entrada
     */
    getInputValues() {
        return {
            modelName: document.getElementById('modelName').value || 'Modelo Personalizado',
            parameters: parseFloat(document.getElementById('parameters').value),
            gpuCount: parseFloat(document.getElementById('gpuCount').value),
            gpuPower: parseFloat(document.getElementById('gpuType').value),
            trainingHours: parseFloat(document.getElementById('trainingHours').value),
            pue: parseFloat(document.getElementById('pue').value),
            carbonFactor: parseFloat(document.getElementById('location').value),
            energyCost: parseFloat(document.getElementById('energyCost').value)
        };
    }

    /**
     * Realiza todos los cálculos
     */
    performCalculations(inputs) {
        // Cálculos principales
        const totalPowerKW = inputs.gpuCount * inputs.gpuPower;
        const energyConsumption = totalPowerKW * inputs.trainingHours * inputs.pue;
        const totalCO2 = energyConsumption * inputs.carbonFactor;
        const totalCost = energyConsumption * inputs.energyCost;
        const efficiencyScore = (totalCO2 / inputs.parameters * 1000); // g CO2 por millón de parámetros

        // Equivalencias
        const equivalences = this.calculateEquivalences(totalCO2, energyConsumption, totalCost);

        return {
            totalCO2: Math.round(totalCO2),
            energyConsumption: Math.round(energyConsumption),
            totalCost: Math.round(totalCost),
            efficiencyScore: Math.round(efficiencyScore * 100) / 100,
            equivalences,
            inputs
        };
    }

    /**
     * Calcula todas las equivalencias
     */
    calculateEquivalences(totalCO2, energyConsumption, totalCost) {
        return {
            cars: (totalCO2 / CONFIG.EQUIVALENCES.CAR_EMISSIONS_PER_YEAR).toFixed(1),
            flights: (totalCO2 / CONFIG.EQUIVALENCES.FLIGHT_TRANSATLANTIC).toFixed(1),
            homes: (totalCO2 / CONFIG.EQUIVALENCES.HOME_ELECTRICITY_PER_MONTH).toFixed(1),
            trees: Math.round(totalCO2 / CONFIG.EQUIVALENCES.TREE_ABSORPTION_PER_YEAR),
            energyMWh: (energyConsumption / 1000).toFixed(1),
            costFormatted: totalCost.toLocaleString('es-ES')
        };
    }

    /**
     * Muestra los resultados con animaciones
     */
    displayResults(results) {
        // Mostrar sección de resultados
        const resultsSection = document.getElementById('results');
        resultsSection.style.display = 'block';
        resultsSection.classList.add('fade-in');

        // Actualizar métricas principales con animación de contador
        this.animateCountUp('totalCO2', results.totalCO2, 'kg');
        this.animateCountUp('energyConsumption', results.energyConsumption, 'kWh');
        this.animateCountUp('energyCostResult', results.totalCost, '$');
        this.animateCountUp('efficiencyScore', results.efficiencyScore, 'g/M');

        // Mostrar equivalencias
        setTimeout(() => {
            this.displayEquivalences(results.equivalences);
        }, CONFIG.ANIMATION_DURATION / 2);
    }

    /**
     * Anima un contador hacia arriba
     */
    animateCountUp(elementId, finalValue, suffix = '') {
        const element = document.getElementById(elementId);
        if (!element) return;

        const duration = CONFIG.ANIMATION_DURATION;
        const startValue = 0;
        const increment = finalValue / (duration / 16); // 60 FPS

        let currentValue = startValue;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }

            // Formatear número según el tipo
            let displayValue;
            if (suffix === '$') {
                displayValue = '$' + Math.round(currentValue).toLocaleString('es-ES');
            } else if (suffix === 'kg' || suffix === 'kWh') {
                displayValue = Math.round(currentValue).toLocaleString('es-ES');
            } else {
                displayValue = (Math.round(currentValue * 100) / 100).toFixed(2);
            }

            element.textContent = displayValue;
        }, 16);
    }

    /**
     * Muestra las equivalencias
     */
    displayEquivalences(equivalences) {
        const container = document.getElementById('equivalencesContainer');
        if (!container) return;

        const equivalencesData = [
            { icon: "🚗", text: `${equivalences.cars} autos conduciendo durante 1 año` },
            { icon: "✈️", text: `${equivalences.flights} vuelos Madrid-Nueva York` },
            { icon: "🏠", text: `${equivalences.homes} hogares con electricidad durante 1 mes` },
            { icon: "🌳", text: `${equivalences.trees} árboles necesarios para compensar (1 año)` },
            { icon: "⚡", text: `${equivalences.energyMWh} MWh de electricidad` },
            { icon: "💰", text: `$${equivalences.costFormatted} costo de electricidad` }
        ];

        container.innerHTML = '';
        
        equivalencesData.forEach((eq, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'equivalence-item';
                div.style.opacity = '0';
                div.style.transform = 'translateX(-20px)';
                div.innerHTML = `
                    <span class="equivalence-icon">${eq.icon}</span>
                    <span>${eq.text}</span>
                `;
                container.appendChild(div);

                // Animar entrada
                setTimeout(() => {
                    div.style.transition = 'all 0.4s ease-out';
                    div.style.opacity = '1';
                    div.style.transform = 'translateX(0)';
                }, 50);
            }, index * 100);
        });
    }

    /**
     * Actualiza el gráfico de comparación
     */
    updateComparisonChart(userModelName, userCO2) {
        // Esta función se conecta con charts.js
        if (window.chartManager && window.chartManager.updateComparisonChart) {
            window.chartManager.updateComparisonChart(userModelName, userCO2);
        }
    }

    /**
     * Scroll suave a los resultados
     */
    scrollToResults() {
        setTimeout(() => {
            const resultsSection = document.getElementById('results');
            if (resultsSection) {
                resultsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, CONFIG.ANIMATION_DURATION / 2);
    }

    /**
     * Muestra un mensaje de error
     */
    showError(message) {
        // Crear toast de error
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
        toast.innerHTML = `
            <strong>⚠️ Error</strong><br>
            <small>${message}</small>
        `;

        document.body.appendChild(toast);

        // Remover después de 4 segundos
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    /**
     * Tracking de cálculos (para analytics)
     */
    trackCalculation(inputs, results) {
        // Aquí se puede integrar Google Analytics, Mixpanel, etc.
        console.log('Cálculo realizado:', {
            modelo: inputs.modelName,
            parametros: inputs.parameters,
            emisiones: results.totalCO2,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Exporta los resultados como JSON
     */
    exportResults() {
        if (!this.currentResults) {
            this.showError('No hay resultados para exportar. Realiza un cálculo primero.');
            return;
        }

        const exportData = {
            ...this.currentResults,
            timestamp: new Date().toISOString(),
            version: '1.0',
            author: 'Elizabeth Diaz Familia'
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `carbon-footprint-${this.currentResults.inputs.modelName}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// ========================================
// UTILIDADES HELPER
// ========================================

/**
 * Utilidades generales
 */
const Utils = {
    /**
     * Formatea números con separadores de miles
     */
    formatNumber(num, decimals = 0) {
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    },

    /**
     * Debounce function para optimización
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Detecta si el usuario está en móvil
     */
    isMobile() {
        return window.innerWidth <= 768;
    },

    /**
     * Genera ID único
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// ========================================
// ANIMACIONES CSS DINÁMICAS
// ========================================

/**
 * Añade animaciones CSS dinámicamente
 */
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInScale {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes fadeOutScale {
            from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .pulse-animation {
            animation: pulse 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// INICIALIZACIÓN
// ========================================

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌍 Calculadora de Huella de Carbono de IA iniciada');
    console.log('👩‍💻 Desarrollado por Elizabeth Diaz Familia');
    
    // Añadir animaciones dinámicas
    addDynamicAnimations();
    
    // Inicializar calculadora
    window.carbonCalculator = new CarbonCalculator();
    
    // Configurar service worker para PWA (opcional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
    
    console.log('✅ Aplicación lista para usar');
});

// ========================================
// EXPORTAR PARA USO GLOBAL
// ========================================

// Hacer disponible globalmente para debugging
window.CONFIG = CONFIG;
window.MODEL_PRESETS = MODEL_PRESETS;
=======
/**
 * 🌍 Calculadora de Huella de Carbono de IA
 * Autor: Elizabeth Diaz Familia
 * Email: lizzyfamilia@gmail.com
 * Versión: 1.0
 */

// ========================================
// CONFIGURACIÓN Y CONSTANTES
// ========================================

const CONFIG = {
    // Factores de conversión para equivalencias
    EQUIVALENCES: {
        CAR_EMISSIONS_PER_YEAR: 4600, // kg CO2 por auto por año
        FLIGHT_TRANSATLANTIC: 920,    // kg CO2 por vuelo Madrid-NY
        HOME_ELECTRICITY_PER_MONTH: 350, // kg CO2 por hogar por mes
        TREE_ABSORPTION_PER_YEAR: 25,    // kg CO2 por árbol por año
        GASOLINE_PER_LITER: 2.3,         // kg CO2 por litro gasolina
    },
    
    // Animaciones y timing
    ANIMATION_DURATION: 600,
    CHART_UPDATE_DELAY: 300,
    
    // Precisión de cálculos
    DECIMAL_PRECISION: 2,
    
    // Límites de validación
    VALIDATION: {
        MIN_PARAMETERS: 1,
        MAX_PARAMETERS: 10000000, // 10M parámetros máximo
        MIN_GPUS: 1,
        MAX_GPUS: 100000,
        MIN_HOURS: 0.1,
        MAX_HOURS: 10000,
        MIN_ENERGY_COST: 0.01,
        MAX_ENERGY_COST: 1.0
    }
};

// ========================================
// PRESETS DE MODELOS POPULARES
// ========================================

const MODEL_PRESETS = {
    gpt4: {
        name: "ChatGPT-4",
        params: 1700000,
        gpus: 25000,
        power: 0.7,
        hours: 2000,
        pue: 1.3,
        location: 0.4,
        description: "Modelo más grande de OpenAI"
    },
    claude: {
        name: "Claude Sonnet 4",
        params: 70000,
        gpus: 1024,
        power: 0.4,
        hours: 120,
        pue: 1.2,
        location: 0.3,
        description: "Modelo eficiente de Anthropic"
    },
    bard: {
        name: "Bard",
        params: 137000,
        gpus: 2048,
        power: 0.4,
        hours: 200,
        pue: 1.1,
        location: 0.3,
        description: "Modelo de Google con TPUs"
    },
    midjourney: {
        name: "Midjourney",
        params: 10000,
        gpus: 256,
        power: 0.3,
        hours: 150,
        pue: 1.4,
        location: 0.5,
        description: "Generador de imágenes popular"
    },
    stable: {
        name: "Stable Diffusion",
        params: 860,
        gpus: 256,
        power: 0.3,
        hours: 150,
        pue: 1.4,
        location: 0.5,
        description: "Modelo open source eficiente"
    },
    bert: {
        name: "BERT-Large",
        params: 340,
        gpus: 64,
        power: 0.3,
        hours: 96,
        pue: 1.4,
        location: 0.5,
        description: "Modelo clásico de Google"
    }
};

// ========================================
// DATOS DE REFERENCIA
// ========================================

const REFERENCE_MODELS = [
    { name: "ChatGPT-4", co2: 1820000, color: "#e74c3c" },
    { name: "Claude Sonnet", co2: 18200, color: "#9b59b6" },
    { name: "GPT-3", co2: 1713600, color: "#e67e22" },
    { name: "Bard", co2: 62335, color: "#f39c12" },
    { name: "BERT-Large", co2: 7741, color: "#3498db" },
    { name: "Midjourney", co2: 45500, color: "#27ae60" }
];

// ========================================
// CLASE PRINCIPAL DE LA CALCULADORA
// ========================================

class CarbonCalculator {
    constructor() {
        this.currentResults = null;
        this.comparisonChart = null;
        this.initializeEventListeners();
        this.loadDefaultPreset();
    }

    /**
     * Inicializa los event listeners
     */
    initializeEventListeners() {
        // Botones de preset
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const presetKey = e.target.textContent.toLowerCase().replace(/[^a-z]/g, '');
                this.loadPreset(presetKey);
            });
        });

        // Botón de cálculo
        const calculateBtn = document.querySelector('.calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateCarbon());
        }

        // Validación en tiempo real
        this.setupInputValidation();
    }

    /**
     * Configura validación de inputs en tiempo real
     */
    setupInputValidation() {
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
            input.addEventListener('blur', () => this.validateInput(input, true));
        });
    }

    /**
     * Valida un input específico
     */
    validateInput(input, showErrors = false) {
        const value = parseFloat(input.value);
        const field = input.id;
        let isValid = true;
        let errorMessage = '';

        // Validaciones específicas por campo
        switch (field) {
            case 'parameters':
                if (value < CONFIG.VALIDATION.MIN_PARAMETERS || value > CONFIG.VALIDATION.MAX_PARAMETERS) {
                    isValid = false;
                    errorMessage = `Parámetros deben estar entre ${CONFIG.VALIDATION.MIN_PARAMETERS} y ${CONFIG.VALIDATION.MAX_PARAMETERS.toLocaleString()}`;
                }
                break;
            case 'gpuCount':
                if (value < CONFIG.VALIDATION.MIN_GPUS || value > CONFIG.VALIDATION.MAX_GPUS) {
                    isValid = false;
                    errorMessage = `GPUs deben estar entre ${CONFIG.VALIDATION.MIN_GPUS} y ${CONFIG.VALIDATION.MAX_GPUS.toLocaleString()}`;
                }
                break;
            case 'trainingHours':
                if (value < CONFIG.VALIDATION.MIN_HOURS || value > CONFIG.VALIDATION.MAX_HOURS) {
                    isValid = false;
                    errorMessage = `Horas deben estar entre ${CONFIG.VALIDATION.MIN_HOURS} y ${CONFIG.VALIDATION.MAX_HOURS}`;
                }
                break;
            case 'energyCost':
                if (value < CONFIG.VALIDATION.MIN_ENERGY_COST || value > CONFIG.VALIDATION.MAX_ENERGY_COST) {
                    isValid = false;
                    errorMessage = `Costo debe estar entre $${CONFIG.VALIDATION.MIN_ENERGY_COST} y $${CONFIG.VALIDATION.MAX_ENERGY_COST}`;
                }
                break;
        }

        // Aplicar estilos de validación
        if (isValid) {
            input.style.borderColor = '#27ae60';
            this.removeErrorMessage(input);
        } else if (showErrors) {
            input.style.borderColor = '#e74c3c';
            this.showErrorMessage(input, errorMessage);
        }

        return isValid;
    }

    /**
     * Muestra mensaje de error para un input
     */
    showErrorMessage(input, message) {
        this.removeErrorMessage(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    /**
     * Remueve mensaje de error de un input
     */
    removeErrorMessage(input) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    /**
     * Carga un preset de modelo
     */
    loadPreset(presetKey) {
        const preset = MODEL_PRESETS[presetKey];
        if (!preset) {
            console.warn(`Preset ${presetKey} no encontrado`);
            return;
        }

        // Actualizar campos del formulario
        this.setFieldValue('modelName', preset.name);
        this.setFieldValue('parameters', preset.params);
        this.setFieldValue('gpuCount', preset.gpus);
        this.setFieldValue('gpuType', preset.power);
        this.setFieldValue('trainingHours', preset.hours);
        this.setFieldValue('pue', preset.pue);
        this.setFieldValue('location', preset.location);

        // Efecto visual en el botón seleccionado
        this.highlightSelectedPreset(presetKey);

        // Mostrar información del preset
        this.showPresetInfo(preset);
    }

    /**
     * Carga preset por defecto
     */
    loadDefaultPreset() {
        this.loadPreset('claude');
    }

    /**
     * Establece el valor de un campo
     */
    setFieldValue(fieldId, value) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = value;
            // Disparar evento para validación
            field.dispatchEvent(new Event('input'));
        }
    }

    /**
     * Resalta el preset seleccionado
     */
    highlightSelectedPreset(selectedKey) {
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.style.opacity = '0.7';
            btn.style.transform = 'scale(0.95)';
        });

        // Encontrar y resaltar el botón correcto
        const selectedBtn = Array.from(document.querySelectorAll('.preset-btn'))
            .find(btn => btn.textContent.toLowerCase().includes(MODEL_PRESETS[selectedKey].name.toLowerCase().split(' ')[0]));
        
        if (selectedBtn) {
            selectedBtn.style.opacity = '1';
            selectedBtn.style.transform = 'scale(1.05)';
            selectedBtn.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
        }

        // Resetear después de 2 segundos
        setTimeout(() => {
            document.querySelectorAll('.preset-btn').forEach(btn => {
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = '';
            });
        }, 2000);
    }

    /**
     * Muestra información del preset seleccionado
     */
    showPresetInfo(preset) {
        // Crear tooltip temporal
        const tooltip = document.createElement('div');
        tooltip.className = 'preset-info-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            z-index: 1000;
            font-size: 14px;
            text-align: center;
            animation: fadeInScale 0.3s ease-out;
        `;
        tooltip.innerHTML = `
            <strong>${preset.name}</strong><br>
            <small>${preset.description}</small>
        `;

        document.body.appendChild(tooltip);

        // Remover después de 2 segundos
        setTimeout(() => {
            tooltip.style.animation = 'fadeOutScale 0.3s ease-in';
            setTimeout(() => tooltip.remove(), 300);
        }, 2000);
    }

    /**
     * Función principal de cálculo
     */
    calculateCarbon() {
        try {
            // Validar todos los inputs antes de calcular
            if (!this.validateAllInputs()) {
                this.showError('Por favor corrige los errores en el formulario antes de calcular.');
                return;
            }

            // Obtener valores de entrada
            const inputs = this.getInputValues();
            
            // Realizar cálculos
            const results = this.performCalculations(inputs);
            
            // Guardar resultados
            this.currentResults = results;
            
            // Mostrar resultados con animación
            this.displayResults(results);
            
            // Actualizar gráfico comparativo
            this.updateComparisonChart(inputs.modelName, results.totalCO2);
            
            // Scroll suave a resultados
            this.scrollToResults();
            
            // Analytics (si se implementa)
            this.trackCalculation(inputs, results);

        } catch (error) {
            console.error('Error en cálculo:', error);
            this.showError('Ocurrió un error durante el cálculo. Por favor intenta nuevamente.');
        }
    }

    /**
     * Valida todos los inputs del formulario
     */
    validateAllInputs() {
        const inputs = document.querySelectorAll('input[type="number"]');
        let allValid = true;

        inputs.forEach(input => {
            if (!this.validateInput(input, true)) {
                allValid = false;
            }
        });

        return allValid;
    }

    /**
     * Obtiene todos los valores de entrada
     */
    getInputValues() {
        return {
            modelName: document.getElementById('modelName').value || 'Modelo Personalizado',
            parameters: parseFloat(document.getElementById('parameters').value),
            gpuCount: parseFloat(document.getElementById('gpuCount').value),
            gpuPower: parseFloat(document.getElementById('gpuType').value),
            trainingHours: parseFloat(document.getElementById('trainingHours').value),
            pue: parseFloat(document.getElementById('pue').value),
            carbonFactor: parseFloat(document.getElementById('location').value),
            energyCost: parseFloat(document.getElementById('energyCost').value)
        };
    }

    /**
     * Realiza todos los cálculos
     */
    performCalculations(inputs) {
        // Cálculos principales
        const totalPowerKW = inputs.gpuCount * inputs.gpuPower;
        const energyConsumption = totalPowerKW * inputs.trainingHours * inputs.pue;
        const totalCO2 = energyConsumption * inputs.carbonFactor;
        const totalCost = energyConsumption * inputs.energyCost;
        const efficiencyScore = (totalCO2 / inputs.parameters * 1000); // g CO2 por millón de parámetros

        // Equivalencias
        const equivalences = this.calculateEquivalences(totalCO2, energyConsumption, totalCost);

        return {
            totalCO2: Math.round(totalCO2),
            energyConsumption: Math.round(energyConsumption),
            totalCost: Math.round(totalCost),
            efficiencyScore: Math.round(efficiencyScore * 100) / 100,
            equivalences,
            inputs
        };
    }

    /**
     * Calcula todas las equivalencias
     */
    calculateEquivalences(totalCO2, energyConsumption, totalCost) {
        return {
            cars: (totalCO2 / CONFIG.EQUIVALENCES.CAR_EMISSIONS_PER_YEAR).toFixed(1),
            flights: (totalCO2 / CONFIG.EQUIVALENCES.FLIGHT_TRANSATLANTIC).toFixed(1),
            homes: (totalCO2 / CONFIG.EQUIVALENCES.HOME_ELECTRICITY_PER_MONTH).toFixed(1),
            trees: Math.round(totalCO2 / CONFIG.EQUIVALENCES.TREE_ABSORPTION_PER_YEAR),
            energyMWh: (energyConsumption / 1000).toFixed(1),
            costFormatted: totalCost.toLocaleString('es-ES')
        };
    }

    /**
     * Muestra los resultados con animaciones
     */
    displayResults(results) {
        // Mostrar sección de resultados
        const resultsSection = document.getElementById('results');
        resultsSection.style.display = 'block';
        resultsSection.classList.add('fade-in');

        // Actualizar métricas principales con animación de contador
        this.animateCountUp('totalCO2', results.totalCO2, 'kg');
        this.animateCountUp('energyConsumption', results.energyConsumption, 'kWh');
        this.animateCountUp('energyCostResult', results.totalCost, '$');
        this.animateCountUp('efficiencyScore', results.efficiencyScore, 'g/M');

        // Mostrar equivalencias
        setTimeout(() => {
            this.displayEquivalences(results.equivalences);
        }, CONFIG.ANIMATION_DURATION / 2);
    }

    /**
     * Anima un contador hacia arriba
     */
    animateCountUp(elementId, finalValue, suffix = '') {
        const element = document.getElementById(elementId);
        if (!element) return;

        const duration = CONFIG.ANIMATION_DURATION;
        const startValue = 0;
        const increment = finalValue / (duration / 16); // 60 FPS

        let currentValue = startValue;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }

            // Formatear número según el tipo
            let displayValue;
            if (suffix === '$') {
                displayValue = '$' + Math.round(currentValue).toLocaleString('es-ES');
            } else if (suffix === 'kg' || suffix === 'kWh') {
                displayValue = Math.round(currentValue).toLocaleString('es-ES');
            } else {
                displayValue = (Math.round(currentValue * 100) / 100).toFixed(2);
            }

            element.textContent = displayValue;
        }, 16);
    }

    /**
     * Muestra las equivalencias
     */
    displayEquivalences(equivalences) {
        const container = document.getElementById('equivalencesContainer');
        if (!container) return;

        const equivalencesData = [
            { icon: "🚗", text: `${equivalences.cars} autos conduciendo durante 1 año` },
            { icon: "✈️", text: `${equivalences.flights} vuelos Madrid-Nueva York` },
            { icon: "🏠", text: `${equivalences.homes} hogares con electricidad durante 1 mes` },
            { icon: "🌳", text: `${equivalences.trees} árboles necesarios para compensar (1 año)` },
            { icon: "⚡", text: `${equivalences.energyMWh} MWh de electricidad` },
            { icon: "💰", text: `$${equivalences.costFormatted} costo de electricidad` }
        ];

        container.innerHTML = '';
        
        equivalencesData.forEach((eq, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'equivalence-item';
                div.style.opacity = '0';
                div.style.transform = 'translateX(-20px)';
                div.innerHTML = `
                    <span class="equivalence-icon">${eq.icon}</span>
                    <span>${eq.text}</span>
                `;
                container.appendChild(div);

                // Animar entrada
                setTimeout(() => {
                    div.style.transition = 'all 0.4s ease-out';
                    div.style.opacity = '1';
                    div.style.transform = 'translateX(0)';
                }, 50);
            }, index * 100);
        });
    }

    /**
     * Actualiza el gráfico de comparación
     */
    updateComparisonChart(userModelName, userCO2) {
        // Esta función se conecta con charts.js
        if (window.chartManager && window.chartManager.updateComparisonChart) {
            window.chartManager.updateComparisonChart(userModelName, userCO2);
        }
    }

    /**
     * Scroll suave a los resultados
     */
    scrollToResults() {
        setTimeout(() => {
            const resultsSection = document.getElementById('results');
            if (resultsSection) {
                resultsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, CONFIG.ANIMATION_DURATION / 2);
    }

    /**
     * Muestra un mensaje de error
     */
    showError(message) {
        // Crear toast de error
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
        toast.innerHTML = `
            <strong>⚠️ Error</strong><br>
            <small>${message}</small>
        `;

        document.body.appendChild(toast);

        // Remover después de 4 segundos
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    /**
     * Tracking de cálculos (para analytics)
     */
    trackCalculation(inputs, results) {
        // Aquí se puede integrar Google Analytics, Mixpanel, etc.
        console.log('Cálculo realizado:', {
            modelo: inputs.modelName,
            parametros: inputs.parameters,
            emisiones: results.totalCO2,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Exporta los resultados como JSON
     */
    exportResults() {
        if (!this.currentResults) {
            this.showError('No hay resultados para exportar. Realiza un cálculo primero.');
            return;
        }

        const exportData = {
            ...this.currentResults,
            timestamp: new Date().toISOString(),
            version: '1.0',
            author: 'Elizabeth Diaz Familia'
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `carbon-footprint-${this.currentResults.inputs.modelName}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// ========================================
// UTILIDADES HELPER
// ========================================

/**
 * Utilidades generales
 */
const Utils = {
    /**
     * Formatea números con separadores de miles
     */
    formatNumber(num, decimals = 0) {
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    },

    /**
     * Debounce function para optimización
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Detecta si el usuario está en móvil
     */
    isMobile() {
        return window.innerWidth <= 768;
    },

    /**
     * Genera ID único
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// ========================================
// ANIMACIONES CSS DINÁMICAS
// ========================================

/**
 * Añade animaciones CSS dinámicamente
 */
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInScale {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes fadeOutScale {
            from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .pulse-animation {
            animation: pulse 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// INICIALIZACIÓN
// ========================================

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌍 Calculadora de Huella de Carbono de IA iniciada');
    console.log('👩‍💻 Desarrollado por Elizabeth Diaz Familia');
    
    // Añadir animaciones dinámicas
    addDynamicAnimations();
    
    // Inicializar calculadora
    window.carbonCalculator = new CarbonCalculator();
    
    // Configurar service worker para PWA (opcional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
    
    console.log('✅ Aplicación lista para usar');
});

// ========================================
// EXPORTAR PARA USO GLOBAL
// ========================================

// Hacer disponible globalmente para debugging
window.CONFIG = CONFIG;
window.MODEL_PRESETS = MODEL_PRESETS;
>>>>>>> 89add969cbfd450c5eddc687f0406f657f414158
window.Utils = Utils;