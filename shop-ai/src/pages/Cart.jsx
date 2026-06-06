import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrdersContext } from "../context/OrdersContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIChat from "../components/AIChat";

export default function Cart() {
  const { cart, removeFromCart, addToCart, setCart } = useContext(CartContext);
  const { placeOrder } = useContext(OrdersContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("Razorpay (UPI, Cards, Wallets)");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalINR = Math.round(total * 83);

  const handleOrder = () => {
    placeOrder(cart, total, selectedPayment);
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-lg mx-auto px-6 py-24 text-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-400 text-sm">Thank you for your order. You can track it in My Orders.</p>
          <div className="flex gap-3 justify-center mt-8">
            <Link to="/orders" className="inline-block border-2 border-indigo-600 text-indigo-600 text-sm font-bold px-6 py-3.5 rounded-2xl hover:bg-indigo-50 transition-colors">
              View My Orders
            </Link>
            <Link to="/products" className="inline-block btn-primary text-white text-sm font-bold px-8 py-3.5 rounded-2xl shadow-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-7">
          <h1 className="text-2xl font-display font-extrabold text-gray-900 tracking-tight">Your Cart</h1>
          {totalItems > 0 && (
            <span className="badge-gradient text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">
              {totalItems}
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-6">Add some products to get started</p>
            <Link to="/products" className="inline-block btn-primary text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">₹{Math.round(item.price * 83).toLocaleString()} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded-full border-2 border-gray-200 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-all text-sm flex items-center justify-center font-bold">−</button>
                      <span className="text-sm font-extrabold text-gray-900 w-5 text-center">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="w-6 h-6 rounded-full border-2 border-gray-200 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-all text-sm flex items-center justify-center font-bold">+</button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-extrabold text-gray-900">₹{Math.round(item.price * item.quantity * 83).toLocaleString()}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors mt-1 font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
                <h2 className="text-base font-display font-extrabold text-gray-900 mb-5">Order Summary</h2>

                {/* Delivery Address preview */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-700">Delivery Address</p>
                    <p className="text-xs text-gray-400 mt-0.5">123, MG Road, Bangalore<br />Karnataka, 560001</p>
                  </div>
                  <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800">Change</button>
                </div>

                <div className="space-y-2.5 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Items ({totalItems})</span><span className="font-semibold text-gray-900">₹{totalINR.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Delivery Charges</span><span className="text-green-600 font-bold">FREE</span></div>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between font-extrabold text-gray-900 text-base">
                  <span>Total Amount</span>
                  <span>₹{totalINR.toLocaleString()}</span>
                </div>

                {/* Payment method */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Payment Method</p>
                  {["Razorpay (UPI, Cards, Wallets)", "Credit / Debit Card", "UPI", "Net Banking"].map((m, i) => (
                    <label key={m} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="payment" defaultChecked={i===0} onChange={() => setSelectedPayment(m)} className="accent-indigo-600" />
                      {m}
                    </label>
                  ))}
                </div>

                <button onClick={handleOrder} className="mt-5 w-full btn-primary text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg">
                  Pay with Razorpay →
                </button>
                <Link to="/products" className="block mt-2.5 text-center text-xs text-gray-400 hover:text-indigo-600 transition-colors font-medium">
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <AIChat />
    </div>
  );
}
