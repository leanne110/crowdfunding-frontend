import LoginForm from "../components/LoginForm";

function LoginPage() {

  const backgroundImage =
    "https://static.vecteezy.com/system/resources/previews/066/583/774/non_2x/dog-background-adorable-group-of-dogs-and-cats-posing-together-for-a-studio-pet-portrait-free-photo.jpg";

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
        padding: "20px",
      }}
    >

      <LoginForm />

    </div>
  );

}

export default LoginPage;