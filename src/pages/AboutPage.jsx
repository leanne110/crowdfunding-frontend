function AboutPage() {
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
          marginTop: "-80px",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>About Treasure Bowl</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          <strong>Treasure Bowl</strong> is a community-powered fundraising platform dedicated to helping pet animals in need. Whether it's urgent vet bills, shelter support, or adoption efforts, we're here to support pet lovers and rescuers.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          Every contribution brings hope and healing to our furry friends. Join us in making a difference—one bowl at a time.
        </p>
        <p style={{ fontSize: "1rem", marginTop: "1.5rem", fontStyle: "italic" }}>
          Together, we fund compassion.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
