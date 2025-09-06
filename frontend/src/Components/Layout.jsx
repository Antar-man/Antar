import Navbar from "../Components/Navbar/nav.jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen pb-[70px]">
      {children}
      <Navbar />
    </div>
  );
}
