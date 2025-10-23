import AppRoutes from "./routes/AppRoutes";
import { ProductProvider } from "./context/ProductContext";
import "./css/App.css"; // import the app-level CSS

export default function App() {
  return (
    <div className="app-container">
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
    </div>
  );
}
