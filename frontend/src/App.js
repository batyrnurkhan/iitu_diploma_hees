import './App.css';
import './components/HomePage'
import HomePage from './components/HomePage';
import MaterialsPage from './components/MaterialsPage';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
    <Routes>
      <Route path='about' element={<MaterialsPage/>}></Route>
      <Route path="/" element={<HomePage />} />
    </Routes>
    </div>
  );
}

export default App;
