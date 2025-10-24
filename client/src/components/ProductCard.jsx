import "../css/ProductCard.css";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { removeProduct, updateProduct } = useProducts();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(product);

  const handleUpdate = async () => {
    await updateProduct(product.id, form);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="product-card editing">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          value={form.price}
          type="number"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="product-card">
      <img
        src={product.image ? `/guitars/${product.image}` : "/guitars/fender.jpg"}
        alt={product.name}
        className="product-img"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="price">${product.price}</p>
      <button className="add-to-cart-btn">Add to Cart</button>
      <button onClick={() => setEditing(true)}>✏️ Edit</button>
      <button onClick={() => removeProduct(product.id)}>🗑 Delete</button>
    </div>
  );
}
