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
  const [sortType, setSortType] = useState("default");

  // debounce search
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  const parsePrice = (price) => Number(price.replace(/\D/g, ""));

  // FILTER SEARCH
  let filteredList = products.filter((p) =>
    (p.name + (p.desc || ""))
      .toLowerCase()
      .includes((debouncedKeyword || "").toLowerCase()),
  );

  // FILTER PRICE
  if (priceFilter === "low") {
    filteredList = filteredList.filter((p) => parsePrice(p.price) < 1000000);
  }

  if (priceFilter === "mid") {
    filteredList = filteredList.filter(
      (p) => parsePrice(p.price) >= 1000000 && parsePrice(p.price) <= 3000000,
    );
  }

  if (priceFilter === "high") {
    filteredList = filteredList.filter((p) => parsePrice(p.price) > 3000000);
  }

  // SORT
  if (sortType === "asc") {
    filteredList = [...filteredList].sort(
      (a, b) => parsePrice(a.price) - parsePrice(b.price),
    );
  }

  if (sortType === "desc") {
    filteredList = [...filteredList].sort(
      (a, b) => parsePrice(b.price) - parsePrice(a.price),
    );
  }

  return (
    <div className="container">
      <h2 className="title">Danh sách sản phẩm</h2>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <select onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="low">Dưới 1 triệu</option>
          <option value="mid">1 - 3 triệu</option>
          <option value="high">Trên 3 triệu</option>
        </select>

        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="default">Sắp xếp</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>

      {/* LIST */}
      <div className="list">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, i) => <div key={i} className="skeleton" />)
        ) : filteredList.length > 0 ? (
          filteredList.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="empty">Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  );
}
