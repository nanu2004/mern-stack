import Navigations from "./Navigations";
import { Outlet } from "react-router-dom";
// import { MainProductPage } from "./UserComponents/MainProductPage";
import { Footer } from "./Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigations />
      {/* <MainProductPage /> */}
      <Outlet />{" "}
      {/* hun eh ikk tra da khali box ban gya jithe appa kus v rakh skde a... */}
      <Footer />
    </div>
  );
}

export { Layout };