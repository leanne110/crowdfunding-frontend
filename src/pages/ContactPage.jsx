function ContactPage() {
  const backgroundImage = "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg";

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          borderRadius: "12px",
          maxWidth: "800px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          marginTop: "-80px",  // shift card slightly upward
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Contact Us</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          Have questions, suggestions, or need support with your fundraiser? We'd love to hear from you.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          Reach out to us at: <br />
          <a href="mailto:treasurebowl.team@gmail.com" style={{ fontWeight: "bold", color: "#333" }}>
            treasurebowl.team@gmail.com
          </a>
        </p>
        <p style={{ fontSize: "1rem", marginTop: "1.5rem", fontStyle: "italic" }}>
          We typically respond within 24–48 hours.
        </p>
      </div>
    </div>
  );
}

export default ContactPage;
