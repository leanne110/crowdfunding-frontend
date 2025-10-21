import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getFundraisersById from "../api/get-fundraisers-by-id";

function FundraiserPage() {

  const { id } = useParams()
  const [fundraiserData, setFundraiserData] = useState({})
  const [loading, setLoading] = useState(true); // track loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); // start loading
    getFundraisersById(id)
      .then((data) => {
        setFundraiserData(data);
        setLoading(false); // data fetched
      })
      .catch((err) => {
        console.error("Error fetching fundraiser:", err);
        setError(err.message || "Error fetching fundraiser");
        setLoading(false);
      });
  }, [id]);


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
      <h2>{fundraiserData.title}</h2>
      <h3>Created at: {fundraiserData.date_created}</h3>
      <h3>Status: {fundraiserData.is_open ? "Open" : "Closed"}</h3>

      <h3>Pledges:</h3>
      <ul>
        {(fundraiserData.pledges || []).length > 0 ? (
          fundraiserData.pledges.map((pledge) => (
            <li key={pledge.id || pledge.supporter}>
              {pledge.amount} from {pledge.supporter}
            </li>
          ))
        ) : (
          <li>No pledges yet</li>
        )}
      </ul>
    </div>
  );

}

export default FundraiserPage;