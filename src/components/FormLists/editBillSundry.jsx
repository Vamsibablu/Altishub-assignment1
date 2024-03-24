import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const EditBillSundryForm = ({ billSundry, onSave }) => {
  const [formData, setFormData] = useState(billSundry);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Form onFinish={handleSave}>
      <Form.Item label="Bill Sundry Name">
        <Input
          value={formData.billSundryName}
          onChange={(e) =>
            setFormData({ ...formData, billSundryName: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Amount">
        <Input
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Form.Item>
      <Button onClick={handleSave}>Save</Button>
    </Form>
  );
};

export default EditBillSundryForm;
