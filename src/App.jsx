import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import InvoiceHomePage from "./components/invoiceHomePage";
import { Route, Routes } from "react-router-dom";
import InvoicesTable from "./components/invoicesTable";
import NavBar from "./components/navBar";
import { invoiceData } from "./Data/invoicesData";
import AddItemComponent from "./components/addItemForm";
import UpdateFormFn from "./components/updateForm";
function App() {
  const [data, setData] = useState(invoiceData);
  return (
    <div style={{ display: "flex" }}>
      <NavBar />
      <Routes>
        <Route path="" element={<InvoiceHomePage />}></Route>
        <Route path="/invoices" element={<InvoicesTable data={data} />}></Route>
        <Route
          path="/addItem"
          element={<AddItemComponent data={data} setData={setData} />}
        ></Route>
        <Route
          path="/update/:id"
          element={<UpdateFormFn data={data} setData={setData} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
