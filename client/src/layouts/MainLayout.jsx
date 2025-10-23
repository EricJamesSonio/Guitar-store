import Navbar from "../controls/NavBar";
import Footer from "../controls/Footer";
import "../css/MainLayout.css"; // create this

export default function MainLayout({ children }) {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}
