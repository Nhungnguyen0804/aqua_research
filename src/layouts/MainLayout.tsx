import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex justify-center ">
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8  bg-red-500 ">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
