// uses plaid category taxonomy

// Category mapping from Plaid taxonomy to simplified categories
const CATEGORY_MAPPING = {
  // Income
  INCOME: {
    id: 8,
    name: "Income",
    description: "Salary, refunds, transfers in",
  },
  TRANSFER_IN: {
    id: 8,
    name: "Income",
    description: "Salary, refunds, transfers in",
  },

  // Groceries
  FOOD_AND_DRINK_GROCERIES: {
    id: 1,
    name: "Groceries",
    description: "Supermarkets, food stores",
  },

  // Dining Out
  FOOD_AND_DRINK_RESTAURANT: {
    id: 2,
    name: "Dining Out",
    description: "Restaurants, cafes, bars",
  },
  FOOD_AND_DRINK_FAST_FOOD: {
    id: 2,
    name: "Dining Out",
    description: "Restaurants, cafes, bars",
  },
  FOOD_AND_DRINK_COFFEE: {
    id: 2,
    name: "Dining Out",
    description: "Restaurants, cafes, bars",
  },
  FOOD_AND_DRINK_BEER_WINE_AND_LIQUOR: {
    id: 2,
    name: "Dining Out",
    description: "Restaurants, cafes, bars",
  },
  FOOD_AND_DRINK_VENDING_MACHINES: {
    id: 2,
    name: "Dining Out",
    description: "Restaurants, cafes, bars",
  },
  FOOD_AND_DRINK_OTHER_FOOD_AND_DRINK: {
    id: 2,
    name: "Dining Out",
    description: "Restaurants, cafes, bars",
  },

  // Transport
  TRANSPORTATION_GAS: {
    id: 3,
    name: "Transport",
    description: "Gas, public transit, taxis",
  },
  TRANSPORTATION_TAXIS_AND_RIDE_SHARES: {
    id: 3,
    name: "Transport",
    description: "Gas, public transit, taxis",
  },
  TRANSPORTATION_PUBLIC_TRANSIT: {
    id: 3,
    name: "Transport",
    description: "Gas, public transit, taxis",
  },
  TRANSPORTATION_BIKES_AND_SCOOTERS: {
    id: 3,
    name: "Transport",
    description: "Gas, public transit, taxis",
  },
  TRANSPORTATION_PARKING: {
    id: 3,
    name: "Transport",
    description: "Gas, public transit, taxis",
  },
  TRANSPORTATION_TOLLS: {
    id: 3,
    name: "Transport",
    description: "Gas, public transit, taxis",
  },
  TRANSPORTATION_OTHER_TRANSPORTATION: {
    id: 3,
    name: "Transport",
    description: "Gas, public transit, taxis",
  },

  // Shopping
  GENERAL_MERCHANDISE_CLOTHING_AND_ACCESSORIES: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_ONLINE_MARKETPLACES: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_DEPARTMENT_STORES: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_DISCOUNT_STORES: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_SUPERSTORES: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_ELECTRONICS: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_SPORTING_GOODS: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_BOOKSTORES_AND_NEWSSTANDS: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_OFFICE_SUPPLIES: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_GIFTS_AND_NOVELTIES: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_PET_SUPPLIES: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_TOBACCO_AND_VAPE: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_CONVENIENCE_STORES: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  GENERAL_MERCHANDISE_OTHER_GENERAL_MERCHANDISE: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  HOME_IMPROVEMENT_FURNITURE: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  HOME_IMPROVEMENT_HARDWARE: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  HOME_IMPROVEMENT_REPAIR_AND_MAINTENANCE: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  HOME_IMPROVEMENT_SECURITY: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  HOME_IMPROVEMENT_OTHER_HOME_IMPROVEMENT: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },

  // Bills & Utilities
  RENT_AND_UTILITIES_GAS_AND_ELECTRICITY: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  RENT_AND_UTILITIES_INTERNET_AND_CABLE: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  RENT_AND_UTILITIES_RENT: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  RENT_AND_UTILITIES_SEWAGE_AND_WASTE_MANAGEMENT: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  RENT_AND_UTILITIES_TELEPHONE: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  RENT_AND_UTILITIES_WATER: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  RENT_AND_UTILITIES_OTHER_UTILITIES: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  GENERAL_SERVICES_INSURANCE: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  GENERAL_SERVICES_OTHER_GENERAL_SERVICES: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  LOAN_PAYMENTS_CAR_PAYMENT: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  LOAN_PAYMENTS_CREDIT_CARD_PAYMENT: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  LOAN_PAYMENTS_PERSONAL_LOAN_PAYMENT: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  LOAN_PAYMENTS_MORTGAGE_PAYMENT: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  LOAN_PAYMENTS_STUDENT_LOAN_PAYMENT: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  LOAN_PAYMENTS_OTHER_PAYMENT: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },

  // Entertainment
  ENTERTAINMENT_CASINOS_AND_GAMBLING: {
    id: 6,
    name: "Entertainment",
    description: "Movies, streaming, games",
  },
  ENTERTAINMENT_MUSIC_AND_AUDIO: {
    id: 6,
    name: "Entertainment",
    description: "Movies, streaming, games",
  },
  ENTERTAINMENT_SPORTING_EVENTS_AMUSEMENT_PARKS_AND_MUSEUMS: {
    id: 6,
    name: "Entertainment",
    description: "Movies, streaming, games",
  },
  ENTERTAINMENT_TV_AND_MOVIES: {
    id: 6,
    name: "Entertainment",
    description: "Movies, streaming, games",
  },
  ENTERTAINMENT_VIDEO_GAMES: {
    id: 6,
    name: "Entertainment",
    description: "Movies, streaming, games",
  },
  ENTERTAINMENT_OTHER_ENTERTAINMENT: {
    id: 6,
    name: "Entertainment",
    description: "Movies, streaming, games",
  },

  // Health
  MEDICAL_DENTAL_CARE: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  MEDICAL_EYE_CARE: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  MEDICAL_NURSING_CARE: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  MEDICAL_PHARMACIES_AND_SUPPLEMENTS: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  MEDICAL_PRIMARY_CARE: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  MEDICAL_VETERINARY_SERVICES: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  MEDICAL_OTHER_MEDICAL: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  PERSONAL_CARE_GYMS_AND_FITNESS_CENTERS: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  PERSONAL_CARE_HAIR_AND_BEAUTY: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  PERSONAL_CARE_LAUNDRY_AND_DRY_CLEANING: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  PERSONAL_CARE_OTHER_PERSONAL_CARE: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },

  // Travel
  TRAVEL_FLIGHTS: {
    id: 10,
    name: "Travel",
    description: "Flights, hotels, car rentals",
  },
  TRAVEL_LODGING: {
    id: 10,
    name: "Travel",
    description: "Flights, hotels, car rentals",
  },
  TRAVEL_RENTAL_CARS: {
    id: 10,
    name: "Travel",
    description: "Flights, hotels, car rentals",
  },
  TRAVEL_OTHER_TRAVEL: {
    id: 10,
    name: "Travel",
    description: "Flights, hotels, car rentals",
  },
};

// Map PRIMARY categories to simplified categories
const PRIMARY_CATEGORY_MAPPING = {
  INCOME: {
    id: 8,
    name: "Income",
    description: "Salary, refunds, transfers in",
  },
  TRANSFER_IN: {
    id: 8,
    name: "Income",
    description: "Salary, refunds, transfers in",
  },
  TRANSFER_OUT: { id: 9, name: "Other", description: "Uncategorized" },
  LOAN_PAYMENTS: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  BANK_FEES: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  ENTERTAINMENT: {
    id: 6,
    name: "Entertainment",
    description: "Movies, streaming, games",
  },
  FOOD_AND_DRINK: {
    id: 2,
    name: "Dining Out",
    description: "Restaurants, cafes, bars",
  },
  GENERAL_MERCHANDISE: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  HOME_IMPROVEMENT: {
    id: 4,
    name: "Shopping",
    description: "Clothing, retail, online stores",
  },
  MEDICAL: { id: 7, name: "Health", description: "Fitness, medical, pharmacy" },
  PERSONAL_CARE: {
    id: 7,
    name: "Health",
    description: "Fitness, medical, pharmacy",
  },
  GENERAL_SERVICES: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
  GOVERNMENT_AND_NON_PROFIT: {
    id: 9,
    name: "Other",
    description: "Uncategorized",
  },
  TRANSPORTATION: {
    id: 3,
    name: "Transport",
    description: "Gas, public transit, taxis",
  },
  TRAVEL: {
    id: 10,
    name: "Travel",
    description: "Flights, hotels, car rentals",
  },
  RENT_AND_UTILITIES: {
    id: 5,
    name: "Bills & Utilities",
    description: "Subscriptions, electricity, water",
  },
};

/**
 * Categorizes a transaction based on its personal_finance_category
 * @param {Object} transaction - The transaction object
 * @returns {Object} - Simplified category object with id, name, and description
 */
function categorizeTransaction(transaction) {
  const defaultCategory = {
    id: 9,
    name: "Other",
    description: "Uncategorized",
  };

  if (!transaction.personal_finance_category) {
    return defaultCategory;
  }

  const { detailed, primary } = transaction.personal_finance_category;

  // Try to match by detailed category first (more specific)
  if (detailed && CATEGORY_MAPPING[detailed]) {
    return CATEGORY_MAPPING[detailed];
  }

  // Fall back to primary category
  if (primary && PRIMARY_CATEGORY_MAPPING[primary]) {
    return PRIMARY_CATEGORY_MAPPING[primary];
  }

  // Return default if no match found
  return defaultCategory;
}

export { categorizeTransaction, CATEGORY_MAPPING, PRIMARY_CATEGORY_MAPPING };
