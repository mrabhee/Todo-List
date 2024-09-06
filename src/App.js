import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Application from './Pages/Application';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Application' element={<Application />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
