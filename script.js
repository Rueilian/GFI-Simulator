document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DATA STRUCTURES ---
    // Note: Data structures (lang, policies, etc.) are now loaded from data.js

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
                let level = policyState[pid]; // policyState now stores numerical score
                if (level === undefined) {
                    level = 0;
                }
                html += `<div><div class="flex justify-between items-center">
                            <label for="${pid}" class="text-gray-700">${pLabel}</label>
                            <span id="val-${pid}" class="w-8 text-right font-semibold text-indigo-600">${level}</span>
                         </div>`;

                // Check if this policy has checkbox options defined
                const options = policyOptionsMap[pid];

                if (options) {
                    html += `<div id="${pid}-checkboxes" class="mt-2 space-y-2">`;
                    options.forEach(opt => {
                        const labelText = lang[currentLang][opt.label_key] || opt.label_key;
                        // Checkbox state will be set by loadPreset or user interaction
                        html += `
                            <label class="flex items-center space-x-3 text-sm cursor-pointer">
                                <input type="checkbox" data-pid="${pid}" data-weight="${opt.weight}" id="${opt.id}" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                                <span>${labelText} (+${opt.weight})</span>
                            </label>
                        `;
                    });
                    html += '</div>';
                } else {
                    html += `<div class="flex items-center gap-4 mt-1">
                                <span class="text-sm font-bold text-gray-500">0</span>
                                <input type="range" id="${pid}" min="0" max="10" value="${level}" step="1" data-pid="${pid}" class="flex-grow">
                                <span class="text-sm font-bold text-gray-500">10</span>
                             </div>`;
                }
                html += `</div>`;
            });
            html += `</div></div>`;
        });
        policyControls.innerHTML = html;
        addControlListeners();
    }

    /** Populates the country checkboxes */
    function renderCountryCheckboxes() {
        countryCheckboxes.innerHTML = Object.keys(presets).map(country => (
            `<label for="chk-${country}" class="flex items-center space-x-2 text-sm cursor-pointer">
                <input type="checkbox" id="chk-${country}" data-country="${country}" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <span>${lang[currentLang].countries[country] || country}</span>
            </label>`
        )).join('');
        
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
        weightsTable.innerHTML = policies.map(cat => (
            `<tr>
                <td class="px-4 py-2 text-sm">${lang[currentLang][cat.id]}</td>
                <td class="px-4 py-2 text-sm font-mono">${(categoryWeights[cat.id] * 100).toFixed(0)}%</td>
            </tr>`
        )).join('');
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
            const countryData = presets[country]; // Use the processed presets
            if (!countryData) return;

            const years = trendChart.data.labels;
            const scores = years.map(year => {
                const yearData = countryData[year];
                if (!yearData) return null;

                // Flatten yearData to simple score object for calculation
                const tempState = {};
                for (const pid in yearData) {
                    if (pid.startsWith('P')) {
                        // Logic to match loadPreset: prioritize checkboxes if available
                        if (yearData[pid].checkboxes && policyOptionsMap[pid]) {
                            let calculatedScore = 0;
                            const checkboxStates = yearData[pid].checkboxes;
                            policyOptionsMap[pid].forEach(opt => {
                                if (checkboxStates[opt.id]) {
                                    calculatedScore += opt.weight;
                                }
                            });
                            tempState[pid] = Math.min(calculatedScore, 10);
                        } else if (yearData[pid].score !== undefined) {
                            tempState[pid] = yearData[pid].score;
                        } else {
                            tempState[pid] = 0;
                        }
                    }
                }
                return calculateScores(tempState).overallScore;
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

    function updateScoreFromCheckboxes(pid) {
        const checkboxes = document.querySelectorAll(`#${pid}-checkboxes input[type="checkbox"]`);
        let newScore = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                newScore += parseInt(cb.dataset.weight, 10);
            }
        });

        // Cap the score at 10
        newScore = Math.min(newScore, 10);

        policyState[pid] = newScore;
        const valueDisplay = document.getElementById(`val-${pid}`);
        if (valueDisplay) {
            valueDisplay.textContent = newScore;
        }
        
        // This function is now responsible for triggering the main UI update
        updateUI();

        // Clear preset notes and update header text
        presetNotesEl.textContent = '';
        presetDisplayText.textContent = 'User editing';
        presetDisplayHeader.classList.remove('hidden');
    }

    /** Load a preset into the sliders and update the UI */
    function loadPreset(country, year) {
        const presetData = presets[country]?.[year]; // Use the processed presets
        const translatedCountry = lang[currentLang].countries[country] || country;
        
        if (!presetData) {
            presetDisplayText.textContent = "User editing (No data)";
            presetDisplayHeader.classList.remove('hidden'); 
            return;
        }

        presetDisplayText.textContent = `${translatedCountry} - ${year}`;
        presetDisplayHeader.classList.remove('hidden'); 

        // Update policy state numerical scores
        for (const pid in presetData) {
            if (pid.startsWith('P')) {
                if (presetData[pid].checkboxes && policyOptionsMap[pid]) {
                    let calculatedScore = 0;
                    const checkboxStates = presetData[pid].checkboxes;
                    policyOptionsMap[pid].forEach(opt => {
                        if (checkboxStates[opt.id]) {
                            calculatedScore += opt.weight;
                        }
                    });
                    policyState[pid] = Math.min(calculatedScore, 10);
                } else {
                    policyState[pid] = presetData[pid].score || 0;
                }
            }
        }

        // Update notes
        presetNotesEl.textContent = presetData.notes ? `${lang[currentLang].notes_prefix}${presetData.notes}` : '';

        // Update all controls
        for (const pid in policyState) {
            const level = policyState[pid]; // This is the numerical score

            // Update the numerical display next to the policy label
            const valueDisplay = document.getElementById(`val-${pid}`);
            if (valueDisplay) {
                valueDisplay.textContent = level;
            }

            if (policyOptionsMap[pid]) {
                 // Handle checkboxes: Directly set checked state from presetData
                const checkboxStates = presetData[pid].checkboxes;
                const options = policyOptionsMap[pid];
                
                options.forEach(opt => {
                    const checkbox = document.getElementById(opt.id);
                    if (checkbox && checkboxStates) {
                        checkbox.checked = checkboxStates[opt.id] || false; // Set checked based on boolean state
                    }
                });

            } else {
                // Handle sliders for other policies (fallback)
                const slider = document.getElementById(pid);
                if (slider) {
                    slider.value = level;
                }
            }
        }
        updateUI();
    }

    /** Add event listeners to all sliders */
    function addControlListeners() {
        // Sliders
        const sliders = policyControls.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const pid = e.target.dataset.pid;
                const value = parseInt(e.target.value, 10);
                policyState[pid] = value;
                document.getElementById(`val-${pid}`).textContent = value;
                
                presetNotesEl.textContent = '';
                presetDisplayText.textContent = 'User editing';
                presetDisplayHeader.classList.remove('hidden');
                
                updateUI();
            });
        });

        // Checkboxes (Generic listener for any policy with checkboxes)
        Object.keys(policyOptionsMap).forEach(pid => {
             const checkboxes = document.querySelectorAll(`#${pid}-checkboxes input[type="checkbox"]`);
             checkboxes.forEach(checkbox => {
                 checkbox.addEventListener('change', () => updateScoreFromCheckboxes(pid));
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

        // Re-apply the current policy state to the newly rendered checkboxes
        if (selectedCountries.length > 0) {
            loadPreset(selectedCountries[0], yearSelect.value);
        } else {
            // If no country is selected, ensure UI is updated to current policyState (which might be all 0s)
            updateUI();
        }
    }

    /** Main initialization function */
    function init() {
        langSwitcher.addEventListener('click', switchLanguage);
        
        // policyState will now hold the numerical scores derived from checkboxes
        const allPids = policies.flatMap(p => p.policies);
        allPids.forEach(pid => {
            policyState[pid] = 0; // Initialize all policy scores to 0
        });

        // Setup preset controls
        renderCountryCheckboxes();
        populateYearDropdown();
        
        // Setup listener for year dropdown to load presets
        yearSelect.addEventListener('change', (e) => {
            const year = e.target.value;
            const countryToLoad = selectedCountries[0]; 
            if (countryToLoad) {
                loadPreset(countryToLoad, year);
            }
        });

        initRadarChart();
        initTrendChart();
        renderPolicies(); 
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