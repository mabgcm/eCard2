import { Routes, Route } from "react-router-dom";
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './context/Protected';
import Navbar from "./components/Navbar";
import Home from './Pages/Home';
import Card from "./Pages/Card";
import EditCard from "./Pages/EditCard";
import Vcard from "./Pages/Vcard";
import CreateCard from "./Pages/CreateCard";


function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/card/:id' element={<Card />} />
          <Route path='/create' element={<Protected><CreateCard /></Protected>} />
          <Route path='/VCard/:id' element={<Vcard />} />
          <Route path='/editcard/:id' element={<Protected><EditCard /></Protected>} />
          {/* <Route path='/update/:id' element={<EditCard />} /> */}
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
