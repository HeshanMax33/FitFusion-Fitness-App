import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";

import ViewPost from './component/SocialMediaPosts/viewPost';
import MealPlanForm from './component/CreateMealplan/MealPlanForm';
import FetchMealPlans from './component/FetchMealPlans/FetchMealPlans';
import UpdateMealPlan from './component/MealPlanUpdate/UpdateMealPlan';
import MealPlanUpdate from './component/MealPlanUpdate/MealPlanUpdate';
import Index from './component/index/index';//index page (default loading page)
import Login from './component/login_page/login';//user login page
import AddPost from './component/SocialMediaPosts/addPost';
import ViewProfile from './component/View_user/view_user';
import NavigationBarB from './component/NavigationBarB/NavigationBarB';
import UserContext from './component/ContextComponent/ContextComponent';
import UserForm from './component/UserForm/UserForm';
import AllUsers from './component/AllUsers/AllUsers';


function App() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);




  return (
    <Router>
            <UserContext.Provider value={{ user, setUser }}>

            <div className="App">

              
        {user?.UserType === 'Registered User' || user?.UserType === 'Unregistered User'  ? (
            <NavigationBarB />
          ) : (
            <Index />
          )}
        


        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/createmeal' element={<MealPlanForm />} />
          <Route path='/viewmealplan' element={<FetchMealPlans />} />
          <Route path='/viewPost' element={<ViewPost />} />
          <Route path='/AddPost' element={<AddPost />} />
          <Route path='/update-meal-plan/:id' element={<UpdateMealPlan />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:id' element={<ViewProfile />} />
          <Route path='/createUser' element={<UserForm />} />

          <Route path='/allUsers' element={<AllUsers />} />


        </Routes>
      </div>


      </UserContext.Provider>

    </Router>
  )
}

export default App;
