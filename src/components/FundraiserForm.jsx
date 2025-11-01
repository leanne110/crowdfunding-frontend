import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import postFundraiser from '../api/post-fundraisers';

export function FundraiserForm() {
  const navigate = useNavigate();

  const [newFundraiser, setNewFundraiser] = useState({
    owner: '',
    title: '',
    description: '',
    goal: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dog_Breeds.jpg?20201016183302",
    pledges: [],
    is_open: true
  });

  const [checked, setChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;
    setNewFundraiser((prevFundraiser) => ({
      ...prevFundraiser,
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
      .then((response) => {
        console.log("Fundraiser created:", response);
        setSuccessMessage("✅ Fundraiser created successfully!");
        setErrorMessage('');
        // Redirect to homepage after short delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch((err) => {
        setErrorMessage("❌ Failed to create fundraiser: " + (err.message || "Unknown error"));
        setSuccessMessage('');
      });
  };

  return (
    <>
      <h3>Fundraiser Form</h3>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter new fundraiser title"
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="Enter new fundraiser description"
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <label htmlFor="goal">Goal:</label>
          <input
            type="number"
            id="goal"
            placeholder="Enter your goal"
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            placeholder="Paste an image URL"
            onChange={handleChange}
            value={newFundraiser.image}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <label htmlFor="is_open">Is this fundraiser open now?</label>
          <input
            type="checkbox"
            id="is_open"
            name="is_open"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </div>

        <button type="submit" onClick={handleSubmit} style={{ width: '100px' }}>
          Submit
        </button>
      </form>
    </>
  )
}
