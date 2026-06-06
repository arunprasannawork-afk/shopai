import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

function loadWishlist() {
  try { return JSON.parse(localStorage.getItem("shopai_wishlist_full") || "[]"); }
  catch { return []; }
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem("shopai_wishlist_full", JSON.stringify(wishlist));
    // keep id-only list in sync for ProductCard legacy support
    localStorage.setItem("shopai_wishlist", JSON.stringify(wishlist.map(p => p.id)));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist(prev => prev.find(p => p.id === product.id) ? prev : [...prev, product]);
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(p => p.id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (id) => wishlist.some(p => p.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};
