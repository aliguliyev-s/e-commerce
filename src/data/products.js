// src/data/products.js

export const products = [
  // --- CLOTHING (1-9) ---
  {
    id: 1,
    title: "Waterproof Windbreaker Jacket",
    description: "Lightweight men's windbreaker, perfect for running and casual wear in rainy weather. Features waterproof fabric and an adjustable hood.",
    category: "Clothing",
    price: 85.00,
    reviewsCount: 12,
    colors: ["black", "blue", "grey"],
    sizes: ["S", "M", "L", "XL"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=500&auto=format&fit=crop"
      ],
      blue: [
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop"
      ],
      grey: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop"
      ]
    },
    stock: 15,
    isNew: true,
    salesCount: 120,
    specs: { "Material": "100% Nylon", "Origin": "Turkey", "Season": "Demi-season" }
  },
  {
    id: 2,
    title: "Classic Cotton Hoodie",
    description: "Ultra-soft fleece hoodie with a kangaroo pocket. Perfect for cozy days and casual street style.",
    category: "Clothing",
    price: 45.00,
    reviewsCount: 28,
    colors: ["black", "grey", "white"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=500&auto=format&fit=crop"
      ],
      grey: [
        "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1609873814058-a8928924184a?w=500&auto=format&fit=crop"
      ],
      white: [
        "https://images.unsplash.com/photo-1621905252507-b354bc25edac?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616166320015-419b48f695bb?w=500&auto=format&fit=crop"
      ]
    },
    stock: 22,
    isNew: false,
    salesCount: 450,
    specs: { "Material": "80% Cotton, 20% Polyester", "Origin": "Pakistan", "Season": "All-season" }
  },
  {
    id: 3,
    title: "Slim Fit Denim Jeans",
    description: "Classic blue jeans with a slight stretch for maximum comfort. Durable denim that lasts for years.",
    category: "Clothing",
    price: 59.99,
    reviewsCount: 19,
    colors: ["blue", "black"],
    sizes: ["30", "32", "34", "36"],
    images: {
      blue: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1582552938357-32b906df40cd?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop"
      ]
    },
    stock: 10,
    isNew: false,
    salesCount: 210,
    specs: { "Material": "98% Cotton, 2% Elastane", "Origin": "Egypt", "Style": "Slim Fit" }
  },
  {
    id: 4,
    title: "Oversized Summer T-Shirt",
    description: "Breathable heavy cotton t-shirt with a modern relaxed fit. Minimalist design for everyday wear.",
    category: "Clothing",
    price: 25.00,
    reviewsCount: 54,
    colors: ["white", "black", "green"],
    sizes: ["M", "L", "XL"],
    images: {
      white: [
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop"
      ],
      green: [
        "https://images.unsplash.com/photo-1574169208538-4f1726be539c?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=500&auto=format&fit=crop"
      ]
    },
    stock: 40,
    isNew: true,
    salesCount: 600,
    specs: { "Material": "100% Organic Cotton", "Weight": "240 GSM", "Origin": "Portugal" }
  },
  {
    id: 5,
    title: "Women's Linen Summer Dress",
    description: "Light and airy linen dress with a button-up front. Ideal for hot summer days and beach strolls.",
    category: "Clothing",
    price: 69.00,
    reviewsCount: 15,
    colors: ["beige", "white"],
    sizes: ["XS", "S", "M", "L"],
    images: {
      beige: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&auto=format&fit=crop"
      ],
      white: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&fit=crop"
      ]
    },
    stock: 7,
    isNew: true,
    salesCount: 35,
    specs: { "Material": "100% Linen", "Origin": "Italy", "Length": "Midi" }
  },
  {
    id: 6,
    title: "Chino Trousers",
    description: "Smart-casual chinos. Clean look suitable for both office hours and weekend dinners.",
    category: "Clothing",
    price: 49.50,
    reviewsCount: 33,
    colors: ["khaki", "blue", "black"],
    sizes: ["30", "32", "34", "36"],
    images: {
      khaki: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=500&auto=format&fit=crop"
      ],
      blue: [
        "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1506629082925-ff1f5dd5e88c?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=500&auto=format&fit=crop"
      ]
    },
    stock: 14,
    isNew: false,
    salesCount: 180,
    specs: { "Material": "97% Cotton, 3% Spandex", "Origin": "Turkey", "Fit": "Straight" }
  },
  {
    id: 7,
    title: "Knitted Winter Sweater",
    description: "Thick and warm cable-knit sweater made from premium wool blend to keep you warm during cold winters.",
    category: "Clothing",
    price: 75.00,
    reviewsCount: 41,
    colors: ["grey", "beige"],
    sizes: ["M", "L", "XL"],
    images: {
      grey: [
        "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop"
      ],
      beige: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=500&auto=format&fit=crop"
      ]
    },
    stock: 9,
    isNew: false,
    salesCount: 95,
    specs: { "Material": "50% Wool, 50% Acrylic", "Origin": "Ireland", "Care": "Hand wash only" }
  },
  {
    id: 8,
    title: "Athletic Sweatpants",
    description: "Comfortable sweatpants with zippered pockets and an adjustable drawcord waist. Perfect for gym or lounging.",
    category: "Clothing",
    price: 39.99,
    reviewsCount: 62,
    colors: ["grey", "black"],
    sizes: ["S", "M", "L", "XL"],
    images: {
      grey: [
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1483721310020-03333e577078?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1580906853203-f493cea9fc2a?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=500&auto=format&fit=crop"
      ]
    },
    stock: 30,
    isNew: false,
    salesCount: 540,
    specs: { "Material": "100% Polyester", "Origin": "China", "Features": "Moisture-wicking" }
  },
  {
    id: 9,
    title: "Puffer Down Jacket",
    description: "Heavyweight winter puffer jacket with eco-down insulation. Windproof and handles temperatures down to -15°C.",
    category: "Clothing",
    price: 149.99,
    reviewsCount: 20,
    colors: ["black", "red"],
    sizes: ["M", "L", "XL", "XXL"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop"
      ],
      red: [
        "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1604645511108-3868457c3230?w=500&auto=format&fit=crop"
      ]
    },
    stock: 5,
    isNew: true,
    salesCount: 40,
    specs: { "Insulation": "Eco-Down Synthetic", "Waterproof Rating": "5000mm", "Origin": "Vietnam" }
  },

  // --- FOOTWEAR (10-17) ---
  {
    id: 10,
    title: "Neo-Flex Running Shoes",
    description: "Professional running shoes with responsive cushioning. Breathable mesh ensures comfort during long marathons.",
    category: "Footwear",
    price: 120.00,
    reviewsCount: 45,
    colors: ["white", "red", "black"],
    sizes: ["40", "41", "42", "43", "44"],
    images: {
      white: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop"
      ],
      red: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1508345228704-935cc16cb560?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&fit=crop"
      ]
    },
    stock: 8,
    isNew: false,
    salesCount: 340,
    specs: { "Upper": "Textile Mesh", "Sole": "EVA Foam", "Weight": "280g" }
  },
  {
    id: 11,
    title: "Classic Leather Sneakers",
    description: "Minimalist white leather sneakers that complement any outfit, from casual denim to smart suits.",
    category: "Footwear",
    price: 95.00,
    reviewsCount: 88,
    colors: ["white", "black"],
    sizes: ["39", "40", "41", "42", "43", "44"],
    images: {
      white: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop"
      ]
    },
    stock: 12,
    isNew: false,
    salesCount: 710,
    specs: { "Material": "Genuine Calf Leather", "Sole": "Rubber", "Origin": "Portugal" }
  },
  {
    id: 12,
    title: "Suede Chelsea Boots",
    description: "Elegant suede boots with elastic side panels. Features a pull tab for easy slip-on wear.",
    category: "Footwear",
    price: 135.00,
    reviewsCount: 14,
    colors: ["brown", "grey"],
    sizes: ["40", "41", "42", "43"],
    images: {
      brown: [
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format&fit=crop"
      ],
      grey: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop"
      ]
    },
    stock: 6,
    isNew: true,
    salesCount: 55,
    specs: { "Material": "Premium Suede", "Lining": "Genuine Leather", "Origin": "Italy" }
  },
  {
    id: 13,
    title: "Outdoor Hiking Boots",
    description: "Heavy-duty trail boots with a deep tread rubber sole for ultimate traction and superior ankle support.",
    category: "Footwear",
    price: 160.00,
    reviewsCount: 29,
    colors: ["grey", "brown"],
    sizes: ["41", "42", "43", "44", "45"],
    images: {
      grey: [
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=500&auto=format&fit=crop"
      ],
      brown: [
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop"
      ]
    },
    stock: 4,
    isNew: false,
    salesCount: 140,
    specs: { "Features": "Waterproof Gore-Tex", "Sole": "Vibram Rubber", "Weight": "510g" }
  },
  {
    id: 14,
    title: "Urban Slip-on Loafers",
    description: "Sleek and casual canvas loafers designed for daily walking and warm summer weather.",
    category: "Footwear",
    price: 49.99,
    reviewsCount: 22,
    colors: ["blue", "grey"],
    sizes: ["40", "41", "42", "43", "44"],
    images: {
      blue: [
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&auto=format&fit=crop"
      ],
      grey: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=500&auto=format&fit=crop"
      ]
    },
    stock: 18,
    isNew: false,
    salesCount: 190,
    specs: { "Material": "Organic Canvas", "Sole": "Flexible Rubber", "Origin": "Spain" }
  },
  {
    id: 15,
    title: "Formal Oxford Dress Shoes",
    description: "Polished premium leather Oxford shoes with traditional brogue detailing. Essential for tuxedos and formal suits.",
    category: "Footwear",
    price: 180.00,
    reviewsCount: 10,
    colors: ["black", "brown"],
    sizes: ["41", "42", "43", "44"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop"
      ],
      brown: [
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1449247709967-d467c991279f?w=500&auto=format&fit=crop"
      ]
    },
    stock: 5,
    isNew: true,
    salesCount: 25,
    specs: { "Material": "Full Grain Leather", "Construction": "Goodyear Welted", "Origin": "UK" }
  },
  {
    id: 16,
    title: "Sporty Summer Sandals",
    description: "Adjustable strap sandals with an ergonomic footbed, perfect for beach trips and light outdoor walking.",
    category: "Footwear",
    price: 35.00,
    reviewsCount: 37,
    colors: ["black", "green"],
    sizes: ["39", "40", "41", "42", "43"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop"
      ],
      green: [
        "https://images.unsplash.com/photo-1574169208538-4f1726be539c?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop"
      ]
    },
    stock: 25,
    isNew: false,
    salesCount: 410,
    specs: { "Straps": "Heavy-duty Nylon", "Footbed": "Anatomical EVA", "Origin": "Vietnam" }
  },
  {
    id: 17,
    title: "Ankle Winter Boots",
    description: "Insulated waterproof boots lined with soft faux fur to keep your feet warm and dry through deep snow.",
    category: "Footwear",
    price: 110.00,
    reviewsCount: 18,
    colors: ["black", "brown"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1605733513597-a8f8d410fe3c?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop"
      ],
      brown: [
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&auto=format&fit=crop"
      ]
    },
    stock: 9,
    isNew: true,
    salesCount: 65,
    specs: { "Lining": "Faux Fur Insulation", "Upper": "Waterproof Nubuck", "Season": "Winter" }
  },

  // --- ACCESSORIES (18-24) ---
  {
    id: 18,
    title: "Leather Urban Backpack",
    description: "Sleek backpack crafted from genuine leather. Dedicated padded sleeve protects laptops up to 15.6 inches.",
    category: "Accessories",
    price: 65.50,
    reviewsCount: 8,
    colors: ["brown", "black"],
    sizes: ["One Size"],
    images: {
      brown: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=500&auto=format&fit=crop"
      ]
    },
    stock: 3,
    isNew: true,
    salesCount: 45,
    specs: { "Material": "Genuine Leather", "Volume": "20L", "Dimensions": "42x30x15 cm" }
  },
  {
    id: 19,
    title: "Aviator Sunglasses",
    description: "Classic polarized sunglasses with a durable metallic frame. 100% protection against harmful UV rays.",
    category: "Accessories",
    price: 29.99,
    reviewsCount: 104,
    colors: ["gold", "black", "silver"],
    sizes: ["Standard"],
    images: {
      gold: [
        "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&auto=format&fit=crop"
      ],
      silver: [
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop"
      ]
    },
    stock: 50,
    isNew: false,
    salesCount: 1200,
    specs: { "Lens Tech": "Polarized UV400", "Frame": "Stainless Steel", "Weight": "24g" }
  },
  {
    id: 20,
    title: "Minimalist Slim Wallet",
    description: "Front pocket RFID-blocking wallet made of top-grain leather. Holds up to 8 cards plus cash securely.",
    category: "Accessories",
    price: 22.00,
    reviewsCount: 56,
    colors: ["black", "brown", "grey"],
    sizes: ["Standard"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop"
      ],
      brown: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop"
      ],
      grey: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop"
      ]
    },
    stock: 35,
    isNew: false,
    salesCount: 850,
    specs: { "Material": "Top Grain Leather", "Security": "RFID Blocking", "Slots": "6 Card slots" }
  },
  {
    id: 21,
    title: "Stainless Steel Chronograph Watch",
    description: "Sophisticated analog quartz wristwatch with water resistance up to 50m. Suitable for professional and casual settings.",
    category: "Accessories",
    price: 199.00,
    reviewsCount: 13,
    colors: ["silver", "black"],
    sizes: ["42mm"],
    images: {
      silver: [
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&auto=format&fit=crop"
      ]
    },
    stock: 6,
    isNew: true,
    salesCount: 30,
    specs: { "Movement": "Japanese Quartz", "Case Material": "316L Stainless Steel", "Waterproof": "5 ATM" }
  },
  {
    id: 22,
    title: "Woolen Scarf and Beanie Set",
    description: "Matching winter set woven from heavy merino wool blend. Delivers premium softness and excellent warmth retention.",
    category: "Accessories",
    price: 34.50,
    reviewsCount: 27,
    colors: ["grey", "black", "blue"],
    sizes: ["One Size"],
    images: {
      grey: [
        "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&auto=format&fit=crop"
      ],
      blue: [
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500&auto=format&fit=crop"
      ]
    },
    stock: 15,
    isNew: false,
    salesCount: 220,
    specs: { "Material": "30% Merino Wool, 70% Acrylic", "Origin": "Turkey", "Gender": "Unisex" }
  },
  {
    id: 23,
    title: "Heavy-Duty Travel Suitcase",
    description: "Hard-shell polycarbonate luggage with multidirectional spinner wheels and a secure integrated TSA combination lock.",
    category: "Accessories",
    price: 125.00,
    reviewsCount: 31,
    colors: ["black", "grey"],
    sizes: ["Large"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500&auto=format&fit=crop"
      ],
      grey: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop"
      ]
    },
    stock: 8,
    isNew: true,
    salesCount: 75,
    specs: { "Material": "100% Polycarbonate", "Wheels": "360° Spinners", "Capacity": "95L" }
  },
  {
    id: 24,
    title: "Reversible Leather Belt",
    description: "Smart twist-buckle belt that easily switches between black and deep brown sides. Clean formal design.",
    category: "Accessories",
    price: 28.00,
    reviewsCount: 42,
    colors: ["black"],
    sizes: ["90", "95", "100", "105"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1624222247344-550fb8ef555d?w=500&auto=format&fit=crop"
      ]
    },
    stock: 20,
    isNew: false,
    salesCount: 310,
    specs: { "Material": "Split Leather", "Width": "3.5 cm", "Features": "Dual-sided reversible" }
  },

  // --- ELECTRONICS (25-30) ---
  {
    id: 25,
    title: "Wireless ANC Headphones",
    description: "Over-ear headphones equipped with advanced active noise cancellation and exceptional 40-hour battery life.",
    category: "Electronics",
    price: 150.00,
    reviewsCount: 92,
    colors: ["black", "silver"],
    sizes: ["Standard"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop"
      ],
      silver: [
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop"
      ]
    },
    stock: 11,
    isNew: false,
    salesCount: 580,
    specs: { "Bluetooth": "v5.2", "Battery Life": "Up to 40 Hours", "Driver Size": "40mm" }
  },
  {
    id: 26,
    title: "Smart Fitness Watch S3",
    description: "Sleek AMOLED fitness smartwatch with continuous heart rate monitoring, built-in GPS, and 14 sport modes tracking.",
    category: "Electronics",
    price: 89.99,
    reviewsCount: 64,
    colors: ["black", "pink"],
    sizes: ["Standard"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop"
      ],
      pink: [
        "https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=500&auto=format&fit=crop"
      ]
    },
    stock: 14,
    isNew: true,
    salesCount: 420,
    specs: { "Display": "1.43\" AMOLED", "Water Resistance": "IP68", "Battery": "Up to 7 Days" }
  },
  {
    id: 27,
    title: "Portable Bluetooth Speaker",
    description: "Compact outdoor wireless speaker with booming 20W sound output and fully waterproof IPX7 construction.",
    category: "Electronics",
    price: 45.00,
    reviewsCount: 115,
    colors: ["blue", "black", "red"],
    sizes: ["Standard"],
    images: {
      blue: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop"
      ],
      black: [
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop"
      ],
      red: [
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop"
      ]
    },
    stock: 25,
    isNew: false,
    salesCount: 930,
    specs: { "Power output": "20W RMS", "Waterproof": "IPX7", "Playtime": "12 Hours" }
  },
  {
    id: 28,
    title: "Ergonomic Mechanical Keyboard",
    description: "Tenkeyless layout keyboard with tactile hot-swappable brown switches and fully customizable RGB backlighting.",
    category: "Electronics",
    price: 79.50,
    reviewsCount: 38,
    colors: ["black", "white"],
    sizes: ["TKL (80%)"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop"
      ],
      white: [
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop"
      ]
    },
    stock: 7,
    isNew: true,
    salesCount: 130,
    specs: { "Switches": "Mechanical Brown", "Connection": "Detachable Type-C", "Backlight": "RGB" }
  },
  {
    id: 29,
    title: "Wireless Ergonomic Mouse",
    description: "High-precision vertical wireless mouse configured to naturally reduce wrist strain during long working hours.",
    category: "Electronics",
    price: 38.00,
    reviewsCount: 51,
    colors: ["black", "grey"],
    sizes: ["Standard"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop"
      ],
      grey: [
        "https://images.unsplash.com/photo-1625600243103-1dc6824c6c8a?w=500&auto=format&fit=crop"
      ]
    },
    stock: 16,
    isNew: false,
    salesCount: 380,
    specs: { "DPI Max": "4000 DPI", "Connection": "2.4GHz + BT", "Battery": "Rechargeable" }
  },
  {
    id: 30,
    title: "Fast Charging Power Bank",
    description: "Ultra-slim high capacity 20000mAh power bank supporting 22.5W Power Delivery fast charging standard.",
    category: "Electronics",
    price: 32.00,
    reviewsCount: 142,
    colors: ["black", "white"],
    sizes: ["20000mAh"],
    images: {
      black: [
        "https://images.unsplash.com/photo-1609592424364-7f2824e83713?w=500&auto=format&fit=crop"
      ],
      white: [
        "https://images.unsplash.com/photo-1623150502742-6a849aa94be4?w=500&auto=format&fit=crop"
      ]
    },
    stock: 45,
    isNew: false,
    salesCount: 1600,
    specs: { "Capacity": "20000mAh", "Max Output": "22.5W", "Ports": "2x USB-A, 1x USB-C PD" }
  }
];