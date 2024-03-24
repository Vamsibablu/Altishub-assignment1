import { useEffect, useState } from "react";
import ItemsListForm from "./FormLists/ItemsListForm";
import BillSundryList from "./FormLists/billSundryList";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import "../App.css";
export default function AddItemComponent({ data, setData }) {
  const maxInvoiceNumber =
    Math.max(...data.map((invoice) => invoice.InvoiceNumber)) + 1;
  const [invoiceData, setInvoiceData] = useState({
    id: crypto.randomUUID(),
    InvoiceNumber: maxInvoiceNumber,
    CustomerName: "",
    BillingAddress: "",
    ShippingAddress: "",
    date: null,
    Items: [],
    BillSundrys: [],
    TotalAmount: "",
  });
  const navigate = useNavigate();
  const [openItem, setOpenItem] = useState(false);
  const handleChange = (key, e) => {
    setInvoiceData({
      ...invoiceData,
      [key]: e.target.value,
    });
  };
  function calculateTotalAmount(items, billSundrys) {
    const itemsTotalAmount = items.reduce(
      (total, item) => total + item.amount,
      0
    );
    const billSundrysTotalAmount = billSundrys.reduce((total, billSundry) => {
      return total + parseFloat(billSundry.amount);
    }, 0);
    const totalAmount = itemsTotalAmount + billSundrysTotalAmount;
    return totalAmount;
  }
  const handleAddBillSundrys = (billSundryName, amount) => {
    const tempList = [
      ...invoiceData.BillSundrys,
      { id: crypto.randomUUID, billSundryName, amount },
    ];
    setInvoiceData({
      ...invoiceData,
      BillSundrys: tempList,
      TotalAmount: Number(invoiceData.TotalAmount) + Number(amount),
    });
  };
  const handleAddItems = (price, amount, itemName, quantity) => {
    const tempList = [
      ...invoiceData.Items,
      { price, amount, itemName, quantity },
    ];
    setInvoiceData({
      ...invoiceData,
      Items: tempList,
      TotalAmount: Number(invoiceData.TotalAmount) + Number(amount),
    });
  };
  const handleSubmit = () => {
    setData([...data, invoiceData]);
    navigate("/invoices");
  };
  return (
    <div>
      <div>
        <input
          placeholder="InvoiceNumber"
          value={invoiceData.InvoiceNumber}
          readOnly
        />
        <input
          placeholder="CustomerName"
          value={invoiceData.CustomerName}
          onChange={(e) => {
            handleChange("CustomerName", e);
          }}
        />
        <input
          placeholder="BillingAddress"
          value={invoiceData.BillingAddress}
          onChange={(e) => {
            handleChange("BillingAddress", e);
          }}
        />
        <input
          placeholder="ShippingAddress"
          value={invoiceData.ShippingAddress}
          onChange={(e) => {
            handleChange("ShippingAddress", e);
          }}
        />
        <DatePicker
          showTime
          //   defaultValue={new Date()}
          //   disabledDate={disabledDate}
          onChange={(date, dateString) => {
            setInvoiceData({ ...invoiceData, date: dateString });
          }}
        />
        <input
          placeholder="total value"
          value={invoiceData.TotalAmount}
          readOnly
        />
        <div>
          {invoiceData.Items.map((item) => {
            return (
              <>
                <input placeholder="item name" value={item.itemName} />
                <input placeholder="price" value={item.price} />
                <input placeholder="amount" value={item.amount} />
              </>
            );
          })}
          <ItemsListForm handleAddItems={handleAddItems} />
          {invoiceData.BillSundrys.map((item) => {
            return (
              <>
                <input placeholder="item name" value={item.billSundryName} />
                <input placeholder="amount" value={item.amount} />
              </>
            );
          })}
          <BillSundryList handleAddBillSundrys={handleAddBillSundrys} />
          <button onClick={handleSubmit}>Save</button>
          <button
            onClick={() => {
              navigate("/invoices");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
