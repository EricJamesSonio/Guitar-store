import "../css/ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image ? `/guitars/${product.image}` : '/guitars/fender.jpg'}
        alt={product.name}
        className="product-img"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="price">${product.price}</p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
}
