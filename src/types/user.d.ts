export interface User {
    uid: string;
    displayName: string;
    email: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    orders?: string[];  // Store only order IDs
    wishlist?: string[];  // Store only wishlist item IDs
    createdAt: string;
    updatedAt: string;
  }