import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const EditItemForm = ({ item, onSave }) => {
  const [formData, setFormData] = useState(item);

  const handleSave = () => {
    onSave(formData);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseFloat(e.target.value);
    if (!isNaN(newQuantity)) {
      const newAmount = newQuantity * formData.price;
      setFormData({ ...formData, quantity: newQuantity, amount: newAmount });
    } else {
      setFormData({ ...formData, quantity: "", amount: "" });
    }
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice) && newPrice > 0) {
      const newAmount = newPrice * formData.quantity;
      setFormData({ ...formData, price: newPrice, amount: newAmount });
    } else {
      setFormData({ ...formData, price: "", amount: "" });
    }
  };

  return (
    <Form onFinish={handleSave}>
      <Form.Item label="Item Name">
        <Input
          value={formData.itemName}
          onChange={(e) =>
            setFormData({ ...formData, itemName: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Quantity">
        <Input value={formData.quantity} onChange={handleQuantityChange} />
      </Form.Item>
      <Form.Item label="Price">
        <Input value={formData.price} onChange={handlePriceChange} />
      </Form.Item>
      <Form.Item label="Amount">
        <Input value={formData.amount} disabled />
      </Form.Item>
      <Button onClick={handleSave}>Save</Button>
    </Form>
  );
};

export default EditItemForm;
