/**
 * 📊 Gestión de Gráficos - Calculadora de Huella de Carbono de IA
 * Autor: Elizabeth Diaz Familia
 * Email: lizzyfamilia@gmail.com
 * Versión: 1.0
 */

// ========================================
// CONFIGURACIÓN DE CHART.JS
// ========================================

const CHART_CONFIG = {
    // Configuración global de Chart.js
    defaults: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        size: 12
                    },
                    usePointStyle: true,
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + 
                               context.parsed.y.toLocaleString('es-ES') + ' kg CO2';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    lineWidth: 1
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    callback: function(value) {
                        if (value >= 1000000) {
                            return (value / 1000000).toFixed(1) + 'M';
                        } else if (value >= 1000) {
                            return (value / 1000).toFixed(0) + 'K';
                        }
                        return value.toLocaleString('es-ES');
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    maxRotation: 45,
                    minRotation: 0
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
        }
    },

    // Paleta de colores
    colors: {
        primary: ['#667eea', '#764ba2'],
        secondary: ['#27ae60', '#2ecc71'],
        danger: ['#e74c3c', '#c0392b'],
        warning: ['#f39c12', '#e67e22'],
        info: ['#3498db', '#2980b9'],
        success: ['#1abc9c', '#16a085'],
        purple: ['#9b59b6', '#8e44ad'],
        dark: ['#34495e', '#2c3e50'],
        gradient: [
            '#e74c3c', '#f39c12', '#f1c40f', '#27ae60', '#16a085',
            '#3498db', '#2980b9', '#9b59b6', '#8e44ad', '#34495e'
        ]
    }
};

// ========================================
// CLASE GESTORA DE GRÁFICOS
// ========================================

class ChartManager {
    constructor() {
        this.charts = {};
        this.initializeChartDefaults();
    }

    /**
     * Inicializa configuraciones por defecto de Chart.js
     */
    initializeChartDefaults() {
        if (typeof Chart !== 'undefined') {
            Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            Chart.defaults.color = '#2c3e50';
            Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.1)';
        }
    }

    /**
     * Crea el gráfico de comparación principal
     */
    createComparisonChart() {
        const ctx = document.getElementById('comparisonChart');
        if (!ctx) return null;

        // Datos iniciales de modelos de referencia
        const referenceModels = [
            { name: "ChatGPT-4", co2: 1820000, color: "#e74c3c" },
            { name: "Claude Sonnet", co2: 18200, color: "#9b59b6" },
            { name: "GPT-3", co2: 1713600, color: "#e67e22" },
            { name: "Bard", co2: 62335, color: "#f39c12" },
            { name: "BERT-Large", co2: 7741, color: "#3498db" },
            { name: "Midjourney", co2: 45500, color: "#27ae60" }
        ];

        const config = {
            type: 'bar',
            data: {
                labels: referenceModels.map(m => m.name),
                datasets: [{
                    label: 'Emisiones CO2 (kg)',
                    data: referenceModels.map(m => m.co2),
                    backgroundColor: referenceModels.map(m => m.color + '80'), // 50% opacity
                    borderColor: referenceModels.map(m => m.color),
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                ...CHART_CONFIG.defaults,
                plugins: {
                    ...CHART_CONFIG.defaults.plugins,
                    title: {
                        display: true,
                        text: 'Comparación con Modelos Populares',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: 20
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    ...CHART_CONFIG.defaults.scales,
                    y: {
                        ...CHART_CONFIG.defaults.scales.y,
                        title: {
                            display: true,
                            text: 'Emisiones CO2 (kg)',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    }
                },
                onHover: (event, activeElements) => {
                    event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
                },
                onClick: (event, activeElements) => {
                    if (activeElements.length > 0) {
                        const index = activeElements[0].index;
                        const modelName = referenceModels[index].name;
                        this.showModelDetails(modelName, referenceModels[index]);
                    }
                }
            }
        };

        this.charts.comparison = new Chart(ctx, config);
        return this.charts.comparison;
    }

    /**
     * Actualiza el gráfico de comparación con el modelo del usuario
     */
    updateComparisonChart(userModelName, userCO2) {
        if (!this.charts.comparison) {
            this.createComparisonChart();
        }

        const chart = this.charts.comparison;
        const data = chart.data;

        // Remover modelo de usuario anterior si existe
        const existingUserIndex = data.labels.findIndex(label => 
            label.includes('Tu Modelo') || label === userModelName
        );

        if (existingUserIndex !== -1) {
            data.labels.splice(existingUserIndex, 1);
            data.datasets[0].data.splice(existingUserIndex, 1);
            data.datasets[0].backgroundColor.splice(existingUserIndex, 1);
            data.datasets[0].borderColor.splice(existingUserIndex, 1);
        }

        // Añadir nuevo modelo del usuario
        data.labels.push(userModelName);
        data.datasets[0].data.push(userCO2);
        data.datasets[0].backgroundColor.push('#34495e80'); // Gris con opacidad
        data.datasets[0].borderColor.push('#34495e');

        // Ordenar por emisiones (descendente)
        const combined = data.labels.map((label, index) => ({
            label,
            data: data.datasets[0].data[index],
            backgroundColor: data.datasets[0].backgroundColor[index],
            borderColor: data.datasets[0].borderColor[index]
        }));

        combined.sort((a, b) => b.data - a.data);

        data.labels = combined.map(item => item.label);
        data.datasets[0].data = combined.map(item => item.data);
        data.datasets[0].backgroundColor = combined.map(item => item.backgroundColor);
        data.datasets[0].borderColor = combined.map(item => item.borderColor);

        // Actualizar con animación
        chart.update('active');

        // Resaltar el modelo del usuario
        setTimeout(() => {
            this.highlightUserModel(userModelName);
        }, 1000);
    }

    /**
     * Resalta el modelo del usuario en el gráfico
     */
    highlightUserModel(userModelName) {
        const chart = this.charts.comparison;
        if (!chart) return;

        const userIndex = chart.data.labels.findIndex(label => label === userModelName);
        if (userIndex === -1) return;

        // Efecto de resaltado temporal
        const originalBg = chart.data.datasets[0].backgroundColor[userIndex];
        const originalBorder = chart.data.datasets[0].borderColor[userIndex];

        chart.data.datasets[0].backgroundColor[userIndex] = '#f39c12';
        chart.data.datasets[0].borderColor[userIndex] = '#e67e22';
        chart.update('none');

        // Restaurar colores después de 3 segundos
        setTimeout(() => {
            chart.data.datasets[0].backgroundColor[userIndex] = originalBg;
            chart.data.datasets[0].borderColor[userIndex] = originalBorder;
            chart.update('none');
        }, 3000);
    }

    /**
     * Crea gráfico de distribución por categorías
     */
    createCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return null;

        const categoryData = {
            'Chatbots': 1950000, // ChatGPT-4 + Bard + otros
            'Modelos Base': 1750000, // GPT-3 + BERT + Claude
            'Generadores de Imagen': 49000, // Midjourney + Stable Diffusion
            'Herramientas Específicas': 15000 // QuillBot + otros
        };

        const config = {
            type: 'doughnut',
            data: {
                labels: Object.keys(categoryData),
                datasets: [{
                    data: Object.values(categoryData),
                    backgroundColor: [
                        '#e74c3c',
                        '#3498db', 
                        '#27ae60',
                        '#f39c12'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                ...CHART_CONFIG.defaults,
                plugins: {
                    ...CHART_CONFIG.defaults.plugins,
                    title: {
                        display: true,
                        text: 'Distribución de Emisiones por Categoría',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed.toLocaleString('es-ES')} kg CO2 (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '50%',
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500
                }
            }
        };

        this.charts.category = new Chart(ctx, config);
        return this.charts.category;
    }

    /**
     * Crea gráfico de eficiencia (parámetros vs emisiones)
     */
    createEfficiencyChart() {
        const ctx = document.getElementById('efficiencyChart');
        if (!ctx) return null;

        const modelsData = [
            { name: "ChatGPT-4", params: 1700000, co2: 1820000, efficiency: 1.07 },
            { name: "GPT-3", params: 175000, co2: 1713600, efficiency: 9.79 },
            { name: "Bard", params: 137000, co2: 62335, efficiency: 0.45 },
            { name: "Claude", params: 70000, co2: 18200, efficiency: 0.26 },
            { name: "Midjourney", params: 10000, co2: 45500, efficiency: 4.55 },
            { name: "BERT-Large", params: 340, co2: 7741, efficiency: 22.77 }
        ];

        const config = {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Eficiencia de Modelos',
                    data: modelsData.map(m => ({
                        x: m.params / 1000, // En miles de millones
                        y: m.co2 / 1000,    // En toneladas
                        modelName: m.name,
                        efficiency: m.efficiency
                    })),
                    backgroundColor: CHART_CONFIG.colors.gradient.map(color => color + '80'),
                    borderColor: CHART_CONFIG.colors.gradient,
                    borderWidth: 2,
                    pointRadius: 8,
                    pointHoverRadius: 12
                }]
            },
            options: {
                ...CHART_CONFIG.defaults,
                plugins: {
                    ...CHART_CONFIG.defaults.plugins,
                    title: {
                        display: true,
                        text: 'Eficiencia: Parámetros vs Emisiones CO2',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return context[0].raw.modelName;
                            },
                            label: function(context) {
                                const point = context.raw;
                                return [
                                    `Parámetros: ${(point.x * 1000).toLocaleString('es-ES')}M`,
                                    `Emisiones: ${(point.y * 1000).toLocaleString('es-ES')} kg CO2`,
                                    `Eficiencia: ${point.efficiency} kg CO2/M param`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Parámetros (Miles de Millones)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Emisiones CO2 (Toneladas)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        };

        this.charts.efficiency = new Chart(ctx, config);
        return this.charts.efficiency;
    }

    /**
     * Crea gráfico de línea temporal de eficiencia
     */
    createTimelineChart() {
        const ctx = document.getElementById('timelineChart');
        if (!ctx) return null;

        const timelineData = [
            { year: 2018, model: "BERT-Base", efficiency: 15.5 },
            { year: 2019, model: "GPT-2", efficiency: 12.3 },
            { year: 2020, model: "GPT-3", efficiency: 9.8 },
            { year: 2021, model: "DALL-E", efficiency: 8.2 },
            { year: 2022, model: "ChatGPT", efficiency: 6.1 },
            { year: 2023, model: "GPT-4", efficiency: 1.1 },
            { year: 2024, model: "Claude 3", efficiency: 0.3 }
        ];

        const config = {
            type: 'line',
            data: {
                labels: timelineData.map(d => d.year),
                datasets: [{
                    label: 'Eficiencia (kg CO2/M parámetros)',
                    data: timelineData.map(d => d.efficiency),
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                ...CHART_CONFIG.defaults,
                plugins: {
                    ...CHART_CONFIG.defaults.plugins,
                    title: {
                        display: true,
                        text: 'Evolución de la Eficiencia en IA (2018-2024)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                const index = context[0].dataIndex;
                                return `${timelineData[index].year} - ${timelineData[index].model}`;
                            },
                            label: function(context) {
                                return `Eficiencia: ${context.parsed.y} kg CO2/M parámetros`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Año'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Eficiencia (kg CO2/M parámetros)'
                        },
                        beginAtZero: true
                    }
                }
            }
        };

        this.charts.timeline = new Chart(ctx, config);
        return this.charts.timeline;
    }

    /**
     * Muestra detalles de un modelo específico
     */
    showModelDetails(modelName, modelData) {
        const modal = document.createElement('div');
        modal.className = 'model-details-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease-out;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            position: relative;
            animation: slideInUp 0.4s ease-out;
        `;

        const equivalences = this.calculateEquivalences(modelData.co2);

        content.innerHTML = `
            <button onclick="this.closest('.model-details-modal').remove()" 
                    style="position: absolute; top: 15px; right: 15px; border: none; 
                           background: none; font-size: 24px; cursor: pointer;">×</button>
            <h3 style="margin-bottom: 20px; color: #2c3e50;">${modelName}</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <p><strong>Emisiones CO2:</strong> ${modelData.co2.toLocaleString('es-ES')} kg</p>
                <p><strong>Equivalente a:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>🚗 ${equivalences.cars} autos durante un año</li>
                    <li>✈️ ${equivalences.flights} vuelos transatlánticos</li>
                    <li>🏠 ${equivalences.homes} hogares durante un mes</li>
                    <li>🌳 ${equivalences.trees} árboles para compensar</li>
                </ul>
            </div>
            <p style="font-size: 12px; color: #7f8c8d; text-align: center;">
                Haz clic fuera de esta ventana para cerrar
            </p>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Añadir animaciones CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideInUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Calcula equivalencias para mostrar en detalles
     */
    calculateEquivalences(co2Kg) {
        return {
            cars: (co2Kg / 4600).toFixed(1),
            flights: (co2Kg / 920).toFixed(1),
            homes: (co2Kg / 350).toFixed(1),
            trees: Math.round(co2Kg / 25)
        };
    }

    /**
     * Destruye todos los gráficos
     */
    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
    }

    /**
     * Redimensiona todos los gráficos
     */
    resizeAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }

    /**
     * Exporta un gráfico como imagen
     */
    exportChart(chartName, filename) {
        const chart = this.charts[chartName];
        if (!chart) return;

        const canvas = chart.canvas;
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = filename || `${chartName}-chart.png`;
        link.href = url;
        link.click();
    }
}

// ========================================
// FUNCIONES DE UTILIDAD PARA GRÁFICOS
// ========================================

/**
 * Utilidades específicas para gráficos
 */
const ChartUtils = {
    /**
     * Genera gradiente para Chart.js
     */
    createGradient(ctx, color1, color2) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    },

    /**
     * Formatea valores para tooltips
     */
    formatTooltipValue(value, type = 'co2') {
        switch (type) {
            case 'co2':
                return value.toLocaleString('es-ES') + ' kg CO2';
            case 'energy':
                return value.toLocaleString('es-ES') + ' kWh';
            case 'cost':
                return ' + value.toLocaleString('es-ES');
            case 'percentage':
                return value.toFixed(1) + '%';
            default:
                return value.toLocaleString('es-ES');
        }
    },

    /**
     * Obtiene color por índice
     */
    getColorByIndex(index) {
        const colors = CHART_CONFIG.colors.gradient;
        return colors[index % colors.length];
    },

    /**
     * Detecta si el dispositivo es touch
     */
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
};

// ========================================
// INICIALIZACIÓN DE GRÁFICOS
// ========================================

/**
 * Inicializa todos los gráficos cuando el DOM está listo
 */
function initializeCharts() {
    // Crear instancia global del gestor de gráficos
    window.chartManager = new ChartManager();

    // Crear gráficos iniciales si los contenedores existen
    if (document.getElementById('comparisonChart')) {
        window.chartManager.createComparisonChart();
    }

    if (document.getElementById('categoryChart')) {
        window.chartManager.createCategoryChart();
    }

    if (document.getElementById('efficiencyChart')) {
        window.chartManager.createEfficiencyChart();
    }

    if (document.getElementById('timelineChart')) {
        window.chartManager.createTimelineChart();
    }

    // Manejar redimensionamiento de ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            window.chartManager.resizeAllCharts();
        }, 250);
    });

    console.log('📊 Gráficos inicializados correctamente');
}

// ========================================
// EVENT LISTENERS
// ========================================

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCharts);
} else {
    initializeCharts();
}

// Limpiar gráficos antes de cerrar la página
window.addEventListener('beforeunload', () => {
    if (window.chartManager) {
        window.chartManager.destroyAllCharts();
    }
});

// ========================================
// EXPORTAR PARA USO GLOBAL
// ========================================

window.ChartUtils = ChartUtils;
window.CHART_CONFIG = CHART_CONFIG;