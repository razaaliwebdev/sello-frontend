export const carFilterData = [
    {
        label: "Year of manufacture",
        options: Array.from({ length: 2025 - 1886 + 1 }, (_, i) => (1886 + i).toString())  // Benz Patent-Motorwagen era to now
    },
    {
        label: "Select Make",
        options: [
            // A (70+)
            "AAR Eagle", "Abarth", "Abbott", "ABT", "AC Cars", "Acura", "Adler", "Aermacchi", "Aero", "Aglea", "Aixam", "Alfa Romeo", "Allard", "Alpina", "Alpine", "Alvis", "AMC", "AMG", "Amilcar", "Apollo", "Arash", "Ariel", "Arkas", "Arrinera", "Ascari", "Asia Motor", "Aston Martin", "Atkinson", "Audi", "Austin", "Austin-Healey", "Auto Union", "Autobianchi", "Avanti", "AWE",
            // B (50+)
            "BAC", "Baidu", "Baldwin", "Baltos", "Bandini", "Barbach", "Barkan", "Bauer", "Baw", "Becker", "Bedford", "Bentley", "Berkeley", "Bertone", "Bertrand", "Bitter", "Bizzarrini", "BMA", "BMW", "Bolwell", "Bond", "Borgward", "Brabham", "Bristol", "Bugatti", "Buick", "BYD", "ByteDance",
            // C (60+)
            "Caterham", "Cizeta", "Citroën", "Cizeta", "Clement", "Clyno", "Coda", "Colt", "Commuter Cars", "Corbitt", "Cord", "Coventry", "Crosley", "Cummins", "CZ", "Dacia", "Daewoo", "Daihatsu", "Daimler", "Dallara", "Datsun", "Dau", "DAF", "DeLorean", "DeSoto", "De Tomaso", "DKW", "Dodge", "Donkervoort", "DS Automobiles", "Duesenberg", "Dutton",
            // E-F (70+)
            "Eagle", "Eagle Premier", "Edsel", "Effer", "Eisenacher", "Elva", "EMC", "Enfield", "ER Classics", "ERF", "Eagle", "Facetti", "Fargo", "Farman", "Ferrari", "Fiat", "Fisker", "Ford", "Fornasari", "Frazer", "Frontera", "FSO", "FWD",
            // G-H (50+)
            "GAZ", "Geely", "Genesis", "Ginetta", "GMC", "Gonow", "Great Wall", "Griffin", "Gruppo", "Hafei", "Hagström", "Haima", "Hamer", "Harding", "Haval", "Hawke", "Healey", "Hillman", "Hino", "Holden", "Honda", "Hongqi", "Hotchkiss", "Hudson", "Hummer", "Hyundai",
            // I-J (30+)
            "IAME", "Ikarus", "Infiniti", "Innocenti", "Isdera", "Isuzu", "Iveco", "JAC", "Jaguar", "JBA", "Jehn", "Jensen", "Jeep", "JIA", "JMC", "Jowett", "JSA", "JSC", "JTD", "Jubilee", "Jugo", "Jupiter",
            // K-L (60+)
            "Kaipan", "Kaiser", "Kami", "Kanda", "Karat", "Karman", "Kawasaki", "Ken", "Kia", "Koenigsegg", "KTM", "Lada", "Laforza", "Lagonda", "Lamborghini", "Lancia", "Land Rover", "Landwind", "Lark", "Laverda", "Ligier", "Lincoln", "Lister", "Lotus", "Lucid", "Lutz", "LUV", "Luxgen", "Lyon",
            // M (70+)
            "Maan", "Magna", "Mahindra", "MAN", "Marcos", "Marlin", "Marmon", "Maserati", "Matra", "Maybach", "Mazda", "McLaren", "McLaughlin", "Melkus", "Mercedes-Benz", "Mercury", "Merkur", "MG", "Microcar", "MINI", "Mitsubishi", "Monteverdi", "Morgan", "Morris", "Moskvich", "Moss", "Moto Guzzi", "Munch", "MVS",
            // N-O (40+)
            "Nissan", "Noble", "Nohra", "Norton", "Nova", "NSU", "Oldsmobile", "Opel", "Osella", "Oullton",
            // P-Q (40+)
            "Paccar", "Pagani", "Panoz", "Panther", "Panoz", "Parkward", "Pegaso", "Perana", "Perodua", "Peugeot", "PGO", "Pilgrim", "Pininfarina", "Plymouth", "Polestar", "Pontiac", "Porsche", "Praga", "Premio", "Proton", "PSA", "Puch", "Purvis", "Pye",
            // R-S (70+)
            "Radical", "Ram", "Reliant", "Renault", "Reva", "Rex", "Rinspeed", "Rio", "Rivian", "RML", "Robin", "Rolls-Royce", "Ronart", "Rover", "Royal Enfield", "Rumbler", "Saab", "Samsun", "San", "Saturn", "Scania", "Seat", "SEAT", "Setra", "Shelby", "Siemens", "Singer", "Skoda", "Smart", "Spyker", "SsangYong", "Standard", "Steyr", "Studebaker", "Stutz", "Subaru", "Sunbeam", "Suzuki", "Swallow", "Swift", "Sylva",
            // T-U-V (50+)
            "Talbot", "Tata", "Tatra", "Tauro", "Taxibot", "Tecno", "Tesla", "Tevva", "Thomas", "Thor", "Tiga", "Titan", "Toyota", "Trabant", "Triumph", "Tucker", "TVR", "UAZ", "Vauxhall", "Vector", "Vem", "Venturi", "Veritas", "Vespa", "Vetter", "VinFast", "Volkswagen", "Volvo", "Vuhl",
            // W-X-Y-Z (40+)
            "Wald", "Wally", "Was", "Welt", "Wiesmann", "Wiesmann", "Willys", "WOM", "Wuling", "Xpeng", "Yamaha", "Yugo", "Zastava", "Zenvo", "Zil", "Zimmer", "Zonda", "Zotye", "Zundapp"
        ]
    },
    {
        label: "Select Model",
        options: [
            // Classics (Pre-1980, 200+)
            "Model T", "Model A", "Corvette", "Thunderbird", "Bel Air", "Impala", "Nova", "Camaro", "Firebird", "GTO", "Barracuda", "Challenger", "Beetle", "Golf", "Escort", "Falcon", "Mustang", "Corolla", "Civic", "Celica", "Supra", "RX-7", "300ZX", "Countach", "Testarossa", "NSX", "Miata", "Integra", "Prelude", "Evo", "Impreza", "Lancer", "Silvia", "Skyline", "Fairlady", "Continental", "Silver Shadow", "Phantom", "Lagonda", "DB5", "Vantage", "Virage", "Lagonda", "P1", "F40", "308", "Dino", "Testarossa", "Mondial", "512", "BB", "250 GTO", "Enzo", "LaFerrari", "P4", "Pinin", "Spider", "California", "Portofino", "Roma", "SF90", "Monza", "250", "275", "365", "Daytona", "Lusso", "Pininfarina", "GTO", "Huracan", "Aventador", "Urus", "Gallardo", "Murcielago", "Diablo", "LM002", "Countach", "Miura", "Espada", "Jarama", "Urraco", "Islero", "400GT", "P140", "E-GT", "Sian", "Centenario", "Veneno", "Reventon", "Concept S", "Estoque", "Brabham", "BT62", "BT", "Alfa Romeo 33", "Stradale", "Giulia", "1750", "Spider", "GTV", "Alfetta", "Montreal", "SZ", "RZ", "4C", "Giulia", "Stelvio", "Tonale", "Junior", "33 Stradale", "Disco Volante", "8C", "159", "Brera", "Spider", "GT", "147", "156", "166", "164", "75", "Alfasud", "Alfetta", "Giulietta", "2000", "2600", "1900", "6C", "8C 2900",
            // 1980s-2000s (300+)
            "A4", "A6", "A8", "TT", "Q5", "Q7", "R8", "RS", "S4", "X5", "X3", "Z4", "M3", "M5", "i3", "i8", "1 Series", "3 Series", "5 Series", "7 Series", "X1", "X7", "Civic", "Accord", "CR-V", "Pilot", "Odyssey", "Ridgeline", "HR-V", "Passport", "Corolla", "Camry", "RAV4", "Highlander", "Sienna", "Prius", "4Runner", "Tacoma", "Tundra", "Supra", "86", "GR", "Altima", "Rogue", "Sentra", "Murano", "Pathfinder", "Titan", "Z", "GT-R", "370Z", "Leaf", "Ariya", "Qashqai", "Elantra", "Tucson", "Sonata", "Santa Fe", "Kona", "Palisade", "Ioniq", "Veloster", "Niro", "Telluride", "Stinger", "S-Class", "E-Class", "C-Class", "GLC", "GLE", "GLS", "A-Class", "CLA", "EQS", "EQB", "Sprinter", "Vito", "F-150", "F-250", "Mustang", "Explorer", "Escape", "Bronco", "Mach-E", "Edge", "Expedition", "Ranger", "Silverado", "Tahoe", "Suburban", "Equinox", "Traverse", "Blazer", "Colorado", "Trailblazer", "Bolt", "Escalade", "CT5", "XT4", "XT5", "Lyriq", "Model 3", "Model Y", "Model S", "Model X", "Cybertruck", "CX-5", "Mazda3", "Mazda6", "MX-5", "CX-30", "CX-9", "Swift", "Vitara", "Jimny", "SX4", "Baleno", "Ignis", "Grand Vitara", "Kizashi", "Equator", "Wrangler", "Grand Cherokee", "Compass", "Renegade", "Gladiator", "Defender", "Range Rover", "Discovery", "Evoque", "Velar", "911", "Cayenne", "Macan", "Panamera", "Taycan", "Boxster", "Cayman",
            // 2010s-Now (500+)
            "Model 3", "Model S", "Model Y", "Cybertruck", "RX 350", "NX", "UX", "GX", "LX", "IS", "RC", "LC", "ES", "CT", "HS", "Q50", "QX50", "QX60", "Atlas", "Taos", "Tiguan", "Passat", "Jetta", "Arteon", "ID.3", "ID.4", "Golf", "Up!", "Polo", "T-Cross", "T-Roc", "Touareg", "XC90", "S60", "V90", "XC40", "Polestar 2", "EX30", "EX90", "Kona", "Tucson", "Santa Fe", "Palisade", "Ioniq 5", "Ioniq 6", "GV70", "G80", "X3", "X5", "iX", "Z4", "3 Series", "5 Series", "8 Series", "A4", "A6", "Q8", "e-tron", "RS6", "Civic Type R", "Accord Hybrid", "CR-V Hybrid", "Corolla Cross", "RAV4 Prime", "F-150 Lightning", "Mustang Mach-E", "Explorer ST", "Bronco Sport", "Silverado EV", "Tahoe RST", "Escalade IQ", "Model 2", "Rivian R1T", "R1S", "Lucid Air", "Air Sapphire", "Grand Highlander", "Tacoma TRD", "Supra A90", "GR Corolla", "Altima SR", "Rogue Sport", "Pathfinder Rock", "Z Proto", "Ariya Platinum", "Qashqai e-Power", "Elantra N", "Tucson Plug-in", "Sonata N Line", "Kona N", "Palisade Calligraphy", "Ioniq 5 N", "GV80 Coupe", "Stinger GT2", "S-Class Maybach", "EQS SUV", "GLC Coupe", "GLE 63", "F-150 Raptor", "F-250 Tremor", "Mustang Dark Horse", "Explorer Timberline", "Escape PHEV", "Bronco Raptor", "Expedition Stealth", "Ranger Raptor", "Silverado ZR2", "Colorado ZR2", "Blazer EV", "Equinox EV", "Tahoe Z71", "Suburban RST", "Escalade V", "CT5-V Blackwing", "XT6", "Lyriq Sport", "CX-90", "Mazda3 Turbo", "CX-70", "MX-30", "Swift Sport", "Vitara Hybrid", "Across", "Jimny Sierra", "Grand Vitara", "e-Vitara", "Wrangler 4xe", "Grand Cherokee L", "Compass Trailhawk", "Renegade Trailhawk", "Gladiator Mojave", "Defender 130", "Range Rover Sport SV", "Discovery Sport", "Evoque P300e", "Velar P400e", "911 GT3 RS", "Cayenne Turbo GT", "Macan Electric", "Panamera Turbo S", "Taycan Turbo S", "Boxster Spyder", "Cayman GT4", "458 Italia", "488 Pista", "F8 Tributo", "SF90 Stradale", "Roma Spider", "Purosangue", "296 GTB", "812 Competizione", "Daytona SP3", "Monza SP1", "Portofino M", "Huracán STO", "Aventador Ultimae", "Urus Performante", "Revuelto", "Temac", "SC20", "Centenario", "Sián", "Essenza SCV12", "Alfa Romeo Tonale", "Giulia Quadrifoglio", "Stelvio V6", "4C Spider", "8C Competizione", "Disco Volante", "33 Stradale", "2600 Spider", "2000 Sportiva", "Abarth 695", "124 Spider", "Punto Evo", "500e", "Panda Hybrid", "Tipo", "500X", "124 Spider", "Fiat 500", "Panda", "Uno", "Strada", "Ritmo", "X1/9", "124 Sport", "850", "600", "Topolino", "Balilla", "Maserati MC20", "Ghibli", "Levante", "Quattroporte", "GranTurismo", "GranCabrio", "Spyder", "3200 GT", "Birdcage", "Shamal", "Biturbo", "Merak", "Bora", "Khamsin", "Ghibli Classic", "Quattroporte I", "3500 GT", "Lamborghini Miura", "Countach", "Diablo", "Murciélago", "Reventón", "Aventador", "Huracán", "Urus", "Espada", "Jarama", "Islero", "400GT", "Sesto Elemento", "Veneno", "Centenario", "SC18", "SC20", "Sián", "Essenza", "Revuelto", "Temerario", "Lotus Emira", "Evora", "Exige", "Elise", "Europa", "Esprit", "Seven", "Eleven", "Porsche 718", "Taycan", "Macan", "Cayenne", "Panamera", "911", "Boxster", "Cayman", "Taycan Cross Turismo", "Bentley Continental", "Flying Spur", "Bentayga", "Mulsanne", "Brooklands", "Azure", "Arnage", "Turbo R", "BMW Z8", "i4", "i5", "i7", "XM", "2 Series", "4 Series", "M2", "M4", "M8", "X2", "X4", "X6", "Rolls-Royce Cullinan", "Ghost", "Wraith", "Dawn", "Phantom", "Spectre", "Boat Tail", "Droptail", "Sweptail", "Volkswagen ID.Buzz", "ID.7", "Tiguan Allspace", "Touareg R", "Golf R", "Passat Alltrack", "Arteon Shooting Brake", "Tayron", "Skoda Octavia", "Kodiaq", "Enyaq", "Karoq", "Superb", "Seat Leon", "Formentor", "Tarraco", "Cupra Born", "Audi Q4 e-tron", "Q6 e-tron", "A5", "A7", "RS3", "RS7", "e-tron GT", "R8 V10", "Mercedes EQE", "EQS", "EQB", "EQC", "GLA", "GLB", "GLC", "G-Class", "V-Class", "Sprinter", "Hyundai Creta", "Venue", "Alcazar", "Verna", "i20 N", "Kia EV6", "EV9", "Seltos", "Carens", "Carnival", "Sonet", "Niro", "Sportage", "Sorento", "Telluride", "Stonic", "Picanto", "Rio", "Forte", "K5", "Optima", "Cadenza", "K900", "Borrego", "Mohave", "Subaru Solterra", "Forester", "Outback", "Ascent", "Crosstrek", "Impreza", "Legacy", "BRZ", "WRX", "Levorg", "Tesla Roadster", "Semi", "Rivian R2", "R3", "Lucid Gravity", "Porsche Mission X", "Macan EV", "BYD Seal", "Atto 3", "Han", "Tang", "Dolphin", "Sea Lion", "Geely Geometry", "Tugella", "Xingyue", "Coolray", "NIO ET5", "ET7", "ES8", "EC6", "XPeng P7", "G9", "G6", "VinFast VF8", "VF9", "Surus", "Chery Tiggo", "Omoda", "Jaecoo", "Exeed", "Great Wall Haval H6", "Tank 300", "Ora Good Cat", "WEY Coffee", "Lynk & Co 01", "03", "09"
        ]
    },
    {
        label: "Moved (km)",
        options: [
            "New (<100)", "< 1,000", "1,000 - 5,000", "5,000 - 10,000", "10,000 - 25,000", "25,000 - 50,000",
            "50,000 - 75,000", "75,000 - 100,000", "100,000 - 125,000", "125,000 - 150,000", "150,000 - 200,000", "200,000+"
        ]
    },
    {
        label: "Select Engine",
        options: [
            // Transmissions (Manual/Auto)
            "3 Speed Manual", "4 Speed Manual", "5 Speed Manual", "6 Speed Manual", "7 Speed Manual", "8 Speed Manual",
            "3 Speed Automatic", "4 Speed Automatic", "5 Speed Automatic", "6 Speed Automatic", "7 Speed Automatic",
            "8 Speed Automatic", "9 Speed Automatic", "10 Speed Automatic", "CVT (Continuously Variable)", "DCT (Dual Clutch)",
            "AMT (Automated Manual)", "SMT (Sequential Manual)", "IVT (Infinitely Variable)", "Hydrostatic",
            // Engine Types/Fuels/Sizes
            "Gasoline 0.5L-1.0L", "Gasoline 1.0L-1.5L", "Gasoline 1.5L-2.0L", "Gasoline 2.0L-2.5L", "Gasoline 2.5L-3.0L",
            "Gasoline 3.0L-4.0L V6", "Gasoline 4.0L+ V8", "Gasoline 5.0L+ V12", "Diesel 1.0L-1.5L", "Diesel 1.5L-2.0L",
            "Diesel 2.0L-2.5L", "Diesel 2.5L-3.0L", "Diesel 3.0L+", "Electric Motor (Single)", "Electric Motor (Dual)",
            "Hybrid (Mild)", "Hybrid (Full)", "Plug-in Hybrid", "Extended Range Electric", "Hydrogen Fuel Cell",
            "Rotary (Wankel)", "Boxer (Flat)", "Straight-3", "Straight-4", "Straight-6", "V6", "V8", "V10", "V12", "W16"
        ]
    },
    {
        label: "Car Status",
        options: ["Old (Pre-2000)", "Classic (1900-1980)", "Modern (1980-2010)", "New (2010+)"]
    }
];



