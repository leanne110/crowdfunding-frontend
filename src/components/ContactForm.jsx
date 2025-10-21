import { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    your_name: "",
    email: "",
    message: "",
  });

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message!");
    // You could also POST this data to your backend API here
  }

  return (
    <div>
      <h1>Contact Us</h1>
      <form>
        <div>
          <label htmlFor="your_name">Name:</label>
          <input
            type="text"
            id="your_name"
            placeholder="Enter your name"
            onChange={handleChange}
            value={formData.your_name}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div>
          <label htmlFor="message">Questions:</label>
          <input
            type="text"
            id="message"
            placeholder="Enter your questions"
            onChange={handleChange}
            value={formData.message}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div >
  )
}

export default ContactPage;