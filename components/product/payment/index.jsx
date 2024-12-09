import "../style.css";

export default function BankTable() {
  const data = [
    {
      term: "3 Months",
      interest: "%2.69",
      installment: "2,892 TL",
      totalAmount: "8,676 TL",
      annualCost: "%56.34",
    },
    {
      term: "6 Months",
      interest: "%3.29",
      installment: "1,559 TL",
      totalAmount: "9,358 TL",
      annualCost: "%72.37",
    },
    {
      term: "9 Months",
      interest: "%3.49",
      installment: "1,116 TL",
      totalAmount: "10,049 TL",
      annualCost: "%78.04",
    },
    {
      term: "12 Months",
      interest: "%3.49",
      installment: "890 TL",
      totalAmount: "10,686 TL",
      annualCost: "%78.04",
    },
    {
      term: "18 Months",
      interest: "%3.49",
      installment: "668 TL",
      totalAmount: "12,029 TL",
      annualCost: "%78.04",
    },
  ];

  return (
    <div className="table-container">
      <img src="/img/mastercard.png" alt="mastercard" width={55} />
      <table className="bank-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Interest</th>
            <th>Installment</th>
            <th>Total Amount</th>
            <th>Annual Cost</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.term}</td>
              <td>{item.interest}</td>
              <td>{item.installment}</td>
              <td>{item.totalAmount}</td>
              <td>{item.annualCost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <img src="/img/visa.png" alt="visa" width={55} />
      <table className="bank-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Interest</th>
            <th>Installment</th>
            <th>Total Amount</th>
            <th>Annual Cost</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.term}</td>
              <td>{item.interest}</td>
              <td>{item.installment}</td>
              <td>{item.totalAmount}</td>
              <td>{item.annualCost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <img src="/img/troy.png" alt="troy" width={55} />
      <table className="bank-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Interest</th>
            <th>Installment</th>
            <th>Total Amount</th>
            <th>Annual Cost</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.term}</td>
              <td>{item.interest}</td>
              <td>{item.installment}</td>
              <td>{item.totalAmount}</td>
              <td>{item.annualCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
