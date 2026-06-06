import { useContext } from "react";
import { Link } from "react-router-dom";
import { OrdersContext } from "../context/OrdersContext";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STATUS_STYLES = {
  Confirmed: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-indigo-100 text-indigo-700",
};

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

export default function Orders() {
  const { orders, loading } = useContext(OrdersContext);
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-28">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Please log in to view orders</h2>
          <Link to="/login" className="inline-block btn-primary text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg mt-4">
            Login
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-display font-extrabold text-gray-900 tracking-tight">My Orders</h1>
            <p className="text-gray-400 text-sm">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-28 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No orders yet</h2>
            <p className="text-gray-400 text-sm mb-6">Place your first order from your cart</p>
            <Link to="/products" className="inline-block btn-primary text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const items = order.items ?? [];
              const totalINR = order.total_inr ?? Math.round((order.total_usd ?? 0) * 83);
              const placedAt = order.placed_at ?? order.placedAt;
              const paymentMethod = order.payment_method ?? order.paymentMethod;

              return (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="px-5 py-4 border-b border-gray-50 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Order ID</p>
                      <p className="text-sm font-extrabold text-indigo-700 font-mono">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Placed on</p>
                      <p className="text-sm font-semibold text-gray-700">{formatDate(placedAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Payment</p>
                      <p className="text-sm font-semibold text-gray-700">{paymentMethod}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-gray-50">
                    {items.map((item, idx) => (
                      <div key={item.id ?? idx} className="px-5 py-3 flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                          <img src={item.image} alt={item.title} className="w-9 h-9 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity} × ₹{Math.round(item.price * 83).toLocaleString()}</p>
                        </div>
                        <p className="text-sm font-extrabold text-gray-900 shrink-0">
                          ₹{Math.round(item.price * item.quantity * 83).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-4 bg-gray-50/60 flex items-center justify-between">
                    <p className="text-xs text-gray-500 font-medium">{items.reduce((s, i) => s + i.quantity, 0)} item(s)</p>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Total Paid</p>
                      <p className="text-base font-extrabold text-gray-900">₹{totalINR.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
