import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div style={{ width: "20%", height: "100%" }}>
      <NavLink to="/invoices">
        <button>Invoices</button>
      </NavLink>
    </div>
  );
}
