import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import WaterWaveEffect from "../components/WaterWaveEffect/WaterWaveEffect";
import { img } from "../assets/img";
export default function MainLayout() {
  return (
    <div className="flex justify-center items-center">
      <WaterWaveEffect imageSrc={img.bg} fill />
      <div className="  flex min-h-screen flex-col w-full items-center">
        <Header />

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8  bg-red-500  ">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
