import "./style.css";

export default function PaymentForm() {
  return (
    <div className="cardDetail">
      <form id="form" name="omer">
        <div className="holderName">
          <h6>Kart Sahibinin Adı</h6>
          <input
            required
            type="text"
            name="berat"
            id="holderInput"
            placeholder="Örn. berat dimen"
            autocomplete="off"
          />
        </div>
        <div className="holderNumber">
          <h6>Kart Numarası</h6>
          <input
            required
            type="number"
            id="numberInput"
            maxlength="16"
            autocomplete="off"
            placeholder="Örn. 0000 0000 0000 0000"
          />
        </div>
        <div className="generalIpunts">
          <div className="expDate">
            <h6>Son Kullanma Tarihi</h6>
            <label id="#aayy">
              <input
                required
                type="number"
                id="aa"
                min="1"
                max="12"
                maxlength="2"
                placeholder="07"
              />
              <input
                required
                type="number"
                id="yy"
                min="1"
                max="99"
                maxlength="2"
                placeholder="29"
              />
            </label>
          </div>
          <div className="cvc">
            <h6>CVC</h6>
            <input
              required
              type="number"
              id="cvInput"
              maxlength="3"
              min="1"
              max="999"
              placeholder="264"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
