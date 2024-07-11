// CategoryForm.jsx

import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="categoryName" className="form-label">
          Category Name
        </label>
        <input
          type="text"
          className="form-control"
          id="categoryName"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
