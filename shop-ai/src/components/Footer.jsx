export default function Footer() {
  return (
    <footer className="bg-white border-t border-indigo-50 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl badge-gradient flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="font-display font-bold text-gray-900 text-lg">
                Shop<span className="text-indigo-600">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              India's smartest AI-powered shopping platform. Discover the best products curated just for you.
            </p>
            <div className="flex gap-3 mt-4">
              {["twitter", "instagram", "facebook"].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-500 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li className="flex items-center gap-2"><span className="text-indigo-400">🏢</span> ShopAI Technologies Pvt. Ltd.</li>
              <li className="flex items-center gap-2"><span className="text-indigo-400">📍</span> 42, Tech Park, Bengaluru – 560001</li>
              <li className="flex items-center gap-2"><span className="text-indigo-400">🇮🇳</span> Karnataka, India</li>
              <li className="flex items-center gap-2"><span className="text-indigo-400">🪪</span> CIN: U74999KA2024PTC000123</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4">Contact Us</h3>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@shopai.in
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 80 4567 8900
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mon–Sat, 9am – 6pm IST
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                www.shopai.in
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} ShopAI Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
