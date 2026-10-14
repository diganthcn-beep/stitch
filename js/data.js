/**
 * Maison - Quiet Luxury Fashion House Catalog Dataset
 * Categories: Outerwear, Cashmere, Tailoring, Accessories
 */

const MAISON_PRODUCTS = [
  {
    id: 1,
    name: "The Structured Herringbone Overcoat",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: 1850,
    originalPrice: 1850,
    material: "100% Heavyweight Virgin Wool",
    color: "Camel & Bone Herringbone",
    colorHex: "#c8b29b",
    badge: "Iconic Piece",
    isLookbook: true,
    lookNumber: "Look 01",
    primaryImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFu10-LuEP5GWuf6zh2_k5LGDmPOPH1f5J9DfSQs2E85FCsvpAng1cvLgd1N0yZR3HqXmtFhTM6U_UlQMwhOtw-if2ib9yl0f6lfZSgPCmjo1OArRr5qljXEkEmLQu-jLSENtYV5zQ8cvxeAB4pLA-fZzQ3lcUK42Rsml8iEwhGrP6I946J8vQB0yGA-sz6UKojRzkGY3pXUHTUC1f6vgat3oloFMnHf6cCl47RVGPKbME4kH-LGe4",
    hoverImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFu10-LuEP5GWuf6zh2_k5LGDmPOPH1f5J9DfSQs2E85FCsvpAng1cvLgd1N0yZR3HqXmtFhTM6U_UlQMwhOtw-if2ib9yl0f6lfZSgPCmjo1OArRr5qljXEkEmLQu-jLSENtYV5zQ8cvxeAB4pLA-fZzQ3lcUK42Rsml8iEwhGrP6I946J8vQB0yGA-sz6UKojRzkGY3pXUHTUC1f6vgat3oloFMnHf6cCl47RVGPKbME4kH-LGe4",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5H8XhX5e0_rCc1QdyoRTGsMbONbi27TA4e1dZrytkPnKATF4RzgkhOuVL1X8jIwSvGp47h8885WWIQAQkYKr_mLUyaBl08lsRcsQszGm_k9lO6DNhShTM1KWQ42XSgZAVUtoU1PmunQyxa9zhd66ys-PNj_szeIcvP0RTjpDP2hsXamMorZQE9kwwHE7Gqnffwe2n3YKi86SG_KYP7rwtTaksfmG0uzdcS5ZS-hrp39_I_KmCgR-X"
    ],
    sizes: ["FR 36", "FR 38", "FR 40", "FR 42"],
    description: "Engineered from heavyweight virgin wool, featuring raw edges and structured shoulders that create a striking silhouette against the softer tones of autumn. Crafted in limited batches in Northern Italy.",
    details: [
      "Subtle peak lapels with raw-edge detailing",
      "Corozo nut button front closure",
      "Unlined interior with bound silk seam construction",
      "Deep interior welt pocket for archival documents",
      "Dry clean only by luxury textile specialists"
    ]
  },
  {
    id: 2,
    name: "The Mongolian Turtleneck",
    category: "cashmere",
    categoryLabel: "Cashmere",
    price: 680,
    originalPrice: 680,
    material: "100% Grade-A Mongolian Cashmere",
    color: "Charcoal Melange",
    colorHex: "#3b3c3d",
    badge: "Atelier Reserve",
    isLookbook: true,
    lookNumber: "Look 02",
    primaryImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAskewplDpopVpQS31Ln6koEce-9RjXbuSnLKjtXTDCWJW_Hyfy8MD-QaU7d7h4QhXKlLaXPiHg0_-wR1EL8UI8_MXdvDzmX541WhQFcfsu2mduy7OhlkvNhGiVCHcmzKZ2yx--Ld7JRfHxaOf6TLpjnaKel26Tgim0o-C7sQanlYjk1yLUxF3cKdiGgcakjGEYP2oygoHVuKfQJEjqOo_RprvaxkijIBtwZszphCW_H102W4kfjFqT",
    hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAskewplDpopVpQS31Ln6koEce-9RjXbuSnLKjtXTDCWJW_Hyfy8MD-QaU7d7h4QhXKlLaXPiHg0_-wR1EL8UI8_MXdvDzmX541WhQFcfsu2mduy7OhlkvNhGiVCHcmzKZ2yx--Ld7JRfHxaOf6TLpjnaKel26Tgim0o-C7sQanlYjk1yLUxF3cKdiGgcakjGEYP2oygoHVuKfQJEjqOo_RprvaxkijIBtwZszphCW_H102W4kfjFqT",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYRDOH8wjTS2Sf8kJQRIGEn_jZAKeMJgELU4NsL4R5dpITz67wf2CP9ebVY_Ri726rjb8D3Vt3WE4sy2pLtPuIta5815P2wpDgjdQPbrLBGUmD-u5o9nGgDBShO1BhQno1jG2ElXDLgxUr6TTtqF_sEpo_yq3n4OlHYOOQsrQnQ7kB6VaHVlumZ-ZxyeVhPpK3zJzqBm1QKDmEWuoykR9PsSXdVPoNvH4VwyOsqxCfqZPSmotHLZkU"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Knitted with 12-gauge double-ply cashmere yarn for unmatched density and softness. Provides effortless insulation with virtually zero weight, finished with seamless tubular cuffs.",
    details: [
      "12-gauge double-ply Mongolian cashmere yarn",
      "Seamless round-knit body for zero chafing",
      "Fold-over ribbed neck with gentle elasticity",
      "Sustainably harvested through ethical combing",
      "Hand wash cold with organic cashmere shampoo"
    ]
  },
  {
    id: 3,
    name: "Oversized Double-Faced Wrap Coat",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: 2400,
    originalPrice: 2400,
    material: "90% Virgin Wool, 10% Cashmere",
    color: "Warm Camel",
    colorHex: "#b58d63",
    badge: "Editorial Feature",
    isLookbook: false,
    primaryImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYqXk4jk-GHGzFEealKDY-Fgo-obwUzaS62CDCBJvO8z42cqBofhT_nBaWvbzjLKO8-4cdASYi1nDFUMImJPIGpVhZDKT3cCEhDnped34rIwdHK92Mf74Q53TU0YqNju353iUpesHCEt6lT-hKT-ekFsfvbAOl6OORLRUVrl8O9dvRgvY1dlRT9bRZ3lLYYaef6MBwaEtKYEd4CV40FJfelQLFs_SUwndFew3NPI3gR49yr1c1hLkd",
    hoverImage: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYqXk4jk-GHGzFEealKDY-Fgo-obwUzaS62CDCBJvO8z42cqBofhT_nBaWvbzjLKO8-4cdASYi1nDFUMImJPIGpVhZDKT3cCEhDnped34rIwdHK92Mf74Q53TU0YqNju353iUpesHCEt6lT-hKT-ekFsfvbAOl6OORLRUVrl8O9dvRgvY1dlRT9bRZ3lLYYaef6MBwaEtKYEd4CV40FJfelQLFs_SUwndFew3NPI3gR49yr1c1hLkd",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["FR 36", "FR 38", "FR 40"],
    description: "Cut from sumptuous double-faced wool-cashmere blend that is split and hand-sewn along every edge. Features an exaggerated notch lapel and matching self-tie sash.",
    details: [
      "Hand-finished double-face textile technique",
      "Removable matching wool-cashmere belt",
      "Deep slouch pockets seamlessly inserted into side seams",
      "Generous silhouette designed for layering over heavy knits",
      "Made in Biella, Italy"
    ]
  },
  {
    id: 4,
    name: "Pleated Wide-Leg Wool Trousers",
    category: "tailoring",
    categoryLabel: "Tailoring",
    price: 580,
    originalPrice: 580,
    material: "100% Super 130s Worsted Wool",
    color: "Charcoal Heather",
    colorHex: "#454547",
    badge: "Core Essential",
    isLookbook: false,
    primaryImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAjwoK906JidDjun4c_0g-dSxBXdiAx-boxxeiYNoDm1cPotW8SDRPoVei5HUvBSmB9yAtSfXpcvH1SrulJ1bpV2DnYZV1h9riK-5jx95Uu-WeetEVb2w24dFa5VDZbvji4Ecam-Tx06xUpLC24Cb9Rs63xEfPzw1Cpujpxeoutaud2b2Xn1UyHMOh2cm0nDVtGoSpIb8qMthuspFJbhl2RH7RoUZMMB6JqYMc8dDTAFrsauG1cTeA",
    hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAjwoK906JidDjun4c_0g-dSxBXdiAx-boxxeiYNoDm1cPotW8SDRPoVei5HUvBSmB9yAtSfXpcvH1SrulJ1bpV2DnYZV1h9riK-5jx95Uu-WeetEVb2w24dFa5VDZbvji4Ecam-Tx06xUpLC24Cb9Rs63xEfPzw1Cpujpxeoutaud2b2Xn1UyHMOh2cm0nDVtGoSpIb8qMthuspFJbhl2RH7RoUZMMB6JqYMc8dDTAFrsauG1cTeA",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["FR 36", "FR 38", "FR 40", "FR 42"],
    description: "Impeccably tailored trousers featuring double inverted front pleats and a relaxed wide leg that pools softly over leather footwear. Cut with a high-rise waist and interior curtain waistband.",
    details: [
      "Super 130s worsted wool from family-run English mills",
      "Extended tab waistband with concealed hook-and-bar",
      "Traditional bespoke curtain waistband interior",
      "Deep slant side pockets and rear welt pockets",
      "Unfinished hem ready for personalized atelier tailoring"
    ]
  },
  {
    id: 5,
    name: "Pure Ribbed Cashmere Folded Knit",
    category: "cashmere",
    categoryLabel: "Cashmere",
    price: 890,
    originalPrice: 890,
    material: "100% Organic Mongolian Cashmere",
    color: "Ivory & Raw Cream",
    colorHex: "#eee9df",
    badge: "Bestseller",
    isLookbook: false,
    primaryImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYRDOH8wjTS2Sf8kJQRIGEn_jZAKeMJgELU4NsL4R5dpITz67wf2CP9ebVY_Ri726rjb8D3Vt3WE4sy2pLtPuIta5815P2wpDgjdQPbrLBGUmD-u5o9nGgDBShO1BhQno1jG2ElXDLgxUr6TTtqF_sEpo_yq3n4OlHYOOQsrQnQ7kB6VaHVlumZ-ZxyeVhPpK3zJzqBm1QKDmEWuoykR9PsSXdVPoNvH4VwyOsqxCfqZPSmotHLZkU",
    hoverImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYRDOH8wjTS2Sf8kJQRIGEn_jZAKeMJgELU4NsL4R5dpITz67wf2CP9ebVY_Ri726rjb8D3Vt3WE4sy2pLtPuIta5815P2wpDgjdQPbrLBGUmD-u5o9nGgDBShO1BhQno1jG2ElXDLgxUr6TTtqF_sEpo_yq3n4OlHYOOQsrQnQ7kB6VaHVlumZ-ZxyeVhPpK3zJzqBm1QKDmEWuoykR9PsSXdVPoNvH4VwyOsqxCfqZPSmotHLZkU",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "An architectural study in ribbing and weight. Spun with un-dyed, naturally insulating fibers that retain the organic softness of raw cashmere. Cut with dropped shoulders and a boxy, cocooning drape.",
    details: [
      "Naturally pigmented yarn without chemical bleaching",
      "Wide fisherman rib stitch for thermal loft",
      "Chunky boatneck with rolled edge finish",
      "Relaxed dropped shoulders",
      "Artisan-certified Scottish mill knitting"
    ]
  },
  {
    id: 6,
    name: "Single-Breasted Atelier Wool Blazer",
    category: "tailoring",
    categoryLabel: "Tailoring",
    price: 1250,
    originalPrice: 1250,
    material: "100% Superfine Italian Virgin Wool",
    color: "Basalt Black",
    colorHex: "#222325",
    badge: "New Silhouette",
    isLookbook: false,
    primaryImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["FR 36", "FR 38", "FR 40", "FR 42"],
    description: "A masterclass in modern masculine-feminine balance. Structured internal floating canvas chest piece that gently molds to the wearer over time, paired with subtle padded shoulders.",
    details: [
      "Half-canvas construction with horsehair chest piece",
      "Notched lapel with hand-sewn boutonnière",
      "Genuine matte horn single-button closure",
      "Cupro jacquard lining with tonal Maison monogram",
      "Tailored in Naples, Italy"
    ]
  },
  {
    id: 7,
    name: "The Atelier Grained Calfskin Tote",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 1150,
    originalPrice: 1150,
    material: "100% Full-Grain French Calfskin",
    color: "Cognac Amber",
    colorHex: "#9b6034",
    badge: "Archival Leather",
    isLookbook: false,
    primaryImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["One Size"],
    description: "Constructed from supple French calfskin with a tactile pebble grain. Designed to accommodate daily essentials, 15-inch laptop, and documents with quiet understated confidence.",
    details: [
      "Hand-painted leather edges with four coats of matte sealant",
      "Interior zip pouch with magnetic security strap",
      "Brushed solid brass hardware with subtle patina",
      "Reinforced dual shoulder straps with 25cm drop",
      "Handcrafted in a historic Florence workshop"
    ]
  },
  {
    id: 8,
    name: "Mulberry Silk Twill Architectural Scarf",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 340,
    originalPrice: 340,
    material: "100% Mulberry Silk Twill (18mm)",
    color: "Bone & Charcoal Print",
    colorHex: "#d6d2cb",
    badge: "Limited Edition",
    isLookbook: false,
    primaryImage: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["90 x 90 cm"],
    description: "An homage to brutalist architecture and organic shadows. Screen-printed by hand in Lyon using traditional methods, finished with meticulously hand-rolled and hand-stitched borders.",
    details: [
      "18-momme heavyweight silk twill with fluid drape",
      "Artisan hand-rolled hems",
      "Original geometric architectural motif",
      "Delivered in custom Maison linen-wrapped gift box",
      "Made in Lyon, France"
    ]
  },
  {
    id: 9,
    name: "Minimalist Italian Vegetable-Tanned Belt",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 260,
    originalPrice: 260,
    material: "100% Tuscan Saddle Leather",
    color: "Saddle Tan & Brushed Brass",
    colorHex: "#7b4e28",
    badge: "Core Essential",
    isLookbook: false,
    primaryImage: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["75 cm", "85 cm", "95 cm"],
    description: "Cut from 3.5mm thick vegetable-tanned bridle leather from Tuscany. Develops a deep, rich patina with every year of wear. Completed with a custom sculpted buckle in brushed brass.",
    details: [
      "Tanned using natural chestnut and mimosa tannins",
      "Solid sand-cast brass buckle with matte brushed finish",
      "Hand-beveled and burnished wax edges",
      "Width: 32mm - tailored for suit trousers and denim alike",
      "Crafted in Tuscany, Italy"
    ]
  },
  {
    id: 10,
    name: "Cocoon Trench in Water-Repellent Gabardine",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: 1450,
    originalPrice: 1450,
    material: "100% Compact Organic Cotton Gabardine",
    color: "Muted Clay",
    colorHex: "#8f867c",
    badge: "Weatherproof Luxe",
    isLookbook: false,
    primaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["FR 36", "FR 38", "FR 40"],
    description: "A radical reimagining of the heritage trench coat. Unburdened by redundant straps or buckles, this piece relies solely on sculpture, deep storm flaps, and a voluminous draped hem.",
    details: [
      "Ultra-dense yarn weave with PFC-free water resistance",
      "Raglan sleeves for unencumbered movement",
      "Deep storm shield with internal ventilation",
      "Removable sash belt with hidden reinforcement",
      "Manufactured in Portugal"
    ]
  },
  {
    id: 11,
    name: "Fine-Gauge Cashmere Mock Neck",
    category: "cashmere",
    categoryLabel: "Cashmere",
    price: 520,
    originalPrice: 520,
    material: "100% 18-Gauge Pure Cashmere",
    color: "Oatmeal Melange",
    colorHex: "#d1c7b7",
    badge: "Second Skin",
    isLookbook: false,
    primaryImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Delicately spun at 18 gauge, this mock neck offers an ethereal layer of warmth under heavy tailored blazers and structured coats. Feather-light with a gossamer hand feel.",
    details: [
      "18-gauge ultra-fine knit construction",
      "Clean mock neck collar that sits smoothly against the throat",
      "Ribbed micro-cuffs and subtle side hem vents",
      "Natural antibacterial and thermal regulating properties",
      "Certified by the Good Cashmere Standard"
    ]
  },
  {
    id: 12,
    name: "Double-Breasted Flannel Suit Jacket",
    category: "tailoring",
    categoryLabel: "Tailoring",
    price: 1380,
    originalPrice: 1380,
    material: "100% Milled Wool Flannel (380g)",
    color: "Deep Midnight Slate",
    colorHex: "#2b2d35",
    badge: "Sartorial Edition",
    isLookbook: false,
    primaryImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["FR 36", "FR 38", "FR 40", "FR 42"],
    description: "Woven by a four-century-old mill in the foothills of the Italian Alps. The brushed flannel offers depth and chalky texture, cut in a 6x2 double-breasted arrangement with peak lapels.",
    details: [
      "380g heavyweight wool flannel with velvety nap",
      "Broad 11cm peak lapels with pick-stitch detailing",
      "Dual rear vents for effortless movement while seated",
      "Working cuff buttonholes (surgeon's cuffs)",
      "Made in Biella, Italy"
    ]
  }
];

const MAISON_LOOKBOOK = [
  {
    id: "look-01",
    sequence: "Look 01 — Sequence",
    title: "The Structured Herringbone Overcoat",
    description: "Engineered from heavyweight virgin wool, featuring raw edges and structured shoulders that create a striking silhouette against the softer tones of autumn.",
    productId: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFu10-LuEP5GWuf6zh2_k5LGDmPOPH1f5J9DfSQs2E85FCsvpAng1cvLgd1N0yZR3HqXmtFhTM6U_UlQMwhOtw-if2ib9yl0f6lfZSgPCmjo1OArRr5qljXEkEmLQu-jLSENtYV5zQ8cvxeAB4pLA-fZzQ3lcUK42Rsml8iEwhGrP6I946J8vQB0yGA-sz6UKojRzkGY3pXUHTUC1f6vgat3oloFMnHf6cCl47RVGPKbME4kH-LGe4"
  },
  {
    id: "look-02",
    sequence: "Look 02 — Sequence",
    title: "The Mongolian Turtleneck",
    description: "Knitted with 12-gauge double-ply cashmere yarn for an unmatched density and softness that provides effortless insulation with zero weight.",
    productId: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAskewplDpopVpQS31Ln6koEce-9RjXbuSnLKjtXTDCWJW_Hyfy8MD-QaU7d7h4QhXKlLaXPiHg0_-wR1EL8UI8_MXdvDzmX541WhQFcfsu2mduy7OhlkvNhGiVCHcmzKZ2yx--Ld7JRfHxaOf6TLpjnaKel26Tgim0o-C7sQanlYjk1yLUxF3cKdiGgcakjGEYP2oygoHVuKfQJEjqOo_RprvaxkijIBtwZszphCW_H102W4kfjFqT"
  }
];
