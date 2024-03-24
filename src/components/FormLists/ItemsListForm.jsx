import { useState } from "react";
import { invoiceData } from "../../Data/invoicesData";

export default function ItemsListForm({ handleAddItems }) {
  const [openItem, setOpenItem] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const handleChange = (price, amount, itemName, quantity) => {
    handleAddItems(price, amount, itemName, quantity);
    setAmount("");
    setPrice("");
    setQuantity("");
    setItemName("");
  };
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpenItem(true);
        }}
      >
        Add item
      </button>
      {openItem && (
        <>
          <input
            placeholder="item name"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
          <input
            placeholder="price"
            value={price}
            min={1}
            onChange={(e) => {
              const newPrice = parseFloat(e.target.value);
              if (newPrice > 0) {
                setPrice(e.target.value);
                if (quantity) {
                  setAmount(quantity * e.target.value);
                }
              } else {
                setPrice("");
              }
            }}
          />
          <input
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              if (price) {
                setAmount(price * e.target.value);
              }
            }}
          />
          <input
            placeholder="amount"
            value={amount || ""}
            readOnly
            // onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={() => {
              handleChange(price, amount, itemName, quantity);
            }}
            disabled={!(amount && price && quantity && itemName)}
          >
            Add
          </button>
        </>
      )}
    </div>
  );
}
