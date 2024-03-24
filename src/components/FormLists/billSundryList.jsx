import { useState } from "react";
import { invoiceData } from "../../Data/invoicesData";

export default function BillSundryList({ handleAddBillSundrys }) {
  const [openItem, setOpenItem] = useState(false);
  const [billSundryName, setBillSundryName] = useState("");
  const [amount, setAmount] = useState("");
  const handleChange = (billSundryName, amount) => {
    handleAddBillSundrys(billSundryName, amount);
    setBillSundryName("");
    setAmount("");
  };
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpenItem(true);
        }}
      >
        Add BillSundrys
      </button>
      {openItem && (
        <>
          <input
            placeholder="Bill Sundry Name"
            value={billSundryName}
            onChange={(e) => {
              setBillSundryName(e.target.value);
            }}
          />
          <input
            placeholder="amount"
            value={amount}
            // onChange={(e) => setAmount(e.target.value)}
            onChange={(e) => {
              const inputValue = e.target.value;
              // Allow input if it's a valid number or empty
              if (/^-?\d*\.?\d*$/.test(inputValue)) {
                setAmount(inputValue);
              }
            }}
          />
          <button
            onClick={() => {
              handleChange(billSundryName, amount);
            }}
            disabled={!(billSundryName && amount)}
          >
            Add
          </button>
        </>
      )}
    </div>
  );
}
