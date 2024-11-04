// stores/cartStore.ts
import { defineStore } from 'pinia';
import { ref, computed, ComputedRef } from 'vue';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, DocumentReference } from 'firebase/firestore';
import { CartItem } from '../types/cartItems';



export const useCartStore = defineStore('cart', () => {
  // State
  const cart = ref<CartItem[]>([]);
  const loading = ref<boolean>(false);
  const userId = ref<string | null>();

  const cartTotalPrice = computed((): number =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  const cartItemCount = computed((): number => cart.value.reduce((count, item) => count + item.quantity, 0));

  const setUserId =async (id: string) => {
    userId.value = id;
  };

  const fetchCart = async (): Promise<void> => {
    console.log(userId.value)
    if (!userId.value) return;

    loading.value = true;
    try {
      const cartDocRef = doc(db, 'carts', userId.value);
      const cartDoc = await getDoc(cartDocRef);

      if (cartDoc.exists()) {
        cart.value = cartDoc.data()?.items || [];
        console.log(cart.value, "cart.value")
      } else {
        cart.value = [];
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      loading.value = false;
    }
  };

  // Add an item to the cart
  const addItemToCart = async (product: Omit<CartItem, 'id'>): Promise<void> => {
    const existingItem = cart.value.find(item => 
      item.productId === product.productId && item.selectedSize === product.selectedSize
    );
    await setUserId(product.userId)
    if (existingItem) {
      await updateCartItem(product, existingItem.quantity + 1);
    } else {
      const newItem: CartItem = {
        ...product,
        id: crypto.randomUUID(),
        finalPrice: computed(() => product.price * (1 - (product.discount ?? 0) / 100)),
      };
      cart.value.push(newItem);
      await syncCartWithFirestore();
    }
  };

  // Update the quantity of a cart item
  const updateCartItem = async (product: object, quantity: number): Promise<void> => {
    const item = cart.value.find(item => item.productId === product.productId && item.selectedSize===product.selectedSize);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        await removeItemFromCart(product.productId);
      } else {
        await syncCartWithFirestore();
      }
    }
  };

  const removeItemFromCart = async (cartItemId: string): Promise<void> => {
    cart.value = cart.value.filter(item => item.id !== cartItemId);
    await syncCartWithFirestore();
  };

  const syncCartWithFirestore = async (): Promise<void> => {
    if (!userId.value) return;

    try {
      const cartRef = doc(db, 'carts', userId.value);
      await setDoc(cartRef, { items: cart.value });
    } catch (error) {
      console.error("Error syncing cart with Firestore:", error);
    }
  };

  const clearCart = async (): Promise<void> => {
    cart.value = [];
    await syncCartWithFirestore();
  };

  return {
    cart,
    loading,
    userId,
    cartTotalPrice,
    cartItemCount,
    setUserId,
    fetchCart,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
    clearCart,
  };
},{
  persist: true
});
