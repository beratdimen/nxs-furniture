"use client";
import { useFormState } from "react-dom";
import "./style.css";
import FormValidation from "@/actions/actions";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function BillAdress() {
  const [user, setUser] = useState(null);

  const [state, action] = useFormState(
    (prevState, formData) => FormValidation(prevState, formData),
    { error: null }
  );

  const userFetch = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user && !error) {
      setUser(data.user);
    } else {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    userFetch();
  }, []);

  const supabase = createClient();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    try {
      const { data, error } = await supabase.from("billing_address").insert([
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
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} action={action}>
      <div className="name">
        <label>
          <h6> Full Name</h6>
          <input type="text" name="fullName" placeholder="Enter Your Name" />
          {state.error?.fullName && (
            <p className="error">{state.error.fullName}</p>
          )}
        </label>

        <label>
          <h6> Company Name</h6>
          <input
            type="text"
            name="companyName"
            placeholder="Enter Your Company Name"
          />
        </label>
      </div>

      <label>
        <h6> Address</h6>
        <input type="text" name="address" placeholder="Enter Your Address" />
        {state.error?.address && <p className="error">{state.error.address}</p>}
      </label>

      <div className="city">
        <label>
          <h6> City</h6>
          <input type="text" name="city" placeholder="Enter Your City" />
          {state.error?.city && <p className="error">{state.error.city}</p>}
        </label>

        <label>
          <h6> State</h6>
          <input type="text" name="state" placeholder="Enter Your State" />
        </label>
      </div>

      <label>
        <h6> Country</h6>
        <input type="text" name="country" placeholder="Enter Your Country" />
      </label>

      <div className="number">
        <label>
          <h6> Postal Code</h6>
          <input
            type="text"
            name="postalCode"
            placeholder="Enter Your Postal Code"
          />
          {state.error?.postalCode && (
            <p className="error">{state.error.postalCode}</p>
          )}
        </label>

        <label>
          <h6> Phone Number</h6>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter Your Phone Number"
          />
        </label>
      </div>

      <div className="tax">
        <label>
          <h6> Tax Number</h6>
          <input
            type="text"
            name="taxNumber"
            placeholder="Enter Your Tax Number"
          />
        </label>

        <label>
          <h6> Tax Office</h6>
          <input
            type="text"
            name="taxOffice"
            placeholder="Enter Your Tax Office"
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
