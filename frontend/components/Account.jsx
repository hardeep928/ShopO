import Logo from "../src/assets/erasebg-transformed.png";
import { Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div className="pages-container">
      <img src={Logo} alt="ShopO Logo" />
      <Outlet />
    </div>
  );
};

export default Account;
