import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../services/supabase";
import { AuthContext } from "./AuthContext";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from Supabase whenever user changes
  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("placed_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const placeOrder = async (cartItems, total, paymentMethod) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      user_id: user?.id ?? null,
      user_email: user?.email ?? null,
      items: cartItems,
      total_usd: total,
      total_inr: Math.round(total * 83),
      payment_method: paymentMethod,
      status: "Confirmed",
      placed_at: new Date().toISOString(),
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert([newOrder])
      .select()
      .single();

    if (!error && data) {
      setOrders(prev => [data, ...prev]);
      return data;
    } else {
      // Fallback: still show locally even if DB fails
      console.error("Supabase order insert error:", error);
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, loading, fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};
