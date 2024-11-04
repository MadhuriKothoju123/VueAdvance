export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    discount?: number;
    finalPrice: ComputedRef<number>;
    quantity: number;
    selectedSize: string;
    image: string;
    vendor: string;
    brand: string;
    userId: string;
  }