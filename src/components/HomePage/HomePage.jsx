import {useNavigate} from "react-router-dom";
import './HomePage.css';
import RoomCard from '../RoomCard/RoomCard';


function HomePage({rooms, loading, error, onSelectRoom}) {
  const navigate = useNavigate();

  //när man klickar på boka-knappen så ska den valda rummet sparas i state 
  // och sedan navigeras man till bokningssidan
  const handleBookRoom = (room) => {
    onSelectRoom(room);
    navigate('/booking');
  };

  return (
    <div className="homepage">
        <section className="hero hero-home">
            <div className="hero-content">
                <h1 className="hero-title"> Välkommen till Hotel Vela Stay</h1>
                <p className="hero-subtitle">Avkoppling • Wellness • Scandinavisk design • comfort </p>
                <button className="cta-button" onClick={() => navigate('/booking')}>
                    Boka Nu
                </button>
            </div>
        </section>
 <section className="rooms-preview">

            <div className="container rooms-container">
            <h2 className="section-title">Våra Rum</h2>

            {error && <div className="error-banner">{error}</div>}

            {loading ? (
    <div className="loading">Laddar rum...</div>
            ) : (
                
        <div className="rooms-grid">
  {rooms.map((room) => (
    <RoomCard
      key={room.id}
      room={room}
      onSelect={handleBookRoom}
    />
  ))}
</div>
 )}
</div>
</section>

    {/* TODO: Kanske lägga till en reviews-sektion här? eller göra den lite snyggare kanske */}
       <section className="spa-section">
  <div className="spa-background">
    <img
      src={`${import.meta.env.BASE_URL}images/spa.jpg`}
      alt="Spa avdelning"
      className="spa-background-image"
    />

    <div className="spa-overlay"></div>

    <div className="spa-content container">
      <p className="spa-kicker">Välmående & stillhet</p>

      <h2 className="spa-title">Spa & avkoppling
      </h2>

      <p className="spa-text">
        Upplev lugnet i vår exklusiva spaavdelning med uppvärmd pool,
        bastu och behandlingar skapade för total återhämtning.
      </p>

      <button
        className="spa-cta"
        onClick={() => navigate("/spa")}
      >
        Upptäck spa
      </button>
    </div>
  </div>
</section>
</div>

)
}

export default HomePage;