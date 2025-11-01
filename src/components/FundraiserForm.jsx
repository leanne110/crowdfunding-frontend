import { useState } from 'react'
import postFundraiser from '../api/post-fundraisers';

export function FundraiserForm() {

  const [newFundraiser, setNewFundraiser] = useState({
    owner: '',
    title: '',
    description: '',
    goal: 0,
    image: "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg",
    pledges: [],
    is_open: true
  });

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {

    const { id, value } = event.target;
    setNewFundraiser((prevFundraiser) => ({
      ...prevFundraiser,
      [id]: value,
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    newFundraiser.is_open = checked;
    newFundraiser.owner = parseInt(window.localStorage.getItem("id"));
    newFundraiser.goal = parseInt(newFundraiser.goal);

    postFundraiser(newFundraiser).then((response) => {
      console.log("Fundraiser created:", response);
    })
  }


  return (
    <>
      <h3>Fundraiser Form</h3>
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
          <label htmlFor="is_open">Is this fundraiser open now?</label>
          <input type="checkbox" id="is_open" name="is_open" checked={checked}
            onChange={(e) => setChecked(e.target.checked)} />
        </div>
        <button type="submit" onClick={handleSubmit} style={{ width: '100px' }}>
          Submit
        </button>
      </form>
    </>
  )
}

