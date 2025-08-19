export const products = [
  {
    id: "1",
    name: "Baby Stroller - Lightweight Cabin Size Foldable Kids",
    price: 11.46,
    image: "/images/stroller.png",
    description: "Selling our trusty lightweight stroller that's been a lifesaver for us, especially during trips. It's cabin-size friendly, so we've actually brought it on flights before without any issues. Folds up really easily (can do it with one hand) and is super lightweight but still sturdy. Perfect for parents who are always on the go!",
    condition: "Like New",
    ageRange: "3-4 years old",
    brand: "Abc brand",
    cleaningStatus: { washed: true, sanitised: true },
    dimensions: "60cm x 60 cm",
    dealMethod: "Meet up: Punggol Point",
    seller: {
      name: "miketan",
      rating: 4.5,
      reviews: 50,
      avatar: "/images/seller-avatar.png"
    },
    shipping: {
      available: true,
      duration: "24-hour",
      local: true,
      returnPolicy: "7 Days No Reason To Return"
    },
    likes: 2
  },
  {
    id: "2",
    name: "Reusable Water Bottle - Eco Friendly",
    price: 12.99,
    image: "/images/bottle.png",
    description: "High-quality stainless steel water bottle that keeps drinks cold for 24 hours and hot for 12 hours. Perfect for gym, office, or outdoor activities. BPA-free and environmentally friendly.",
    condition: "New",
    ageRange: "All ages",
    brand: "EcoBottle",
    cleaningStatus: { washed: true, sanitised: true },
    dimensions: "25cm x 7cm",
    dealMethod: "Meet up: City Hall MRT",
    seller: {
      name: "greenlife",
      rating: 4.8,
      reviews: 32,
      avatar: "/images/seller-avatar2.png"
    },
    shipping: {
      available: true,
      duration: "Same day",
      local: true,
      returnPolicy: "3 Days Return Policy"
    },
    likes: 5
  },
  {
    id: "3",
    name: "Coach Jacket - Vintage Style Windbreaker",
    price: 49.99,
    image: "/images/jacket.png",
    description: "Stylish coach jacket in excellent condition. Perfect for Singapore weather - lightweight but provides good wind protection. Classic design that goes with everything. Rarely worn, too big for me now.",
    condition: "Like New",
    ageRange: "Adult (M size)",
    brand: "Urban Style",
    cleaningStatus: { washed: true, sanitised: false },
    dimensions: "Chest: 50cm, Length: 65cm",
    dealMethod: "Meet up: Orchard MRT",
    seller: {
      name: "fashionista88",
      rating: 4.3,
      reviews: 28,
      avatar: "/images/seller-avatar3.png"
    },
    shipping: {
      available: true,
      duration: "Next day",
      local: true,
      returnPolicy: "5 Days Return Policy"
    },
    likes: 8
  },
  {
    id: "4",
    name: "OCK Black Mug - Ceramic Coffee Cup",
    price: 9.99,
    image: "/images/mug.png",
    description: "Beautiful ceramic mug in pristine condition. Perfect size for your morning coffee or tea. Heat-resistant and dishwasher safe. Classic black design fits any kitchen aesthetic.",
    condition: "Excellent",
    ageRange: "All ages",
    brand: "OCK",
    cleaningStatus: { washed: true, sanitised: true },
    dimensions: "12cm x 9cm x 8cm",
    dealMethod: "Meet up: Tampines Mall",
    seller: {
      name: "coffeelover",
      rating: 4.7,
      reviews: 15,
      avatar: "/images/seller-avatar4.png"
    },
    shipping: {
      available: true,
      duration: "2-3 days",
      local: true,
      returnPolicy: "7 Days Return Policy"
    },
    likes: 3
  }
];