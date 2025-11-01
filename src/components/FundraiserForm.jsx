import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraisers";
import "./FundraiserForm.css";

export function FundraiserForm() {
  const navigate = useNavigate();

  const [newFundraiser, setNewFundraiser] = useState({
    owner: "",
    title: "",
    description: "",
    goal: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dog_Breeds.jpg?20201016183302",
    pledges: [],
    is_open: true,
  });

  const [checked, setChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setNewFundraiser((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fundraiserToSubmit = {
      ...newFundraiser,
      is_open: checked,
      owner: parseInt(window.localStorage.getItem("id")),
      goal: parseInt(newFundraiser.goal),
    };

    postFundraiser(fundraiserToSubmit)
      .then(() => {
        setSuccessMessage("✅ Fundraiser created successfully!");
        setErrorMessage("");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {

        if (err.message === "Invalid token.") {
          setErrorMessage("❌ Failed to create fundraiser: You must be logged in.");
          setSuccessMessage("");
        } else {
          setErrorMessage("❌ Failed to create fundraiser: " + (err.message || "Unknown error"));
          setSuccessMessage("");
        }
      });
  };

  return (
    <div className="form-container">
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="fundraiser-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Enter fundraiser title" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" rows="4" placeholder="Enter fundraiser description" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="goal">Goal Amount</label>
          <input type="number" id="goal" placeholder="Enter funding goal" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input type="text" id="image" placeholder="Paste image link" value={newFundraiser.image} onChange={handleChange} />
        </div>

        <div className="form-checkbox">
          <input type="checkbox" id="is_open" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <label htmlFor="is_open">Fundraiser is Open</label>
        </div>

        <button type="submit" className="submit-button">Create Fundraiser</button>
      </form>
    </div>
  );
}
