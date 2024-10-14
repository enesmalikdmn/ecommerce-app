
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div>
      <Navbar />
      <div id='content'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
