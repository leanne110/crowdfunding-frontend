import FundraiserCard from "../components/FundraiserCard";
import useFundraisers from "../hooks/use-fundraisers";
import "./HomePage.css";

function HomePage() {
  const { fundraisers } = useFundraisers();
  return (
    <div className="fundraiser-section">
      <div id="fundraiser-list">
        {fundraisers.map((fundraiserData, key) => {
          return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;