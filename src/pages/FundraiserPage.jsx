// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import getFundraisersById from "../api/get-fundraisers-by-id";
// import deleteFundraisersById from "../api/delete-fundraiser-by-id";
// import updateFundraiser from "../api/update-fundraiser";
// import addPledge from "../api/add-pledge";

// function FundraiserPage() {
//   const navigate = useNavigate();
//   const { id } = useParams()
//   const [fundraiserData, setFundraiserData] = useState({})

//   const currentUserId = parseInt(window.localStorage.getItem("id"));
//   const isOwner = fundraiserData.owner === currentUserId;

//   const [loading, setLoading] = useState(true); // track loading state
//   const [error, setError] = useState(null);

//   const [isEditing, setIsEditing] = useState(false);

//   // Editable fields
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const [goal, setGoal] = useState(0);

//   //pledge state
//   const [amount, setAmount] = useState("");
//   const [comment, setComment] = useState("");
//   const [anonymous, setAnonymous] = useState(false);
//   const [pledgeSubmitting, setPledgeSubmitting] = useState(false);


//   useEffect(() => {
//     setLoading(true);
//     getFundraisersById(id)
//       .then((data) => {
//         setFundraiserData(data);
//         setTitle(data.title || "");
//         setDescription(data.description || "");
//         setImage(data.image || "");
//         setIsOpen(data.is_open);
//         setGoal(data.goal || 0);
//         setLoading(false);

//       })
//       .catch((err) => {
//         setError(err.message || "Error fetching fundraiser");
//         setLoading(false);
//       });
//   }, [id]);



//   const handleDelete = () => {

//     const confirmed = window.confirm("Are you sure you want to delete this fundraiser?");
//     if (!confirmed) return;

//     deleteFundraisersById(id)
//       .then(() => {
//         console.log("Fundraiser deleted successfully");
//         navigate('/');
//       })
//       .catch((err) => {
//         if (err.message === "Invalid token.") {
//           setError("You must be logged in to delete a fundraiser.");
//         } else {
//           setError(err.message || "Error deleting fundraiser")
//         }
//       });
//   }



//   const handleSave = () => {
//     updateFundraiser(
//       {
//         title,
//         description,
//         image,
//         is_open: isOpen,
//         goal,
//       },
//       id
//     )
//       .then((data) => {
//         setFundraiserData(data);
//         setIsEditing(false);
//         setError(null);
//       })
//       .catch((err) => {
//         setError(err.message || "Error updating fundraiser");
//       });
//   };


//   const handlePledgeSubmit = (e) => {
//     e.preventDefault();
//     setPledgeSubmitting(true);

//     addPledge({
//       amount: Number(amount),
//       comment,
//       anonymous,
//       fundraiser: Number(id),
//     })
//       .then(() => {
//         // Re-fetch fundraiser to show updated pledges
//         return getFundraisersById(id);
//       })
//       .then((data) => {
//         setFundraiserData(data);
//         setAmount("");
//         setComment("");
//         setAnonymous(false);
//         setError(null);
//       })
//       .catch((err) => {
//         setError(err.message || "Error submitting pledge");
//       })
//       .finally(() => {
//         setPledgeSubmitting(false);
//       });
//   };



//   if (loading) {
//     return <p>Loading fundraiser data...</p>;
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>Error: {error}</p>;
//   }

//   if (!fundraiserData) {
//     return <p>No fundraiser data found.</p>;
//   }

//   return (
//     <div>
//       <h2>{isEditing ? "Edit Fundraiser" : fundraiserData.title}</h2>
//       {image && (
//         <img
//           src={image}
//           alt="Fundraiser"
//           style={{ maxWidth: "400px", marginBottom: "1rem" }}
//         />
//       )}

//       <p>{fundraiserData.description}</p>
//       <h3>Status: {fundraiserData.is_open ? "Open" : "Closed"}</h3>

//       <p><strong>Goal:</strong> ${fundraiserData.goal}</p>

//       <p><strong>Total Pledged:</strong> ${fundraiserData.pledges?.reduce((sum, pledge) => sum + pledge.amount, 0) || 0}</p>


//       {isOwner && (
//         isEditing ? (
//           <>
//             <div>
//               <label>Title:</label><br />
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>

//             <div>
//               <label>Goal:</label><br />
//               <input
//                 type="number"
//                 min="1"
//                 value={goal}
//                 onChange={(e) => setGoal(Number(e.target.value))}
//               />
//             </div>

//             <div>
//               <label>Description:</label><br />
//               <textarea
//                 rows={4}
//                 cols={50}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>

//             <div>
//               <label>Image URL:</label><br />
//               <input
//                 type="text"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//               />
//             </div>

//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={isOpen}
//                   onChange={(e) => setIsOpen(e.target.checked)}
//                 />
//                 Fundraiser is Open
//               </label>
//             </div>

//             <button onClick={handleSave}>💾 Save</button>
//             <button onClick={() => setIsEditing(false)}>Cancel</button>
//           </>
//         ) : (
//           <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
//         )
//       )}


//       <hr />
//       <h3>Pledges:</h3>
//       <ul>
//         {(fundraiserData.pledges || []).length > 0 ? (
//           fundraiserData.pledges.map((pledge) => (
//             <li key={pledge.id || pledge.supporter}>
//               ${pledge.amount} from {pledge.anonymous ? 'anonymous' : pledge.supporter_name}
//             </li>
//           ))
//         ) : (
//           <li>No pledges yet</li>
//         )}
//       </ul>

//       {window.localStorage.getItem("token") && (
//         <>
//           <hr />
//           <h3>Make a Pledge</h3>
//           <form onSubmit={handlePledgeSubmit}>
//             <div>
//               <label>Amount:</label><br />
//               <input
//                 type="number"
//                 min="1"
//                 value={amount}
//                 required
//                 onChange={(e) => setAmount(e.target.value)}
//               />
//             </div>
//             <div>
//               <label>Comment:</label><br />
//               <input
//                 type="text"
//                 maxLength="200"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//             </div>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={anonymous}
//                   onChange={(e) => setAnonymous(e.target.checked)}
//                 />
//                 Stay anonymous
//               </label>
//             </div>
//             <button type="submit" disabled={pledgeSubmitting}>
//               🤝 {pledgeSubmitting ? "Submitting..." : "Submit Pledge"}
//             </button>
//           </form>
//         </>
//       )}

//       <hr />
//       {isOwner &&
//         <button onClick={handleDelete} style={{ color: "red" }}>
//           🗑️ Delete this fundraiser
//         </button>}

//     </div>

//   );

// }

// export default FundraiserPage;



import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getFundraisersById from "../api/get-fundraisers-by-id";
import deleteFundraisersById from "../api/delete-fundraiser-by-id";
import updateFundraiser from "../api/update-fundraiser";
import addPledge from "../api/add-pledge";

import "./FundraiserPage.css";

function FundraiserPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fundraiserData, setFundraiserData] = useState({});
  const currentUserId = parseInt(window.localStorage.getItem("id"));
  const isOwner = fundraiserData.owner === currentUserId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [goal, setGoal] = useState(0);

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
        setGoal(data.goal || 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching fundraiser");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this fundraiser?")) return;

    deleteFundraisersById(id)
      .then(() => navigate("/"))
      .catch((err) => {
        setError(err.message === "Invalid token."
          ? "You must be logged in to delete a fundraiser."
          : err.message || "Error deleting fundraiser");
      });
  };

  const handleSave = () => {
    updateFundraiser({ title, description, image, is_open: isOpen, goal }, id)
      .then((data) => {
        setFundraiserData(data);
        setIsEditing(false);
        setError(null);
      })
      .catch((err) => setError(err.message || "Error updating fundraiser"));
  };

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    setPledgeSubmitting(true);

    addPledge({ amount: Number(amount), comment, anonymous, fundraiser: Number(id) })
      .then(() => getFundraisersById(id))
      .then((data) => {
        setFundraiserData(data);
        setAmount("");
        setComment("");
        setAnonymous(false);
        setError(null);
      })
      .catch((err) => setError(err.message || "Error submitting pledge"))
      .finally(() => setPledgeSubmitting(false));
  };

  if (loading) return <p className="loading">Loading fundraiser data...</p>;
  if (error) return <p className="error-msg">Error: {error}</p>;
  if (!fundraiserData) return <p>No fundraiser data found.</p>;

  return (
    <div className="fundraiser-wrapper">
      <div className="fundraiser-main">
        <h2>{isEditing ? "Edit Fundraiser" : fundraiserData.title}</h2>

        {image && (
          <img
            src={image}
            alt="Fundraiser"
            className="fundraiser-image-large"
          />
        )}

        {isEditing ? (
          <div className="edit-section">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Goal</label>
            <input
              type="number"
              min="1"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
            />
            <label>Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Image URL</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={isOpen}
                onChange={(e) => setIsOpen(e.target.checked)}
              />
              Fundraiser is Open
            </label>
            <div className="edit-buttons">
              <button className="btn primary" onClick={handleSave}>💾 Save</button>
              <button className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="fundraiser-info">
            <p className="description">{fundraiserData.description}</p>
            <p><strong>Status:</strong> {fundraiserData.is_open ? "Open" : "Closed"}</p>
            <p><strong>Goal:</strong> ${fundraiserData.goal}</p>
            <p><strong>Total Pledged:</strong> ${fundraiserData.pledges?.reduce((sum, p) => sum + p.amount, 0) || 0}</p>
            {isOwner && (
              <button className="btn edit-btn" onClick={() => setIsEditing(true)}>✏️ Edit</button>
            )}
          </div>
        )}
      </div>

      <div className="fundraiser-sidebar">
        <h3>Pledges</h3>
        <ul className="pledge-list">
          {(fundraiserData.pledges || []).length > 0 ? (
            fundraiserData.pledges.map((p) => (
              <li key={p.id} className="pledge-item">
                ${p.amount} from {p.anonymous ? "anonymous" : p.supporter_name}
              </li>
            ))
          ) : (
            <li>No pledges yet</li>
          )}
        </ul>

        {window.localStorage.getItem("token") && (
          <form className="pledge-form" onSubmit={handlePledgeSubmit}>
            <h4>Make a Pledge</h4>
            <label>Amount</label>
            <input
              type="number"
              min="1"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <label>Comment</label>
            <input
              type="text"
              maxLength="200"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
              Stay anonymous
            </label>
            <button className="btn primary" type="submit" disabled={pledgeSubmitting}>
              🤝 {pledgeSubmitting ? "Submitting..." : "Submit Pledge"}
            </button>
          </form>
        )}

        {isOwner && (
          <button className="btn danger delete-btn" onClick={handleDelete}>
            🗑️ Delete this fundraiser
          </button>
        )}
      </div>
    </div>
  );

}

export default FundraiserPage;
