import { useProducts } from "../context/ProductContext";
import  ProductList  from "../components/ProductList";

export default function HomePage() {
  const { products, loading, addProduct } = useProducts();

  const handleAdd = () => {
    const newProduct = {
      name: "New Guitar",
      description: "A brand new guitar!",
      price: 999.99,
      image: "new-guitar.jpg",
    };
    addProduct(newProduct);
  };

  return (
    <div className="home-container">
      <h1 className="title">🎸 Featured Guitars</h1>
      <button onClick={handleAdd}>➕ Add Product</button>
      {loading ? <p>Loading...</p> : <ProductList products={products} />}
    </div>
  );
}
