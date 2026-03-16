import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './BookingPage.css';
import RoomCard from '../RoomCard/RoomCard';

function BookingPage({rooms,selectedRoom, setSelectedRoom,addBooking}) {
    const navigate = useNavigate();

    //samlar allt från användaren här
    const [formData, setFormData]  = useState ({
        name: '',
        email:'',
        phone: '',
        checkIn: '',
        checkOut:'',
        guests: 1

    });

    //dess state värdena är det som visas efter bokning är gjort
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const[confirmedBooking, setConfirmedBooking] = useState(null);
    const [error, setError] = useState('');
    const [loading,setLoading] = useState(false);
  

    //varje gång man skriver i inputfälten, uppdateras det i formData

    const handleInputChange = (e) => {
        const {name,value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

  


    //lägger in en funktion som ska räkna antal nätter mellan in och utchekning
    const calculateNights = (checkIn, checkOut) => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const differenceInMs = checkOutDate - checkInDate;
        const nights = differenceInMs / (1000 * 60 * 60 * 24);

        return nights > 0 ? nights : 0;
    };

    

//tänkte ha fasta nummer först men detta blir mer "random"
   const generateRoomNumber = (roomType) => {

  if (roomType === "Superior") return Math.floor(100 + Math.random() * 20);

  if (roomType === "Premium") return Math.floor(120 + Math.random() * 20);

  if (roomType === "Family") return Math.floor(200 + Math.random() * 20);

  if (roomType === "Suite") return Math.floor(220 + Math.random() * 20);

  if (roomType === "Spasuite") return Math.floor(300 + Math.random() * 20);

  if (roomType === "Penthouse suite") return Math.floor(400 + Math.random() * 10);

  

  return Math.floor(100 + Math.random() * 50);
};

    //här skapar vi bokningen i frontend ;P
    const handleBooking = async (e) => {
        e.preventDefault();

        if(!selectedRoom) {
            setError('Vänligen välj ett rum');
            return;
        }

        const numberOfNights = calculateNights(formData.checkIn, formData.checkOut);
        if (numberOfNights <= 0) {
            setError('Utcheckningen måste vara efter incheckning');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const booking = {
                bookingId:`VELA${Date.now().toString().slice(-6)}`,
                guestName:formData.name,
                email: formData.email,
                phone: formData.phone,
                roomName: selectedRoom.name,
                roomType: selectedRoom.roomType,
                roomNumber: generateRoomNumber(selectedRoom.roomType),
                roomImage: selectedRoom.imageUrl,
                roomPrice: selectedRoom.price,
                checkInDate: formData.checkIn,
                checkOutDate: formData.checkOut,
                numberOfGuests: Number(formData.guests),
                nights: numberOfNights,
                totalPrice: selectedRoom.price * numberOfNights,
                createdAt: new Date().toISOString()

            };

            const newBooking = addBooking(booking);

            // sparar i localstorage
            //TODO: skapa färdig backend så att jag kan spara bokningarna i databasen istället
            localStorage.setItem('latestBooking', JSON.stringify(newBooking));

            setConfirmedBooking(newBooking);
            setBookingConfirmed(true);
        } catch (err) {
            console.error('Booking misslyckades', err);
            setError('Något gick fel med bokningen. Försök igen senare.');
         } finally {
            setLoading(false);

        }
    };

    // en funktion som nollställer allt så man kan börja om bokningen
    const resetBooking = () => {
        setBookingConfirmed(false);
        setConfirmedBooking(null);
        setSelectedRoom(null);
        setFormData({
            name: '',
            email:'',
            phone: '',
            checkIn:'',
            checkOut: '',
            guests: 1
        });
        navigate('/');
    };

    // OM bokningen är klar så visar en bekräftelse på bokningen

    if (bookingConfirmed && confirmedBooking) {
    return (
        <div className="booking-confirmation">
            <div className="confirmation-card">
                <div className="confirmation-icon">✓</div>

                <p className="confirmation-kicker">Bokningen är klar</p>
                <h1>Bokning bekräftad!</h1>
                <p className="confirmation-text">
                    Tack {confirmedBooking.guestName}! Din bokning är nu bekräftad och vi ser
                    fram emot att välkomna dig till Hotel Vela Stay.
                </p>

                <div className="booking-details">
                    <h3>Bokningsdetaljer</h3>

                    <div className="detail-row">
                        <span>Boknings-ID</span>
                        <span><strong>{confirmedBooking.bookingId}</strong></span>
                    </div>

                    <div className="detail-row">
                        <span>Rum</span>
                        <span>{confirmedBooking.roomName}</span>
                    </div>

                    <div className="detail-row">
                        <span>Rumsnummer</span>
                        <span><strong>{confirmedBooking.roomNumber}</strong></span>
                    </div>

                    <div className="detail-row">
                        <span>Incheckning</span>
                        <span>{confirmedBooking.checkInDate}</span>
                    </div>

                    <div className="detail-row">
                        <span>Utcheckning</span>
                        <span>{confirmedBooking.checkOutDate}</span>
                    </div>

                    <div className="detail-row">
                        <span>Antal nätter</span>
                        <span>{confirmedBooking.nights}</span>
                    </div>

                    <div className="detail-row">
                        <span>Gäster</span>
                        <span>{confirmedBooking.numberOfGuests}</span>
                    </div>

                    <div className="detail-row total-row">
                        <span>Totalpris</span>
                        <span>
                            <strong>
                                {Number(confirmedBooking.totalPrice).toLocaleString("sv-SE")} kr
                            </strong>
                        </span>
                    </div>
                </div>

                <p className="confirmation-note">
                    En bekräftelse har skickats till {confirmedBooking.email}
                </p>

                <div className="confirmation-actions">
                    <button className="btn-primary" onClick={resetBooking}>
                        Gör en ny bokning
                    </button>
                </div>
            </div>

            <div className="confirmation-side">
                <img
                    src= {`${import.meta.env.BASE_URL}images/bokad.webp`}
                    alt={confirmedBooking.roomName}
                    className="confirmation-side-image"
                />

                <div className="confirmation-side-overlay">
                    <p className="side-kicker">Din vistelse</p>
                    <h2>{confirmedBooking.roomName}</h2>

                    <div className="side-summary">
                        <div className="side-summary-box">
                            <span>Rumsnummer</span>
                            <strong>{confirmedBooking.roomNumber}</strong>
                        </div>

                        <div className="side-summary-box">
                            <span>Nätter</span>
                            <strong>{confirmedBooking.nights}</strong>
                        </div>

                        <div className="side-summary-box">
                            <span>Gäster</span>
                            <strong>{confirmedBooking.numberOfGuests}</strong>
                        </div>
                    </div>

                    <p className="side-bottom-text">
                        Vi önskar dig en avkopplande och minnesvärd vistelse hos oss.
                    </p>
                </div>
            </div>
        </div>
    );
}

return(
    <div className='booking-page'>
  <section className="booking-hero">
  <img
    src= {`${import.meta.env.BASE_URL}images/bokning.jpg`}
    alt="Boka ditt rum"
    className="booking-hero-image"
  />

  <div className="booking-hero-overlay"></div>

  <div className="booking-hero-content">
    <p className="booking-kicker">Elegans, komfort & stillhet</p>
    <h1>Boka ditt rum</h1>
    <p className="booking-hero-text">
      Välj mellan våra eleganta rum och sviter för en minnesvärd vistelse
      i en varm och exklusiv miljö.
    </p>

    <div className="booking-hero-actions">
      <a href="#booking-room-selection" className="booking-hero-button primary">
        Välj rum
      </a>
    </div>
  </div>
</section>
                    

                    <div className="booking-container">
                        {error && <div className="error-message">{error}</div>}

                        {!selectedRoom ? (

                            <div className="room-selection" id="booking-room-selection">
                                <h2>Välj rum</h2>
                            
                                   <div className="booking-rooms-grid">
                                    {rooms.map((room) => (
                                         <RoomCard
                                          key={room.id}
                                             room={room}
                                         onSelect={setSelectedRoom}
                                          buttonText="VÄLJ RUM"
                                 />
                             ))}
                            </div>
                                       
                                
                            
                            </div>
                           
                        ) : (
                            <div className="booking-form-section" id="booking-form-section">
                                <div className="selected-room">
                                    <div className="selected-room-image">
                                        <img className="selected-room-image-tag" src={selectedRoom.imageUrl} alt={selectedRoom.name}/>
                                        </div>

                                        <div className="selected-room-info">
                                            <h2>{selectedRoom.name}</h2>
                                            <p>{selectedRoom.description}</p>
                                            <p>{selectedRoom.features}</p>
                                            <div className="selected-room-price">{selectedRoom.price} kr per natt</div>
                                            <button
                                            className="btn-secondary"
                                            onClick={() => setSelectedRoom(null)}
                                            >
                                                Byt rum
                                            </button>
                                    </div>
                                </div>
                                <form className="booking-form" onSubmit={handleBooking}>
                                    <h3>Dina uppgifter</h3>

                                    {error && (
                                        <div className='error-message'>
                                            {error}
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label>Namn *</label>
                                        <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Ditt fullständiga namn"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Epost *</label>
                                        <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="din.email@exempel.se"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Telefon *</label>
                                        <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="+46 XX XXX XX XX"
                                        />
                                    </div>

                                    <div className="form-row">
                                    <div className="form-group">
                                        <label>Incheckning *</label>
                                        <input
                                        type="date"
                                        name="checkIn"
                                        value={formData.checkIn}
                                        onChange={handleInputChange}
                                        required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Utcheckning *</label>
                                        <input
                                        type="date"
                                        name="checkOut"
                                        value={formData.checkOut}
                                        onChange={handleInputChange}
                                        required
                                        />
                                    </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Antal gäster *</label>
                                        <select
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleInputChange}
                                        required
                                        >
                                            <option value="1">1 gäst</option>
                                            <option value="2">2 gäster</option>
                                            <option value="3">3 gäster </option>
                                            <option value="4">4 gäster</option>
                                            </select>
                                            </div>

                                            <button type="submit" className="btn-primary" disabled={loading}>
                                                {loading ? 'Bekräftar...' : 'Bekräfta bokning'}
                                        
                                            </button>
                                </form>
                            </div>
                        )}
                        </div>
                        </div>
    );



        
    }
     export default BookingPage;
 