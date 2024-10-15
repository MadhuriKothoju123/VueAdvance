export interface Contact {
    email: string;
    phone: string;
  }
  
 export interface Address {
    street: string;
    city: string;
    state: string;
    country?: string;
  }
  
  export interface ISupplier {
    password:  string;

    userId: string | undefined; 
    supplierId?: string,                
    contact: Contact;               
    address: Address;               
    productsSupplied?: string[];     
    createdAt: Timestamp;           
    updatedAt: Timestamp;           
  }