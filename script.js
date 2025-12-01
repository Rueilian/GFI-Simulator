document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DATA STRUCTURES ---

    const lang = {
        en: {
            switch: '切換中文',
            cat_A: 'A. Market Structure',
            cat_B: 'B. Pricing & Support',
            cat_C: 'C. Grid & Technical Rules',
            cat_D: 'D. Finance & Investment',
            cat_E: 'E. Policy & Governance',
            I_Market: 'Market Freedom',
            I_Mechanism: 'Mechanism Maturity',
            I_Infra: 'Infrastructure Readiness',
            // Policy Labels
            P01: 'Retail Market Liberalization', P02: 'Cross-Regional Trading', P03: 'PPA Contract Freedom',
            P04: 'Wholesale Market Pricing', P05: 'Diversity of Subsidy Tools', P06: 'Carbon Pricing Integration',
            P07: 'Grid Connection Transparency', P08: 'Certificate System (REC/GO)', P09: 'Open Data Platform',
            P10: 'Financing Channels', P11: 'Tax Incentives',
            P12: 'Cross-Ministry Coordination', P13: 'Long-Term Energy Targets',
        },
        cn: {
            switch: 'Switch to English',
            cat_A: 'A. 市場結構', cat_B: 'B. 價格與支持機制', cat_C: 'C. 電網與技術規則',
            cat_D: 'D. 金融與投資環境', cat_E: 'E. 政策協調與治理',
            I_Market: '市場自由度', I_Mechanism: '機制成熟度', I_Infra: '基礎設施完備度',
            // Policy Labels
            P01: '零售市場自由化', P02: '跨區交易機制', P03: 'PPA 合約自由度',
            P04: '批發市場定價', P05: '補貼工具多元性', P06: '碳定價整合',
            P07: '併網規則透明度', P08: '綠電憑證系統', P09: '開放數據平台',
            P10: '融資管道', P11: '稅務激勵',
            P12: '跨部會協調', P13: '長期能源目標',
        }
    };

    const policies = [
        { id: 'cat_A', policies: ['P01', 'P02', 'P03'] },
        { id: 'cat_B', policies: ['P04', 'P05', 'P06'] },
        { id: 'cat_C', policies: ['P07', 'P08', 'P09'] },
        { id: 'cat_D', policies: ['P10', 'P11'] },
        { id: 'cat_E', policies: ['P12', 'P13'] }
    ];

    const categoryWeights = { cat_A: 0.30, cat_B: 0.25, cat_C: 0.15, cat_D: 0.15, cat_E: 0.15 };

    // Weights for the RADAR chart (dimensional scores)
    const indicatorWeights = {
        P01: { I_Market: 0.8, I_Mechanism: 0.2, I_Infra: 0.0 }, P02: { I_Market: 0.7, I_Mechanism: 0.1, I_Infra: 0.2 },
        P03: { I_Market: 0.9, I_Mechanism: 0.1, I_Infra: 0.0 }, P04: { I_Market: 0.4, I_Mechanism: 0.6, I_Infra: 0.0 },
        P05: { I_Market: 0.1, I_Mechanism: 0.7, I_Infra: 0.2 }, P06: { I_Market: 0.2, I_Mechanism: 0.8, I_Infra: 0.0 },
        P07: { I_Market: 0.1, I_Mechanism: 0.2, I_Infra: 0.7 }, P08: { I_Market: 0.3, I_Mechanism: 0.4, I_Infra: 0.3 },
        P09: { I_Market: 0.0, I_Mechanism: 0.2, I_Infra: 0.8 }, P10: { I_Market: 0.3, I_Mechanism: 0.4, I_Infra: 0.3 },
        P11: { I_Market: 0.2, I_Mechanism: 0.6, I_Infra: 0.2 }, P12: { I_Market: 0.2, I_Mechanism: 0.4, I_Infra: 0.4 },
        P13: { I_Market: 0.1, I_Mechanism: 0.5, I_Infra: 0.4 },
    };

    // --- FEATURE 2: PRESET DATA ---
    const presets = {
        "United States": {
            2010: {P01:3, P02:5, P03:4, P04:4, P05:5, P06:1, P07:4, P08:4, P09:3, P10:6, P11:6, P12:3, P13:4, notes:"Fragmented state-level policies (RPS), federal tax credits (ITC/PTC) are main drivers. Low carbon pricing integration."},
            2015: {P01:4, P02:6, P03:6, P04:5, P05:6, P06:2, P07:5, P08:5, P09:5, P10:7, P11:7, P12:4, P13:5, notes:"Clean Power Plan proposed, spurring market optimism. Corporate PPAs gain traction. Grid modernization begins."},
            2020: {P01:5, P02:6, P03:8, P04:6, P05:7, P06:3, P07:6, P08:7, P09:6, P10:8, P11:7, P12:4, P13:6, notes:"ITC/PTC extensions continue. States like CA and NY push aggressive targets. Corporate procurement is a major force."},
            2025: {P01:6, P02:7, P03:9, P04:7, P05:8, P06:4, P07:7, P08:8, P09:7, P10:9, P11:8, P12:6, P13:8, notes:"IRA of 2022 provides long-term certainty and massive funding. Focus on domestic supply chains and grid build-out."}
        },
        "Germany": {
            2010: {P01:6, P02:7, P03:5, P04:6, P05:8, P06:4, P07:6, P08:6, P09:5, P10:7, P11:5, P12:7, P13:8, notes:"EEG 2009 with high feed-in tariffs (FITs). Strong renewable growth, but integration costs rising."},
            2015: {P01:6, P02:7, P03:6, P04:7, P05:6, P06:5, P07:7, P08:7, P09:6, P10:7, P11:5, P12:7, P13:9, notes:"Shift from FITs to auctions (EEG 2014/2017) to control costs. Grid stability becomes a key concern."},
            2020: {P01:7, P02:8, P03:7, P04:7, P05:5, P06:7, P07:7, P08:8, P09:7, P10:7, P11:5, P12:7, P13:9, notes:"Coal phase-out law passed. National carbon pricing on transport/heating. PPA market starts to emerge."},
            2025: {P01:7, P02:8, P03:8, P04:8, P05:5, P06:8, P07:8, P08:8, P09:8, P10:8, P11:6, P12:8, P13:10, notes:"Aggressive expansion targets post-Ukraine crisis. Focus on streamlining permits and grid expansion."}
        },
        "Taiwan": {
            2010: {P01:1, P02:1, P03:1, P04:2, P05:3, P06:1, P07:2, P08:2, P09:1, P10:3, P11:2, P12:2, P13:3, notes:"Renewable Energy Development Act passed in 2009, but market remains state-dominated with FITs."},
            2015: {P01:2, P02:1, P03:2, P04:2, P05:4, P06:1, P07:3, P08:3, P09:2, P10:4, P11:3, P12:3, P13:5, notes:"Initial, slow liberalization efforts. Focus remains on solar and wind FITs."},
            2020: {P01:4, P02:2, P03:5, P04:3, P05:5, P06:2, P07:4, P08:6, P09:4, P10:6, P11:4, P12:5, P13:7, notes:"Electricity Act amendments open direct PPAs (Wheeling). T-REC market established. Offshore wind development accelerates."},
            2025: {P01:5, P02:3, P03:7, P04:4, P05:6, P06:4, P07:6, P08:7, P09:6, P10:7, P11:5, P12:6, P13:8, notes:"Corporate PPAs are common but grid constraints and high prices are issues. Carbon pricing/fees introduced."}
        },
        // Add other countries with plausible synthetic data
        "United Kingdom": {
            2010: {P01:7, P02:7, P03:6, P04:7, P05:7, P06:5, P07:6, P08:7, P09:6, P10:7, P11:6, P12:6, P13:8},
            2015: {P01:8, P02:7, P03:7, P04:8, P05:6, P06:6, P07:7, P08:8, P09:7, P10:7, P11:5, P12:7, P13:9},
            2020: {P01:8, P02:8, P03:8, P04:8, P05:5, P06:7, P07:8, P08:8, P09:8, P10:8, P11:5, P12:8, P13:9},
            2025: {P01:8, P02:8, P03:9, P04:9, P05:5, P06:8, P07:8, P08:9, P09:9, P10:8, P11:6, P12:8, P13:10}
        },
        "France": {
            2010: {P01:4, P02:6, P03:4, P04:5, P05:6, P06:4, P07:5, P08:5, P09:4, P10:6, P11:5, P12:6, P13:7},
            2015: {P01:5, P02:7, P03:5, P04:6, P05:7, P06:5, P07:6, P08:6, P09:5, P10:7, P11:5, P12:7, P13:8},
            2020: {P01:5, P02:7, P03:7, P04:6, P05:6, P06:6, P07:6, P08:7, P09:6, P10:7, P11:6, P12:7, P13:8},
            2025: {P01:6, P02:7, P03:8, P04:7, P05:5, P06:7, P07:7, P08:8, P09:7, P10:8, P11:6, P12:8, P13:9}
        },
         "Japan": {
            2010: {P01:2, P02:2, P03:2, P04:3, P05:4, P06:1, P07:3, P08:2, P09:2, P10:4, P11:3, P12:3, P13:4},
            2015: {P01:4, P02:3, P03:4, P04:4, P05:8, P06:2, P07:4, P08:4, P09:3, P10:6, P11:4, P12:4, P13:6},
            2020: {P01:6, P02:4, P03:6, P04:5, P05:6, P06:3, P07:5, P08:6, P09:5, P10:7, P11:5, P12:5, P13:7},
            2025: {P01:7, P02:5, P03:7, P04:6, P05:5, P06:5, P07:6, P08:7, P09:6, P10:7, P11:6, P12:6, P13:8}
        },
        "South Korea": {
            2010: {P01:2, P02:2, P03:2, P04:3, P05:5, P06:1, P07:3, P08:3, P09:2, P10:4, P11:4, P12:4, P13:5},
            2015: {P01:3, P02:2, P03:3, P04:4, P05:6, P06:4, P07:4, P08:4, P09:3, P10:5, P11:5, P12:5, P13:6},
            2020: {P01:4, P02:3, P03:5, P04:4, P05:7, P06:5, P07:5, P08:6, P09:5, P10:6, P11:6, P12:6, P13:8},
            2025: {P01:5, P02:4, P03:7, P04:5, P05:6, P06:6, P07:6, P08:7, P09:6, P10:7, P11:6, P12:7, P13:8}
        },
        "Australia": {
            2010: {P01:8, P02:7, P03:7, P04:8, P05:6, P06:1, P07:7, P08:7, P09:6, P10:8, P11:5, P12:5, P13:7},
            2015: {P01:8, P02:7, P03:8, P04:8, P05:5, P06:2, P07:7, P08:8, P09:7, P10:8, P11:4, P12:4, P13:6},
            2020: {P01:9, P02:8, P03:9, P04:9, P05:4, P06:3, P07:8, P08:8, P09:8, P10:8, P11:4, P12:5, P13:7},
            2025: {P01:9, P02:8, P03:9, P04:9, P05:4, P06:4, P07:8, P08:9, P09:9, P10:8, P11:5, P12:6, P13:8}
        },
        "Canada": {
            2010: {P01:4, P02:6, P03:5, P04:5, P05:5, P06:3, P07:5, P08:4, P09:4, P10:6, P11:5, P12:5, P13:6},
            2015: {P01:5, P02:6, P03:6, P04:6, P05:6, P06:5, P07:6, P08:5, P09:5, P10:7, P11:6, P12:6, P13:7},
            2020: {P01:6, P02:7, P03:7, P04:6, P05:6, P06:7, P07:7, P08:6, P09:6, P10:7, P11:6, P12:7, P13:8},
            "2025": {P01:7, P02:7, P03:8, P04:7, P05:6, P06:8, P07:7, P08:7, P09:7, P10:8, P11:7, P12:7, P13:8}
        },
        "Spain": {
            2010: {P01:5, P02:7, P03:4, P04:6, P05:8, P06:3, P07:6, P08:6, P09:5, P10:7, P11:4, P12:6, P13:8},
            2015: {P01:5, P02:7, P03:3, P04:6, P05:3, P06:3, P07:5, P08:6, P09:5, P10:5, P11:3, P12:5, P13:6},
            2020: {P01:6, P02:8, P03:7, P04:7, P05:6, P06:5, P07:7, P08:7, P09:7, P10:7, P11:5, P12:7, P13:8},
            2025: {P01:7, P02:8, P03:8, P04:8, P05:7, P06:6, P07:8, P08:8, P09:8, P10:8, P11:6, P12:8, P13:9}
        }
    };

    let currentLang = 'en';
    let policyState = {}; // Current user-adjusted scores {P01: 5, P02: 7, ...}

    // --- 2. DOM ELEMENTS ---
    const app = document.getElementById('app');
    const langSwitcher = document.getElementById('lang-switcher');
    const policyControls = document.getElementById('policy-controls');
    const overallScoreEl = document.getElementById('overall-score');
    const radarChartCanvas = document.getElementById('radar-chart');
    const trendChartCanvas = document.getElementById('trend-chart');
    const countryCheckboxes = document.getElementById('country-checkboxes');
    const yearSelect = document.getElementById('year-select');
    const presetNotesEl = document.getElementById('preset-notes');
    const weightsTable = document.getElementById('weights-table');
    const presetDisplayHeader = document.getElementById('preset-display-header');
    const presetDisplayText = document.getElementById('preset-display-text');

    // --- New State & UI Configuration ---
    let selectedCountries = [];
    const chartColors = ['#4f46e5', '#10b981', '#ef4444', '#f97316', '#8b5cf6', '#3b82f6', '#f59e0b', '#d946ef', '#6366f1', '#06b6d4'];


    // --- 3. RENDERING & UI ---

    /** Renders the policy sliders based on the current policyState */
    function renderPolicies() {
        let html = '';
        policies.forEach(cat => {
            const catLabel = lang[currentLang][cat.id] || cat.id;
            html += `<div class="bg-white p-5 rounded-xl shadow-md">
                        <h3 class="text-xl font-bold mb-4 text-indigo-800">${catLabel}</h3>
                        <div class="space-y-4">`;
            
            cat.policies.forEach(pid => {
                const pLabel = lang[currentLang][pid] || pid;
                const level = policyState[pid];
                html += `<div>
                            <label for="${pid}" class="text-gray-700">${pLabel}</label>
                            <div class="flex items-center gap-4 mt-1">
                                <span class="text-sm font-bold text-gray-500">0</span>
                                <input type="range" id="${pid}" min="0" max="10" value="${level}" step="1" data-pid="${pid}" class="flex-grow">
                                <span class="text-sm font-bold text-gray-500">10</span>
                                <span id="val-${pid}" class="w-8 text-center font-semibold text-indigo-600">${level}</span>
                                <span id="preset-val-${pid}" class="w-12 text-center text-sm text-gray-500"></span>
                            </div>
                         </div>`;
            });
            html += `</div></div>`;
        });
        policyControls.innerHTML = html;
        addSliderListeners();
    }

    /** Populates the country checkboxes */
    function renderCountryCheckboxes() {
        countryCheckboxes.innerHTML = Object.keys(presets).map(country => `
            <label for="chk-${country}" class="flex items-center space-x-2 text-sm cursor-pointer">
                <input type="checkbox" id="chk-${country}" data-country="${country}" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <span>${country}</span>
            </label>
        `).join('');
        
        // Add event listeners
        countryCheckboxes.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const country = e.target.dataset.country;
                const year = yearSelect.value;
                const oldFirstCountry = selectedCountries[0];

                // Update selectedCountries array
                if (e.target.checked) {
                    if (!selectedCountries.includes(country)) {
                        selectedCountries.push(country);
                    }
                } else {
                    selectedCountries = selectedCountries.filter(c => c !== country);
                }

                const newFirstCountry = selectedCountries[0];

                if (newFirstCountry !== oldFirstCountry) {
                    if (newFirstCountry) {
                        // A new country is now primary, load its preset
                        loadPreset(newFirstCountry, year);
                    } else {
                        // No countries are selected anymore, clear everything
                        presetDisplayHeader.classList.add('hidden');
                        document.querySelectorAll('[id^="preset-val-"]').forEach(el => el.textContent = '');
                        presetNotesEl.textContent = '';
                        // Reset all policy states and slider UI to 0
                        const allPids = policies.flatMap(p => p.policies);
                        policyState = allPids.reduce((acc, pid) => ({ ...acc, [pid]: 0 }), {});
                        renderPolicies(); // This resets sliders to 0 and re-adds listeners
                        updateUI();
                    }
                } else if (newFirstCountry && selectedCountries.length === 1) {
                    // This handles the case where the user deselects other countries, making the
                    // current newFirstCountry the *only* one, so we should ensure its data is loaded.
                    loadPreset(newFirstCountry, year);
                }
                
                updateTrendChart();
            });
        });
    }

    /** Populates the year dropdown */
    function populateYearDropdown() {
        yearSelect.innerHTML = [...new Set(Object.values(presets).flatMap(c => Object.keys(c)))].sort().map(y => `<option value="${y}">${y}</option>`).join('');
    }

    /** Populates the methodology weights table */
    function renderWeightsTable() {
        weightsTable.innerHTML = policies.map(cat => `
            <tr>
                <td class="px-4 py-2 text-sm">${lang[currentLang][cat.id]}</td>
                <td class="px-4 py-2 text-sm font-mono">${(categoryWeights[cat.id] * 100).toFixed(0)}%</td>
            </tr>
        `).join('');
    }

    const indicatorWeightSums = {
        I_Market: 4.3, // Sum of all I_Market weights
        I_Mechanism: 5.2, // Sum of all I_Mechanism weights
        I_Infra: 3.5  // Sum of all I_Infra weights
    };

    // --- 4. CALCULATION ENGINE ---

    /**
     * Calculates all scores based on the provided state.
     * @param {object} state - A policy state object (e.g., {P01: 5, ...}).
     * @returns {object} { dimensionalScores, categoryScores, overallScore }
     */
    function calculateScores(state) {
        // --- Step 2a: Calculate Dimensional Scores for Radar Chart (existing logic) ---
        let rawDimensionalScores = { I_Market: 0, I_Mechanism: 0, I_Infra: 0 };
        for (const pid in state) {
            const level = state[pid]; // value from 0-10
            const policyWeights = indicatorWeights[pid];
            if (policyWeights) {
                for (const ind in policyWeights) {
                    rawDimensionalScores[ind] += policyWeights[ind] * level;
                }
            }
        }

        // Normalize dimensional scores to a 0-100 scale for the chart
        const dimensionalScores = {
            I_Market: (rawDimensionalScores.I_Market / (indicatorWeightSums.I_Market * 10)) * 100,
            I_Mechanism: (rawDimensionalScores.I_Mechanism / (indicatorWeightSums.I_Mechanism * 10)) * 100,
            I_Infra: (rawDimensionalScores.I_Infra / (indicatorWeightSums.I_Infra * 10)) * 100,
        };
        
        // --- Step 1 & 2b: Calculate Category Scores for Overall GFI (new logic) ---
        const categoryScores = {};
        policies.forEach(cat => {
            const policyIDs = cat.policies;
            // Normalize 0-10 values to 0-1 for this calculation
            const sumOfNormalizedScores = policyIDs.reduce((sum, pid) => sum + ((state[pid] || 0) / 10), 0);
            const avgScore = sumOfNormalizedScores / policyIDs.length;
            categoryScores[cat.id] = avgScore * 100;
        });

        // --- Step 3: Calculate final weighted Overall GFI Score ---
        let overallScore = 0;
        for (const catId in categoryScores) {
            overallScore += categoryScores[catId] * categoryWeights[catId];
        }

        return { dimensionalScores, categoryScores, overallScore };
    }

    // --- 5. CHARTS ---

    let radarChart, trendChart;
    /** Initializes the Radar Chart for dimensional scores */
    function initRadarChart() {
        const ctx = radarChartCanvas.getContext('2d');
        const labels = [lang[currentLang].I_Market, lang[currentLang].I_Mechanism, lang[currentLang].I_Infra];
        radarChart = new Chart(ctx, {
            type: 'radar',
            data: { labels: labels, datasets: [{
                label: 'Dimensional Score',
                data: [0, 0, 0],
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 2,
            }]},
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { r: { beginAtZero: true, suggestedMin: 0, suggestedMax: 100, pointLabels: { font: { size: 12 } } } },
                plugins: { legend: { display: false } }
            }
        });
    }

    /** Initializes the Line Chart for country trends */
    function initTrendChart() {
        const ctx = trendChartCanvas.getContext('2d');
        const years = [...new Set(Object.values(presets).flatMap(c => Object.keys(c)))].sort();
        trendChart = new Chart(ctx, {
            type: 'line',
            data: { 
                labels: years, 
                datasets: [] // Datasets will be added dynamically
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, suggestedMin: 0, suggestedMax: 100 } },
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
    
    /** Updates the trend chart based on the selected countries */
    function updateTrendChart() {
        trendChart.data.datasets = []; // Clear existing datasets

        selectedCountries.forEach((country, index) => {
            const countryData = presets[country];
            if (!countryData) return;

            const years = trendChart.data.labels;
            const scores = years.map(year => {
                const yearData = countryData[year];
                return yearData ? calculateScores(yearData).overallScore : null; // Use null for missing data
            });
            
            const color = chartColors[index % chartColors.length];
            trendChart.data.datasets.push({
                label: country,
                data: scores,
                borderColor: color,
                backgroundColor: color + '33', // Lighter transparent version for fill
                fill: false,
                tension: 0.1,
                spanGaps: true, // Connect lines across null data points
            });
        });

        trendChart.update();
    }


    // --- 6. UI & EVENT HANDLERS ---

    /** Main function to update all UI elements based on policyState */
    function updateUI() {
        const { dimensionalScores, overallScore } = calculateScores(policyState);

        // Update Overall Score
        overallScoreEl.textContent = overallScore.toFixed(1);

        // Update Radar Chart
        radarChart.data.datasets[0].data = Object.values(dimensionalScores);
        radarChart.update();
    }
    
    /** Load a preset into the sliders and update the UI */
    function loadPreset(country, year) {
        const presetData = presets[country]?.[year];
        
        // Clear all preset value indicators first
        document.querySelectorAll('[id^="preset-val-"]').forEach(el => el.textContent = '');

        if (!presetData) {
            presetDisplayHeader.classList.add('hidden'); // Hide the header
            presetNotesEl.textContent = `Notes: No data for ${country} in ${year}.`;
            return;
        }

        // Update and show the header
        presetDisplayText.textContent = `${country} - ${year}`;
        presetDisplayHeader.classList.remove('hidden');

        // Update policy state
        policyState = { ...presetData };

        // Update notes
        presetNotesEl.textContent = presetData.notes ? `Notes: ${presetData.notes}` : '';

        // Update sliders and preset values
        for (const pid in policyState) {
            const slider = document.getElementById(pid);
            const valueDisplay = document.getElementById(`val-${pid}`);
            const presetValueDisplay = document.getElementById(`preset-val-${pid}`);
            if (slider) {
                slider.value = policyState[pid];
            }
            if (valueDisplay) {
                valueDisplay.textContent = policyState[pid];
            }
            if (presetValueDisplay) {
                presetValueDisplay.textContent = `(${policyState[pid]})`;
            }
        }
        updateUI();
    }

    /** Add event listeners to all sliders */
    function addSliderListeners() {
        const sliders = policyControls.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const pid = e.target.dataset.pid;
                const value = parseInt(e.target.value, 10);
                policyState[pid] = value;
                document.getElementById(`val-${pid}`).textContent = value;
                
                // Clear preset notes and hide header as user is now customizing
                presetNotesEl.textContent = '';
                presetDisplayHeader.classList.add('hidden');
                
                // Also clear all preset value indicators
                document.querySelectorAll('[id^="preset-val-"]').forEach(el => el.textContent = '');
                
                updateUI();
            });
        });
    }

    function switchLanguage() {
        currentLang = (currentLang === 'en') ? 'cn' : 'en';
        langSwitcher.textContent = lang[currentLang].switch;

        // Update all elements with data-lang attribute
        app.querySelectorAll('[data-lang]').forEach(el => {
            const translations = el.dataset.lang.split('|').reduce((acc, item) => {
                const [key, val] = item.split(':');
                acc[key] = val;
                return acc;
            }, {});
            el.textContent = translations[currentLang];
        });
        
        // Re-render dynamic content
        renderPolicies();
        renderCountryCheckboxes(); // Re-render for new lang
        renderWeightsTable();

        // Update chart labels
        radarChart.data.labels = [lang[currentLang].I_Market, lang[currentLang].I_Mechanism, lang[currentLang].I_Infra];
        
        // Restore checkbox state after re-render
        selectedCountries.forEach(country => {
            const chk = document.getElementById(`chk-${country}`);
            if(chk) chk.checked = true;
        });

        updateUI();
    }

    /** Main initialization function */
    function init() {
        langSwitcher.addEventListener('click', switchLanguage);
        
        // Setup preset controls
        renderCountryCheckboxes();
        populateYearDropdown();
        
        // Setup listener for year dropdown to load presets for sliders
        yearSelect.addEventListener('change', (e) => {
            const year = e.target.value;
            // Load preset for the first selected country into the sliders
            const countryToLoad = selectedCountries[0]; 
            if (countryToLoad) {
                loadPreset(countryToLoad, year);
            }
        });

        initRadarChart();
        initTrendChart();
        renderPolicies(); // To draw initial sliders
        renderWeightsTable();
        
        // Load initial state
        selectedCountries = ["United States"];
        document.getElementById('chk-United States').checked = true;
        yearSelect.value = "2025";
        loadPreset("United States", "2025");
        updateTrendChart();
    }

    init();
});