import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import AIChat from "../components/AIChat";
import VoiceSearch from "../components/VoiceSearch";
import Footer from "../components/Footer";
import { getProducts } from "../services/productService";

const CATEGORIES = [
  { key: "electronics", label: "Electronics", icon: "💻", color: "from-blue-50 to-indigo-50 border-blue-100", iconBg: "bg-blue-100 text-blue-700" },
  { key: "men's clothing", label: "Men's Clothing", icon: "👔", color: "from-slate-50 to-gray-50 border-slate-100", iconBg: "bg-slate-100 text-slate-700" },
  { key: "women's clothing", label: "Women's Clothing", icon: "👗", color: "from-pink-50 to-rose-50 border-pink-100", iconBg: "bg-pink-100 text-pink-700" },
  { key: "jewelery", label: "Jewelry", icon: "💍", color: "from-amber-50 to-yellow-50 border-amber-100", iconBg: "bg-amber-100 text-amber-700" },
];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="bg-gradient-to-br from-gray-100 to-indigo-50 h-52" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3 bg-gray-200 rounded-full w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-gray-200 rounded-full w-16" />
          <div className="h-8 bg-indigo-100 rounded-xl w-16" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const productsRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const query = search.toLowerCase();
    const matchSearch = p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleSearch = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── Hero (compact) ── */}
      <section className="hero-gradient border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center gap-6">
          {/* Left */}
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 ai-chip text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-md">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              AI-Powered Shopping
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-gray-900 leading-tight tracking-tight">
              Discover Smart Shopping<br />
              <span className="text-indigo-600">Powered by AI</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm max-w-md">
              Find the best products with the power of artificial intelligence.
            </p>

            {/* Search */}
            <div className="flex items-center gap-2 mt-5 max-w-lg">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearchKey}
                  placeholder="Search products or categories..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-indigo-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm bg-white font-medium"
                />
              </div>
              <VoiceSearch setSearch={setSearch} />
              <button
                onClick={handleSearch}
                className="btn-primary text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-lg"
              >
                Search
              </button>
            </div>

            <div className="flex items-center gap-5 mt-4 text-xs text-gray-500">
              {["Free Delivery", "7 Days Return", "1 Year Warranty"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: decorative product images — smaller */}
          <div className="hidden md:flex items-center justify-center shrink-0">
            <div className="relative w-52 h-40">
              {products.slice(0, 3).map((p, i) => (
                <div
                  key={p.id}
                  className="absolute bg-white rounded-2xl shadow-xl p-2 w-20 h-20 flex items-center justify-center border border-white"
                  style={{ top: i === 0 ? 0 : i === 1 ? 44 : 14, left: i * 56, zIndex: 3 - i, transform: `rotate(${[-5, 3, -3][i]}deg)` }}
                >
                  <img src={p.image} alt={p.title} className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-bold text-gray-900">Categories</h2>
          <Link to="/products" className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 flex items-center gap-1">
            View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setTimeout(() => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); }}
              className={`bg-gradient-to-br ${cat.color} border rounded-2xl p-4 text-left flex items-center gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeCategory === cat.key ? "ring-2 ring-indigo-400 ring-offset-1" : ""}`}
            >
              <div className={`${cat.iconBg} w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0`}>
                {cat.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{cat.label}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {products.filter(p => p.category === cat.key).length} items
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Products ── */}
      <section ref={productsRef} className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-bold text-gray-900">Featured Products</h2>
            <p className="text-xs text-gray-400 mt-0.5">{filtered.length} products available</p>
          </div>
          <Link to="/products" className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 flex items-center gap-1">
            View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* Filter pills */}
        {!loading && (
          <div className="flex gap-2 flex-wrap mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold capitalize px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? "btn-primary text-white border-transparent shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-700 font-semibold text-lg">No products found</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search or category</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="mt-5 btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
      <AIChat />
    </div>
  );
}
