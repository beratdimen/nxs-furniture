import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./style.css";

export default function BillAddress({ selectedAddress, setSelectedAddress }) {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    companyName: Yup.string()
      .required("Company name is required")
      .min(2, "Company name must be at least 2 characters"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    postalCode: Yup.number().typeError("Must be a number"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Phone number is required"),
    taxNumber: Yup.string(),
    taxOffice: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { data, error } = await supabase.from("billing_address").upsert([
        {
          full_name: values.fullName,
          company_name: values.companyName,
          address_line1: values.address,
          city: values.city,
          state: values.state,
          country: values.country,
          postal_code: values.postalCode,
          phone: values.phoneNumber,
          tax_number: values.taxNumber,
          tax_office: values.taxOffice,
          user_id: user.id,
        },
      ]);
      if (error) {
        console.error("Error saving data:", error.message);
      } else {
        console.log("Data saved successfully:", data);
        fetchAddresses();
        resetForm();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

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
            <Formik
              initialValues={{
                fullName: "",
                companyName: "",
                address: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
                phoneNumber: "",
                taxNumber: "",
                taxOffice: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="name">
                  <label>
                    <h6>Full Name</h6>
                    <Field
                      type="text"
                      name="fullName"
                      placeholder="Enter Your Name"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="error"
                    />
                  </label>

                  <label>
                    <h6>Company Name</h6>
                    <Field
                      type="text"
                      name="companyName"
                      placeholder="Enter Your Company Name"
                    />
                    <ErrorMessage
                      name="companyName"
                      component="div"
                      className="error"
                    />
                  </label>
                </div>

                <label>
                  <h6>Address</h6>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Enter Your Address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error"
                  />
                </label>

                <div className="city">
                  <label>
                    <h6>City</h6>
                    <Field
                      type="text"
                      name="city"
                      placeholder="Enter Your City"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="error"
                    />
                  </label>

                  <label>
                    <h6>State</h6>
                    <Field
                      type="text"
                      name="state"
                      placeholder="Enter Your State"
                    />
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="error"
                    />
                  </label>
                </div>

                <label>
                  <h6>Country</h6>
                  <Field
                    type="text"
                    name="country"
                    placeholder="Enter Your Country"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="error"
                  />
                </label>

                <div className="number">
                  <label>
                    <h6>Postal Code</h6>
                    <Field
                      type="number"
                      name="postalCode"
                      placeholder="Postal Code"
                    />
                  </label>

                  <label>
                    <h6>Phone Number</h6>
                    <Field
                      type="number"
                      name="phoneNumber"
                      placeholder="Enter Your Phone Number"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="error"
                    />
                  </label>
                </div>

                <button type="submit">Submit</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
