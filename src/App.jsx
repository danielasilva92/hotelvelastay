// detta är min huvudkomponent som innehåller alla andra komponenter
//Den hanterar routing och global state som delas mellan komponenter

//importerar Reacr hooks som jag behöver för state och routing
import { useState } from 'react';

//importerar React Router komponenter för att hantera routing i appen
//BroweserRouter används för att wrappa hela appen 
//Routes är containern som håller alla mina route definitioner

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

//importerar mina esidkomponenter
import AboutUs from './components/AbousUs/AboutUs';
import HomePage from './components/HomePage/HomePage';
import RestaurantPage from './components/RestaurantPage/RestaurantPage';
import SpaPage from './components/SpaPage/SpaPage';
import ContactPage from './components/ContactPage/ContactPage';
import BookingPage from './components/BookingPage/BookingPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';


import './styles/global.css';
import './styles/utilities.css';
import './styles/variables.css';


//Huvudkomponenten för appen ( App är hjärtat i min React app :D )
//funderade på att ha mina rum i en egen fil, MEN har typ 977829 mappar redan :')
//TODO: DANIELA!! du behöver inte överstrkturera allt! breath girl (ta bort detta innan redovisningen, folk kommer tro du är psyko :') )
function App() {
  const [rooms] = useState([      
          {
            id:1,
            roomType: "Superior",
            name: "Superior Rum",
            price: 1200,
            size: "30 M²",
            description: "Stilrent rum med extra komfort, större säng och utsikt över staden.",
            features: ["Fri Wi-Fi, ", "Smart-TV, ", "Arbetsyta, ", "Minibar, ", "Regndusch"],
            imageUrl: `${import.meta.env.BASE_URL}images/standardrum.png`,
      },
          {
            id: 2,
            roomType:"Premium",
            name: "Premium Deluxe",
            price: 1800,
            size: "40 M²",
            description: "Elegant rum med premium känsla, med balkong och utsikt över vår fina baksida .",
            features: ["Fri Wi-Fi, ", "Smart-TV, ", "Loungeyta,", "Minibar, ", "Regndusch, ", "Panoramautsikt,"],
            imageUrl: `${import.meta.env.BASE_URL}images/dubbel.png`,
          },
          {
             id: 3,
            roomType: "Family",
            name: "Familjerum Deluxe",
            price: 2500,
            size: "50 M²",
            description: "Rymligt familjerum med dubbelsäng, våningssäng, loungeyta och plats för hela familjen i en varm och elegant miljö.",
            features: ["Fri Wi-Fi, ", "TV, ", "Familjevänligt, ", "Loungeyta, ", "Balkong, ", "Extra sovplatser"],
            imageUrl: `${import.meta.env.BASE_URL}images/family.png`,
          },
          {
            id: 4,
            roomType: 'Suite',
            name: 'Suite',
            price: 3500,
            size: "60 M²",
            description: 'Luksuriös svit med separat vardagsrum och exklusiva bekvämligheter.',
            features: ['Fri Wi-Fi, ', 'Vardagsrum, ', 'Balkong, ','Spa badkar, '],
            imageUrl: `${import.meta.env.BASE_URL}images/svit1.png`,
          },
          
          {
            id: 5,
            roomType: "SpaSuite",
            name: "Spa Suite",
            price: 4000,
            size: "70 M²",
            description:"Lyxig svit med privat jacuzzi, lounge och exklusiv spa-atmosfär.",
            features: ["Privat Jacuzzi, ", "Spa badrum, ", "Vardagsrum, ", "Panoramautsikt, ", "Minibar"],
            imageUrl: `${import.meta.env.BASE_URL}images/sparum.png`,
          },
         {
          id: 6,
          roomType: "Penthouse suite",
          name: "Penthouse suite",
          price: 4800,
          size: "85 M²",
          description: "Exklusiv takvåningssvit med panoramautsikt, privat terrass och elegant skandinavisk design. Perfekt för en oförglömlig vistelse.",
          features:  ["Privat takterrass, ", "Panoramautsikt över staden, ", "King size säng, ", "Separat vardagsrum, ", "Lyxbadrum med badkar, ", "Champagne vid ankomst"],
          imageUrl:  `${import.meta.env.BASE_URL}images/penthouse.png`,
         }
        ]);
      
      const [selectedRoom, setSelectedRoom] = useState(null);
   
      //TODO:Kanske fixa en "favourites"  funktion här sen ?
      //eller en inloggning så man kommer åt sin bokning kanske ;P
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now()
    };
    
    const updated = [...bookings, newBooking];
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
    
    return newBooking;
  };
  
   
    
  //Jag wrappade hela appen i Router komponenten för att möjliggöra routing
  //Navbar och Footer är komponenter som SKA visas på alla sidor!
  return (
    <Router basename="/hotelvelastay">
    {/*div med className App är min huvudcontainer för appen där all annan innehåll kommer att renderas*/}
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" 
            element={
            <HomePage
            rooms={rooms}
            onSelectRoom={setSelectedRoom}
             />
             }
              />

            <Route 
            path="/booking"
             element={
             <BookingPage
              rooms={rooms} 
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom} 
              addBooking={addBooking}
              />
              }
               />
               <Route path="/contact" element={<ContactPage />} />
               <Route path="/restaurant" element={<RestaurantPage />} />
               <Route path="/spa" element={<SpaPage />} />
               <Route path="/aboutUs" element={<AboutUs />} />
          </Routes>
              </main>
              <Footer />
      </div>
    </Router>
  );
}

export default App;