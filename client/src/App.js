// Imports all components and functions 
import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ActivitiesPage from './pages/ActivitiesPage';
import CustomersPage from './pages/CustomersPage';
import EquimentsPage from './pages/EquipmentsPage';
import ActivitiesHasEquipmentsPage from './pages/ActivitiesHasEquipmentsPage';
import ClassesPage from './pages/ClassesPage';
import ReservationsPage from './pages/ReservationsPage';
import Nav from './components/Nav';

// Display on the main screen
function App() {
  return (
    <>
      <BrowserRouter>

        <header className="App-header">
          <h1>Oregon State Recreation</h1>
          <img src='/Rec_Logo.jpg' alt='Store Logo' id='logo'></img>
        </header>
        <Nav />

        <main>
        
          <section className="App-article">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Activities" element={<ActivitiesPage />} />
              <Route path="/Customers" element={<CustomersPage />} />
              <Route path="/Equipments" element={<EquimentsPage />} />
              <Route path="/Reservations" element={<ReservationsPage/>}/>
              <Route path="/Classes" element={<ClassesPage/>} />
              <Route path="/ActivitiesHasEquipments" element={<ActivitiesHasEquipmentsPage />} />
            </Routes>
          </section>
        </main>
        
        <footer>
          <p>&copy; 2023 Sam Parkman, Rob MacFarlane</p>
        </footer>
        
      </BrowserRouter>
    </>
    );
}

export default App;
