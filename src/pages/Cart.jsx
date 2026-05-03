import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import "./Cart.css";

export default function Cart() {
  const { cart, totalPrice, formatPrice, selectAll } = useCart();

  const allChecked = cart.length > 0 && cart.every((item) => item.selected);

  return (
    <div className="container">
      <h1>Giỏ hàng</h1>

      <div className="cart-layout">
        {/* LEFT */}
        <div className="cart-left">
          <div className="cart-header">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={(e) => selectAll(e.target.checked)}
            />
            <span>Chọn tất cả</span>
          </div>

          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* RIGHT */}
        <div className="cart-right">
          <h3>Tổng thanh toán</h3>
          <h2>{formatPrice(totalPrice)}</h2>

          <button className="btn-checkout">Mua hàng</button>
        </div>
      </div>
    </div>
  );
}
