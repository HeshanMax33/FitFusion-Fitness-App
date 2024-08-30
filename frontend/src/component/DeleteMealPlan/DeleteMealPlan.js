import React from 'react';
import axios from 'axios';

function DeleteMealPlan({ id, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/mealplans/${id}`);
      onDelete(id);
      alert('Are you sure you want to delete this meal plan?');
    } catch (error) {
      console.error('Error deleting meal plan:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default DeleteMealPlan;
