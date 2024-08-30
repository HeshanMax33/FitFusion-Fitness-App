import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchMealPlans.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaFilePdf } from 'react-icons/fa';

function FetchMealPlans() {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/mealplans');
        setMealPlans(response.data);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      }
    };
    fetchMealPlans();
  }, []);

  const handleDeleteMealPlan = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this meal plan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8080/api/mealplans/${id}`);
        setMealPlans(mealPlans.filter((mealPlan) => mealPlan.id !== id));
        Swal.fire('Deleted!', 'Your meal plan has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      Swal.fire('Error', 'Failed to delete meal plan. Please try again.', 'error');
    }
  };

  const handleGenerateReport = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/mealplans/${id}`);
      const mealPlan = response.data;
      const cleanedMealPlan = {
        name: mealPlan.name.replace(/[\[\]"\\]/g, ''),
        description: mealPlan.description.replace(/[\[\]"\\]/g, ''),
        dietaryPreferences: mealPlan.dietaryPreferences.replace(/[\[\]"\\]/g, ''),
        recipes: mealPlan.recipes.map(recipe => recipe.replace(/[\[\]"\\]/g, '')),
        ingredients: mealPlan.ingredients.map(ingredient => ingredient.replace(/[\[\]"\\]/g, '')),
        cookingInstructions: mealPlan.cookingInstructions.map(instruction => instruction.replace(/[\[\]"\\]/g, '')),
        nutritionalInformation: mealPlan.nutritionalInformation.map(info => info.replace(/[\[\]"\\]/g, ''))
      };
      const mealPlanJSON = JSON.stringify(cleanedMealPlan);
      const reportResponse = await axios.post(`http://localhost:8080/api/mealplans/generate-report/${id}`, { mealPlan: mealPlanJSON }, { responseType: 'blob' });
      const blob = new Blob([reportResponse.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `meal_plan_report_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      Swal.fire('Report Generated!', 'The report for this meal plan has been generated.', 'success');
    } catch (error) {
      console.error('Error generating report:', error);
      Swal.fire('Error', 'Failed to generate report. Please try again.', 'error');
    }
  };
  
  return (
    <div>
      <h1 className='viewmealbg'>Meal Plans</h1>
      <div className="mealPlansContainer">
        {mealPlans.map((mealPlan) => (
          <div key={mealPlan.id} className="mealPlanCard">
            <img
              src={`data:image/jpeg;base64,${mealPlan.image}`}
              alt={mealPlan.name}
              className="mealPlanImage"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'placeholder.jpg';
                e.target.alt = 'Meal Plan Image';
              }}
            />
            <div className="mealPlanDetails">
              <h2 className="mealPlanTitle">{mealPlan.name}</h2>
              <p className="mealPlanDescription"><span className="mealdata">Dietary Preferences:</span> {mealPlan.dietaryPreferences}</p>
              <p className="mealPlanDescription"><span className="mealdata">Description:</span> {mealPlan.description}</p>
              <p className="mealPlanDescription"><span className="mealdata">Recipes:</span></p>
              <ul>
                {mealPlan.recipes.map((recipe, index) => (
                  <li key={index}>{recipe.replace(/[\[\]"\\]/g, '')}</li>
                ))}
              </ul>
              <p className="mealPlanDescription"><span className="mealdata">Ingredients:</span></p>
              <ul>
                {mealPlan.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.replace(/[\[\]"\\]/g, '')}</li>
                ))}
              </ul>
              <p className="mealPlanDescription"><span className="mealdata">Cooking Instructions:</span></p>
              <ul>
                {mealPlan.cookingInstructions.map((instruction, index) => (
                  <li key={index}>{instruction.replace(/[\[\]"\\]/g, '')}</li>
                ))}
              </ul>
              <p className="mealPlanDescription"><span className="mealdata">Nutritional Information:</span></p>
              <ul>
                {mealPlan.nutritionalInformation.map((nutritionalInformation, index) => (
                  <li key={index}>{nutritionalInformation.replace(/[\[\]"\\]/g, '')}</li>
                ))}
              </ul>
              <div className="mealPlanButtons">
                <Link to={`/update-meal-plan/${mealPlan.id}`} className="mealPlanLink">
                  <button className="mealPlanButton">Update</button>
                </Link>
                <button onClick={() => handleGenerateReport(mealPlan.id)} className="mealPlanButton greenButton">
                  <FaFilePdf style={{ marginLeft:'10px' }} />  Report {/* Add suitable icon */}
                </button>
                <button onClick={() => handleDeleteMealPlan(mealPlan.id)} className="mealPlanButton deletemeal">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
}

export default FetchMealPlans;
