import { useState } from "react";
import "./RestaurantPage.css";

//innan nästa grejer ska implementers så take a break!! rensa huvudet!
//TODO: DAGS FÖR PAUS + NOCCO + PROMENAD med kidsen!!

function RestaurantPage() {
  const [booking, setBooking] = useState({
    name: "",
    roomNumber: "",
    mealType: "",
    date: "",
    time: "",
    guests: 2,
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);


  //TODO: OM tiden räcker till skapa en meny för lunch/middag med maträtter/priser och Kidsmeny med!
  const mealOptions = [
    {
      name:"Frukost",
      time: "06:30 - 11:00",
      description: "Starta dagen med nybakat bröd, färsk frukt, kaffe och en lugn atmosfär.",
      image:  "/images/frruu.jpg",
    },
    {
      name: "Lunch",
      time: "12:00 - 15:00",
      description: "Säsongsbetonade rätter med eleganta smaker och noggrant utvalda råvaror.",
      image: "/images/buffe1.jpg",
    },
    {
      name: "Middag",
      time: "17:00 - 22:00",
      description:  "En varm och exklusiv kvällsupplevelse med moderna rätter och stämningsfull miljö.",
      image: "/images/middag.webp",
    },
  ];

  // funderar på om jag ska ta bort denna. blir lite mycket på sidan maybeee
  const galleryImages = [
    "/images/frukost.webp",
    "/images/lunch.webp",
    "/images/frukt.webp",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // scroll till formuläret, funkar dock inte perfekt på alla browers men är OKEJ just nu
  const handleSelectMeal = (mealName) => {
    setBooking((prev) => ({
      ...prev,
      mealType: mealName,
    }));

    const formSection = document.getElementById("restaurant-booking-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const restaurantBooking = {
      ...booking,
      bookingId: `DINNER${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("latestRestaurantBooking", JSON.stringify(restaurantBooking));
    setConfirmedBooking(restaurantBooking);
    setBookingConfirmed(true);

    setBooking({
      name: "",
      roomNumber: "",
      mealType: "",
      date: "",
      time: "",
      guests: 2,
    });
  };

  return (
    <div className="restaurant-page">
      <section className="restaurant-hero">
        <img
          src="/images/resturang.jpg"
          alt="Restaurang Vela"
          className="restaurant-hero-image"
        />
        <div className="restaurant-hero-overlay"></div>

        <div className="restaurant-hero-content">
          <p className="restaurant-kicker">Smak, elegans & atmosfär</p>
          <h1>Restaurang Vela</h1>
          <p className="restaurant-hero-text">
            En smakupplevelse utöver det vanliga – från lugna frukostar till
            stämningsfulla middagar i en varm och exklusiv miljö.
          </p>

          <div className="restaurant-hero-actions">
            <a href="#restaurant-booking-form" className="restaurant-hero-button primary">
              Boka bord
            </a>
            <a href="#meal-selection" className="restaurant-hero-button secondary">
              Utforska måltider
            </a>
          </div>
        </div>
      </section>


      <section className="restaurant-intro container">
        <p>
          Välkommen till vår restaurang där moderna smaker möter skandinavisk
          elegans. Här kan gäster njuta av frukost, lunch och middag i en
          lugn och exklusiv miljö.
        </p>
      </section>

      <section className="restaurant-gallery container">
        <div className="restaurant-gallery-grid">
          {galleryImages.map((image, index) => (
            <div className="restaurant-gallery-card" key={index}>
              <img src={image} alt={`Restaurangmiljö ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="restaurant-meals container" id="meal-selection">
        <div className="section-heading">
          <p className="section-kicker">Dagens upplevelser</p>
          <h2>Frukost, lunch & middag</h2>
        </div>

        <div className="meal-grid">
          {mealOptions.map((meal) => (
            <div className="meal-card" key={meal.name}>
              <div className="meal-image-wrapper">
                <img src={meal.image} alt={meal.name} />
              </div>

              <div className="meal-content">
                <h3>{meal.name}</h3>
                <p className="meal-time">{meal.time}</p>
                <p className="meal-description">{meal.description}</p>

                <button
                  className="meal-button"
                  onClick={() => handleSelectMeal(meal.name)}
                >
                  Välj denna
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {bookingConfirmed && confirmedBooking ? (
        <section className="restaurant-confirmation container">
          <div className="restaurant-confirmation-card">
            <div className="restaurant-confirmation-icon">✓</div>

            <p className="restaurant-confirmation-kicker">Bokningen är klar</p>
            <h2>Ditt bord är bokat</h2>

            <p className="restaurant-confirmation-text">
              Tack {confirmedBooking.name}! Din restaurangbokning är nu bekräftad.
              Vi ser fram emot att välkomna dig till Restaurang Vela.
            </p>

            <div className="restaurant-confirmation-details">
              <div className="restaurant-confirmation-row">
                <span>Boknings-ID</span>
                <strong>{confirmedBooking.bookingId}</strong>
              </div>

              <div className="restaurant-confirmation-row">
                <span>Måltid</span>
                <strong>{confirmedBooking.mealType}</strong>
              </div>

              <div className="restaurant-confirmation-row">
                <span>Rumsnummer</span>
                <strong>{confirmedBooking.roomNumber}</strong>
              </div>

              <div className="restaurant-confirmation-row">
                <span>Datum</span>
                <strong>{confirmedBooking.date}</strong>
              </div>

              <div className="restaurant-confirmation-row">
                <span>Tid</span>
                <strong>{confirmedBooking.time}</strong>
              </div>

              <div className="restaurant-confirmation-row">
                <span>Antal gäster</span>
                <strong>{confirmedBooking.guests}</strong>
              </div>
            </div>

            <button
              className="restaurant-confirmation-button"
              onClick={() => setBookingConfirmed(false)}
            >
              Gör en ny bokning
            </button>
          </div>
        </section>
      ) : (
        <section className="restaurant-booking-wrapper container" id="restaurant-booking-form">
          <form className="restaurant-booking-form" onSubmit={handleSubmit}>
            <h2>Boka bord</h2>

            <div className="form-group">
              <label>Namn *</label>
              <input
                type="text"
                name="name"
                value={booking.name}
                onChange={handleInputChange}
                placeholder="Ditt namn"
                required
              />
            </div>

            <div className="form-group">
              <label>Rumsnummer *</label>
              <input
                type="text"
                name="roomNumber"
                value={booking.roomNumber}
                onChange={handleInputChange}
                placeholder="Till exempel 211"
                required
              />
            </div>

            <div className="form-group">
              <label>Måltid *</label>
              <select
                name="mealType"
                value={booking.mealType}
                onChange={handleInputChange}
                required
              >
                <option value="">Välj måltid</option>
                {mealOptions.map((meal) => (
                  <option key={meal.name} value={meal.name}>
                    {meal.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Datum *</label>
                <input
                  type="date"
                  name="date"
                  value={booking.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tid *</label>
                <select
                  name="time"
                  value={booking.time}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Välj tid</option>
                  <option value="07:30">07:30</option>
                  <option value="08:00">08:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Antal gäster *</label>
              <select
                name="guests"
                value={booking.guests}
                onChange={handleInputChange}
                required
              >
                <option value="1">1 gäst</option>
                <option value="2">2 gäster</option>
                <option value="3">3 gäster</option>
                <option value="4">4 gäster</option>
                <option value="5">5 gäster</option>
                <option value="6">6 gäster</option>
              </select>
            </div>

            <button type="submit" className="restaurant-submit-button">
              Bekräfta bokning
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default RestaurantPage;