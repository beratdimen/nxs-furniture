import "../style.css";

export default function BankTable() {
  const data = [
    {
      vade: "3 Ay",
      faiz: "%2.69",
      taksit: "2.892 TL",
      toplamTutar: "8.676 TL",
      yillikMaliyet: "%56.34",
    },
    {
      vade: "6 Ay",
      faiz: "%3.29",
      taksit: "1.559 TL",
      toplamTutar: "9.358 TL",
      yillikMaliyet: "%72.37",
    },
    {
      vade: "9 Ay",
      faiz: "%3.49",
      taksit: "1.116 TL",
      toplamTutar: "10.049 TL",
      yillikMaliyet: "%78.04",
    },
    {
      vade: "12 Ay",
      faiz: "%3.49",
      taksit: "890 TL",
      toplamTutar: "10.686 TL",
      yillikMaliyet: "%78.04",
    },
    {
      vade: "18 Ay",
      faiz: "%3.49",
      taksit: "668 TL",
      toplamTutar: "12.029 TL",
      yillikMaliyet: "%78.04",
    },
  ];

  return (
    <div className="table-container">
      <table className="bank-table">
        <thead>
          <tr>
            <th>Vade</th>
            <th>Faiz</th>
            <th>Taksit</th>
            <th>Toplam Tutar</th>
            <th>Yıllık Maliyet</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.vade}</td>
              <td>{item.faiz}</td>
              <td>{item.taksit}</td>
              <td>{item.toplamTutar}</td>
              <td>{item.yillikMaliyet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
