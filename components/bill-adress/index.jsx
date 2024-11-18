import "./style.css";

export default function BillAdress() {
  return (
    <form action="">
      <div className="name">
        <label htmlFor="name">
          <h6> Full Name</h6>
          <input type="text" placeholder="Enrty Your Name" />
        </label>

        <label htmlFor="companyName">
          <h6> Company Name</h6>
          <input type="text" placeholder="Enrty Your Surname" />
        </label>
      </div>
      <label htmlFor="">
        <h6> Address</h6>
        <input type="text" placeholder="Enrty Your Address" />
      </label>
      <div className="city">
        <label htmlFor="">
          <h6> City</h6>
          <input type="text" placeholder="Enrty Your City" />
        </label>
        <label htmlFor="">
          <h6>State</h6>
          <input type="text" placeholder="Enrty Your State" />
        </label>
      </div>
      <label htmlFor="">
        <h6>Country</h6>
        <input type="text" placeholder="Enrty Your Country" />
      </label>
      <div className="number">
        <label htmlFor="">
          <h6> Postal Code</h6>
          <input type="text" placeholder="Enrty Your Postal Code" />
        </label>
        <label htmlFor="">
          <h6>Phone Number</h6>
          <input type="text" placeholder="Enrty Your Phone Number" />
        </label>
      </div>
      <div className="tax">
        <label htmlFor="">
          <h6> Tax Number</h6>
          <input type="text" placeholder="Enrty Your Tax Number" />
        </label>
        <label htmlFor="">
          <h6>Tax Office</h6>
          <input type="text" placeholder="Enrty Your Tax Office" />
        </label>
      </div>
    </form>
  );
}
