import { redirect } from "next/navigation";
import "./style.css";

export default function ButtonGroup() {
  function handleClick() {
    if (window.confirm("Are you sure you want to cancel?")) {
      window.location.reload();
    }
  }
  return (
    <div className="buttonCotaniner">
      <button onClick={handleClick} className="delete">
        Cancel Order
      </button>
    </div>
  );
}
