import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, formatPrice } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container">
        <h2>❌ Không tìm thấy sản phẩm</h2>
        <button onClick={() => navigate("/")}>Quay lại</button>
      </div>
    );
  }

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

          <p className="price">
            {formatPrice ? formatPrice(product.price) : product.price}
          </p>

          <p className="desc">{product.desc}</p>

          {/* ✅ THÔNG SỐ */}
          <div className="specs">
            <h3>Thông số kỹ thuật:</h3>
            <ul>
              {product.specs?.map((s, i) => (
                <li key={i}>✔ {s}</li>
              ))}
            </ul>
          </div>

          {/* ✅ BẢO HÀNH */}
          <p className="meta">✔ Bảo hành: {product.warranty}</p>

          <p className="meta">
            ✔ Tình trạng: {product.stock ? "Còn hàng" : "Hết hàng"}
          </p>

          {/* ACTION */}
          <div className="actions">
            <button className="btn" onClick={handleAddToCart}>
              🛒 Thêm vào giỏ
            </button>

            {/* 🔥 NÚT BÁN THẬT */}
            <a
              href="https://zalo.me/YOUR_SDT"
              target="_blank"
              rel="noreferrer"
              className="btn btn-buy"
            >
              📞 Mua / Tư vấn ngay
            </a>

            <button className="btn btn-back" onClick={() => navigate("/")}>
              ← Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
