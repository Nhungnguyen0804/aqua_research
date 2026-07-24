import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import WaterWaveEffect from "../components/WaterWaveEffect/WaterWaveEffect";
import { img } from "../assets/img";
export default function MainLayout() {
  return (
    <div className="flex justify-center items-center">
      <div className="  flex min-h-screen flex-col w-full items-center">
        <Header />
        {/* ko chặn chuột, bật tại từng card  */}
        <main className=" relative w-full  flex-1 px-6 py-8    ">
          <WaterWaveEffect imageSrc={img.bg} fill={true} />
          <div className="pointer-events-none relative z-10">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
