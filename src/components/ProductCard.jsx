import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.img} alt={product.name} />

      <h3>{product.name}</h3>
      <p className="price">{product.price}</p>

      <button>Mua ngay</button>
    </div>
  );
}
