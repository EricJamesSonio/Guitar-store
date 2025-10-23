import "../css/Footer.css"; // keep this import

export default function Footer() {
  return (
    <footer className="footer bg-gray-900 text-white text-center p-3">
      © {new Date().getFullYear()} Guitar Store. All rights reserved.
    </footer>
  );
}
