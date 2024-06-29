import { Outlet } from "react-router-dom";
import Header from "../../pages/header";
import Navbar from "./Navbar";
import Footer from "../../pages/footer";
import "../../index.css";

function SharedLayout() {
  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default SharedLayout;
