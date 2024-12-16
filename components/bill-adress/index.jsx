import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useFormState } from "react-dom";
import FormValidation from "@/actions/actions";
import "./style.css";

export default function BillAdress({ selectedAddress, setSelectedAddress }) {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, action] = useFormState(
    (prevState, formData) => FormValidation(prevState, formData),
    {
      error: {
        fullName: "",
      },
    }
  );

  const supabase = createClient();

  const userFetch = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user && !error) {
      setUser(data.user);
    } else {
      console.error("Error fetching user:", error);
    }
  };

  const fetchAddresses = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("billing_address")
        .select("*")
        .eq("user_id", user.id);

      if (data && !error) {
        setAddresses(data);
      } else {
        console.error("Error fetching addresses:", error);
      }
    }
  };

  useEffect(() => {
    userFetch();
  }, []);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    console.log(formObj, "formobj");
    try {
      const { data, error } = await supabase.from("billing_address").upsert([
        {
          full_name: formObj.fullName,
          company_name: formObj.companyName,
          address_line1: formObj.address,
          city: formObj.city,
          state: formObj.state,
          country: formObj.country,
          postal_code: formObj.postalCode,
          phone: formObj.phoneNumber,
          tax_number: formObj.taxNumber,
          tax_office: formObj.taxOffice,
          user_id: user.id,
        },
      ]);
      if (error) {
        console.error("Error saving data:", error.message);
      } else {
        console.log("Data saved successfully:", data);
        fetchAddresses();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  return (
    <div className="address">
      <div className="address-selection">
        <div className="address-cards" onClick={() => setIsModalOpen(true)}>
          <div className="address-card">
            <p>Create New Address</p>
          </div>
        </div>
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div className="address-cards" key={address.id}>
              <div
                className="address-card"
                onClick={() => handleSelectAddress(address)}
              >
                <input
                  type="radio"
                  name="selectedAddress"
                  value={address.id}
                  checked={selectedAddress?.id === address.id}
                  onChange={() => handleSelectAddress(address)}
                />
                <div className="address-details">
                  <p>{address.full_name}</p>
                  <p>{address.address_line1}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>{address.country}</p>
                  <p>{address.postal_code}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No addresses found. Please fill in your billing address.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Address</h3>
            <hr />
            <form onSubmit={handleSubmit} action={action}>
              <div className="name">
                <label>
                  <h6>Full Name</h6>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Your Name"
                  />
                  {state.error?.full_name && (
                    <p className="error">{state.error.full_name}</p>
                  )}
                </label>

                <label>
                  <h6>Company Name</h6>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter Your Company Name"
                  />
                </label>
              </div>

              <label>
                <h6>Address</h6>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Your Address"
                />
              </label>
              {state.error?.address && (
                <p className="error">{state.error.address}</p>
              )}

              <div className="city">
                <label>
                  <h6>City</h6>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter Your City"
                  />
                </label>
                {state.error?.city && (
                  <p className="error">{state.error.city}</p>
                )}
                <label>
                  <h6>State</h6>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter Your State"
                  />
                </label>
              </div>

              <label>
                <h6>Country</h6>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter Your Country"
                />
              </label>

              <div className="number">
                <label>
                  <h6>Postal Code</h6>
                  <input
                    type="number"
                    name="postalCode"
                    placeholder="Enter Your Postal Code"
                  />
                </label>

                <label>
                  <h6>Phone Number</h6>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Enter Your Phone Number"
                    required
                  />
                </label>
              </div>

              <div className="tax">
                <label>
                  <h6>Tax Number</h6>
                  <input
                    type="number"
                    name="taxNumber"
                    placeholder="Enter Your Tax Number"
                  />
                </label>

                <label>
                  <h6>Tax Office</h6>
                  <input
                    type="number"
                    name="taxOffice"
                    placeholder="Enter Your Tax Office"
                  />
                </label>
              </div>

              <button type="submit">Submit</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
