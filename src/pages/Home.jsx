import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import "./Home.css";
import { useSearch } from "../context/SearchContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { keyword } = useSearch();
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const [loading, setLoading] = useState(false);
  const [priceFilter, setPriceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortType, setSortType] = useState("default");

  // Debounce search
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [keyword]);

  let filteredList = products.filter((p) =>
    (p.name + (p.desc || ""))
      .toLowerCase()
      .includes((debouncedKeyword || "").toLowerCase())
  );

  // Filter category
  if (categoryFilter !== "all") {
    filteredList = filteredList.filter((p) => p.category === categoryFilter);
  }

  // Filter price
  if (priceFilter === "low")
    filteredList = filteredList.filter((p) => p.price < 1000000);
  if (priceFilter === "mid")
    filteredList = filteredList.filter((p) => p.price >= 1000000 && p.price <= 3000000);
  if (priceFilter === "high")
    filteredList = filteredList.filter((p) => p.price > 3000000);

  // Sort
  if (sortType === "asc")
    filteredList = [...filteredList].sort((a, b) => a.price - b.price);
  if (sortType === "desc")
    filteredList = [...filteredList].sort((a, b) => b.price - a.price);

  return (
    <div className="container">
      <h2 className="title">Danh sách sản phẩm ({filteredList.length})</h2>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
          <option value="all">Tất cả danh mục</option>
          <option value="camera">Camera</option>
          <option value="wifi">Wifi / Router</option>
          <option value="dau-ghi">Đầu ghi</option>
          <option value="phu-kien">Phụ kiện</option>
          <option value="smarthome">Smart Home</option>
          <option value="combo">Combo trọn bộ</option>
        </select>

        <select onChange={(e) => setPriceFilter(e.target.value)} value={priceFilter}>
          <option value="all">Tất cả giá</option>
          <option value="low">Dưới 1 triệu</option>
          <option value="mid">1 - 3 triệu</option>
          <option value="high">Trên 3 triệu</option>
        </select>

        <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
          <option value="default">Sắp xếp</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>

      {/* LIST */}
      <div className="list">
        {loading ? (
          Array(8).fill(0).map((_, i) => <div key={i} className="skeleton" />)
        ) : filteredList.length > 0 ? (
          filteredList.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="empty">Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  );
}
