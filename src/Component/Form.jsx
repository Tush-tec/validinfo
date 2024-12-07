import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [gender, setGender] = useState({ value: "", error: "" });
  const [state, setState] = useState({ value: "", error: "" });
  const [city, setCity] = useState({ value: "", error: "" });
  const [pincode, setPincode] = useState({ value: "", error: "" });
  const [image, setImage] = useState({ value: null, error: "" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage({ value: null, error: "" });

    if (file) {
      if (!file.type.startsWith("image/")) {
        setImage({
          value: null,
          error: "Please upload a valid image file (jpg, png, jpeg).",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setImage({ value: null, error: "File size must be less than 5MB." });
        return;
      }

      const imageBlob = new Blob([file], { type: file.type });
      setImage({ value: imageBlob, error: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for Name
    if (name.value === "") {
      setName({ value: name.value, error: "Name is required!" });
    } else if (name.value.length < 3) {
      setName({
        value: name.value,
        error: "Name should be at least 3 characters!",
      });
    } else if (name.value.length > 25) {
      setName({
        value: name.value,
        error: "Name should be less than 25 characters!",
      });
    } else if (!/^[A-Za-z\s]+$/.test(name.value)) {
      setName({
        value: name.value,
        error: "Name should contain only letters and spaces.",
      });
    } else {
      setName({ value: name.value, error: "" });
    }

    // Check for Email
    if (email.value === "") {
      setEmail({
        value: email.value,
        error: "Email is required, please enter your email address.",
      });
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)
    ) {
      setEmail({ value: email.value, error: "Enter a valid email address!" });
    }

    // Check for Gender
    if (gender.value === "") {
      setGender({ value: gender.value, error: "Please select your gender." });
    } else {
      setGender({ value: gender.value, error: "" });
    }

    // Check for City
    if (city.value === "") {
      setCity({ value: city.value, error: "City is required!" });
    } else if (city.value.length < 3) {
      setCity({
        value: city.value,
        error: "Invalid city, please enter a valid city name.",
      });
    } else if (city.value.length > 30) {
      setCity({
        value: city.value,
        error: "City name should not exceed 30 characters.",
      });
    } else {
      setCity({ value: city.value, error: "" });
    }

    // Check for State
    if (state.value === "") {
      setState({ value: state.value, error: "State is required!" });
    } else if (state.value.length < 3) {
      setState({
        value: state.value,
        error: "Invalid state, please enter a valid state name.",
      });
    } else if (state.value.length > 30) {
      setState({
        value: state.value,
        error: "State name should not exceed 30 characters.",
      });
    } else {
      setState({ value: state.value, error: "" });
    }

    // Check for Pincode
    if (pincode.value === "") {
      setPincode({ value: pincode.value, error: "Pincode is required!" });
    } else if (!/^\d{6}$/.test(pincode.value)) {
      setPincode({ value: pincode.value, error: "Pincode must be 6 digits." });
    } else {
      setPincode({ value: pincode.value, error: "" });
    }

    // Check for Image
    if (!image.value) {
      setImage({ value: null, error: "Please select an image to upload." });
      return;
    }

    const formData = new FormData();
    formData.append("image", image.value);

    // Handle Backend Request
    // try {
    //   const response = await axios.post("/api/v1/users/upload", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   console.log("Form submitted successfully:", response.data);
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <h4 className="mb-4 text-center text-success fw-bold">
              User Information
            </h4>

            {/* Name Field */}
            <div className="mb-3">
              <label className="form-label text-primary">UserName</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                value={name.value}
                onChange={(e) => setName({ value: e.target.value, error: "" })}
              />
              <p className="mb-3 text-danger">{name.error}</p>
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label text-primary">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={email.value}
                onChange={(e) => setEmail({ value: e.target.value, error: "" })}
              />
              <p className="text-danger">{email.error}</p>
            </div>

            {/* Date of Birth Field */}
            <div className="mb-3">
              <label className="form-label text-primary">Date of Birth</label>
              <input type="date" className="form-control" name="dob" />
            </div>

            {/* State Field */}
            <div className="mb-3">
              <label className="form-label text-primary">State</label>
              <input
                type="text"
                className="form-control"
                name="state"
                placeholder="State"
                value={state.value}
                onChange={(e) => setState({ value: e.target.value, error: "" })}
              />
              <p className="text-danger">{state.error}</p>
            </div>

            {/* City Field */}
            <div className="mb-3">
              <label className="form-label text-primary">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                placeholder="City"
                value={city.value}
                onChange={(e) => setCity({ value: e.target.value, error: "" })}
              />
              <p className="text-danger">{city.error}</p>
            </div>

            {/* Pincode Field */}
            <div className="mb-3">
              <label className="form-label text-primary">Pincode</label>
              <input
                type="text"
                className="form-control"
                name="pincode"
                placeholder="Pincode"
                value={pincode.value}
                onChange={(e) =>
                  setPincode({ value: e.target.value, error: "" })
                }
              />
              <p className="text-danger">{pincode.error}</p>
            </div>

            {/* Gender Field */}
            <div className="mb-3">
              <label className="form-label text-primary">Gender</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender.value === "male"}
                    onChange={(e) =>
                      setGender({ value: e.target.value, error: "" })
                    }
                  />
                  <span className="text-dark">Male</span>
                </label>
                <label className="ms-3">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender.value === "female"}
                    onChange={(e) =>
                      setGender({ value: e.target.value, error: "" })
                    }
                  />
                  <span className="text-dark">Female</span>
                </label>
              </div>
              <p className="text-danger">{gender.error}</p>
            </div>

            {/* Image Upload Field */}
            <div className="mb-3">
              <label className="form-label text-primary">Image Upload</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
              <p className="text-danger">{image.error}</p>
            </div>

            {/* Submit Button */}
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
