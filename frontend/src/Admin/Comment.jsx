import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "../AdminMenu"; // Adjust the import path as needed
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Comment = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ rating: '', comment: '' });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reviews', { withCredentials: true });
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleEdit = (review) => {
    setSelectedReview(review);
    setFormData({ rating: review.rating, comment: review.comment });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/reviews/${reviewId}`, { withCredentials: true });
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleView = (review) => {
    setSelectedReview(review);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedReview(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/reviews/${selectedReview._id}`, formData, { withCredentials: true });
      }
      const response = await axios.get('http://localhost:3000/reviews', { withCredentials: true });
      setReviews(response.data.reviews);
      handleClose();
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          {reviews.length === 0 ? (
            <p>No comments available.</p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Product ID</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id}>
                      <td>{`${review.userId.firstname} ${review.userId.lastname}`}</td>
                      <td>{review.productId}</td>
                      <td>{review.rating}</td>
                      <td>{review.comment}</td>
                      <td>
                        <Button 
                          variant="info" 
                          onClick={() => handleView(review)}
                          className="m-1"
                        >
                          View
                        </Button>
                        <Button 
                          variant="warning" 
                          onClick={() => handleEdit(review)}
                          className="m-1"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          onClick={() => handleDelete(review._id)}
                          className="m-1"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{isEditing ? "Edit Review" : "View Review"}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </Form.Group>
                {isEditing && (
                  <Button variant="primary" type="submit" className="mt-3">
                    Save Changes
                  </Button>
                )}
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Comment;
