import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { increase, decrease, removeItem, toggleSelect, formatPrice } =
    useCart();

  return (
    <div className="cart-item">
      {/* checkbox */}
      <input
        type="checkbox"
        checked={item.selected}
        onChange={() => toggleSelect(item.id)}
      />

      <img src={item.img} />

      <div className="info">
        <h3>{item.name}</h3>
        <p>{formatPrice(item.price)}</p>
      </div>

      <div className="actions">
        <button onClick={() => decrease(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => increase(item.id)}>+</button>
      </div>

      <div className="price">{formatPrice(item.price * item.quantity)}</div>

      <button onClick={() => removeItem(item.id)}>Xóa</button>
    </div>
  );
}
