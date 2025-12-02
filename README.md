# GFI Simulator

A simulation tool for the Green Power Free-Market Index (GFI).
This tool allows users to adjust various policy parameters or select country/year presets to observe their impact on market liberalization and the overall GFI score.

## Features
- **Policy Sliders:** Adjust 13 policy parameters across 5 categories.
- **Country & Year Presets:** Load pre-defined policy sets for various countries and years.
- **Dynamic GFI Score:** Real-time calculation of the overall GFI score.
- **Dimensional Radar Chart:** Visualizes scores across key dimensions: Market Freedom, Mechanism Maturity, and Infrastructure Readiness.
- **GFI Trend Chart:** Compares historical GFI scores for selected countries.
- **Multilingual Support:** Toggle between English and Traditional Chinese.

## How to Use
1.  **Adjust Policies:** Use the sliders (0-10) to set the level of each policy parameter.
2.  **Select Presets:** Choose a country and year from the "Country & Year Presets" section to load a pre-defined set of policies. You can also select multiple countries to compare trends.
3.  **Observe Results:** The "Simulation Results" section will dynamically update with the overall GFI score, dimensional scores on the radar chart, and historical trends.

## Methodology
The GFI score is calculated in three steps:
1.  **Indicator Normalization:** Each policy slider value (0-10) is normalized to a value (0-1).
2.  **Category Score:** Scores for each of the five categories are calculated by averaging the normalized scores of their constituent policies.
3.  **Overall GFI Score:** The final GFI is a weighted average of the five category scores.

For a detailed breakdown of category weights and dimensional scoring, refer to the "How Scores Are Calculated" section within the simulator.

## Technologies Used
- HTML5
- CSS3 (with Tailwind CSS for utility-first styling)
- JavaScript (Vanilla JS for logic, Chart.js for visualizations)

## Development
To run this project locally:
1.  Clone the repository.
2.  Open `index.html` in your web browser.

## Contributing
Contributions are welcome! Please feel free to open issues or submit pull requests.

## License
MIT License

---
_Disclaimer: This is a simulation model. All data is non-official._
