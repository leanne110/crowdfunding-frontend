import React from 'react';
import { FundraiserForm } from '../components/FundraiserForm';

function NewFundraiserPage() {
  const backgroundImage = "https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg";



  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "30px 40px",
          borderRadius: "12px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "Raleway, sans-serif" }}>
          Create a New Fundraiser
        </h2>
        <FundraiserForm />
      </div>
    </div>
  );
}

export default NewFundraiserPage;
