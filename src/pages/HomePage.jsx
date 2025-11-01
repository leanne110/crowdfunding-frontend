import FundraiserCard from "../components/FundraiserCard";
import useFundraisers from "../hooks/use-fundraisers";
import "./HomePage.css";

function HomePage() {
  const { fundraisers } = useFundraisers();
  return (
    <>
      <h1 style={{
        fontSize: "2.2rem",
        marginBottom: "1rem",
        textAlign: "center",
        color: "#333"
      }}>
        🐾 Explore Pet Fundraisers
      </h1>
      <div className="fundraiser-section">
        <div id="fundraiser-list">
          {fundraisers.map((fundraiserData, key) => {
            return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;