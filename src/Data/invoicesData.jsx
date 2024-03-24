export const invoiceData = [
  {
    id: 1,
    date: new Date().toLocaleDateString(),
    InvoiceNumber: 1,
    CustomerName: "vamsi",
    BillingAddress: "hyderabad",
    ShippingAddress: "chennai",
    Items: [
      {
        amount: 6,
        itemName: "lap",
        price: "2",
        quantity: "3",
      },
    ],
    BillSundrys: [
      {
        amount: "5",
        billSundryName: "ashok",
      },
    ],
    TotalAmount: 11,
  },
];
