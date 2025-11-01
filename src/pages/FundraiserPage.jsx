import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getFundraisersById from "../api/get-fundraisers-by-id";
import deleteFundraisersById from "../api/delete-fundraiser-by-id";
import updateFundraiser from "../api/update-fundraiser";
import addPledge from "../api/add-pledge";

function FundraiserPage() {
  const navigate = useNavigate();
  const { id } = useParams()
  const [fundraiserData, setFundraiserData] = useState({})

  const currentUserId = parseInt(window.localStorage.getItem("id"));
  const isOwner = fundraiserData.owner === currentUserId;

  const [loading, setLoading] = useState(true); // track loading state
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  // Editable fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  //pledge state
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [pledgeSubmitting, setPledgeSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFundraisersById(id)
      .then((data) => {
        setFundraiserData(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setImage(data.image || "");
        setIsOpen(data.is_open);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching fundraiser");
        setLoading(false);
      });
  }, [id]);



  const handleDelete = () => {

    const confirmed = window.confirm("Are you sure you want to delete this fundraiser?");
    if (!confirmed) return;

    deleteFundraisersById(id)
      .then(() => {
        console.log("Fundraiser deleted successfully");
        navigate('/');
      })
      .catch((err) => {
        if (err.message === "Invalid token.") {
          setError("You must be logged in to delete a fundraiser.");
        } else {
          setError(err.message || "Error deleting fundraiser")
        }
      });
  }



  const handleSave = () => {
    updateFundraiser(
      {
        title,
        description,
        image,
        is_open: isOpen,
      },
      id
    )
      .then((data) => {
        setFundraiserData(data);
        setIsEditing(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Error updating fundraiser");
      });
  };


  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    setPledgeSubmitting(true);

    addPledge({
      amount: Number(amount),
      comment,
      anonymous,
      fundraiser: Number(id),
    })
      .then(() => {
        // Re-fetch fundraiser to show updated pledges
        return getFundraisersById(id);
      })
      .then((data) => {
        setFundraiserData(data);
        setAmount("");
        setComment("");
        setAnonymous(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Error submitting pledge");
      })
      .finally(() => {
        setPledgeSubmitting(false);
      });
  };



  if (loading) {
    return <p>Loading fundraiser data...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!fundraiserData) {
    return <p>No fundraiser data found.</p>;
  }

  return (
    <div>
      <h2>{isEditing ? "Edit Fundraiser" : fundraiserData.title}</h2>
      {image && (
        <img
          src={image}
          alt="Fundraiser"
          style={{ maxWidth: "400px", marginBottom: "1rem" }}
        />
      )}

      <p>{fundraiserData.description}</p>
      <h3>Status: {fundraiserData.is_open ? "Open" : "Closed"}</h3>

      <p><strong>Goal:</strong> ${fundraiserData.goal}</p>

      <p><strong>Total Pledged:</strong> ${fundraiserData.pledges?.reduce((sum, pledge) => sum + pledge.amount, 0) || 0}</p>


      {isOwner && (
        isEditing ? (
          <>
            <div>
              <label>Title:</label><br />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label>Description:</label><br />
              <textarea
                rows={4}
                cols={50}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label>Image URL:</label><br />
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isOpen}
                  onChange={(e) => setIsOpen(e.target.checked)}
                />
                Fundraiser is Open
              </label>
            </div>

            <button onClick={handleSave}>💾 Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
        )
      )}


      <hr />
      <h3>Pledges:</h3>
      <ul>
        {(fundraiserData.pledges || []).length > 0 ? (
          fundraiserData.pledges.map((pledge) => (
            <li key={pledge.id || pledge.supporter}>
              ${pledge.amount} from {pledge.anonymous ? 'anonymous' : pledge.supporter_name}
            </li>
          ))
        ) : (
          <li>No pledges yet</li>
        )}
      </ul>

      {window.localStorage.getItem("token") && (
        <>
          <hr />
          <h3>Make a Pledge</h3>
          <form onSubmit={handlePledgeSubmit}>
            <div>
              <label>Amount:</label><br />
              <input
                type="number"
                min="1"
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label>Comment:</label><br />
              <input
                type="text"
                maxLength="200"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                />
                Stay anonymous
              </label>
            </div>
            <button type="submit" disabled={pledgeSubmitting}>
              🤝 {pledgeSubmitting ? "Submitting..." : "Submit Pledge"}
            </button>
          </form>
        </>
      )}

      <hr />
      {isOwner &&
        <button onClick={handleDelete} style={{ color: "red" }}>
          🗑️ Delete this fundraiser
        </button>}

    </div>

  );

}

export default FundraiserPage;