document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DATA STRUCTURES ---

    const lang = {
        en: {
            switch: '切換中文',
            notes_prefix: 'Notes: ',
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
            
            // --- Checkbox Labels ---
            
            // P01: Retail Market
            p01_cb1: 'Full Unbundling of Retail from Generation/Transmission',
            p01_cb2: 'Multiple Competing Licensed Retailers',
            p01_cb3: 'Transparent & Easy Supplier Switching Process',
            p01_cb4: 'Diverse Green Products Available (Tariffs, PPAs, etc.)',
            p01_cb5: 'Consumer Access to Own Energy Data',

            // P02: Cross-Regional
            p02_cb1: 'Physical Interconnection with Neighbors',
            p02_cb2: 'Market Coupling (Shared Order Book)',
            p02_cb3: 'Intraday/Real-time Cross-border Trading',
            p02_cb4: 'Transparent Congestion Management (ATC/Flow-based)',

            // P03: PPA Freedom
            p03_cb1: 'Direct Corporate PPA Legal Framework',
            p03_cb2: 'Sleeved PPA Services Available via Utility',
            p03_cb3: 'Virtual/Financial PPA (CFD) Allowed',
            p03_cb4: 'Cross-Border PPA Feasibility',
            p03_cb5: 'Standardized Contracts & Low Transaction Costs',

            // P04: Wholesale Pricing
            p04_cb1: 'Real-time/Spot Market (Day-ahead & Intraday) Active',
            p04_cb2: 'Negative Pricing Allowed (No Floor)',
            p04_cb3: 'Ancillary Services Market Open to Renewables',
            p04_cb4: 'Locational/Nodal Pricing (LMP) or Zonal Signals',
            p04_cb5: 'Capacity Market or Strategic Reserve Mechanisms',

            // P05: Subsidy Tools
            p05_cb1: 'Legacy Feed-in Tariffs (FIT) Support',
            p05_cb2: 'Competitive Auctions (CfD/FIP) for Utility Scale',
            p05_cb3: 'Corporate Tax Credits (ITC/PTC) or Capital Grants',
            p05_cb4: 'Green Certificate Quotas (RPS) active',
            p05_cb5: 'Self-consumption / Net-metering Schemes',

            // P06: Carbon Pricing
            p06_cb1: 'National ETS or Carbon Tax Legislation',
            p06_cb2: 'Power Sector Fully Covered',
            p06_cb3: 'Carbon Price > $40/ton (Effective Signal)',
            p06_cb4: 'Revenue Recycling to Green Projects',
            p06_cb5: 'Border Carbon Adjustment (CBAM) or Equivalent',

            // P07: Grid Connection
            p07_cb1: 'Publicly Available Hosting Capacity Maps',
            p07_cb2: 'Standardized Connection Rules & Timelines',
            p07_cb3: 'Online Application & Tracking Portal',
            p07_cb4: 'Priority Dispatch/Access for Renewables',
            p07_cb5: 'Queue Management Reform (First-ready, first-served)',

            // P08: Certificates
            p08_cb1: 'National Registry for T-RECs/GOs Established',
            p08_cb2: 'Unbundled Sales (Separated from Power) Allowed',
            p08_cb3: 'Compatible with Int\'l Standards (RE100/I-REC)',
            p08_cb4: 'Hourly Matching (24/7 CFE) Capabilities',
            p08_cb5: 'Robust Third-party Verification & Double-counting Prevention',

            // P09: Open Data
            p09_cb1: 'TSO/ISO Provides Public API',
            p09_cb2: 'Real-time Generation Mix & Carbon Intensity Data',
            p09_cb3: 'Wholesale Market Price Data Publicly Accessible',
            p09_cb4: 'Historical Datasets Downloadable',
            p09_cb5: 'Standardized Data Formats (CIM/XML)',

            // P10: Financing
            p10_cb1: 'Active Green Bond Market (>1% of total bonds)',
            p10_cb2: 'Mature Non-recourse Project Finance Banking',
            p10_cb3: 'Official Green Taxonomy (ESG) Defined',
            p10_cb4: 'YieldCos / Infrastructure Funds Active',
            p10_cb5: 'Crowdfunding / Community Energy Legal Framework',

            // P11: Tax Incentives
            p11_cb1: 'Accelerated Depreciation for RE Assets',
            p11_cb2: 'Investment Tax Credits (ITC)',
            p11_cb3: 'Production Tax Credits (PTC)',
            p11_cb4: 'VAT / Sales Tax Exemptions',
            p11_cb5: 'Property / Land Tax Reductions',

            // P12: Coordination
            p12_cb1: 'Centralized Energy/Climate Agency with Mandate',
            p12_cb2: 'One-stop Shop for Permitting',
            p12_cb3: 'Regular Inter-ministerial Climate Meetings',
            p12_cb4: 'Aligned Land-use & Energy Siting Policies',
            p12_cb5: 'Aligned Industrial Strategy (Supply Chain)',

            // P13: Targets
            p13_cb1: 'Net Zero Target Codified in Law',
            p13_cb2: 'Clear Interim Targets (2030/2040)',
            p13_cb3: 'Technology-specific Targets (Solar/Wind/Storage)',
            p13_cb4: 'Coal/Fossil Phase-out Date Set',
            p13_cb5: 'Regular Review & Ratchet Mechanism (NDC)',

            countries: {
                "United States": "United States", "Germany": "Germany", "Taiwan": "Taiwan",
                "United Kingdom": "United Kingdom", "France": "France", "Japan": "Japan",
                "South Korea": "South Korea", "Australia": "Australia", "Canada": "Canada", "Spain": "Spain"
            }
        },
        cn: {
            switch: 'Switch to English',
            notes_prefix: '備註：',
            cat_A: 'A. 市場結構', cat_B: 'B. 價格與支持機制', cat_C: 'C. 電網與技術規則',
            cat_D: 'D. 金融與投資環境', cat_E: 'E. 政策協調與治理',
            I_Market: '市場自由度', I_Mechanism: '機制成熟度', I_Infra: '基礎設施完備度',
            // Policy Labels
            P01: '零售市場自由化', P02: '跨區交易機制', P03: 'PPA 合約自由度',
            P04: '批發市場定價', P05: '補貼工具多元性', P06: '碳定價整合',
            P07: '併網規則透明度', P08: '綠電憑證系統', P09: '開放數據平台',
            P10: '融資管道', P11: '稅務激勵',
            P12: '跨部會協調', P13: '長期能源目標',
            
             // P01 Checkbox Labels
            p01_cb1: '零售與發電/輸電完全解綁',
            p01_cb2: '存在多個持牌零售商競爭',
            p01_cb3: '供應商切換過程透明簡易',
            p01_cb4: '提供多元綠色產品（電價、PPA等）',
            p01_cb5: '消費者可存取自身能源數據',
            // P02 Checkbox Labels
            p02_cb1: '與鄰國/鄰區實體互聯',
            p02_cb2: '市場耦合 (共享訂單簿)',
            p02_cb3: '日內/即時跨區交易',
            p02_cb4: '透明的壅塞管理 (ATC/Flow-based)',
            // P03 Checkbox Labels
            p03_cb1: '企業直購電 (Direct PPA) 合法框架',
            p03_cb2: '公用事業提供轉供 (Sleeved PPA) 服務',
            p03_cb3: '允許虛擬/金融 PPA (CFD)',
            p03_cb4: '跨國/跨區 PPA 可行性',
            p03_cb5: '合約標準化與低交易成本',
             // P04: Wholesale Pricing
            p04_cb1: '即時/現貨市場 (日前與日內) 運作中',
            p04_cb2: '允許負電價 (無價格下限)',
            p04_cb3: '輔助服務市場對再生能源開放',
            p04_cb4: '節點定價 (LMP) 或區域定價訊號',
            p04_cb5: '容量市場或戰略儲備機制',

            // P05: Subsidy Tools
            p05_cb1: '既有躉購費率 (FIT) 支持',
            p05_cb2: '公用事業規模競爭性拍賣 (CfD/FIP)',
            p05_cb3: '企業稅收抵免 (ITC/PTC) 或資本補助',
            p05_cb4: '綠電憑證配額 (RPS) 機制',
            p05_cb5: '自發自用 / 淨計量電價 (Net-metering)',

            // P06: Carbon Pricing
            p06_cb1: '國家級 ETS 或碳稅立法',
            p06_cb2: '電力部門完全納入',
            p06_cb3: '碳價 > $40/ton (具引導信號)',
            p06_cb4: '收入循環用於綠色項目',
            p06_cb5: '碳邊境調整機制 (CBAM) 或同等機制',

            // P07: Grid Connection
            p07_cb1: '公開可用的饋線容量地圖',
            p07_cb2: '標準化的併網規則與時間表',
            p07_cb3: '線上申請與進度追蹤平台',
            p07_cb4: '再生能源優先調度/存取權',
            p07_cb5: '排隊管理改革 (準備就緒者優先)',

            // P08: Certificates
            p08_cb1: '已建立國家級憑證 (T-RECs/GOs) 註冊中心',
            p08_cb2: '允許電證分離銷售',
            p08_cb3: '符合國際標準 (RE100/I-REC)',
            p08_cb4: '具備每小時匹配 (24/7 CFE) 能力',
            p08_cb5: '嚴謹的第三方驗證與防止重複計算',

            // P09: Open Data
            p09_cb1: 'TSO/ISO 提供公共 API',
            p09_cb2: '即時發電結構與碳排強度數據',
            p09_cb3: '批發市場價格數據公開',
            p09_cb4: '歷史數據集可供下載',
            p09_cb5: '標準化數據格式 (CIM/XML)',

            // P10: Financing
            p10_cb1: '活躍的綠色債券市場 (>總債券1%)',
            p10_cb2: '成熟的無追索權專案融資銀行',
            p10_cb3: '官方綠色分類標準 (ESG Taxonomy) 已定義',
            p10_cb4: 'YieldCos / 基礎設施基金活躍',
            p10_cb5: '群眾募資 / 社區能源法律框架',

            // P11: Tax Incentives
            p11_cb1: '再生能源資產加速折舊',
            p11_cb2: '投資稅收抵免 (ITC)',
            p11_cb3: '生產稅收抵免 (PTC)',
            p11_cb4: '增值稅 / 營業稅減免',
            p11_cb5: '財產稅 / 土地稅減免',

            // P12: Coordination
            p12_cb1: '具備授權的中央能源/氣候署',
            p12_cb2: '單一窗口許可流程 (One-stop shop)',
            p12_cb3: '定期跨部會氣候會議',
            p12_cb4: '土地使用與能源選址政策一致',
            p12_cb5: '產業策略 (供應鏈) 一致',

            // P13: Targets
            p13_cb1: '淨零目標入法',
            p13_cb2: '明確的階段性目標 (2030/2040)',
            p13_cb3: '特定技術目標 (光/風/儲)',
            p13_cb4: 'Coal/Fossil Phase-out Date Set',
            p13_cb5: 'Regular Review & Ratchet Mechanism (NDC)',

            countries: {
                "United States": "美國", "Germany": "德國", "Taiwan": "台灣",
                "United Kingdom": "英國", "France": "法國", "Japan": "日本",
                "South Korea": "韓國", "Australia": "澳大利亞", "Canada": "加拿大", "Spain": "西班牙"
            }
        }
    };
    
    const policyOptionsMap = {
        P01: [
            { id: 'p01_cb1', weight: 3, label_key: 'p01_cb1' },
            { id: 'p01_cb2', weight: 2, label_key: 'p01_cb2' },
            { id: 'p01_cb3', weight: 2, label_key: 'p01_cb3' },
            { id: 'p01_cb4', weight: 2, label_key: 'p01_cb4' },
            { id: 'p01_cb5', weight: 1, label_key: 'p01_cb5' },
        ],
        P02: [
            { id: 'p02_cb1', weight: 3, label_key: 'p02_cb1' }, // Interconnection
            { id: 'p02_cb2', weight: 3, label_key: 'p02_cb2' }, // Market Coupling
            { id: 'p02_cb3', weight: 2, label_key: 'p02_cb3' }, // Intraday
            { id: 'p02_cb4', weight: 2, label_key: 'p02_cb4' }, // Transparency
        ],
        P03: [
            { id: 'p03_cb1', weight: 3, label_key: 'p03_cb1' }, // Direct PPA
            { id: 'p03_cb2', weight: 2, label_key: 'p03_cb2' }, // Sleeved
            { id: 'p03_cb3', weight: 2, label_key: 'p03_cb3' }, // Virtual
            { id: 'p03_cb4', weight: 2, label_key: 'p03_cb4' }, // Cross-border
            { id: 'p03_cb5', weight: 1, label_key: 'p03_cb5' }, // Standards
        ],
        P04: [
            { id: 'p04_cb1', weight: 3, label_key: 'p04_cb1' }, // Spot Market
            { id: 'p04_cb2', weight: 2, label_key: 'p04_cb2' }, // Negative Pricing
            { id: 'p04_cb3', weight: 2, label_key: 'p04_cb3' }, // Ancillary
            { id: 'p04_cb4', weight: 2, label_key: 'p04_cb4' }, // LMP/Zonal
            { id: 'p04_cb5', weight: 1, label_key: 'p04_cb5' }, // Capacity Mkt
        ],
        P05: [
            { id: 'p05_cb1', weight: 2, label_key: 'p05_cb1' }, // FIT
            { id: 'p05_cb2', weight: 3, label_key: 'p05_cb2' }, // Auctions
            { id: 'p05_cb3', weight: 2, label_key: 'p05_cb3' }, // Tax Credits
            { id: 'p05_cb4', weight: 2, label_key: 'p05_cb4' }, // RPS
            { id: 'p05_cb5', weight: 1, label_key: 'p05_cb5' }, // Self-consumption
        ],
        P06: [
            { id: 'p06_cb1', weight: 3, label_key: 'p06_cb1' }, // ETS/Tax
            { id: 'p06_cb2', weight: 2, label_key: 'p06_cb2' }, // Coverage
            { id: 'p06_cb3', weight: 2, label_key: 'p06_cb3' }, // High Price
            { id: 'p06_cb4', weight: 2, label_key: 'p06_cb4' }, // Revenue Recycle
            { id: 'p06_cb5', weight: 1, label_key: 'p06_cb5' }, // CBAM
        ],
        P07: [
            { id: 'p07_cb1', weight: 3, label_key: 'p07_cb1' }, // Maps
            { id: 'p07_cb2', weight: 3, label_key: 'p07_cb2' }, // Standards
            { id: 'p07_cb3', weight: 2, label_key: 'p07_cb3' }, // Portal
            { id: 'p07_cb4', weight: 1, label_key: 'p07_cb4' }, // Priority
            { id: 'p07_cb5', weight: 1, label_key: 'p07_cb5' }, // Queue
        ],
        P08: [
            { id: 'p08_cb1', weight: 3, label_key: 'p08_cb1' }, // Registry
            { id: 'p08_cb2', weight: 2, label_key: 'p08_cb2' }, // Unbundled
            { id: 'p08_cb3', weight: 2, label_key: 'p08_cb3' }, // Int'l Std
            { id: 'p08_cb4', weight: 2, label_key: 'p08_cb4' }, // Hourly
            { id: 'p08_cb5', weight: 1, label_key: 'p08_cb5' }, // Verification
        ],
        P09: [
            { id: 'p09_cb1', weight: 3, label_key: 'p09_cb1' }, // API
            { id: 'p09_cb2', weight: 2, label_key: 'p09_cb2' }, // Mix Data
            { id: 'p09_cb3', weight: 2, label_key: 'p09_cb3' }, // Price Data
            { id: 'p09_cb4', weight: 2, label_key: 'p09_cb4' }, // Historical
            { id: 'p09_cb5', weight: 1, label_key: 'p09_cb5' }, // Formats
        ],
        P10: [
            { id: 'p10_cb1', weight: 3, label_key: 'p10_cb1' }, // Green Bonds
            { id: 'p10_cb2', weight: 3, label_key: 'p10_cb2' }, // Project Finance
            { id: 'p10_cb3', weight: 2, label_key: 'p10_cb3' }, // Taxonomy
            { id: 'p10_cb4', weight: 1, label_key: 'p10_cb4' }, // YieldCos
            { id: 'p10_cb5', weight: 1, label_key: 'p10_cb5' }, // Crowdfunding
        ],
        P11: [
            { id: 'p11_cb1', weight: 3, label_key: 'p11_cb1' }, // Depreciation
            { id: 'p11_cb2', weight: 3, label_key: 'p11_cb2' }, // ITC
            { id: 'p11_cb3', weight: 2, label_key: 'p11_cb3' }, // PTC
            { id: 'p11_cb4', weight: 1, label_key: 'p11_cb4' }, // VAT
            { id: 'p11_cb5', weight: 1, label_key: 'p11_cb5' }, // Property Tax
        ],
        P12: [
            { id: 'p12_cb1', weight: 3, label_key: 'p12_cb1' }, // Agency
            { id: 'p12_cb2', weight: 3, label_key: 'p12_cb2' }, // One-stop
            { id: 'p12_cb3', weight: 2, label_key: 'p12_cb3' }, // Meetings
            { id: 'p12_cb4', weight: 1, label_key: 'p12_cb4' }, // Land-use
            { id: 'p12_cb5', weight: 1, label_key: 'p12_cb5' }, // Industry
        ],
        P13: [
            { id: 'p13_cb1', weight: 3, label_key: 'p13_cb1' }, // Net Zero Law
            { id: 'p13_cb2', weight: 2, label_key: 'p13_cb2' }, // Interim
            { id: 'p13_cb3', weight: 2, label_key: 'p13_cb3' }, // Tech Targets
            { id: 'p13_cb4', weight: 2, label_key: 'p13_cb4' }, // Phase-out
            { id: 'p13_cb5', weight: 1, label_key: 'p13_cb5' }, // Review
        ],
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


    /**
     * Helper function to greedily generate checkbox states (true/false) based on a target score.
     * This ensures that when converting numerical scores to checkbox states, higher-weighted
     * checkboxes are prioritized, mimicking how a user might manually achieve a score.
     * @param {number} targetScore - The desired numerical score (0-10).
     * @param {Array<Object>} options - The array of checkbox options for a policy, each with an 'id' and 'weight'.
     * @returns {Object} An object where keys are checkbox IDs and values are booleans (true/false).
     */
    function _generateCheckboxStates(targetScore, options) {
        const states = {};
        let currentScore = 0;
        // Sort options by weight in descending order to prioritize higher weights
        const sortedOptions = [...options].sort((a, b) => b.weight - a.weight);

        sortedOptions.forEach(opt => {
            if (currentScore + opt.weight <= targetScore) {
                states[opt.id] = true;
                currentScore += opt.weight;
            } else {
                states[opt.id] = false;
            }
        });

        // If the targetScore isn't perfectly met, try to fill the remaining gap with any available checkbox
        // This makes the conversion more robust for arbitrary numerical inputs.
        if (currentScore < targetScore) {
            const remainingOptions = sortedOptions.filter(opt => !states[opt.id]);
            for (const opt of remainingOptions) {
                if (currentScore + opt.weight <= targetScore) { // Only check if it doesn't exceed the target
                    states[opt.id] = true;
                    currentScore += opt.weight;
                }
            }
        }
        
        // Final adjustment: if currentScore is still less than targetScore, and we have unchecked options, 
        // check them if they bring us closer without going over 10.
        if (currentScore < targetScore) {
             const remainingOptions = sortedOptions.filter(opt => !states[opt.id]);
             for (const opt of remainingOptions) {
                if (currentScore < targetScore && currentScore + opt.weight <= 10) { // Check if still below target and won't exceed 10
                    states[opt.id] = true;
                    currentScore += opt.weight;
                }
            }
        }

        // Ensure no score exceeds 10 due to rounding/greedy logic
        const finalScoreFromStates = options.reduce((sum, opt) => sum + (states[opt.id] ? opt.weight : 0), 0);
        if (finalScoreFromStates > 10) {
            // If the sum somehow exceeds 10, uncheck from lowest weight until <=10 or no more can be unchecked
            const reverseSortedOptions = [...options].sort((a, b) => a.weight - b.weight);
            for (const opt of reverseSortedOptions) {
                if (states[opt.id] && finalScoreFromStates - opt.weight >= 0) { // Ensure we don't go negative
                    states[opt.id] = false;
                    finalScoreFromStates -= opt.weight;
                    if (finalScoreFromStates <= 10) break;
                }
            }
        }


        return states;
    }


    // --- FEATURE 2: PRESET DATA (NUMERICAL SCORES - WILL BE CONVERTED TO CHECKBOX STATES) ---
    // These are the source numerical scores based on research.
    // They will be converted to detailed checkbox states using _generateCheckboxStates.
    const rawPresets = {
        "United States": {
            2010: {P01:3, P02:5, P03:5, P04:6, P05:7, P06:1, P07:4, P08:5, P09:5, P10:5, P11:7, P12:3, P13:2, notes:"RPS state-led. PTC/ITC active. ISOs mature. No fed carbon tax."},
            2015: {P01:4, P02:6, P03:8, P04:7, P05:7, P06:2, P07:5, P08:6, P09:6, P10:6, P11:8, P12:4, P13:4, notes:"Clean Power Plan era. Corp PPAs take off. EIM grows."},
            2020: {P01:5, P02:7, P03:9, P04:7, P05:8, P06:2, P07:6, P08:7, P09:7, P10:8, P11:8, P12:5, P13:5, notes:"State targets aggressive. Tax equity mature. Offshore wind nascent."},
            2025: {P01:6, P02:8, P03:10, P04:8, P05:9, P06:3, P07:7, P08:8, P09:8, P10:10, P11:9, P12:7, P13:7, notes:"IRA dominance. No Fed Carbon Tax (State RGGI only)."}
        },
        "Germany": {
            2010: {P01:6, P02:5, P03:4, P04:6, P05:9, P06:5, P07:6, P08:5, P09:5, P10:7, P11:4, P12:6, P13:7, notes:"EEG FIT boom. ETS active but low price."},
            2015: {P01:6, P02:8, P03:6, P04:7, P05:7, P06:5, P07:7, P08:6, P09:6, P10:7, P11:4, P12:7, P13:8, notes:"Auction shift. Market coupling NWE. Grid expansion laws."},
            2020: {P01:7, P02:10, P03:8, P04:8, P05:6, P06:7, P07:7, P08:8, P09:7, P10:8, P11:4, P12:7, P13:9, notes:"Coal exit law. National carbon price (heating/transport)."},
            2025: {P01:7, P02:10, P03:9, P04:9, P05:6, P06:10, P07:8, P08:9, P09:8, P10:9, P11:5, P12:8, P13:10, notes:"EU ETS > €60 + CBAM. Aggressive 2030 targets."}
        },
        "Taiwan": {
            2010: {P01:1, P02:0, P03:0, P04:2, P05:5, P06:0, P07:2, P08:1, P09:1, P10:2, P11:2, P12:2, P13:2, notes:"Monopoly era. FIT introduced 2009."},
            2015: {P01:2, P02:0, P03:1, P04:2, P05:6, P06:0, P07:3, P08:2, P09:2, P10:3, P11:3, P12:3, P13:4, notes:"Slow liberalization. Solar/Wind targets set."},
            2020: {P01:4, P02:2, P03:5, P04:3, P05:7, P06:1, P07:4, P08:6, P09:4, P10:6, P11:4, P12:5, P13:7, notes:"2017 Act. Direct PPA legal. T-REC market start."},
            2025: {P01:5, P02:2, P03:7, P04:4, P05:7, P06:7, P07:6, P08:7, P09:6, P10:8, P11:5, P12:6, P13:9, notes:"Carbon Fee starts 2025 (~$10/t). Net Zero codified."}
        },
        "United Kingdom": {
            2010: {P01:7, P02:5, P03:6, P04:7, P05:8, P06:4, P07:6, P08:7, P09:6, P10:8, P11:5, P12:6, P13:8, notes:"Climate Change Act 2008. RO scheme."},
            2015: {P01:8, P02:8, P03:7, P04:8, P05:7, P06:6, P07:7, P08:8, P09:7, P10:8, P11:4, P12:7, P13:9, notes:"CfD introduction. Carbon Price Floor active."},
            2020: {P01:8, P02:7, P03:8, P04:8, P05:6, P06:7, P07:8, P08:8, P09:8, P10:9, P11:4, P12:8, P13:9, notes:"Net Zero 2050 law. Offshore wind leader. Brexit decoupling."},
            2025: {P01:8, P02:6, P03:9, P04:9, P05:6, P06:10, P07:8, P08:9, P09:9, P10:9, P11:5, P12:8, P13:10, notes:"Grid reform. Hydrogen/CCS support. High carbon price."}
        },
        "France": {
            2010: {P01:4, P02:5, P03:3, P04:5, P05:7, P06:4, P07:5, P08:5, P09:4, P10:6, P11:4, P12:6, P13:6, notes:"Nuclear dominant. FITs active."},
            2015: {P01:5, P02:8, P03:4, P04:6, P05:6, P06:5, P07:6, P08:6, P09:5, P10:7, P11:4, P12:7, P13:7, notes:"Energy Transition Law. Carbon tax component."},
            2020: {P01:5, P02:10, P03:6, P04:7, P05:6, P06:6, P07:7, P08:7, P09:6, P10:8, P11:5, P12:7, P13:8, notes:"PPE (Energy Plan). Green bonds sovereign leader."},
            2025: {P01:6, P02:10, P03:8, P04:8, P05:5, P06:10, P07:7, P08:8, P09:7, P10:8, P11:5, P12:8, P13:9, notes:"EU ETS High Price. Nuclear revival + RE acceleration."}
        },
        "Japan": {
            2010: {P01:2, P02:1, P03:1, P04:3, P05:4, P06:1, P07:3, P08:2, P09:2, P10:4, P11:3, P12:3, P13:4, notes:"Vertical monopoly. Kyoto Protocol."},
            2015: {P01:4, P02:4, P03:3, P04:4, P05:8, P06:1, P07:4, P08:3, P09:3, P10:5, P11:3, P12:4, P13:5, notes:"FIT boom. OCCTO created. Pre-2016 full retail opening."},
            2020: {P01:8, P02:6, P03:5, P04:5, P05:6, P06:2, P07:5, P08:5, P09:5, P10:7, P11:4, P12:5, P13:7, notes:"Post-2016 Full Retail Liberalization. 2050 Net Zero Pledge."},
            2025: {P01:8, P02:7, P03:7, P04:6, P05:5, P06:6, P07:6, P08:7, P09:6, P10:8, P11:5, P12:6, P13:8, notes:"GX League (Voluntary ETS). FIP introduced. Corporate PPAs growing."}
        },
        "South Korea": {
            2010: {P01:2, P02:0, P03:1, P04:3, P05:6, P06:1, P07:3, P08:2, P09:2, P10:4, P11:3, P12:4, P13:5, notes:"Green Growth strategy. RPS replaced FIT."},
            2015: {P01:3, P02:0, P03:1, P04:4, P05:7, P06:6, P07:4, P08:4, P09:3, P10:5, P11:4, P12:5, P13:6, notes:"ETS launched (first in East Asia)."},
            2020: {P01:4, P02:1, P03:3, P04:4, P05:7, P06:7, P07:5, P08:5, P09:5, P10:6, P11:5, P12:6, P13:8, notes:"Green New Deal. Net Zero pledge."},
            2025: {P01:5, P02:2, P03:6, P04:5, P05:6, P06:7, P07:6, P08:7, P09:6, P10:7, P11:5, P12:7, P13:8, notes:"Direct PPA active. K-ETS Price dropped (~$10)."}
        },
        "Australia": {
            2010: {P01:8, P02:8, P03:6, P04:8, P05:7, P06:0, P07:6, P08:7, P09:6, P10:6, P11:4, P12:5, P13:5, notes:"RET scheme. NEM energy-only market."},
            2015: {P01:8, P02:8, P03:7, P04:8, P05:6, P06:2, P07:7, P08:8, P09:7, P10:7, P11:4, P12:4, P13:4, notes:"Carbon tax repealed. RET uncertainty. CEFC/ARENA active."},
            2020: {P01:9, P02:8, P03:9, P04:9, P05:5, P06:2, P07:7, P08:8, P09:8, P10:8, P11:4, P12:5, P13:5, notes:"State-level leadership. Rooftop solar boom. Connection delays."},
            2025: {P01:9, P02:9, P03:9, P04:9, P05:6, P06:5, P07:8, P08:9, P09:9, P10:9, P11:5, P12:7, P13:9, notes:"Net Zero Law (2022). Safeguard Mechanism. State coal exits."}
        },
        "Canada": {
            2010: {P01:4, P02:6, P03:5, P04:5, P05:6, P06:3, P07:5, P08:4, P09:4, P10:6, P11:5, P12:5, P13:6, notes:"Ontario Green Energy Act. BC Carbon Tax."},
            2015: {P01:5, P02:7, P03:6, P04:6, P05:6, P06:4, P07:6, P08:5, P09:5, P10:7, P11:6, P12:6, P13:7, notes:"Coal phase-out started. Province-led."},
            2020: {P01:6, P02:8, P03:7, P04:6, P05:6, P06:7, P07:7, P08:6, P09:6, P10:8, P11:6, P12:7, P13:8, notes:"Federal Carbon Backstop. Net Zero 2050 Act."},
            2025: {P01:7, P02:9, P03:8, P04:7, P05:7, P06:9, P07:7, P08:7, P09:7, P10:9, P11:8, P12:7, P13:9, notes:"Federal Carbon Price >$60/t. ITC for Clean Tech."}
        },
        "Spain": {
            2010: {P01:5, P02:5, P03:4, P04:6, P05:8, P06:3, P07:6, P08:6, P09:5, P10:7, P11:4, P12:6, P13:7, notes:"FIT boom and bust (tariff deficit)."},
            2015: {P01:5, P02:8, P03:3, P04:6, P05:2, P06:3, P07:5, P08:6, P09:5, P10:5, P11:3, P12:5, P13:6, notes:"Sun Tax era. Stagnation."},
            2020: {P01:6, P02:9, P03:8, P04:7, P05:6, P06:5, P07:7, P08:7, P09:7, P10:7, P11:5, P12:8, P13:9, notes:"PNIEC (Plan). PPA leader in Europe. Auction return."},
            2025: {P01:7, P02:10, P03:9, P04:8, P05:7, P06:10, P07:8, P08:8, P09:8, P10:8, P11:6, P12:8, P13:9, notes:"EU ETS > €60. Storage strategy. High renewable penetration."}
        }
    };

    // --- Convert raw numerical presets to detailed checkbox states ---
    const presets = {};
    for (const country in rawPresets) {
        presets[country] = {};
        for (const year in rawPresets[country]) {
            const yearData = rawPresets[country][year];
            const convertedYearData = { notes: yearData.notes };
            for (const pid in yearData) {
                if (pid.startsWith('P') && policyOptionsMap[pid]) {
                    const score = yearData[pid];
                    convertedYearData[pid] = {
                        score: score,
                        checkboxes: _generateCheckboxStates(score, policyOptionsMap[pid])
                    };
                } else if (!pid.startsWith('P')) { // Copy other properties like 'notes'
                    convertedYearData[pid] = yearData[pid];
                }
            }
            presets[country][year] = convertedYearData;
        }
    }


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
        countryCheckboxes.innerHTML = Object.keys(rawPresets).map(country => `
            <label for="chk-${country}" class="flex items-center space-x-2 text-sm cursor-pointer">
                <input type="checkbox" id="chk-${country}" data-country="${country}" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <span>${lang[currentLang].countries[country] || country}</span>
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
        yearSelect.innerHTML = [...new Set(Object.values(rawPresets).flatMap(c => Object.keys(c)))].sort().map(y => `<option value="${y}">${y}</option>`).join('');
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
        const years = [...new Set(Object.values(rawPresets).flatMap(c => Object.keys(c)))].sort();
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
                    if (pid.startsWith('P') && yearData[pid].score !== undefined) {
                        tempState[pid] = yearData[pid].score;
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
                policyState[pid] = presetData[pid].score;
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
