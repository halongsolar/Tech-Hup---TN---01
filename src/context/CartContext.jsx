import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";

/* =========================
   1. CREATE CONTEXT
========================= */
const CartContext = createContext();

/* =========================
   2. LOAD STATE SAFE (tránh crash)
========================= */
function loadCart() {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/* =========================
   3. HELPER: chuẩn hóa giá
========================= */
function normalizePrice(price) {
  if (typeof price === "number") return price;
  if (typeof price === "string") return Number(price.replace(/[^\d]/g, ""));
  return 0;
}

/* =========================
   4. REDUCER (CỐT LÕI)
========================= */
function cartReducer(state, action) {
  switch (action.type) {
    /* 👉 THÊM VÀO GIỎ */
    case "ADD": {
      const exist = state.cart.find((i) => i.id === action.payload.id);

      if (exist) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 } // ✅ tăng đúng
              : item,
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, quantity: 1, selected: true },
        ],
      };
    }
    case "TOGGLE_SELECT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id ? { ...item, selected: !item.selected } : item,
        ),
      };

    case "SELECT_ALL":
      return {
        ...state,
        cart: state.cart.map((item) => ({
          ...item,
          selected: action.value,
        })),
      };
    /* 👉 TĂNG / GIẢM SỐ LƯỢNG */
    case "SET_QTY": {
      return {
        ...state,
        cart: state.cart
          .map((item) => {
            if (item.id !== action.id) return item;

            const newQty = item.quantity + action.delta;

            return {
              ...item,
              quantity: newQty,
            };
          })
          .filter((item) => item.quantity > 0), // ✅ tự remove nếu = 0
      };
    }

    /* 👉 XOÁ 1 ITEM */
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.id),
      };

    /* 👉 CLEAR */
    case "CLEAR":
      return { cart: [] };

    default:
      return state;
  }
}

/* =========================
   5. PROVIDER
========================= */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: loadCart(),
  });

  /* 👉 Sync localStorage */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  /* =========================
     6. ACTIONS (KHÔNG dùng useCallback để tránh overkill)
  ========================= */

  const addToCart = (product) => {
    dispatch({ type: "ADD", payload: product });
  };
  const toggleSelect = (id) => dispatch({ type: "TOGGLE_SELECT", id });

  const selectAll = (value) => dispatch({ type: "SELECT_ALL", value });
  // 👉 tăng
  const increase = (id) => {
    dispatch({ type: "SET_QTY", id, delta: 1 });
  };

  // 👉 giảm
  const decrease = (id) => {
    dispatch({ type: "SET_QTY", id, delta: -1 });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE", id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  /* =========================
     7. STATS (tính tổng)
  ========================= */
  const stats = useMemo(() => {
    return state.cart.reduce(
      (acc, item) => {
        const price = normalizePrice(item.price);

        acc.totalQty += item.quantity;
        acc.totalPrice += item.quantity * price;

        return acc;
      },
      { totalQty: 0, totalPrice: 0 },
    );
  }, [state.cart]);

  /* =========================
     8. FORMAT TIỀN
  ========================= */
  const formatPrice = (price) => price.toLocaleString("vi-VN") + "đ";

  /* =========================
     9. VALUE (tránh re-render thừa)
  ========================= */
  const value = useMemo(
    () => ({
      cart: state.cart,

      // actions
      addToCart,
      increase,
      decrease,
      removeItem,
      clearCart,
      toggleSelect,
      selectAll,

      // stats
      totalQty: stats.totalQty,
      totalPrice: stats.totalPrice,

      // helper
      formatPrice,
    }),
    [state.cart, stats],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* =========================
   10. CUSTOM HOOK
========================= */
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
