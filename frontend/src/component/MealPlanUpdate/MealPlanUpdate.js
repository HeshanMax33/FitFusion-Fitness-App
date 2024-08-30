// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ViewMealPlans() {
//   const [mealPlans, setMealPlans] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMealPlans = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/mealplans');
//         setMealPlans(response.data);
//       } catch (error) {
//         console.error('Error fetching meal plans:', error);
//         setError('Error fetching meal plans. Please try again.');
//       }
//     };

//     fetchMealPlans();
//   }, []);

//   return (
//     <div>
//       <h2>All Meal Plans</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {mealPlans.map((plan) => (
//         <div key={plan.id}>
//           <h3>{plan.name}</h3>
//           <p><strong>Description:</strong> {plan.description}</p>
//           <p><strong>Recipes:</strong></p>
//           <ul>
//             {plan.recipes.map((recipe, index) => (
//               <li key={index}>{recipe}</li>
//             ))}
//           </ul>
//           <p><strong>Ingredients:</strong></p>
//           <ul>
//             {plan.ingredients.map((ingredient, index) => (
//               <li key={index}>{ingredient}</li>
//             ))}
//           </ul>
//           <p><strong>Cooking Instructions:</strong> {plan.cookingInstructions}</p>
//           <p><strong>Nutritional Information:</strong> {plan.nutritionalInformation}</p>
//           <p><strong>Dietary Preferences:</strong> {plan.dietaryPreferences}</p>
//           <img src={plan.imageUrl} alt={plan.name} style={{ maxWidth: '300px' }} />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ViewMealPlans;