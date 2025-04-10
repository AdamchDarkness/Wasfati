import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import AddRecipe from './pages/AddRecipe/AddRecipe';
import Register from './pages/Register/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/edit/:id" element={<AddRecipe />} />
  <Route path="/add-recipe" element={<AddRecipe />} />
</Routes>
    </div>
  );
}

export default App;