// src/context/AppContext.jsx
// Application-wide state and helper functions for cart, wishlist,
// user session, orders and coupons. This context provides a simple
// client-side store (no backend) used across the app.
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage so data persists across reloads
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('eshop_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('eshop_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('eshop_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('eshop_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // COUPONS
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // SYNC WITH localStorage: persist key slices whenever they change
  useEffect(() => {
    localStorage.setItem('eshop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('eshop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('eshop_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('eshop_orders', JSON.stringify(orders));
  }, [orders]);


  // 1. AUTH FUNCTIONS (Login, Register, Logout, Edit)
  // NOTE: These are mock/local-only auth helpers. Replace with real
  // backend calls (API) when integrating a server.
  const registerUser = (userData) => {
    const newUser = {
      id: Date.now(),
      email: userData.email,
      fullName: userData.fullName,
      phone: userData.phone || '',
      address: userData.address || '',
      city: userData.city || '',
      createdAt: new Date().toLocaleDateString()
    };
    setCurrentUser(newUser);
    return { success: true };
  };

  const loginUser = (email, password) => {
    // Mock login: create a demo user and set it as current user
    const mockUser = {
      id: 999,
      email: email,
      fullName: 'John Doe',
      phone: '+994 (55) 123-45-67',
      address: 'Nizami str. 42',
      city: 'Baku',
      createdAt: '12.01.2026'
    };
    setCurrentUser(mockUser);
    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCart([]);
    // Optionally clear orders on logout. Kept commented out so orders
    // remain in the browser session unless you want them removed.
    // setOrders([]);
  };

  const updateProfile = (updatedData) => {
    setCurrentUser(prev => prev ? { ...prev, ...updatedData } : null);
  };


  // 2. ORDERS LOGIC (Create an order history entry locally)
  const placeOrder = (formData) => {
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      subtotal,
      shippingCost,
      total,
      shippingMethod,
      deliveryAddress: `${formData.address}, ${formData.city}`,
      status: 'Processing'
    };
    
    // Prepend new order to local orders history and clear the cart
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart(); // Clear cart after successful order creation
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // 3. CART ACTIONS: add, update and remove items in the cart
  const addToCart = (product, color, size, quantity = 1) => {
    setCart((prevCart) => {
      const exists = prevCart.some(
        (item) => item.id === product.id && item.color === color && item.size === size
      );
      if (exists) {
        return prevCart.map((item) => {
          if (item.id === product.id && item.color === color && item.size === size) {
            const newQty = item.quantity + quantity;
            const maxStock = product.stock || 10;
            return { ...item, quantity: Math.min(maxStock, newQty) };
          }
          return item;
        });
      }
      return [...prevCart, { ...product, color, size, quantity }];
    });
  };

  const updateCartQuantity = (id, color, size, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id && item.color === color && item.size === size) {
          const newQty = item.quantity + amount;
          const maxStock = item.stock || 10;
          return { ...item, quantity: Math.max(1, Math.min(maxStock, newQty)) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id, color, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.color === color && item.size === size))
    );
  };


  // 4. COUPONS LOGIC: apply/remove coupon codes and set discount
  const applyCoupon = (code) => {
    setCouponError('');
    setCouponSuccess('');
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SUMMER26' || cleanCode === 'SAVE10') {
      setDiscount(10);
      setCouponSuccess('Coupon applied successfully! 10% discount added.');
    } else if (cleanCode === 'BAKU2026') {
      setDiscount(20);
      setCouponSuccess('Baku Special! 20% discount added.');
    } else {
      setCouponError('Invalid coupon code. Try SUMMER26');
      setDiscount(0);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponSuccess('');
    setCouponError('');
  };


  // 5. CALCULATIONS: derived values using useMemo for performance
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return acc + (price * quantity);
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return subtotal * ((Number(discount) || 0) / 100);
  }, [subtotal, discount]);
  
  const shippingCost = useMemo(() => {
    if (subtotal === 0) return 0;
    if (shippingMethod === 'express') return 15;
    return subtotal > 100 ? 0 : 5;
  }, [subtotal, shippingMethod]);
  
  const total = useMemo(() => {
    return subtotal - discountAmount + shippingCost;
  }, [subtotal, discountAmount, shippingCost]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => Number(item.id) === Number(product.id));
      if (exists) {
        return prev.filter((item) => Number(item.id) !== Number(product.id));
      } else {
        return [...prev, product];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
    setShippingMethod('standard');
    removeCoupon(); // Reset coupon when clearing cart
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        shippingMethod,
        setShippingMethod,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleWishlist,
        clearCart,
        couponCode,
        setCouponCode,
        discount,
        couponError,
        couponSuccess,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingCost,
        total,
        currentUser,
        orders,
        registerUser,
        loginUser,
        logoutUser,
        updateProfile,
        placeOrder,
        updateOrderStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);