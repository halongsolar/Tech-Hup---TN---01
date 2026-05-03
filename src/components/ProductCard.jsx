import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const formatPrice = (price) =>
    typeof price === "number"
      ? price.toLocaleString("vi-VN") + "đ"
      : price;

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{formatPrice(product.price)}</p>
      {!product.stock && <span className="out-of-stock">Hết hàng</span>}
      <button>Xem chi tiết</button>
    </div>
  );
}
