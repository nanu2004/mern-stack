import { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  console.log(formData);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            required
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            required
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-semibold mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            required
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-semibold mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="4"
            cols="50"
            className="border w-full"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export { UserForm };