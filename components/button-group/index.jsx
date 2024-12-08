import { redirect } from "next/navigation";
import "./style.css";

export default function ButtonGroup() {
  function handleClick() {
    if (window.confirm("İptal Etmek İstediğine Emin misin ? ")) {
      window.location.reload();
    }
  }
  return (
    <div className="buttonCotaniner">
      <button onClick={handleClick} className="delete">
        İptal Et
      </button>
    </div>
  );
}
