import { Outlet } from "react-router-dom";
import Header from "./Header";


function Layout() {
  return (
    <main className="p-3 max-w-5xl m-auto text-gray-800">
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
