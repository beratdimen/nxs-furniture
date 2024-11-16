import { redirect } from "next/navigation";
import "./style.css";

export default function ButtonGroup() {
  function handleClick() {
    window.location.reload();
  }
  return (
    <div className="buttonCotaniner">
      <button className="edit">Düzenle</button>
      <button onClick={handleClick} className="delete">
        İptal Et
      </button>
      <button className="required">Onayla</button>
    </div>
  );
}
