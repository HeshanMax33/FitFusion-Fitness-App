import React, { useState } from 'react';
import axios from 'axios';
import './MealPlanForm.css';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';



function MealPlanForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [recipes, setRecipes] = useState(['']);
  const [ingredients, setIngredients] = useState(['']);
  const [cookingInstructions, setCookingInstructions] = useState(['']);
  const [nutritionalInformation, setNutritionalInformation] = useState(['']);
  const [dietaryPreferences, setDietaryPreferences] = useState('Anything'); // Default to 'Anything'
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddRecipe = () => {
    setRecipes([...recipes, '']);
  };

  const handleRemoveRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleAddInstruction = () => {
    setCookingInstructions([...cookingInstructions, '']);
  };

  const handleRemoveInstruction = (index) => {
    const updatedInstructions = [...cookingInstructions];
    updatedInstructions.splice(index, 1);
    setCookingInstructions(updatedInstructions);
  };
  
  const handleDietaryPreferenceChange = (e) => {
    setDietaryPreferences(e.target.value);
  };

  //nutrition
  const handleAddNutritionalInformation = () => {
    setNutritionalInformation([...nutritionalInformation, '']);
  };
  
  const handleRemoveNutritionalInformation = (index) => {
    const updatedInformation = [...nutritionalInformation];
    updatedInformation.splice(index, 1);
    setNutritionalInformation(updatedInformation);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('recipes', JSON.stringify(recipes));
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('cookingInstructions', JSON.stringify(cookingInstructions));
    formData.append('nutritionalInformation', JSON.stringify(nutritionalInformation));
    formData.append('dietaryPreferences', dietaryPreferences);
    formData.append('file', file);
  
    try {
      const response = await axios.post('http://localhost:8080/api/mealplans', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Meal plan created successfully!');
      setName('');
      setDescription('');
      setRecipes(['']);
      setIngredients(['']);
      setCookingInstructions(['']);
      setNutritionalInformation(['']);
      setDietaryPreferences('Anything'); // Reset dietary preferences to 'Anything'
      setFile(null);
      setError(null);
      const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      });
  
      if (result.isConfirmed) {
        
        navigate('/viewmealplan');// clicks "Save"
      } else if (result.isDenied || result.dismiss === Swal.DismissReason.cancel) {
        
      }
    } catch (error) {
      console.error('Error creating  your meal plan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update meal plan. Please try again.',
        confirmButtonColor: '#dc3545'
      });
    }
  };
  
  
  return (
    <div className="pageContainer">
      <div className="MealformContainer">
        <h2>Create Meal Plan</h2>
        {error && <div className="errorMessage">{error}</div>}
        {successMessage && <div className="successMessage">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="label">Dietary Preferences:</label>
            <div className="dropdownMenu">
              <select className="dropdown" value={dietaryPreferences} onChange={handleDietaryPreferenceChange}>
                <option value="Anything">Anything</option>
                <option value="Paleo">Paleo</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Mediterranean">Mediterranean</option>
              </select>
            </div>
          </div>
          <div className="formGroup">
            <label className="label">Name:</label>
            <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="formGroup">
            <label className="label">Description:</label>
            <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="formGroup">
            <label className="label">Recipes:</label>
            {recipes.map((recipe, index) => (
              <div key={index} className="inputGroup">
                <input
                  className="input"
                  type="text"
                  value={recipe}
                  onChange={(e) => {
                    const updatedRecipes = [...recipes];
                    updatedRecipes[index] = e.target.value;
                    setRecipes(updatedRecipes);
                  }}
                />
                {index !== 0 && (
                  <button type="button" onClick={() => handleRemoveRecipe(index)} className="removeButton">
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddRecipe} className="addButton">
              + Add Recipe
            </button>
          </div>
          <div className="formGroup">
            <label className="label">Ingredients:</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="inputGroup">
                <input
                  className="input"
                  type="text"
                  value={ingredient}
                  onChange={(e) => {
                    const updatedIngredients = [...ingredients];
                    updatedIngredients[index] = e.target.value;
                    setIngredients(updatedIngredients);
                  }}
                />
                {index !== 0 && (
                  <button type="button" onClick={() => handleRemoveIngredient(index)} className="removeButton">
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient} className="addButton">
              + Add Ingredient
            </button>
          </div>
          <div className="formGroup">
            <label className="label">Cooking Instructions:</label>
            {cookingInstructions.map((instruction, index) => (
              <div key={index} className="inputGroup">
                <input
                  className="input"
                  type="text"
                  value={instruction}
                  onChange={(e) => {
                    const updatedInstructions = [...cookingInstructions];
                    updatedInstructions[index] = e.target.value;
                    setCookingInstructions(updatedInstructions);
                  }}
                />
                {index !== 0 && (
                  <button type="button" onClick={() => handleRemoveInstruction(index)} className="removeButton">
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddInstruction} className="addButton">
              + Add Instruction
            </button>
          </div>
          <div className="formGroup">
            <label className="label">Nutritional Information:</label>
            {nutritionalInformation.map((info, index) => (
              <div key={index} className="inputGroup">
                <input
                  className="input"
                  type="text"
                  value={info}
                  onChange={(e) => {
                    const updatedInformation = [...nutritionalInformation];
                    updatedInformation[index] = e.target.value;
                    setNutritionalInformation(updatedInformation);
                  }}
                />
                <button type="button" onClick={() => handleRemoveNutritionalInformation(index)} className="removeButton">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddNutritionalInformation} className="addButton">
              + Add Nutritional Information
            </button>
          </div>
          <div className="formGroup">
            <label className="label">Image:</label>
            <input className="fileInput" type="file" onChange={handleFileChange} required />
          </div>
          <button type="submit" className="submitButton">Create Meal Plan</button>
        </form>
      </div>
    </div>
  );
  
  
  
  
}

export default MealPlanForm;