import { Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
export default function InvoicesTable({ data }) {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "InvoiceNumber",
      dataIndex: "InvoiceNumber",
    },
    {
      title: "CustomerName",
      dataIndex: "CustomerName",
    },
    {
      title: "BillingAddress",
      dataIndex: "BillingAddress",
    },
    {
      title: "ShippingAddress",
      dataIndex: "ShippingAddress",
    },
    {
      title: "TotalAmount",
      dataIndex: "TotalAmount",
    },
  ];
  const handleRowClick = (record) => {
    // Navigate to URL with row ID
    navigate(`/update/${record.id}`);
  };
  return (
    <div>
      <button
        onClick={() => {
          navigate("/addItem");
        }}
      >
        Add
      </button>
      {data && (
        <Table
          columns={columns}
          dataSource={data}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      )}
    </div>
  );
}
