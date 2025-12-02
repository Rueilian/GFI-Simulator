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
            countries: {
                "United States": "United States", "Germany": "Germany", "Taiwan": "Taiwan",
                "United Kingdom": "United Kingdom", "France": "France", "Japan": "Japan",
                "South Korea": "South Korea", "Australia": "Australia", "Canada": "Canada", "Spain": "Spain"
            }
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
            countries: {
                "United States": "美國", "Germany": "德國", "Taiwan": "台灣",
                "United Kingdom": "英國", "France": "法國", "Japan": "日本",
                "South Korea": "韓國", "Australia": "澳大利亞", "Canada": "加拿大", "Spain": "西班牙"
            }
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

    const indicatorWeights = {
        P01: { I_Market: 0.8, I_Mechanism: 0.2, I_Infra: 0.0 }, P02: { I_Market: 0.7, I_Mechanism: 0.1, I_Infra: 0.2 },
        P03: { I_Market: 0.9, I_Mechanism: 0.1, I_Infra: 0.0 }, P04: { I_Market: 0.4, I_Mechanism: 0.6, I_Infra: 0.0 },
        P05: { I_Market: 0.1, I_Mechanism: 0.7, I_Infra: 0.2 }, P06: { I_Market: 0.2, I_Mechanism: 0.8, I_Infra: 0.0 },
        P07: { I_Market: 0.1, I_Mechanism: 0.2, I_Infra: 0.7 }, P08: { I_Market: 0.3, I_Mechanism: 0.4, I_Infra: 0.3 },
        P09: { I_Market: 0.0, I_Mechanism: 0.2, I_Infra: 0.8 }, P10: { I_Market: 0.3, I_Mechanism: 0.4, I_Infra: 0.3 },
        P11: { I_Market: 0.2, I_Mechanism: 0.6, I_Infra: 0.2 }, P12: { I_Market: 0.2, I_Mechanism: 0.4, I_Infra: 0.4 },
        P13: { I_Market: 0.1, I_Mechanism: 0.5, I_Infra: 0.4 },
    };

    const presets = {
        "United States": {
            2010: {P01:3, P02:5, P03:5, P04:6, P05:5, P06:1, P07:4, P08:6, P09:3, P10:6, P11:8, P12:3, P13:3, notes:"Policy driven by state-level RPS & federal tax credits (ITC/PTC) from ARRA. No national carbon price or long-term targets. Fragmented wholesale markets, but competitive in major regions.", cn_notes:"政策由州級RPS和ARRA的聯邦稅收抵免（ITC/PTC）推動。沒有全國性的碳定價或長期目標。批發市場分散，但在主要地區具有競爭力。"},
            2015: {P01:4, P02:6, P03:6, P04:6, P05:6, P06:2, P07:5, P08:6, P09:5, P10:7, P11:8, P12:4, P13:5, notes:"Clean Power Plan proposed, spurring market optimism. Multi-year extension of federal tax credits (ITC/PTC) provides key investment certainty. Corporate PPAs continue to gain traction.", cn_notes:"清潔電力計劃提案激發市場樂觀情緒。聯邦稅收抵免（ITC/PTC）的多年延長提供了關鍵的投資確定性。企業PPA持續增長。"},
            2020: {P01:5, P02:6, P03:8, P04:6, P05:7, P06:2, P07:6, P08:7, P09:6, P10:8, P11:7, P12:4, P13:5, notes:"Energy Act of 2020 drives R&D, while ITC/PTC extensions continue. States like CA & NY push aggressive targets. Corporate procurement is a major force.", cn_notes:"2020年能源法案推動研發，ITC/PTC延長繼續。加州和紐約等州推動積極目標。企業採購成為主要力量。"},
            2025: {P01:6, P02:7, P03:9, P04:7, P05:8, P06:2, P07:7, P08:8, P09:7, P10:9, P11:9, P12:6, P13:8, notes:"IRA of 2022 provides long-term certainty and massive funding. Focus on domestic supply chains and grid build-out.", cn_notes:"2022年的IRA法案提供了長期確定性和大規模資金。重點關注國內供應鏈和電網建設。"}
        },
        "Germany": {
            2010: {P01:6, P02:7, P03:5, P04:6, P05:6, P06:4, P07:6, P08:6, P09:5, P10:7, P11:5, P12:7, P13:8, notes:"Energiewende and Energy Concept 2010 set ambitious long-term targets. EEG with high feed-in tariffs (FITs) drives strong renewable growth. Nuclear phase-out not yet decided.", cn_notes:"“能源轉型”和2010年能源概念設定了雄心勃勃的長期目標。EEG以高額上網電價（FITs）推動可再生能源強勁增長。尚未決定淘汰核能。"},
            2015: {P01:6, P02:7, P03:6, P04:7, P05:6, P06:5, P07:7, P08:7, P09:6, P10:7, P11:5, P12:7, P13:9, notes:"Shift from FITs to auctions (EEG 2014 reform) to control costs. Grid stability becomes a key concern. Nuclear phase-out remains on track.", cn_notes:"從FITs轉向拍賣（EEG 2014年改革）以控制成本。電網穩定性成為主要關注點。核能淘汰仍在軌道上。"},
            2020: {P01:7, P02:8, P03:6, P04:7, P05:5, P06:7, P07:7, P08:8, P09:7, P10:7, P11:5, P12:7, P13:9, notes:"EEG 2021 passed, setting 65% clean electricity by 2030 target. National carbon pricing introduced for transport/heating. Coal phase-out law passed. Corporate PPA market is emerging but not yet mature.", cn_notes:"EEG 2021通過，設定2030年65%清潔電力目標。為交通/供暖引入國家碳定價。煤炭淘汰法通過。企業PPA市場正在興起但尚未成熟。"},
            2025: {P01:7, P02:8, P03:8, P04:8, P05:5, P06:8, P07:8, P08:8, P09:8, P10:8, P11:6, P12:8, P13:10, notes:"Aggressive expansion targets (80% renewables by 2030, climate neutrality by 2045). Record growth in renewables, but challenges remain in meeting targets. Focus on streamlining permits and grid expansion.", cn_notes:"積極的擴張目標（2030年80%可再生能源，2045年氣候中和）。可再生能源創紀錄增長，但實現目標仍面臨挑戰。重點是簡化許可和電網擴張。"}
        },
        "Taiwan": {
            2010: {P01:1, P02:1, P03:1, P04:2, P05:3, P06:1, P07:2, P08:2, P09:1, P10:3, P11:2, P12:2, P13:3, notes:"Renewable Energy Development Act (REDA) passed in 2009 establishing FITs. Market remains state-dominated. Targets set, but actual capacity below goals.", cn_notes:"2009年通過《再生能源發展條例》（REDA），建立上網電價（FITs）。市場仍由國營主導。已設定目標，但實際容量低於目標。"},
            2015: {P01:3, P02:1, P03:2, P04:2, P05:4, P06:1, P07:3, P08:3, P09:2, P10:4, P11:3, P12:3, P13:6, notes:"Initial, slow liberalization efforts continue. Greenhouse Gas Reduction and Management Act ratified, setting long-term targets. Focus remains on solar and wind FITs.", cn_notes:"初步緩慢的自由化努力仍在繼續。《溫室氣體減量及管理法》批准，設定長期目標。重點仍在太陽能和風能的上網電價。"},
            2020: {P01:4, P02:2, P03:5, P04:3, P05:5, P06:2, P07:4, P08:6, P09:4, P10:6, P11:4, P12:5, P13:7, notes:"Electricity Act amendments enable direct PPAs. T-REC market established. Offshore wind development accelerates. Carbon pricing scheme integrated into climate legislation.", cn_notes:"《電業法》修正案啟用直接PPA。T-REC市場建立。離岸風電發展加速。碳定價方案納入氣候立法。"},
            2025: {P01:5, P02:3, P03:7, P04:4, P05:6, P06:4, P07:6, P08:7, P09:6, P10:7, P11:5, P12:6, P13:8, notes:"Ambitious renewable energy targets (20% by 2025) face challenges in implementation. Corporate PPAs are common. Carbon pricing/fees introduced. Grid constraints are emerging issues.", cn_notes:"雄心勃勃的可再生能源目標（到2025年佔20%）在實施中面臨挑戰。企業PPA很普遍。引入了碳定價/費用。電網限制是新出現的問題。"}
        },
        "United Kingdom": {
            2010: {P01:7, P02:7, P03:6, P04:7, P05:7, P06:5, P07:6, P08:7, P09:6, P10:7, P11:6, P12:6, P13:8, notes:"Bound by EU Renewable Energy Directive (15% by 2020). Renewables Obligation (RO) and Feed-in Tariffs (FiT) launched. Domestic target of 10% electricity from renewables by 2010 was missed.", cn_notes:"受歐盟可再生能源指令（到2020年佔15%）約束。啟動了可再生能源義務（RO）和上網電價（FiT）。未達到2010年國內10%電力來自可再生能源的目標。"},
            2015: {P01:8, P02:7, P03:7, P04:8, P05:7, P06:6, P07:7, P08:8, P09:7, P10:7, P11:5, P12:7, P13:9, notes:"Bound by EU 2020 targets. Renewables Obligation (RO), Feed-in Tariffs (FiT), Renewable Heat Incentive (RHI), and Contracts for Difference (CfDs) are key mechanisms. Electricity Market Reform (EMR) is implemented.", cn_notes:"受歐盟2020年目標約束。可再生能源義務（RO）、上網電價（FiT）、可再生熱能獎勵（RHI）和差價合約（CfDs）是關鍵機制。實施了電力市場改革（EMR）。"},
            2020: {P01:8, P02:8, P03:8, P04:8, P05:7, P06:7, P07:8, P08:8, P09:8, P10:8, P11:5, P12:8, P13:9, notes:"UK left EU. Legally binding net-zero target by 2050. Ten Point Plan for Green Industrial Revolution and Energy White Paper launched. CfDs and RHI continue, FiTs phasing out.", cn_notes:"英國脫歐。具有法律約束力的2050年淨零目標。啟動了綠色工業革命十點計劃和能源白皮書。CfDs和RHI繼續，FiTs逐步取消。"},
            2025: {P01:8, P02:8, P03:9, P04:9, P05:7, P06:8, P07:8, P08:9, P09:9, P10:8, P11:6, P12:8, P13:10, notes:"Ambitious targets (95% clean electricity by 2030, Net-Zero by 2050). Record renewable generation. CfDs are primary support, with new heat schemes. Grid infrastructure upgrades are a key challenge.", cn_notes:"雄心勃勃的目標（到2030年95%清潔電力，到2050年淨零）。可再生能源發電創紀錄。CfDs是主要支持，並有新的熱能計劃。電網基礎設施升級是關鍵挑戰。"}
        },
        "France": {
            2010: {P01:4, P02:6, P03:4, P04:5, P05:6, P06:4, P07:5, P08:5, P09:4, P10:6, P11:5, P12:6, P13:7, notes:"Bound by EU Renewable Energy Directive (23% by 2020 target). Grenelle laws emphasize climate action and renewables. Biofuels are a significant focus.", cn_notes:"受歐盟可再生能源指令（到2020年23%目標）約束。格蘭納勒法案強調氣候行動和可再生能源。生物燃料是重要焦點。"},
            2015: {P01:5, P02:7, P03:5, P04:6, P05:7, P06:5, P07:6, P08:6, P09:5, P10:7, P11:5, P12:7, P13:8, notes:"Law on Energy Transition for Green Growth (LTECV) sets ambitious targets: 32% renewables by 2030, 40% GHG reduction by 2030. Reforms support schemes.", cn_notes:"《綠色增長能源轉型法》（LTECV）設定了宏偉目標：到2030年可再生能源佔32%，到2030年溫室氣體減排40%。改革支持計劃。"},
            2020: {P01:5, P02:7, P03:7, P04:6, P05:6, P06:6, P07:6, P08:7, P09:6, P10:7, P11:6, P12:7, P13:8, notes:"Did not meet 2020 renewable energy target. Energy Transition Law and Energy and Climate Law set ambitious 2030 and 2050 targets. Carbon tax quadrupled.", cn_notes:"未達到2020年可再生能源目標。《能源轉型法》和《能源與氣候法》設定了雄心勃勃的2030年和2050年目標。碳稅增加了四倍。"},
            2025: {P01:6, P02:7, P03:8, P04:7, P05:7, P06:7, P07:7, P08:8, P09:7, P10:8, P11:7, P12:8, P13:9, notes:"Multiannual Energy Programme (PPE3) sets ambitious capacity targets for solar, wind, hydro, hydrogen, and biogas. Increased budget for energy transition. Carbon neutrality by 2050 target.", cn_notes:"多年能源計劃（PPE3）為太陽能、風能、水能、氫能和生物氣設定了宏偉的容量目標。增加了能源轉型的預算。目標是到2050年實現碳中和。"}
        },
         "Japan": {
            2010: {P01:2, P02:2, P03:2, P04:3, P05:4, P06:1, P07:3, P08:2, P09:2, P10:4, P11:3, P12:3, P13:4, notes:"Limited Feed-in Tariff (FIT) for surplus solar introduced. Renewable Portfolio Standard (RPS) in place but constrained. New administration expresses intent for more ambitious targets.", cn_notes:"為剩餘太陽能引入有限的上網電價（FIT）。可再生能源配額標準（RPS）已實施但受限。新政府表示有意制定更宏偉的目標。"},
            2015: {P01:4, P02:3, P03:4, P04:4, P05:8, P06:2, P07:5, P08:4, P09:3, P10:7, P11:4, P12:4, P13:6, notes:"Post-Fukushima energy policy shifts. Strong Feed-in Tariff (FIT) scheme drives significant solar PV growth, but faces grid connection challenges. METI proposes 22-24% renewables by 2030.", cn_notes:"福島後能源政策轉變。強勁的上網電價（FIT）計劃推動太陽能光伏顯著增長，但面臨電網連接挑戰。經濟產業省提議到2030年可再生能源佔比22-24%。"},
            2020: {P01:6, P02:4, P03:6, P04:5, P05:6, P06:3, P07:5, P08:6, P09:5, P10:7, P11:5, P12:5, P13:7, notes:"Prime Minister Suga declares 2050 net-zero target. Renewable energy share increases. Green Growth Strategy launched. Electricity retail market liberalized.", cn_notes:"菅義偉首相宣布2050年淨零目標。可再生能源份額增加。啟動綠色增長戰略。電力零售市場自由化。"},
            2025: {P01:7, P02:5, P03:7, P04:6, P05:6, P06:6, P07:6, P08:7, P09:6, P10:7, P11:6, P12:6, P13:8, notes:"7th Strategic Energy Plan (SEP) sets ambitious targets for 2040 and 2050 carbon neutrality. Renewables become mainstream, but growth in FIT/FIP schemes slows. Offshore wind auctions are active.", cn_notes:"第七個戰略能源計劃（SEP）設定了2040年和2050年碳中和的宏偉目標。可再生能源成為主流，但FIT/FIP計劃的增長放緩。海上風電拍賣活躍。"}
        },
        "South Korea": {
            2010: {P01:2, P02:2, P03:2, P04:3, P05:5, P06:1, P07:3, P08:3, P09:2, P10:4, P11:4, P12:4, P13:5, notes:"Low Carbon, Green Growth initiative and Green Growth Framework enacted. Feed-in Tariffs (FITs) in place. Targets for grid parity by 2020 and 11% renewables by 2030.", cn_notes:"頒布了低碳綠色增長倡議和綠色增長框架。實施了上網電價（FITs）。目標是到2020年實現電網友好，到2030年可再生能源佔比11%。"},
            2015: {P01:3, P02:2, P03:3, P04:4, P05:6, P06:4, P07:4, P08:4, P09:3, P10:5, P11:5, P12:5, P13:6, notes:"Nationwide Emissions Trading System (ETS) implemented. Feed-in Tariffs (FITs) terminated and replaced by Renewable Portfolio Standard (RPS). Ambitious investment plans.", cn_notes:"實施了全國性的排放交易體系（ETS）。終止了上網電價（FITs），並由可再生能源配額標準（RPS）取代。雄心勃勃的投資計劃。"},
            2020: {P01:4, P02:3, P03:5, P04:4, P05:7, P06:5, P07:5, P08:6, P09:5, P10:6, P11:6, P12:6, P13:8, notes:"Green New Deal (GND) launched, setting ambitious 2030 renewable targets. Commitment to carbon neutrality by 2050. Renewable Portfolio Standard (RPS) and K-ETS in place.", cn_notes:"綠色新政（GND）啟動，設定了雄心勃勃的2030年可再生能源目標。承諾到2050年實現碳中和。實施了可再生能源配額標準（RPS）和韓國排放交易體系（K-ETS）。"},
            2025: {P01:5, P02:4, P03:7, P04:5, P05:6, P06:6, P07:6, P08:7, P09:6, P10:7, P11:6, P12:7, P13:8, notes:"11th Basic Plan for Long-Term Electricity Supply and Demand (BPLE) sets ambitious targets (32.9% renewables by 2038). Carbon Neutrality Act in force. Grid bottlenecks and permitting challenges persist.", cn_notes:"第11個長期電力供需基本計劃（BPLE）設定了宏偉目標（到2038年可再生能源佔32.9%）。《碳中和法》生效。電網瓶頸和許可挑戰仍然存在。"}
        },
        "Australia": {
            2010: {P01:8, P02:7, P03:7, P04:8, P05:6, P06:1, P07:7, P08:8, P09:4, P10:8, P11:3, P12:5, P13:7, notes:"Expanded Renewable Energy Target (RET) aims for 20% renewables by 2020. RET split into Large-scale (LRET) and Small-scale (SRES). Relies on Renewable Energy Certificates (RECs).", cn_notes:"擴大的可再生能源目標（RET）旨在到2020年實現20%的可再生能源。RET分為大型（LRET）和小型（SRES）。依賴可再生能源證書（RECs）。"},
            2015: {P01:8, P02:7, P03:7, P04:7, P05:5, P06:1, P07:7, P08:8, P09:5, P10:7, P11:3, P12:4, P13:6, notes:"Large-scale Renewable Energy Target (LRET) reduced to 33,000 GWh by 2020 after political uncertainty. Carbon tax repealed. Energy White Paper 2015 released.", cn_notes:"在政治不確定性之後，大型可再生能源目標（LRET）到2020年減少到33,000 GWh。廢除了碳稅。發布了2015年能源白皮書。"},
            2020: {P01:9, P02:8, P03:9, P04:9, P05:4, P06:2, P07:7, P08:8, P09:6, P10:8, P11:4, P12:5, P13:6, notes:"Renewable Energy Target (RET) met in 2020, leading to record investment. Significant growth in solar. Uncertainty regarding future national policy direction post-RET.", cn_notes:"2020年實現了可再生能源目標（RET），導致創紀錄的投資。太陽能顯著增長。RET後未來國家政策方向不確定。"},
            2025: {P01:9, P02:9, P03:9, P04:9, P05:9, P06:6, P07:6, P08:9, P09:7, P10:10, P11:6, P12:7, P13:8, notes:"Legislated targets (82% renewables by 2030, 43% emissions reduction by 2030, Net-Zero by 2050). Powering Australia Plan and Capacity Investment Scheme (CIS) drive investment. Grid and planning challenges persist.", cn_notes:"立法目標（到2030年82%可再生能源，到2030年減排43%，到2050年淨零）。“為澳洲供電”計劃和容量投資計劃（CIS）推動投資。電網和規劃挑戰仍然存在。"}
        },
        "Canada": {
            2010: {P01:4, P02:6, P03:5, P04:5, P05:5, P06:3, P07:5, P08:4, P09:4, P10:6, P11:5, P12:5, P13:6, notes:"Federally, ecoENERGY programs and Renewable Fuel Regulations. Ontario's Green Energy Act with Feed-in Tariffs (FITs) and BC's Clean Energy Act drive provincial leadership in renewables.", cn_notes:"聯邦層面有ecoENERGY計劃和可再生燃料法規。安大略省的《綠色能源法》帶有上網電價（FITs），以及卑詩省的《清潔能源法》推動了省級在可再生能源方面的領先地位。"},
            2015: {P01:5, P02:6, P03:6, P04:6, P05:6, P06:5, P07:6, P08:5, P09:5, P10:7, P11:6, P12:6, P13:7, notes:"Federal GHG emissions reduction target (30% below 2005 levels by 2030). Provincial carbon pricing (cap-and-trade, carbon tax) gains traction. Canadian Energy Strategy promotes cooperation.", cn_notes:"聯邦溫室氣體減排目標（到2030年比2005年水平低30%）。省級碳定價（總量管制與交易，碳稅）獲得關注。加拿大能源戰略促進合作。"},
            2020: {P01:6, P02:7, P03:7, P04:6, P05:6, P06:7, P07:7, P08:6, P09:6, P10:7, P11:6, P12:7, P13:8, notes:"A Healthy Environment and a Healthy Economy plan launched, setting net-zero by 2050 target and 2035 clean electricity grid goal. Federal carbon tax in place.", cn_notes:"啟動了“健康環境與健康經濟”計劃，設定了2050年淨零目標和2035年清潔電網目標。聯邦碳稅已實施。"},
            "2025": {P01:7, P02:7, P03:8, P04:7, P05:6, P06:8, P07:7, P08:7, P09:7, P10:8, P11:7, P12:7, P13:8, notes:"Clean Electricity Regulations target net-zero grid by 2035. Significant investments and Clean Economy Investment Tax Credits (ITCs) drive growth. Methane emission reduction targets in place.", cn_notes:"清潔電力法規目標是到2035年實現淨零電網。重大投資和清潔經濟投資稅收抵免（ITCs）推動增長。甲烷減排目標已到位。"}
        },
        "Spain": {
            2010: {P01:5, P02:7, P03:4, P04:6, P05:6, P06:5, P07:6, P08:4, P09:4, P10:6, P11:4, P12:6, P13:8, notes:"Renewable Energy Plan (PER) 2005-2010 sets ambitious targets. Feed-in tariffs (FiTs) are key support, but significant cuts to subsidies begin in 2010.", cn_notes:"可再生能源計劃（PER）2005-2010設定了宏偉目標。上網電價（FiTs）是關鍵支持，但補貼的大幅削減始於2010年。"},
            2015: {P01:5, P02:7, P03:3, P04:6, P05:3, P06:5, P07:5, P08:4, P09:4, P10:3, P11:3, P12:4, P13:5, notes:"Significant cuts to renewable energy support and Feed-in Tariffs (FiTs). Controversial \"sun tax\" introduced, discouraging solar self-consumption. Aligned with EU 2020 targets.", cn_notes:"可再生能源支持和上網電價（FiTs）大幅削減。引入了有爭議的“太陽稅”，阻礙了太陽能自發自用。符合歐盟2020年目標。"},
            2020: {P01:7, P02:8, P03:7, P04:7, P05:6, P06:5, P07:7, P08:6, P09:7, P10:7, P11:5, P12:7, P13:8, notes:"Successfully met EU 2020 renewable energy target. \"Sun tax\" repealed. Renewable Energy Economic Regime (REER) auction-based system introduced. Integrated National Energy and Climate Plan (PNIEC) submitted.", cn_notes:"成功實現了歐盟2020年可再生能源目標。廢除了“太陽稅”。引入了基於拍賣的可再生能源經濟體制（REER）。提交了國家能源和氣候綜合計劃（PNIEC）。"},
            2025: {P01:7, P02:7, P03:8, P04:8, P05:7, P06:6, P07:6, P08:7, P09:8, P10:9, P11:6, P12:8, P13:9, notes:"Updated National Energy and Climate Plan (PNIEC) sets ambitious 2030 targets (81% renewable electricity). High renewable penetration, but grid curtailment is an emerging issue. Significant investment in grid development.", cn_notes:"更新的國家能源和氣候計劃（PNIEC）設定了宏偉的2030年目標（81%可再生電力）。可再生能源滲透率高，但電網限制是一個新興問題。電網發展投資巨大。"}
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
        countryCheckboxes.innerHTML = Object.keys(presets).map(country => {
            const translatedCountry = lang[currentLang].countries[country] || country;
            return `
            <label for="chk-${country}" class="flex items-center space-x-2 text-sm cursor-pointer">
                <input type="checkbox" id="chk-${country}" data-country="${country}" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <span>${translatedCountry}</span>
            </label>
        `}).join('');
        
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
                        // No countries are selected anymore, set header to 'User editing'
                        presetDisplayText.textContent = 'User editing';
                        presetDisplayHeader.classList.remove('hidden'); // Ensure it's visible
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
                return yearData ? calculateScores(yearData).overallScore : null;
            });
            
            const color = chartColors[index % chartColors.length];
            const translatedCountry = lang[currentLang].countries[country] || country;
            trendChart.data.datasets.push({
                label: translatedCountry,
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

    function updatePresetNotes(country, year) {
        const presetData = presets[country]?.[year];
        const translatedCountry = lang[currentLang].countries[country] || country;

        if (presetData) {
            const note = (currentLang === 'cn' && presetData.cn_notes) ? presetData.cn_notes : presetData.notes;
            presetNotesEl.textContent = note ? `Notes: ${note}` : '';
        } else if (country && year) {
            presetNotesEl.textContent = `Notes: No data for ${translatedCountry} in ${year}.`;
        } else {
            presetNotesEl.textContent = '';
        }
    }
    
    /** Load a preset into the sliders and update the UI */
    function loadPreset(country, year) {
        const presetData = presets[country]?.[year];
        const translatedCountry = lang[currentLang].countries[country] || country;
        
        if (!presetData) {
            presetDisplayText.textContent = "User editing (No data)";
            presetDisplayHeader.classList.remove('hidden'); 
            updatePresetNotes(country, year);
            return;
        }

        presetDisplayText.textContent = `${translatedCountry} - ${year}`;
        presetDisplayHeader.classList.remove('hidden'); 

        // Update policy state
        policyState = { ...presetData };

        // Update notes
        updatePresetNotes(country, year);

        // Update sliders
        for (const pid in policyState) {
            const slider = document.getElementById(pid);
            const valueDisplay = document.getElementById(`val-${pid}`);
            if (slider) {
                slider.value = policyState[pid];
            }
            if (valueDisplay) {
                valueDisplay.textContent = policyState[pid];
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
                
                // Clear preset notes. Update header text but keep it visible
                presetNotesEl.textContent = '';
                presetDisplayText.textContent = 'User editing';
                presetDisplayHeader.classList.remove('hidden');
                
                updateUI();
            });
        });
    }

    function renderReferences() {
        const references = {
            "United States": {
                "2010": ["insideclimatenews.org", "congress.gov", "streetwisereports.com", "energy.gov", "archives.gov", "aei.org", "eia.gov", "texaspolicy.com", "ucs.org", "efchina.org", "wikipedia.org", "smartcitiesdive.com", "ferc.gov", "texas.gov", "monitoringanalytics.com", "caiso.com"],
                "2015": ["cleantechlaw.com", "freshlawblog.com", "archives.gov", "usda.gov", "lse.ac.uk", "senate.gov", "dailyherald.com", "advancedenergyunited.org", "wikipedia.org", "energyandpolicy.org"],
                "2020": ["house.gov", "catf.us", "clearpath.org", "ncsl.org", "senate.gov", "energy.gov", "greenneedham.org", "williamsweese.com", "wri.org", "spglobal.com", "epa.gov", "huschblackwell.com", "thirdway.org", "whitehouse.gov"],
                "2025": ["epa.gov", "se.com", "astutepeople.com", "ul.com", "woodmac.com", "asuene.com", "solartopps.com", "potomaclaw.com", "plantemoran.com", "giia.net"]
            },
            "Germany": {
                "2010": ["wordpress.com", "dundarlaw.co.uk", "deutschland.de", "world-nuclear.org", "wikipedia.org"],
                "2015": ["eia.gov", "wikipedia.org", "centreforpublicimpact.org", "bundeswirtschaftsministerium.de", "agora-energiewende.org", "wind-energie.de", "climate-laws.org", "cleantechnica.com", "ieomsociety.org", "auswaertiges-amt.de"],
                "2020": ["iea.org", "cleanenergywire.org", "windows.net", "climatescorecard.org", "energytransition.org", "bundeswirtschaftsministerium.de", "synertics.io", "resource-southeast.eu", "resource-platform.eu", "bayern-innovativ.de", "dena.de", "agora-energiewende.org", "bdew.de", "semanticscholar.org", "smard.de", "wfw.com", "hsfkramer.com"],
                "2025": ["cleanenergywire.org", "review-energy.com", "renewable-ei.org", "windows.net", "bundeswirtschaftsministerium.de", "renewablesnow.com", "aoshearman.com", "infolink-group.com", "paul.tech", "strategicenergy.eu", "energymonitor.ai"]
            },
            "Taiwan": {
                "2010": ["taipeitimes.com", "wikipedia.org", "researchgate.net"],
                "2015": ["wikipedia.org", "trec.org.tw", "researchgate.net", "taere.org.tw"],
                "2020": ["wikipedia.org", "isdp.eu", "energeiaplus.com", "gcc.re", "moea.gov.tw", "taiwaninsight.org", "ey.gov.tw", "energypedia.info", "renewablesnow.com", "us-taiwan.org"],
                "2025": ["moea.gov.tw", "wikipedia.org", "sermsang.com", "eosglobalexpansion.com", "spglobal.com", "roc-taiwan.org", "ecct.com.tw", "ey.gov.tw", "pvknowhow.com", "tcan2050.org.tw", "amcham.com.tw", "ey.com", "thediplomat.com"]
            },
            "United Kingdom": {
                "2010": ["www.gov.uk", "wikipedia.org", "ref.org.uk", "theguardian.com", "industrialinfo.com", "parliament.uk", "renewableenergyworld.com", "service.gov.uk"],
                "2015": ["fullfact.org", "theguardian.com", "www.gov.uk", "service.gov.uk", "wikipedia.org", "legislation.gov.uk"],
                "2020": ["greenersolutionsgroup.co.uk", "service.gov.uk", "lowcarbonenergy.co", "wikipedia.org", "parliament.uk", "ecoe.org.uk", "www.gov.uk"],
                "2025": ["rsmuk.com", "switcheroo.co.uk", "service.gov.uk", "cladco.co.uk", "www.gov.uk", "parliament.uk", "aab.uk"]
            },
            "France": {
                "2010": ["lse.ac.uk", "euki.de", "ogel.org", "usda.gov", "wikipedia.org"],
                "2015": ["climate-laws.org", "billionbricks.org", "gide.com", "greeneconomycoalition.org", "planete-energies.com", "cms.law", "iea.org", "caneurope.org", "greenfinanceplatform.org", "theguardian.com"],
                "2020": ["wikipedia.org", "carbon-intel.com", "iddri.org", "dodspoliticalintelligence.com", "euractiv.com", "planete-energies.com", "ecologie.gouv.fr", "openenergytracker.org", "ratedpower.com", "renewablesnow.com", "cleanenergywire.org"],
                "2025": ["theelectricityhub.com", "surgepv.com", "rinnovabili.net", "europa.eu", "pv-magazine.com", "strategicenergy.eu", "pvknowhow.com", "energynews.pro", "argusmedia.com"]
            },
            "Japan": {
                "2010": ["iea.org", "carbon-intel.com", "re-policy.jp", "eco-business.com", "diva-portal.org", "jefma.or.jp", "japanfs.org"],
                "2015": ["researchgate.net", "ichigo-green.co.jp", "enerdata.net", "pv-magazine.com", "renewable-ei.org", "ieabioenergy.com", "wikipedia.org", "diva-portal.org", "japanfs.org"],
                "2020": ["energytracker.asia", "climate-transparency.org", "iea.org", "isep.or.jp", "japan.go.jp", "env.go.jp", "japan-clp.jp"],
                "2025": ["energytracker.asia", "edelmanglobaladvisory.com", "ashurst.com", "reglobal.org", "apnews.com", "eia.gov", "titanconsulting.jp", "pvknowhow.com"]
            },
            "South Korea": {
                "2010": ["berkeley.edu", "scispace.com", "seoulsolution.kr", "pew.org", "eco-business.com", "wikipedia.org"],
                "2015": ["industrialinfo.com", "mlex.com", "iaea.org", "climateactiontracker.org", "wikipedia.org", "windows.net", "renewable-ei.org", "fes.de", "ije-pyc.org", "scribd.com", "nautilus.org"],
                "2020": ["cms.law", "thecuriouseconomist.com", "oecd.org", "iea.org", "boell.org", "agora-energiewende.org", "wikipedia.org", "renewable-ei.org"],
                "2025": ["ieefa.org", "investkorea.org", "spglobal.com", "trade.gov", "esteri.it", "windows.net", "edcdn.com", "solarquarter.com", "ember-energy.org"]
            },
            "Australia": {
                "2010": ["energycouncil.com.au", "wikipedia.org", "pmc.gov.au", "cer.gov.au", "mondaq.com", "bsl.org.au"],
                "2015": ["cer.gov.au", "cleanenergycouncil.org.au", "apo.org.au", "cliffordchance.com", "wwf.org.au"],
                "2020": ["cer.gov.au", "rba.gov.au", "transparency.gov.au", "industry.gov.au"],
                "2025": ["solaremporium.com.au", "cyanergy.com.au", "pv-magazine-australia.com", "claytonutz.com", "dcceew.gov.au", "theguardian.com", "cleanenergycouncil.org.au"]
            },
            "Spain": {
                "2010": ["iea.org", "aip.org", "iisd.org", "unctad.org", "ratedpower.com", "theguardian.com", "manchester.ac.uk", "elpais.com"],
                "2015": ["ratedpower.com", "windows.net", "afi.es", "wikipedia.org", "renovablesverdes.com", "iea.org"],
                "2020": ["windows.net", "researchgate.net", "lamoncloa.gob.es", "wikipedia.org", "climatescorecard.org", "climate-laws.org", "reglobal.org"],
                "25": ["iea.org", "wikipedia.org", "climate-laws.org", "leadersleague.com", "pvknowhow.com", "strategicenergy.eu", "polaroo.com", "weforum.org", "enerdata.net", "business-sweden.com", "manglai.io"]
            }
        };

        const referencesContent = document.getElementById('references-content');
        let html = '';

        for (const country in references) {
            html += `<h4 class="font-bold mt-4">${country}</h4>`;
            const years = references[country];
            for (const year in years) {
                html += `<h5 class="font-semibold mt-2">${year}</h5>`;
                html += '<ul class="list-disc list-inside">';
                const sources = years[year];
                sources.forEach(ref => {
                    html += `<li>${ref}</li>`;
                });
                html += '</ul>';
            }
        }

        referencesContent.innerHTML = html;
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
        renderReferences();

        // Update chart labels
        radarChart.data.labels = [lang[currentLang].I_Market, lang[currentLang].I_Mechanism, lang[currentLang].I_Infra];
        
        // Restore checkbox state after re-render
        selectedCountries.forEach(country => {
            const chk = document.getElementById(`chk-${country}`);
            if(chk) chk.checked = true;
        });

        const countryToLoad = selectedCountries[0];
        const year = yearSelect.value;
        if (countryToLoad && !presetDisplayText.textContent.includes('User editing')) {
            const translatedCountry = lang[currentLang].countries[countryToLoad] || countryToLoad;
            presetDisplayText.textContent = `${translatedCountry} - ${year}`;
            updatePresetNotes(countryToLoad, year);
        }

        updateTrendChart();
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
        renderReferences();
        
        // Load initial state
        selectedCountries = ["United States"];
        document.getElementById('chk-United States').checked = true;
        yearSelect.value = "2025";
        loadPreset("United States", "2025");
        updateTrendChart();
    }

    init();
});