import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-display font-extrabold text-gray-900 tracking-tight">My Wishlist</h1>
            <p className="text-gray-400 text-sm">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-28 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-6xl mb-4">🤍</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 text-sm mb-6">Tap the heart icon on any product to save it here</p>
            <Link to="/products" className="inline-block btn-primary text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlist.map((product) => {
                const priceINR = Math.round(product.price * 83);
                const stars = product.rating?.rate ?? 4;
                return (
                  <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm card-hover overflow-hidden flex flex-col">
                    {/* Image */}
                    <Link to={`/product/${product.id}`} className="block relative">
                      <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-6 flex items-center justify-center h-48 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-36 w-full object-contain group-hover:scale-110 transition-transform duration-400"
                        />
                        {/* Remove from wishlist */}
                        <button
                          onClick={(e) => { e.preventDefault(); removeFromWishlist(product.id); }}
                          title="Remove from wishlist"
                          className="absolute top-3 right-3 w-7 h-7 rounded-full shadow-md flex items-center justify-center bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all hover:scale-110"
                        >
                          <svg className="w-3.5 h-3.5 text-rose-500 fill-rose-500" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <Link to={`/product/${product.id}`}>
                        <h2 className="text-sm font-semibold text-gray-800 leading-snug hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                          {product.title}
                        </h2>
                      </Link>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-amber-400 text-xs">{"★".repeat(Math.floor(stars))}</span>
                        <span className="text-[10px] text-indigo-600 font-semibold">{stars}</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-2">
                        <p className="text-lg font-extrabold text-gray-900">₹{priceINR.toLocaleString("en-IN")}</p>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl btn-primary text-white shadow-md"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" /></svg>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Move all to cart */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => wishlist.forEach(p => addToCart(p))}
                className="btn-primary text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" /></svg>
                Move All to Cart
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
