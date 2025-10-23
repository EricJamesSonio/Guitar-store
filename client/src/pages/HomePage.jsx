import { useProducts } from "../context/ProductContext";
import ProductList from "../components/ProductList";
import "../css/Home.css";

export default function HomePage() {
  const { products, loading } = useProducts();

  return (
    <div className="home-container">
      <h1 className="title">🎸 Featured Guitars</h1>
      {loading ? <p>Loading...</p> : <ProductList products={products} />}
    </div>
  );
}
