import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { getProductById } from "../services/productService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIChat from "../components/AIChat";

function Skeleton() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 animate-pulse">
      <div className="bg-gradient-to-br from-gray-100 to-indigo-50 rounded-3xl h-96" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded-full w-24" />
        <div className="h-7 bg-gray-200 rounded-full w-3/4" />
        <div className="h-5 bg-gray-200 rounded-full w-1/3" />
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded-full w-4/5" />
        </div>
        <div className="h-12 bg-gray-200 rounded-2xl w-full mt-4" />
      </div>
    </div>
  );
}

// Simulated AI review points based on product category
function getAIReview(product) {
  const pros = [
    "Excellent quality and build",
    "Great value for money",
    "Highly rated by customers",
    "Fast shipping available",
  ];
  const cons = [
    "Limited color options",
    "No warranty card included",
  ];
  if (product.rating?.rate >= 4.5) {
    pros.unshift("Top-rated in its category");
  }
  if (product.price > 50) {
    cons.unshift("Slightly on the expensive side");
  }
  return { pros: pros.slice(0,3), cons: cons.slice(0,2) };
}

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  const wishlisted = product ? isWishlisted(product.id) : false;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stars = product ? product.rating?.rate ?? 4 : 0;
  const fullStars = Math.floor(stars);
  const aiReview = product ? getAIReview(product) : null;
  const colors = ["#111827", "#374151", "#4B5563"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {!product ? <Skeleton /> : (
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-600 transition-colors mb-7 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Panel */}
              <div className="bg-gradient-to-br from-gray-50 to-indigo-50/40 flex flex-col items-center justify-center p-10 border-r border-gray-100 relative">
                <div className="relative">
                  <img src={product.image} alt={product.title} className="max-h-80 object-contain drop-shadow-xl" />
                </div>
                {/* Thumbnail strip */}
                <div className="flex gap-2 mt-6">
                  {[product.image, product.image, product.image].map((img, i) => (
                    <div key={i} className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center bg-white cursor-pointer transition-all ${i === 0 ? "border-indigo-400 shadow-md" : "border-gray-200 hover:border-indigo-200"}`}>
                      <img src={img} alt="" className="w-10 h-10 object-contain" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Panel */}
              <div className="p-8 flex flex-col">
                <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3 self-start">
                  {product.category}
                </span>

                <h1 className="text-xl font-display font-extrabold text-gray-900 leading-snug tracking-tight">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < fullStars ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-amber-500">{stars}</span>
                  <span className="text-sm text-gray-400">({product.rating?.count} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <p className="text-3xl font-extrabold text-gray-900">
                    ₹{(product.price * 83).toLocaleString('en-IN', {maximumFractionDigits: 0})}
                  </p>
                  <span className="text-gray-400 line-through text-base">${(product.price * 1.3).toFixed(0)}</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">24% OFF</span>
                </div>

                {/* Perks */}
                <div className="flex gap-4 mt-4 text-xs text-gray-500">
                  {["Free Delivery", "7 Days Return", "1 Year Warranty"].map(t => (
                    <span key={t} className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mt-4 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Color */}
                <div className="mt-5">
                  <p className="text-xs font-bold text-gray-700 mb-2">Color: <span className="font-semibold text-gray-900">{["Black","Dark Gray","Gray"][selectedColor]}</span></p>
                  <div className="flex gap-2">
                    {colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(i)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === i ? "border-indigo-500 scale-110 shadow-md" : "border-gray-200"}`}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity + Buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <span className="text-sm text-gray-600 font-semibold">Qty:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors text-lg font-light">−</button>
                    <span className="px-4 py-2 text-sm font-bold text-gray-900 border-x border-gray-200">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors text-lg font-light">+</button>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all duration-200 border-2 ${
                      added ? "bg-green-500 text-white border-green-500" : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    {added ? "✓ Added to Cart!" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary text-white py-3 rounded-2xl font-bold text-sm shadow-lg"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-12 h-12 rounded-2xl border-2 border-gray-200 flex items-center justify-center hover:border-rose-300 transition-colors"
                  >
                    <svg className={`w-5 h-5 transition-colors ${wishlisted ? "text-rose-500 fill-rose-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* AI Review Summary */}
            {aiReview && (
              <div className="border-t border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="ai-chip text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    AI Review Summary
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {aiReview.pros.map((pro, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">{pro}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {aiReview.cons.map((con, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">{con}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      <AIChat />
    </div>
  );
}
