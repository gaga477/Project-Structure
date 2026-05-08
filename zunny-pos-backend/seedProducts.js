const mongoose = require("mongoose");
const Product = require("./models/product");
require("dotenv").config({ path: "./config/.env" });

const products = [
  {
    name: "Carotone BSC",
    price: 1200,
    costPrice: 1000,
    stock: 50,
    barcode: "CAR001",
    category: "Beauty & Skincare"
  },
  {
    name: "Disaar Cocoa Butter Stretch Mark",
    price: 3200,
    costPrice: 2800,
    stock: 30,
    barcode: "DIS001",
    category: "Beauty & Skincare"
  },
  {
    name: "Roushun Skin Care Vitamin C Serum",
    price: 2000,
    costPrice: 1700,
    stock: 25,
    barcode: "ROU001",
    category: "Beauty & Skincare"
  },
  {
    name: "Peak Milk 2500g",
    price: 32800,
    costPrice: 28000,
    stock: 8,
    barcode: "PEA001",
    category: "Dairy & Beverages"
  },
  {
    name: "Indomie Chicken Flavor Belleful 280g",
    price: 5000,
    costPrice: 4200,
    stock: 30,
    barcode: "IND002",
    category: "Food & Snacks"
  },
  {
    name: "Nivea Perfect & Radiant",
    price: 5000,
    costPrice: 4200,
    stock: 18,
    barcode: "NPR001",
    category: "Beauty & Skincare"
  },
  {
    name: "Coca-Cola 50cl",
    price: 600,
    costPrice: 500,
    stock: 50,
    barcode: "COC002",
    category: "Beverages"
  },
  {
    name: "Dettol 250ml",
    price: 5000,
    costPrice: 4200,
    stock: 15,
    barcode: "DET001",
    category: "Cleaning & Household"
  },
  {
    name: "Gluta White Face Cream",
    price: 1500,
    costPrice: 1200,
    stock: 40,
    barcode: "GLU001"
  },
  {
    name: "Dodo Skin Gold BSC",
    price: 1200,
    costPrice: 1000,
    stock: 35,
    barcode: "DOD001"
  },
  {
    name: "Pawpaw Face Cream",
    price: 1300,
    costPrice: 1100,
    stock: 45,
    barcode: "PAW001"
  },
  {
    name: "Perfect Glow BSC",
    price: 1700,
    costPrice: 1400,
    stock: 30,
    barcode: "PER001"
  },
  {
    name: "Sun Block",
    price: 1100,
    costPrice: 900,
    stock: 50,
    barcode: "SUN001"
  },
  {
    name: "Vista BSC",
    price: 1200,
    costPrice: 1000,
    stock: 40,
    barcode: "VIS001"
  },
  {
    name: "Dr Rashel Serum",
    price: 3250,
    costPrice: 2800,
    stock: 25,
    barcode: "DRR001"
  },
  {
    name: "Quick White Lotion",
    price: 4500,
    costPrice: 3800,
    stock: 20,
    barcode: "QWL001"
  },
  {
    name: "Foreign Extract Soap",
    price: 2500,
    costPrice: 2100,
    stock: 30,
    barcode: "FES001"
  },
  {
    name: "Idole White Soap",
    price: 2000,
    costPrice: 1700,
    stock: 35,
    barcode: "IWS001"
  },
  {
    name: "Veet Sticky Fresh",
    price: 4500,
    costPrice: 3800,
    stock: 15,
    barcode: "VSF001"
  },
  {
    name: "Rich & Pure Lotion",
    price: 4200,
    costPrice: 3600,
    stock: 20,
    barcode: "RPL001"
  },
  {
    name: "Pawpaw Body Lotion",
    price: 3200,
    costPrice: 2700,
    stock: 30,
    barcode: "PBL001"
  },
  {
    name: "Febreze Lenor",
    price: 5000,
    costPrice: 4200,
    stock: 15,
    barcode: "FEL001"
  },
  {
    name: "Elixir Light Lotion Small",
    price: 3800,
    costPrice: 3200,
    stock: 25,
    barcode: "SEL001"
  },
  {
    name: "Baby & Me Body Lotion",
    price: 1500,
    costPrice: 1200,
    stock: 40,
    barcode: "BMB001"
  },
  {
    name: "Ketineal Tube",
    price: 1500,
    costPrice: 1200,
    stock: 35,
    barcode: "KET001"
  },
  {
    name: "Got2b",
    price: 1500,
    costPrice: 1200,
    stock: 40,
    barcode: "G2B001"
  },
  {
    name: "Plastic Hair Wax",
    price: 1300,
    costPrice: 1100,
    stock: 45,
    barcode: "PHW001"
  },
  {
    name: "Face Primer",
    price: 1400,
    costPrice: 1150,
    stock: 35,
    barcode: "FPR001"
  },
  {
    name: "Skin Tone Body Lotion (Papaya Calamans)",
    price: 1600,
    costPrice: 1350,
    stock: 30,
    barcode: "STB001"
  },
  {
    name: "Visita Complexion Body Milk",
    price: 2400,
    costPrice: 2000,
    stock: 25,
    barcode: "VCB001"
  },
  {
    name: "Visita Lotion Big",
    price: 3400,
    costPrice: 2900,
    stock: 20,
    barcode: "VLB001"
  },
  {
    name: "Logan 3ni Boxer",
    price: 8000,
    costPrice: 6800,
    stock: 10,
    barcode: "L3B001"
  },
  {
    name: "Case Boxer",
    price: 5500,
    costPrice: 4700,
    stock: 15,
    barcode: "CBX001"
  },
  {
    name: "Kojic White",
    price: 5000,
    costPrice: 4200,
    stock: 18,
    barcode: "H1W001"
  },
  {
    name: "Bizmid Bath",
    price: 8300,
    costPrice: 7000,
    stock: 12,
    barcode: "BIZ001"
  },
  {
    name: "Nivea Cocoa",
    price: 4700,
    costPrice: 4000,
    stock: 20,
    barcode: "NIC001"
  },
  {
    name: "Nivea Perfect & Radiant",
    price: 5000,
    costPrice: 4200,
    stock: 18,
    barcode: "NPR001"
  },
  {
    name: "Nivea Rich Nourishing",
    price: 5000,
    costPrice: 4200,
    stock: 18,
    barcode: "NRN001"
  },
  {
    name: "Nivea Deep",
    price: 5000,
    costPrice: 4200,
    stock: 18,
    barcode: "NID001"
  },
  {
    name: "Nivea Even Glow",
    price: 5300,
    costPrice: 4500,
    stock: 16,
    barcode: "NEG001"
  },
  {
    name: "Small Nivea Perfect & Radiant",
    price: 3700,
    costPrice: 3100,
    stock: 25,
    barcode: "SNP001"
  },
  {
    name: "Nivea Rollon",
    price: 2000,
    costPrice: 1700,
    stock: 30,
    barcode: "NIR001"
  },
  {
    name: "Nivea Spray",
    price: 5300,
    costPrice: 4500,
    stock: 16,
    barcode: "NIS001"
  },
  {
    name: "Sanitol",
    price: 500,
    costPrice: 400,
    stock: 60,
    barcode: "SAN001"
  },
  {
    name: "Fresh Glow",
    price: 1000,
    costPrice: 800,
    stock: 50,
    barcode: "FRG001"
  },
  {
    name: "Mega Growth Breaker",
    price: 3000,
    costPrice: 2500,
    stock: 22,
    barcode: "MGB001"
  },
  {
    name: "Springles",
    price: 3000,
    costPrice: 2500,
    stock: 25,
    barcode: "SPR001"
  },
  {
    name: "Top Biscuit",
    price: 800,
    costPrice: 650,
    stock: 40,
    barcode: "TOP001"
  },
  {
    name: "Munch Kins Choco Biscuit",
    price: 500,
    costPrice: 400,
    stock: 50,
    barcode: "MKC001"
  },
  {
    name: "Tom Tom",
    price: 1100,
    costPrice: 900,
    stock: 35,
    barcode: "TOM001"
  },
  {
    name: "Shortbread Biscuit 200g",
    price: 2300,
    costPrice: 1900,
    stock: 30,
    barcode: "SHB001"
  },
  {
    name: "Short Biscuit",
    price: 1200,
    costPrice: 1000,
    stock: 35,
    barcode: "SHT001"
  },
  {
    name: "Shortbread Biscuit 300g",
    price: 3000,
    costPrice: 2500,
    stock: 25,
    barcode: "SHB002"
  },
  {
    name: "Coco Shop",
    price: 700,
    costPrice: 550,
    stock: 45,
    barcode: "COC001"
  },
  {
    name: "Butter Snack 50g",
    price: 450,
    costPrice: 350,
    stock: 60,
    barcode: "BUT001"
  },
  {
    name: "Choco Snacks 50g",
    price: 500,
    costPrice: 400,
    stock: 55,
    barcode: "CHS001"
  },
  {
    name: "Fab Chocolate 40g",
    price: 500,
    costPrice: 400,
    stock: 50,
    barcode: "FAB001"
  },
  {
    name: "Nice Biscuit 100g",
    price: 500,
    costPrice: 400,
    stock: 45,
    barcode: "NIC002"
  },
  {
    name: "Supreme Digestive Biscuit 200g",
    price: 500,
    costPrice: 400,
    stock: 40,
    barcode: "SUP001"
  },
  {
    name: "Extra Crunch Peanut Butter 500g",
    price: 2800,
    costPrice: 2300,
    stock: 20,
    barcode: "ECP001"
  },
  {
    name: "Extra Crunch Peanut Butter 300g",
    price: 1700,
    costPrice: 1400,
    stock: 25,
    barcode: "ECP002"
  },
  {
    name: "Plantain Chips 150g",
    price: 1500,
    costPrice: 1200,
    stock: 30,
    barcode: "PLC001"
  },
  {
    name: "Cake Confectioneries Chin Chin 1kg",
    price: 5000,
    costPrice: 4200,
    stock: 15,
    barcode: "CCC001"
  },
  {
    name: "Cake Confectioneries 500g",
    price: 2700,
    costPrice: 2200,
    stock: 20,
    barcode: "CAK001"
  },
  {
    name: "Softcare Baby Wipes 80 Sheets",
    price: 1500,
    costPrice: 1200,
    stock: 35,
    barcode: "SCB001"
  },
  {
    name: "Soft Care Baby Wipes 50 Sheets",
    price: 950,
    costPrice: 750,
    stock: 45,
    barcode: "SCB002"
  },
  {
    name: "Dry Love Face and Body Skin Wipes 100 Sheets",
    price: 2500,
    costPrice: 2000,
    stock: 25,
    barcode: "DLF001"
  },
  {
    name: "Big Soft Care Baby Wipes 120 Sheets",
    price: 1600,
    costPrice: 1300,
    stock: 30,
    barcode: "BSC001"
  },
  {
    name: "Dr Brown's Baby Wipes 80 Sheets",
    price: 1850,
    costPrice: 1500,
    stock: 28,
    barcode: "DBR001"
  },
  {
    name: "Peak 2500g",
    price: 32800,
    costPrice: 28000,
    stock: 8,
    barcode: "PEA001"
  },
  {
    name: "Peak 900g",
    price: 12500,
    costPrice: 10500,
    stock: 15,
    barcode: "PEA002"
  },
  {
    name: "Peak 400g",
    price: 6300,
    costPrice: 5300,
    stock: 20,
    barcode: "PEA003"
  },
  {
    name: "Bournvita 450g",
    price: 5450,
    costPrice: 4600,
    stock: 18,
    barcode: "BOU001"
  },
  {
    name: "Milo Refill 400g",
    price: 3850,
    costPrice: 3200,
    stock: 25,
    barcode: "MIL001"
  },
  {
    name: "Peak Refill 350g",
    price: 4100,
    costPrice: 3400,
    stock: 22,
    barcode: "PER001"
  },
  {
    name: "Loyal Refill 320g",
    price: 4250,
    costPrice: 3600,
    stock: 20,
    barcode: "LOY001"
  },
  {
    name: "Bournvita Refill 380g",
    price: 4450,
    costPrice: 3700,
    stock: 22,
    barcode: "BOR001"
  },
  {
    name: "Cowbell Refill 320g",
    price: 4000,
    costPrice: 3300,
    stock: 25,
    barcode: "COW001"
  },
  {
    name: "Milksi Refill 320g",
    price: 4000,
    costPrice: 3300,
    stock: 25,
    barcode: "MIK001"
  },
  {
    name: "Oats Cup 420g",
    price: 3400,
    costPrice: 2800,
    stock: 30,
    barcode: "OAT001"
  },
  {
    name: "Golden Morn 600g",
    price: 4000,
    costPrice: 3300,
    stock: 25,
    barcode: "GOM001"
  },
  {
    name: "Golden Morn 900g",
    price: 5500,
    costPrice: 4600,
    stock: 20,
    barcode: "GOM002"
  },
  {
    name: "Kellogg's Corn Flakes 300g",
    price: 2600,
    costPrice: 2200,
    stock: 25,
    barcode: "KEL001"
  },
  {
    name: "Milo Cup 400g",
    price: 6850,
    costPrice: 5800,
    stock: 18,
    barcode: "MIC001"
  },
  {
    name: "Nasco Cornflakes 350g",
    price: 2600,
    costPrice: 2200,
    stock: 25,
    barcode: "NAS001"
  },
  {
    name: "Royal Sardines 125g",
    price: 1100,
    costPrice: 900,
    stock: 40,
    barcode: "ROY001"
  },
  {
    name: "Ginny Sardines 125g",
    price: 1300,
    costPrice: 1100,
    stock: 35,
    barcode: "GIN001"
  },
  {
    name: "Big Bama 400g",
    price: 4900,
    costPrice: 4100,
    stock: 15,
    barcode: "BBA001"
  },
  {
    name: "Small Bama 200g",
    price: 1850,
    costPrice: 1500,
    stock: 30,
    barcode: "SBA001"
  },
  {
    name: "Whippy Middle 460g",
    price: 1850,
    costPrice: 1500,
    stock: 25,
    barcode: "WHI001"
  },
  {
    name: "Red Kidney Beans 200g",
    price: 850,
    costPrice: 700,
    stock: 35,
    barcode: "RKB001"
  },
  {
    name: "Sunripe Giant Marrowfat Peas 300g",
    price: 1200,
    costPrice: 1000,
    stock: 30,
    barcode: "SGM001"
  },
  {
    name: "Heinz Beans 200g",
    price: 800,
    costPrice: 650,
    stock: 40,
    barcode: "HEI001"
  },
  {
    name: "Sara Tomatoes Paste 210g",
    price: 850,
    costPrice: 700,
    stock: 35,
    barcode: "SAR001"
  },
  {
    name: "Green Giant 250g",
    price: 1250,
    costPrice: 1050,
    stock: 30,
    barcode: "GRG001"
  },
  {
    name: "Green Giant 115g",
    price: 800,
    costPrice: 650,
    stock: 40,
    barcode: "GRG002"
  },
  {
    name: "Knorr Season Cube 400g",
    price: 2200,
    costPrice: 1850,
    stock: 25,
    barcode: "KNO001"
  },
  {
    name: "Star Maggi 400g",
    price: 2000,
    costPrice: 1700,
    stock: 25,
    barcode: "STA001"
  },
  {
    name: "Thyme 10g",
    price: 800,
    costPrice: 650,
    stock: 50,
    barcode: "THY001"
  },
  {
    name: "Ducros 10g",
    price: 800,
    costPrice: 650,
    stock: 50,
    barcode: "DUC001"
  },
  {
    name: "Blue Pearl Coconut Milk 400ml",
    price: 2000,
    costPrice: 1700,
    stock: 20,
    barcode: "BPC001"
  },
  {
    name: "Fish Seasoning 198g",
    price: 1500,
    costPrice: 1250,
    stock: 30,
    barcode: "FIS001"
  },
  {
    name: "Whole Oregano 32g",
    price: 1200,
    costPrice: 1000,
    stock: 40,
    barcode: "WHO001"
  },
  {
    name: "Paprika 113g",
    price: 1800,
    costPrice: 1500,
    stock: 35,
    barcode: "PAP001"
  },
  {
    name: "Exeter Corned Beef 340g",
    price: 4000,
    costPrice: 3400,
    stock: 18,
    barcode: "EXE001"
  },
  {
    name: "Exeter Corned Beef 200g",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "EXE002"
  },
  {
    name: "Cowbell Chocolate Roll 20 Sachets",
    price: 6000,
    costPrice: 5100,
    stock: 12,
    barcode: "CCR001"
  },
  {
    name: "Cowbell Milk Roll 20 Sachets",
    price: 5000,
    costPrice: 4200,
    stock: 15,
    barcode: "CMR001"
  },
  {
    name: "Miksi Roll 20 Sachets",
    price: 600,
    costPrice: 500,
    stock: 30,
    barcode: "MIR001"
  },
  {
    name: "Milo 3in1 Roll 20 Sachets",
    price: 3400,
    costPrice: 2900,
    stock: 18,
    barcode: "M3R001"
  },
  {
    name: "Milo Roll 20 Sachets",
    price: 2500,
    costPrice: 2100,
    stock: 20,
    barcode: "MRO001"
  },
  {
    name: "Peak Roll 20 Sachets",
    price: 2500,
    costPrice: 2100,
    stock: 20,
    barcode: "PRO001"
  },
  {
    name: "Simas Cooking Margarine 250g",
    price: 1300,
    costPrice: 1100,
    stock: 25,
    barcode: "SIM001"
  },
  {
    name: "Golden Morn 45g Sachets Roll",
    price: 5000,
    costPrice: 4200,
    stock: 15,
    barcode: "GMR001"
  },
  {
    name: "Oats 30g Sachets Roll",
    price: 4000,
    costPrice: 3400,
    stock: 18,
    barcode: "OAR001"
  },
  {
    name: "Big Softcare 12 Rolls",
    price: 11000,
    costPrice: 9300,
    stock: 8,
    barcode: "BSC002"
  },
  {
    name: "Medium Softcare 6 Rolls",
    price: 6000,
    costPrice: 5100,
    stock: 12,
    barcode: "MSC001"
  },
  {
    name: "Small Softcare 3 Rolls",
    price: 1200,
    costPrice: 1000,
    stock: 25,
    barcode: "SSC001"
  },
  {
    name: "Big Kisskid 12 Rolls",
    price: 11000,
    costPrice: 9300,
    stock: 8,
    barcode: "BKK001"
  },
  {
    name: "Medium Kisskid 6 Rolls",
    price: 6000,
    costPrice: 5100,
    stock: 12,
    barcode: "MKK001"
  },
  {
    name: "Small Kisskid 3 Rolls",
    price: 1200,
    costPrice: 1000,
    stock: 25,
    barcode: "SKK001"
  },
  {
    name: "Viva Plus 1.7kg",
    price: 4500,
    costPrice: 3800,
    stock: 15,
    barcode: "VIV001"
  },
  {
    name: "Viva Plus 300g",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "VIV002"
  },
  {
    name: "So Klin 800g",
    price: 2200,
    costPrice: 1850,
    stock: 20,
    barcode: "SOK001"
  },
  {
    name: "Sure Clean 800g",
    price: 2100,
    costPrice: 1750,
    stock: 22,
    barcode: "SUR001"
  },
  {
    name: "Premier Care 175g",
    price: 750,
    costPrice: 600,
    stock: 35,
    barcode: "PRE001"
  },
  {
    name: "Viva Plus 170g",
    price: 500,
    costPrice: 400,
    stock: 40,
    barcode: "VIV003"
  },
  {
    name: "BNC 600ml",
    price: 3100,
    costPrice: 2600,
    stock: 18,
    barcode: "BNC001"
  },
  {
    name: "BNC 400ml",
    price: 2500,
    costPrice: 2100,
    stock: 22,
    barcode: "BNC002"
  },
  {
    name: "Toprank 300ml",
    price: 2500,
    costPrice: 2100,
    stock: 20,
    barcode: "TOP002"
  },
  {
    name: "Toprank 600ml",
    price: 3500,
    costPrice: 2950,
    stock: 15,
    barcode: "TOP003"
  },
  {
    name: "Sunshine Air Freshener 63g",
    price: 550,
    costPrice: 450,
    stock: 40,
    barcode: "SUN002"
  },
  {
    name: "Febreze Air Mist 2in1 185ml",
    price: 1200,
    costPrice: 1000,
    stock: 30,
    barcode: "FEB001"
  },
  {
    name: "Eva Soap 200g",
    price: 300,
    costPrice: 250,
    stock: 50,
    barcode: "EVA001"
  },
  {
    name: "Mama Lemon 1100ml",
    price: 2500,
    costPrice: 2100,
    stock: 20,
    barcode: "MAM001"
  },
  {
    name: "Scouring Powder 500g",
    price: 800,
    costPrice: 650,
    stock: 30,
    barcode: "SCO001"
  },
  {
    name: "Morning Fresh 1000ml",
    price: 2200,
    costPrice: 1850,
    stock: 22,
    barcode: "MOR001"
  },
  {
    name: "Z Germicide 140ml",
    price: 1000,
    costPrice: 800,
    stock: 35,
    barcode: "ZGE001"
  },
  {
    name: "Dettol 250ml",
    price: 5000,
    costPrice: 4200,
    stock: 15,
    barcode: "DET001"
  },
  {
    name: "Dettol 165ml",
    price: 3500,
    costPrice: 2950,
    stock: 20,
    barcode: "DET002"
  },
  {
    name: "Swiss Flower Air Freshener 500ml",
    price: 2500,
    costPrice: 2100,
    stock: 18,
    barcode: "SWI001"
  },
  {
    name: "Swiss Flower Air Freshener 250ml",
    price: 1500,
    costPrice: 1250,
    stock: 25,
    barcode: "SWI002"
  },
  {
    name: "Wind Air Freshener 300ml",
    price: 1800,
    costPrice: 1500,
    stock: 22,
    barcode: "WIN001"
  },
  {
    name: "Canoe Extract Care 220g",
    price: 800,
    costPrice: 650,
    stock: 30,
    barcode: "CAN001"
  },
  {
    name: "Baby and Me 200g",
    price: 600,
    costPrice: 500,
    stock: 35,
    barcode: "BAM002"
  },
  {
    name: "Canoe Extract 200g",
    price: 850,
    costPrice: 700,
    stock: 30,
    barcode: "CAN002"
  },
  {
    name: "Viva Plus Soap 200g",
    price: 800,
    costPrice: 650,
    stock: 40,
    barcode: "VIV004"
  },
  {
    name: "Hypo 1L",
    price: 2800,
    costPrice: 2350,
    stock: 15,
    barcode: "HYP001"
  },
  {
    name: "Hypo 500ml",
    price: 1700,
    costPrice: 1400,
    stock: 25,
    barcode: "HYP002"
  },
  {
    name: "Harpic 725ml",
    price: 4300,
    costPrice: 3650,
    stock: 12,
    barcode: "HAR001"
  },
  {
    name: "Harpic 450ml",
    price: 2700,
    costPrice: 2250,
    stock: 18,
    barcode: "HAR002"
  },
  {
    name: "Morning Fresh Dishwashing 450ml",
    price: 1600,
    costPrice: 1350,
    stock: 25,
    barcode: "MFD001"
  },
  {
    name: "Morning Fresh 200ml",
    price: 800,
    costPrice: 650,
    stock: 35,
    barcode: "MFR002"
  },
  {
    name: "Hypo Toilet Cleaner 5in1 450ml",
    price: 3800,
    costPrice: 3200,
    stock: 15,
    barcode: "HTC001"
  },
  {
    name: "Jim 950ml",
    price: 3500,
    costPrice: 2950,
    stock: 18,
    barcode: "JIM001"
  },
  {
    name: "Softwave Tissue Big Size",
    price: 800,
    costPrice: 650,
    stock: 30,
    barcode: "SWT001"
  },
  {
    name: "Soft Wave Tissue Small Size",
    price: 400,
    costPrice: 320,
    stock: 50,
    barcode: "SWT002"
  },
  {
    name: "Prorich Tissue Big Size",
    price: 800,
    costPrice: 650,
    stock: 30,
    barcode: "PRT001"
  },
  {
    name: "Colgate Toothpaste 130g",
    price: 1700,
    costPrice: 1400,
    stock: 25,
    barcode: "COL001"
  },
  {
    name: "Xtreme Fluoride Toothpaste 130g",
    price: 1050,
    costPrice: 850,
    stock: 30,
    barcode: "XTR001"
  },
  {
    name: "Oracare+ Toothpaste 130g",
    price: 1200,
    costPrice: 1000,
    stock: 28,
    barcode: "ORA001"
  },
  {
    name: "Closeup Toothpaste 130g",
    price: 1300,
    costPrice: 1100,
    stock: 25,
    barcode: "CLO001"
  },
  {
    name: "Pepsodent Toothpaste 130g",
    price: 1500,
    costPrice: 1250,
    stock: 25,
    barcode: "PEP001"
  },
  {
    name: "Oral-B Toothpaste 130g",
    price: 1300,
    costPrice: 1100,
    stock: 25,
    barcode: "ORB001"
  },
  {
    name: "Cobizco Pure Green Tea 2g Sachets",
    price: 3700,
    costPrice: 3100,
    stock: 15,
    barcode: "COB001"
  },
  {
    name: "Super Blended Green Tea 50g",
    price: 3700,
    costPrice: 3100,
    stock: 18,
    barcode: "SBG001"
  },
  {
    name: "Green Tea & Turmeric 50g (2g Sachets)",
    price: 3700,
    costPrice: 3100,
    stock: 18,
    barcode: "GTT001"
  },
  {
    name: "Impra Tea Black Tea Apple Cinnamon 60g",
    price: 4000,
    costPrice: 3400,
    stock: 15,
    barcode: "IMP001"
  },
  {
    name: "Natural Green Tea 50g",
    price: 3700,
    costPrice: 3100,
    stock: 18,
    barcode: "NGT001"
  },
  {
    name: "Impra Tea Black Tea Pineapple Flavored 60g",
    price: 4500,
    costPrice: 3800,
    stock: 15,
    barcode: "IMP002"
  },
  {
    name: "Tea Flavored 60g",
    price: 2500,
    costPrice: 2100,
    stock: 20,
    barcode: "TEA001"
  },
  {
    name: "Fat Burner Slimming Tea 50g",
    price: 5200,
    costPrice: 4400,
    stock: 12,
    barcode: "FBS001"
  },
  {
    name: "Lipton Yellow Label Tea 50g",
    price: 4000,
    costPrice: 3400,
    stock: 18,
    barcode: "LIP001"
  },
  {
    name: "Top Tea 50g",
    price: 800,
    costPrice: 650,
    stock: 30,
    barcode: "TOP004"
  },
  {
    name: "Toothpick Pack",
    price: 1000,
    costPrice: 800,
    stock: 40,
    barcode: "TOO001"
  },
  {
    name: "Robb 10g",
    price: 500,
    costPrice: 400,
    stock: 50,
    barcode: "ROB001"
  },
  {
    name: "Aboniki Balm 25g",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "ABO001"
  },
  {
    name: "Heavy Duty Refuse Sacks 20 Pieces",
    price: 3000,
    costPrice: 2500,
    stock: 20,
    barcode: "HDR001"
  },
  {
    name: "Nutribom Infant Cereal 350g",
    price: 2500,
    costPrice: 2100,
    stock: 20,
    barcode: "NUT001"
  },
  {
    name: "Checkers Milk Custard 3in1 400g",
    price: 3000,
    costPrice: 2500,
    stock: 18,
    barcode: "CHE001"
  },
  {
    name: "Checkers Custard Powder 100g",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "CHE002"
  },
  {
    name: "Checkers Custard Powder 2kg",
    price: 5000,
    costPrice: 4200,
    stock: 10,
    barcode: "CHE003"
  },
  {
    name: "Yoghurt Drink Sweetened 500ml",
    price: 3000,
    costPrice: 2500,
    stock: 15,
    barcode: "YOG001"
  },
  {
    name: "V-Smartic Wheat Flavoured Milk Drink 1L",
    price: 3000,
    costPrice: 2500,
    stock: 12,
    barcode: "VSM001"
  },
  {
    name: "Nutril-Milk 500ml",
    price: 5000,
    costPrice: 4200,
    stock: 15,
    barcode: "NTM001"
  },
  {
    name: "Nutril Choco 400ml",
    price: 4500,
    costPrice: 3800,
    stock: 18,
    barcode: "NTC001"
  },
  {
    name: "Peak Filled 140ml",
    price: 1100,
    costPrice: 900,
    stock: 40,
    barcode: "PEF001"
  },
  {
    name: "Three Crown 140ml",
    price: 900,
    costPrice: 750,
    stock: 45,
    barcode: "THC001"
  },
  {
    name: "Peak Full Cream 140ml",
    price: 900,
    costPrice: 750,
    stock: 45,
    barcode: "PFC001"
  },
  {
    name: "Dogans Sugar 485g",
    price: 1400,
    costPrice: 1150,
    stock: 25,
    barcode: "DOG001"
  },
  {
    name: "Golden Penny Spread 250g",
    price: 1200,
    costPrice: 1000,
    stock: 30,
    barcode: "GPS001"
  },
  {
    name: "Blue Band Original 250g",
    price: 2700,
    costPrice: 2250,
    stock: 20,
    barcode: "BBO001"
  },
  {
    name: "Blue Band Spread with Bread 250g",
    price: 2550,
    costPrice: 2150,
    stock: 22,
    barcode: "BBS001"
  },
  {
    name: "Blue Band Original 450g",
    price: 3750,
    costPrice: 3150,
    stock: 15,
    barcode: "BBO002"
  },
  {
    name: "Blue Band Spread for Bread 450g",
    price: 3650,
    costPrice: 3050,
    stock: 18,
    barcode: "BBS002"
  },
  {
    name: "Smirnoff Ice Double Black 440ml",
    price: 4000,
    costPrice: 3400,
    stock: 12,
    barcode: "SMI001"
  },
  {
    name: "Fayrouz Pineapple 330ml",
    price: 3500,
    costPrice: 2950,
    stock: 25,
    barcode: "FAY001"
  },
  {
    name: "Aquafina Water 75cl",
    price: 300,
    costPrice: 250,
    stock: 60,
    barcode: "AQU001"
  },
  {
    name: "Vita Milk 300ml",
    price: 4500,
    costPrice: 3800,
    stock: 20,
    barcode: "VIT001"
  },
  {
    name: "Pure Heaven 330ml",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "PUR001"
  },
  {
    name: "Malta Guinness 330ml",
    price: 4000,
    costPrice: 3400,
    stock: 20,
    barcode: "MAL001"
  },
  {
    name: "Lactogen (1) 400g",
    price: 8000,
    costPrice: 6800,
    stock: 10,
    barcode: "LAC001"
  },
  {
    name: "Lactogen (2) 400g",
    price: 8000,
    costPrice: 6800,
    stock: 10,
    barcode: "LAC002"
  },
  {
    name: "Geisha 5.5oz",
    price: 4000,
    costPrice: 3400,
    stock: 15,
    barcode: "GEI001"
  },
  {
    name: "NAN 1 400g",
    price: 10500,
    costPrice: 8900,
    stock: 8,
    barcode: "NAN001"
  },
  {
    name: "NAN 2 400g",
    price: 10500,
    costPrice: 8900,
    stock: 8,
    barcode: "NAN002"
  },
  {
    name: "Peak Baby 400g",
    price: 9500,
    costPrice: 8100,
    stock: 10,
    barcode: "PEB001"
  },
  {
    name: "Ayoola Plantain Flour 0.9kg",
    price: 3800,
    costPrice: 3200,
    stock: 15,
    barcode: "AYP001"
  },
  {
    name: "Ayoola Poundo Yam Flour 0.9kg",
    price: 3900,
    costPrice: 3300,
    stock: 15,
    barcode: "AYY001"
  },
  {
    name: "Maharani Basmati Rice 1kg",
    price: 4300,
    costPrice: 3650,
    stock: 20,
    barcode: "MAH001"
  },
  {
    name: "Maharani Basmati Rice 5kg",
    price: 18800,
    costPrice: 16000,
    stock: 8,
    barcode: "MAH002"
  },
  {
    name: "Golden Penny Pasta TWIST 500g",
    price: 1200,
    costPrice: 1000,
    stock: 30,
    barcode: "GPT001"
  },
  {
    name: "Golden Penny Spaghetti 500g",
    price: 1200,
    costPrice: 1000,
    stock: 30,
    barcode: "GPS002"
  },
  {
    name: "Alfa Tomato Ketchup 305ml",
    price: 1800,
    costPrice: 1500,
    stock: 25,
    barcode: "ALF001"
  },
  {
    name: "HEINZ Tomato Ketchup 295g",
    price: 2500,
    costPrice: 2100,
    stock: 20,
    barcode: "HEI002"
  },
  {
    name: "Sweet Chilli Sauce 150ml",
    price: 1500,
    costPrice: 1250,
    stock: 25,
    barcode: "SWC001"
  },
  {
    name: "Dark Soy Sauce 150ml",
    price: 1400,
    costPrice: 1150,
    stock: 30,
    barcode: "DSS001"
  },
  {
    name: "Premium Oyster Sauce 150ml",
    price: 4000,
    costPrice: 3400,
    stock: 15,
    barcode: "POS001"
  },
  {
    name: "Light Soy Sauce 150ml",
    price: 3500,
    costPrice: 2950,
    stock: 20,
    barcode: "LSS001"
  },
  {
    name: "Blended Sesame Oil 150ml",
    price: 4000,
    costPrice: 3400,
    stock: 15,
    barcode: "BSO001"
  },
  {
    name: "Emma Coconut Cream Powder 50g",
    price: 3000,
    costPrice: 2500,
    stock: 25,
    barcode: "ECC001"
  },
  {
    name: "Salt 1kg",
    price: 3000,
    costPrice: 2500,
    stock: 30,
    barcode: "SAL001"
  },
  {
    name: "Indomie Sugar Pack 120g",
    price: 3500,
    costPrice: 2950,
    stock: 40,
    barcode: "IND001"
  },
  {
    name: "Indomie Chicken Flavor Belleful 280g",
    price: 5000,
    costPrice: 4200,
    stock: 30,
    barcode: "IND002"
  },
  {
    name: "Indomie Hungryman Size 180g",
    price: 6500,
    costPrice: 5500,
    stock: 25,
    barcode: "IND003"
  },
  {
    name: "Banga Red Palm Oil 4L",
    price: 12100,
    costPrice: 10300,
    stock: 8,
    barcode: "BAN001"
  },
  {
    name: "Banga Red Palm Oil 2L",
    price: 6800,
    costPrice: 5800,
    stock: 12,
    barcode: "BAN002"
  },
  {
    name: "Laziz Oil 5L",
    price: 19000,
    costPrice: 16200,
    stock: 6,
    barcode: "LAZ001"
  },
  {
    name: "Laziz Premium Oil 5L",
    price: 19000,
    costPrice: 16200,
    stock: 6,
    barcode: "LAZ002"
  },
  {
    name: "Active Gold 5L",
    price: 19000,
    costPrice: 16200,
    stock: 6,
    barcode: "ACT001"
  },
  {
    name: "Golden Terra Oil 5L",
    price: 17000,
    costPrice: 14500,
    stock: 8,
    barcode: "GTO001"
  },
  {
    name: "Kings Oil 2L",
    price: 8600,
    costPrice: 7300,
    stock: 10,
    barcode: "KIN001"
  },
  {
    name: "King Oil 1L",
    price: 4700,
    costPrice: 4000,
    stock: 15,
    barcode: "KIN002"
  },
  {
    name: "Power Oil 75cl",
    price: 3500,
    costPrice: 2950,
    stock: 20,
    barcode: "POW001"
  },
  {
    name: "Golden Terra Oil 1L",
    price: 2900,
    costPrice: 2450,
    stock: 18,
    barcode: "GTO002"
  },
  {
    name: "Fearless Energy Drink 500ml",
    price: 6000,
    costPrice: 5100,
    stock: 15,
    barcode: "FEA001"
  },
  {
    name: "Fanta 50cl",
    price: 500,
    costPrice: 400,
    stock: 50,
    barcode: "FAN001"
  },
  {
    name: "Coca-Cola 50cl",
    price: 600,
    costPrice: 500,
    stock: 50,
    barcode: "COC002"
  },
  {
    name: "Predictor Energy Drink 400ml",
    price: 7000,
    costPrice: 5950,
    stock: 12,
    barcode: "PRE002"
  },
  {
    name: "Butter Shortbread 200g",
    price: 2300,
    costPrice: 1950,
    stock: 25,
    barcode: "BUS001"
  },
  {
    name: "Butter Shortbread 280g",
    price: 3000,
    costPrice: 2500,
    stock: 20,
    barcode: "BUS002"
  },
  {
    name: "Butter Shortbread 100g",
    price: 1200,
    costPrice: 1000,
    stock: 35,
    barcode: "BUS003"
  },
  {
    name: "Coconut Butter Shortbread 205g",
    price: 2400,
    costPrice: 2000,
    stock: 22,
    barcode: "CBS001"
  },
  {
    name: "Bourbon Biscuits 25g",
    price: 300,
    costPrice: 250,
    stock: 60,
    barcode: "BOU001"
  },
  {
    name: "Coco Shop XXL 150g",
    price: 800,
    costPrice: 650,
    stock: 30,
    barcode: "COC003"
  },
  {
    name: "Butter Snack Shortbread 110g",
    price: 450,
    costPrice: 350,
    stock: 40,
    barcode: "BSS001"
  },
  {
    name: "Chico Snacks 110g",
    price: 500,
    costPrice: 400,
    stock: 35,
    barcode: "CHI001"
  },
  {
    name: "Fab Chocolate 100g",
    price: 500,
    costPrice: 400,
    stock: 40,
    barcode: "FAB002"
  },
  {
    name: "Nice Biscuit 150g",
    price: 500,
    costPrice: 400,
    stock: 35,
    barcode: "NIC003"
  },
  {
    name: "Best Dream 60g",
    price: 400,
    costPrice: 320,
    stock: 45,
    barcode: "BES001"
  },
  {
    name: "Supreme Digestive Biscuit 250g",
    price: 500,
    costPrice: 400,
    stock: 30,
    barcode: "SUP002"
  },
  {
    name: "Cheese Balls Party Pack 90g",
    price: 800,
    costPrice: 650,
    stock: 25,
    barcode: "CHE004"
  },
  {
    name: "Tom Tom 128g",
    price: 1100,
    costPrice: 900,
    stock: 30,
    barcode: "TOM002"
  },
  {
    name: "Munchkins 120g",
    price: 5000,
    costPrice: 4200,
    stock: 20,
    barcode: "MUN001"
  },
  {
    name: "Pure Bliss Gold 85g",
    price: 1500,
    costPrice: 1250,
    stock: 30,
    barcode: "PBG001"
  },
  {
    name: "Top Biscuit 108g",
    price: 600,
    costPrice: 500,
    stock: 35,
    barcode: "TOP005"
  },
  {
    name: "Cream Crackers 90g",
    price: 800,
    costPrice: 650,
    stock: 40,
    barcode: "CRC001"
  },
  {
    name: "Pringles Original 30g",
    price: 3200,
    costPrice: 2700,
    stock: 20,
    barcode: "PRI001"
  },
  {
    name: "Pringles Sour Cream and Onion 30g",
    price: 3200,
    costPrice: 2700,
    stock: 20,
    barcode: "PRI002"
  },
  {
    name: "Pringles Hot and Spicy 30g",
    price: 3200,
    costPrice: 2700,
    stock: 20,
    barcode: "PRI003"
  },
  {
    name: "Nut Burger 500g",
    price: 4500,
    costPrice: 3800,
    stock: 15,
    barcode: "NUB001"
  },
  {
    name: "Nut Burger 250g",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "NUB002"
  },
  {
    name: "Soya Powder Plus 250g",
    price: 3500,
    costPrice: 2950,
    stock: 20,
    barcode: "SOY001"
  },
  {
    name: "Soya Powder Plus 150g",
    price: 2200,
    costPrice: 1850,
    stock: 25,
    barcode: "SOY002"
  },
  {
    name: "Peanut Butter 510g",
    price: 2800,
    costPrice: 2350,
    stock: 18,
    barcode: "PNB001"
  },
  {
    name: "Peanut Butter 227g",
    price: 1700,
    costPrice: 1400,
    stock: 25,
    barcode: "PNB002"
  },
  {
    name: "Cheese Balls 13g",
    price: 200,
    costPrice: 160,
    stock: 80,
    barcode: "CHB001"
  },
  {
    name: "DARABUN Plantain Chips 150g",
    price: 1200,
    costPrice: 1000,
    stock: 30,
    barcode: "DAR001"
  },
  {
    name: "Chin Chin Timeyins 200g",
    price: 1800,
    costPrice: 1500,
    stock: 25,
    barcode: "CCT001"
  },
  {
    name: "Mongotas 200ml",
    price: 3000,
    costPrice: 2500,
    stock: 20,
    barcode: "MON001"
  },
  {
    name: "Oil Partum 100ml",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "OIL001"
  },
  {
    name: "Cool Breeze Rollon 50ml",
    price: 1600,
    costPrice: 1350,
    stock: 30,
    barcode: "CBR001"
  },
  {
    name: "All Day Rollon 50ml",
    price: 1450,
    costPrice: 1200,
    stock: 35,
    barcode: "ADR001"
  },
  {
    name: "Ophlia 200ml",
    price: 3500,
    costPrice: 2950,
    stock: 18,
    barcode: "OPH001"
  },
  {
    name: "Maker Body Spray 150ml",
    price: 1000,
    costPrice: 800,
    stock: 40,
    barcode: "MAK001"
  },
  {
    name: "Techno Body Spray 150ml",
    price: 1000,
    costPrice: 800,
    stock: 40,
    barcode: "TEC001"
  },
  {
    name: "Now Perfume 100ml",
    price: 7000,
    costPrice: 5950,
    stock: 12,
    barcode: "NOW001"
  },
  {
    name: "Must White Lotion 400ml",
    price: 2600,
    costPrice: 2200,
    stock: 25,
    barcode: "MUS001"
  },
  {
    name: "Teens Glow Lotion 400ml",
    price: 5000,
    costPrice: 4200,
    stock: 15,
    barcode: "TEG001"
  },
  {
    name: "Teens Glow Bath 500ml",
    price: 5000,
    costPrice: 4200,
    stock: 15,
    barcode: "TGB001"
  },
  {
    name: "Jiles Kids Lotion 300ml",
    price: 5000,
    costPrice: 4200,
    stock: 18,
    barcode: "JKL001"
  },
  {
    name: "Jiles Kids Bath 400ml",
    price: 5000,
    costPrice: 4200,
    stock: 18,
    barcode: "JKB001"
  },
  {
    name: "Spa Rollon 50ml",
    price: 1000,
    costPrice: 800,
    stock: 35,
    barcode: "SPA001"
  },
  {
    name: "White Glow Lotion 400ml",
    price: 3500,
    costPrice: 2950,
    stock: 20,
    barcode: "WGL001"
  },
  {
    name: "Vaseline Even Tone 400ml",
    price: 5200,
    costPrice: 4400,
    stock: 15,
    barcode: "VAS001"
  },
  {
    name: "Dove Lotion 400ml",
    price: 5300,
    costPrice: 4500,
    stock: 15,
    barcode: "DOV001"
  },
  {
    name: "Johnson's Body Lotion 500ml",
    price: 6000,
    costPrice: 5100,
    stock: 12,
    barcode: "JOH001"
  },
  {
    name: "Visita Lotion 300ml",
    price: 2400,
    costPrice: 2000,
    stock: 25,
    barcode: "VIS002"
  },
  {
    name: "Easy Tone Lotion 400ml",
    price: 5000,
    costPrice: 4200,
    stock: 15,
    barcode: "EAS001"
  },
  {
    name: "Jam Soap 200g",
    price: 1000,
    costPrice: 800,
    stock: 40,
    barcode: "JAM001"
  },
  {
    name: "Visita Soap 200g",
    price: 1000,
    costPrice: 800,
    stock: 40,
    barcode: "VIS003"
  },
  {
    name: "Hanna's Secret 100ml",
    price: 3000,
    costPrice: 2500,
    stock: 20,
    barcode: "HAN001"
  },
  {
    name: "Bakkarat 100ml",
    price: 2700,
    costPrice: 2250,
    stock: 22,
    barcode: "BAK001"
  },
  {
    name: "My Her 100ml",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "MYH001"
  },
  {
    name: "Imperio Way 100ml",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "IMP003"
  },
  {
    name: "Emergency 100ml",
    price: 3100,
    costPrice: 2600,
    stock: 20,
    barcode: "EME001"
  },
  {
    name: "Hummer Cool 150ml",
    price: 4500,
    costPrice: 3800,
    stock: 15,
    barcode: "HUM001"
  },
  {
    name: "Element Big 200ml",
    price: 4000,
    costPrice: 3400,
    stock: 18,
    barcode: "ELE001"
  },
  {
    name: "Element Small 100ml",
    price: 3000,
    costPrice: 2500,
    stock: 25,
    barcode: "ELE002"
  },
  {
    name: "Riggs 150ml",
    price: 3500,
    costPrice: 2950,
    stock: 20,
    barcode: "RIG001"
  },
  {
    name: "Tng Rollon 50ml",
    price: 2400,
    costPrice: 2000,
    stock: 30,
    barcode: "TNG001"
  },
  {
    name: "Mosuf 150ml",
    price: 4200,
    costPrice: 3550,
    stock: 18,
    barcode: "MOS001"
  },
  {
    name: "Dove Perfume 100ml",
    price: 4500,
    costPrice: 3800,
    stock: 15,
    barcode: "DOV002"
  },
  {
    name: "Weekend Berrys 100ml",
    price: 4000,
    costPrice: 3400,
    stock: 18,
    barcode: "WEE001"
  },
  {
    name: "Karis 100ml",
    price: 3500,
    costPrice: 2950,
    stock: 20,
    barcode: "KAR001"
  },
  {
    name: "Body Spray 150ml",
    price: 3000,
    costPrice: 2500,
    stock: 25,
    barcode: "BOD001"
  },
  {
    name: "Storm 150ml",
    price: 3100,
    costPrice: 2600,
    stock: 22,
    barcode: "STO001"
  },
  {
    name: "Vanilla Crush 100ml",
    price: 2100,
    costPrice: 1750,
    stock: 28,
    barcode: "VAN001"
  },
  {
    name: "Deal 150ml",
    price: 5100,
    costPrice: 4300,
    stock: 12,
    barcode: "DEA001"
  },
  {
    name: "Hug 100ml",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "HUG001"
  },
  {
    name: "Cool Breeze Perfume 100ml",
    price: 2500,
    costPrice: 2100,
    stock: 25,
    barcode: "CBP001"
  },
  {
    name: "24k Perfume 100ml",
    price: 5000,
    costPrice: 4200,
    stock: 12,
    barcode: "24K001"
  },
  {
    name: "Love Body Spray 150ml",
    price: 2000,
    costPrice: 1700,
    stock: 25,
    barcode: "LOV001"
  },
  {
    name: "Eye Pen 2g",
    price: 500,
    costPrice: 400,
    stock: 50,
    barcode: "EYE001"
  },
  {
    name: "Visita Soap 150g",
    price: 1300,
    costPrice: 1100,
    stock: 35,
    barcode: "VIS004"
  },
  {
    name: "Hawari Soap 200g",
    price: 1500,
    costPrice: 1250,
    stock: 30,
    barcode: "HAW001"
  },
  {
    name: "Dove Soap 200g",
    price: 5500,
    costPrice: 4650,
    stock: 15,
    barcode: "DOV003"
  },
  {
    name: "Lipstick 3g",
    price: 1000,
    costPrice: 800,
    stock: 40,
    barcode: "LIP001"
  },
  {
    name: "Shimer Lip Gloss 5ml",
    price: 1050,
    costPrice: 850,
    stock: 35,
    barcode: "SHI001"
  },
  {
    name: "Color Lip Gloss 5ml",
    price: 1200,
    costPrice: 1000,
    stock: 30,
    barcode: "COL002"
  },
  {
    name: "Facial Mask 25g",
    price: 1900,
    costPrice: 1600,
    stock: 25,
    barcode: "FAC001"
  },
  {
    name: "Essence Of Eden 100ml",
    price: 1200,
    costPrice: 1000,
    stock: 30,
    barcode: "ESS001"
  },
  {
    name: "Challenge Body Spray 150ml",
    price: 1500,
    costPrice: 1250,
    stock: 28,
    barcode: "CHA001"
  },
  {
    name: "Hug Body Spray 150ml",
    price: 2300,
    costPrice: 1950,
    stock: 22,
    barcode: "HUG002"
  },
  {
    name: "Cool Breeze Body Spray 150ml",
    price: 2300,
    costPrice: 1950,
    stock: 22,
    barcode: "CBB001"
  },
  {
    name: "Storm Kids 100ml",
    price: 2200,
    costPrice: 1850,
    stock: 25,
    barcode: "STK001"
  },
  {
    name: "Doobal 150ml",
    price: 3500,
    costPrice: 2950,
    stock: 18,
    barcode: "DOO001"
  },
  {
    name: "Secret Amor 100ml",
    price: 3700,
    costPrice: 3100,
    stock: 15,
    barcode: "SEC001"
  },
  {
    name: "2 Black Hair Cream Small 100g",
    price: 1000,
    costPrice: 800,
    stock: 30,
    barcode: "2BH001"
  },
  {
    name: "2 Black Hair Cream Big 200g",
    price: 1200,
    costPrice: 1000,
    stock: 25,
    barcode: "2BH002"
  },
  {
    name: "So Fine Big 200g",
    price: 1200,
    costPrice: 1000,
    stock: 25,
    barcode: "SOF001"
  },
  {
    name: "So Fine Small 100g",
    price: 1000,
    costPrice: 800,
    stock: 30,
    barcode: "SOF002"
  },
  {
    name: "Vista Plus Tube 50g",
    price: 1000,
    costPrice: 800,
    stock: 35,
    barcode: "VPT001"
  },
  {
    name: "Facial Mask 20g",
    price: 350,
    costPrice: 280,
    stock: 50,
    barcode: "FAC002"
  },
  {
    name: "Funbact-A 30g",
    price: 1000,
    costPrice: 800,
    stock: 25,
    barcode: "FUN001"
  },
  {
    name: "Cowbell Milk",
    price: 1500,
    costPrice: 1250,
    stock: 30,
    barcode: "CWM001"
  },
  {
    name: "Cow Chocolate",
    price: 1800,
    costPrice: 1500,
    stock: 30,
    barcode: "CWC001"
  },
  {
    name: "Cussons Baby Powder",
    price: 1600,
    costPrice: 1350,
    stock: 25,
    barcode: "CBP002"
  },
  {
    name: "Cussons Baby Oil",
    price: 2000,
    costPrice: 1700,
    stock: 25,
    barcode: "CBO001"
  },
  {
    name: "Cussons Baby Wipes",
    price: 1200,
    costPrice: 1000,
    stock: 30,
    barcode: "CBW001"
  },
  {
    name: "Cussons Baby Big",
    price: 11200,
    costPrice: 9500,
    stock: 10,
    barcode: "CBB002"
  },
  {
    name: "Cussons Baby Small",
    price: 9500,
    costPrice: 8000,
    stock: 12,
    barcode: "CBS002"
  },
  {
    name: "Goya Olive Oil",
    price: 1700,
    costPrice: 1400,
    stock: 20,
    barcode: "GOO001"
  },
  {
    name: "Dudu-Osun",
    price: 1300,
    costPrice: 1100,
    stock: 35,
    barcode: "DDO001"
  },
  {
    name: "Dettol Soap 500g",
    price: 500,
    costPrice: 400,
    stock: 50,
    barcode: "DTS001"
  },
  {
    name: "Premier Cool 200g",
    price: 500,
    costPrice: 400,
    stock: 50,
    barcode: "PRC001"
  },
  {
    name: "Cussons Baby Soap",
    price: 500,
    costPrice: 400,
    stock: 50,
    barcode: "CBS003"
  },
  {
    name: "Toothpick 100g",
    price: 600,
    costPrice: 500,
    stock: 40,
    barcode: "TPK001"
  },
  {
    name: "Robb 25g",
    price: 1000,
    costPrice: 800,
    stock: 40,
    barcode: "RBB001"
  },
  {
    name: "Indomie Super Pack 120g",
    price: 400,
    costPrice: 320,
    stock: 60,
    barcode: "ISP001"
  },
  {
    name: "Indomie Hungry Man Size 200g",
    price: 1000,
    costPrice: 800,
    stock: 40,
    barcode: "IHM001"
  },
  {
    name: "Indomie Belleful 280g",
    price: 1200,
    costPrice: 1000,
    stock: 35,
    barcode: "IBF001"
  },
  {
    name: "Lipton Tea 100g",
    price: 2000,
    costPrice: 1700,
    stock: 25,
    barcode: "LPT001"
  },
  {
    name: "Geisha Sardine 155g",
    price: 1000,
    costPrice: 800,
    stock: 35,
    barcode: "GSR001"
  },
  {
    name: "Today Sardine 155g",
    price: 1300,
    costPrice: 1100,
    stock: 35,
    barcode: "TSR001"
  },
  {
    name: "Cheese Ball Big 90g",
    price: 1000,
    costPrice: 800,
    stock: 30,
    barcode: "CBG001"
  },
  {
    name: "T400-1-3 Plate",
    price: 1300,
    costPrice: 1100,
    stock: 20,
    barcode: "T4001001"
  },
  {
    name: "T4008-2 Plate",
    price: 15500,
    costPrice: 13200,
    stock: 10,
    barcode: "T4008002"
  },
  {
    name: "T4005-W7 Plate",
    price: 800,
    costPrice: 650,
    stock: 25,
    barcode: "T4005007"
  },
  {
    name: "T4022-8 Plate",
    price: 800,
    costPrice: 650,
    stock: 25,
    barcode: "T4022008"
  },
  {
    name: "W10-18-7 Plate",
    price: 1000,
    costPrice: 850,
    stock: 20,
    barcode: "W1018007"
  },
  {
    name: "T4011-P10 Plate",
    price: 1300,
    costPrice: 1100,
    stock: 20,
    barcode: "T4011010"
  },
  {
    name: "Kitchen Tools 3in1",
    price: 6500,
    costPrice: 5500,
    stock: 15,
    barcode: "KIT3IN1"
  },
  {
    name: "Professional Knife",
    price: 3300,
    costPrice: 2800,
    stock: 15,
    barcode: "PROKNF001"
  },
  {
    name: "Gold Spoon",
    price: 4500,
    costPrice: 3800,
    stock: 20,
    barcode: "GLDSPN001"
  },
  {
    name: "Gold Fork",
    price: 4500,
    costPrice: 3800,
    stock: 20,
    barcode: "GLDFK001"
  },
  {
    name: "Silver Spoon",
    price: 4500,
    costPrice: 3800,
    stock: 20,
    barcode: "SLVSPN001"
  },
  {
    name: "Silver Fork",
    price: 4500,
    costPrice: 3800,
    stock: 20,
    barcode: "SLVFK001"
  },
  {
    name: "Nice Water Bottle",
    price: 2500,
    costPrice: 2100,
    stock: 20,
    barcode: "NWBT001"
  },
  {
    name: "Water Bottle",
    price: 3000,
    costPrice: 2500,
    stock: 20,
    barcode: "WBTL001"
  },
  {
    name: "Grater",
    price: 4000,
    costPrice: 3400,
    stock: 15,
    barcode: "GRTR001"
  },
  {
    name: "Red Small Cup",
    price: 600,
    costPrice: 500,
    stock: 30,
    barcode: "RSCUP001"
  },
  {
    name: "Red Big Cup",
    price: 2000,
    costPrice: 1700,
    stock: 20,
    barcode: "RBCUP001"
  },
  {
    name: "Towel Economy",
    price: 15500,
    costPrice: 13200,
    stock: 10,
    barcode: "TWLEC001"
  },
  {
    name: "Kettle 5 Liters",
    price: 15000,
    costPrice: 12700,
    stock: 8,
    barcode: "KTL5L001"
  },
  {
    name: "Kettle 4 Liters",
    price: 13000,
    costPrice: 11000,
    stock: 8,
    barcode: "KTL4L001"
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(products);
    console.log("Products added successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}

seedProducts();