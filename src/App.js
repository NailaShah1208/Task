
import './App.css';
import Common from './components/Common.jsx';
import {Routes,Route} from 'react-router-dom';
import AddData from './components/AddData';
import ButtonAppBar from './components/Appbarr';
import EditForm from './components/EditForm';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<ButtonAppBar/>}/>
        <Route path="/add" element={<AddData/>}/>
        <Route path="/edit/:id" element={<EditForm/>}/>
      </Routes>
   
    </div>
  );
}

export default App;
