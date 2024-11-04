export interface Product {
    id: string;
    name: string;
    description: string;
    images: string[];
    parentCategory: string;
    category: string;
    vendor: string;
    brand: string;
    stock: number;
    sizes: string[];
    delivery: string;
    price: number;
    shippingPrice: number;
    discount?:  number;
  
  }