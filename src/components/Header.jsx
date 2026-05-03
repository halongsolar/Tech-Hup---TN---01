import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useSearch } from "../context/SearchContext";

export default function Header() {
  const { totalQty } = useCart();
  const navigate = useNavigate();
  const { keyword, setKeyword } = useSearch();

  return (
    <header className="header">
      {/* TOP */}
      <div className="header-top">
        <div className="logo" onClick={() => navigate("/")}>
          🟢 Tech Hup
        </div>

        <div className="cart" onClick={() => navigate("/cart")}>
          🛒
          {totalQty > 0 && <span className="badge">{totalQty}</span>}
        </div>
      </div>

      {/* SEARCH */}
      <div className="header-bottom">
        <input
          type="text"
          placeholder="Tìm camera, wifi, thiết bị..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button>Tìm</button>
      </div>
    </header>
  );
}
