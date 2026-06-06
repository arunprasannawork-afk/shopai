import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import AIChat from "../components/AIChat";
import { getProducts } from "../services/productService";

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

const SORT_OPTIONS = [
  { label: "Popularity", value: "default" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

const CATEGORY_ICONS = {
  "all": "✦",
  "electronics": "💻",
  "men's clothing": "👔",
  "women's clothing": "👗",
  "jewelery": "💍",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("default");

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

  const filtered = products
    .filter((p) => {
      const query = search.toLowerCase();
      const matchSearch = p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "rating") return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <div className="bg-white border-b border-indigo-50 px-6 py-7">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-extrabold text-gray-900 tracking-tight">All Products</h1>
            <p className="text-gray-400 text-sm mt-0.5">Browse our full catalog</p>
          </div>
          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 w-52 focus:bg-white transition-all"
              />
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-2 text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-600 focus-within:ring-2 focus-within:ring-indigo-400">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
              <span className="text-xs text-gray-400 font-medium">Sort by:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent focus:outline-none font-semibold text-gray-700 text-xs">
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Filter tag */}
            <button className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-gray-600 hover:border-indigo-300 transition-colors font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sticky top-20">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Category</p>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                >
                  <span>{CATEGORY_ICONS[cat] ?? "🛍️"}</span>
                  <span className="capitalize truncate">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Mobile category pills */}
          {!loading && (
            <div className="flex gap-2 flex-wrap mb-5 lg:hidden">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold capitalize px-4 py-1.5 rounded-full border transition-all ${
                    activeCategory === cat
                      ? "bg-indigo-600 text-white border-transparent"
                      : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-700 font-semibold">No products found</p>
              <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="mt-5 btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full">Clear filters</button>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-400 mb-4 font-medium">{filtered.length} products found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
      <AIChat />
    </div>
  );
}
