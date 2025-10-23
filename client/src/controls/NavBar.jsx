import { Link } from "react-router-dom";
import "../css/NavBar.css";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      <Link to="/" className="font-bold text-xl">🎸 Guitar Store</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
