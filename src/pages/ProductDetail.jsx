import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // 👉 tìm sản phẩm
  const product = products.find((p) => p.id === Number(id));

  // 👉 fallback
  if (!product) {
    return (
      <div className="container">
        <h2>❌ Không tìm thấy sản phẩm</h2>
        <button onClick={() => navigate("/")}>Quay lại</button>
      </div>
    );
  }

  // 👉 handler rõ ràng
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container">
      <div className="card">
        {/* LEFT */}
        <div className="left">
          <img src={product.img} alt={product.name} />
        </div>

        {/* RIGHT */}
        <div className="right">
          <h1 className="title">{product.name}</h1>

          <p className="price">{product.price}</p>

          <p className="desc">{product.desc}</p>

          <div className="actions">
            <button className="btn" onClick={handleAddToCart}>
              Mua ngay
            </button>

            <button className="btn btn-back" onClick={() => navigate("/")}>
              ← Tư vấn sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
