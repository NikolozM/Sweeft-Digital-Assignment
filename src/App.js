import React from "react";
import MainPage from "../src/Pages/MainPage";
import UserPage from "../src/Pages/UserPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage />} />

        <Route
          path='/UserPage/:id'
          element={<UserPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
