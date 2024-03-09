import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';


const HatsPage = (props) => {
  return <h1>HATS PAGE</h1>;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/shop/hats' element={<HatsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
