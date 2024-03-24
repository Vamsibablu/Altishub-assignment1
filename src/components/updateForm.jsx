import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditItemForm from "./FormLists/editItemForm";
import EditBillSundryForm from "./FormLists/editBillSundry";

export default function UpdateFormFn({ data, setData }) {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [reqInd, setReqInd] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    data.forEach((item) => {});
    const reqItem = data.filter((item, i) => {
      if (item.id == id) {
        setReqInd(i + 1);
      }
      return item.id == id;
    });
    setFormData(reqItem[0]);
  }, []);

  const handleItemEdit = (index, updatedItem) => {
    const updatedItems = [...formData.Items];
    updatedItems.splice(index, 1);
    updatedItems.push(updatedItem);
    setFormData({ ...formData, Items: updatedItems });
  };

  const handleBillSundryEdit = (index, updatedBillSundry) => {
    const updatedBillSundrys = [...formData.BillSundrys];
    updatedBillSundrys.splice(index, 1);
    updatedBillSundrys.push(updatedBillSundry);
    setFormData({ ...formData, BillSundrys: updatedBillSundrys });
  };
  const handleChange = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };
  const handleSubmit = () => {
    const tempArr = [...data];
    const value = calculateTotalAmount(formData.Items, formData.BillSundrys);
    reqInd && tempArr.splice(reqInd - 1, 1);
    tempArr.push({ ...formData, TotalAmount: value });
    setData(tempArr);
    navigate("/invoices");
  };

  function calculateTotalAmount(items, billSundrys) {
    const itemsTotalAmount = items.reduce(
      (total, item) => total + Number(item.amount),
      0
    );
    const billSundrysTotalAmount = billSundrys.reduce((total, billSundry) => {
      return total + parseFloat(billSundry.amount);
    }, 0);
    const totalAmount = itemsTotalAmount + billSundrysTotalAmount;
    return totalAmount;
  }

  return (
    formData && (
      <div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            readOnly
            onChange={(e) => {
              handleChange("Date", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="invoiceNumber">Invoice Number:</label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.InvoiceNumber}
            // onChange={()=>{handleChange('Date',e.target.value)}}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.CustomerName}
            onChange={(e) => {
              handleChange("CustomerName", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="billingAddress">Billing Address:</label>
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            value={formData.BillingAddress}
            onChange={(e) => {
              handleChange("BillingAddress", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="shippingAddress">Shipping Address:</label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            value={formData.ShippingAddress}
            onChange={(e) => {
              handleChange("ShippingAddress", e.target.value);
            }}
          />
        </div>

        <div>
          <h3>Items</h3>
          {formData.Items.map((item, index) => (
            <div key={index}>
              <EditItemForm
                item={item}
                onSave={(updatedItem) => handleItemEdit(index, updatedItem)}
              />
            </div>
          ))}
        </div>

        <div>
          <h3>Bill Sundries</h3>
          {formData.BillSundrys.map((billSundry, index) => (
            <div key={index}>
              <EditBillSundryForm
                billSundry={billSundry}
                onSave={(updatedBillSundry) =>
                  handleBillSundryEdit(index, updatedBillSundry)
                }
              />
            </div>
          ))}
        </div>

        <div>{/* Additional fields for Items and BillSundrys */}</div>
        <button onClick={handleSubmit}>Save</button>
        <button
          onClick={() => {
            navigate("/invoices");
          }}
        >
          Cancel
        </button>
        {/* </form> */}
      </div>
    )
  );
}
