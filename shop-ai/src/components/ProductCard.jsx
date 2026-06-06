import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const CATEGORY_ICONS = {
  "electronics": "💻",
  "men's clothing": "👔",
  "women's clothing": "👗",
  "jewelery": "💍",
  "jewelry": "💍",
};

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  const [added, setAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const stars = product.rating?.rate ?? 4;
  const fullStars = Math.floor(stars);
  const hasHalf = stars - fullStars >= 0.5;
  const icon = CATEGORY_ICONS[product.category?.toLowerCase()] ?? "🛍️";

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm card-hover overflow-hidden flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-6 flex items-center justify-center h-52 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-40 w-full object-contain group-hover:scale-110 transition-transform duration-400"
          />
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute top-3 right-3 w-7 h-7 rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 ${
              wishlisted ? "bg-rose-50 border border-rose-200" : "bg-white"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 transition-colors ${wishlisted ? "text-rose-500 fill-rose-500" : "text-gray-300"}`}
              fill={wishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          {/* Category */}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-indigo-600 shadow-sm border border-indigo-100">
            {icon} {product.category}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h2 className="text-sm font-semibold text-gray-800 leading-snug hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
            {product.title}
          </h2>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className={`w-3 h-3 ${i < fullStars ? "text-amber-400" : i === fullStars && hasHalf ? "text-amber-300" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-indigo-600 font-semibold">{stars}</span>
          <span className="text-[10px] text-gray-400">({product.rating?.count ?? 0})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-lg font-extrabold text-gray-900">₹{(product.price * 83).toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
            <p className="text-[10px] text-gray-400 line-through">${product.price}</p>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl transition-all duration-200 ${
              added
                ? "bg-green-500 text-white scale-95"
                : "btn-primary text-white shadow-md"
            }`}
          >
            {added ? (
              <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Added</>
            ) : (
              <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" /></svg> Add</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
