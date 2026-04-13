import { useState, useRef } from "react";
import "./RestaurantPage.css";


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
  const [activeMenu, setActiveMenu] = useState(null);
  const mealSectionRef = useRef(null);
  const bookingFormRef = useRef(null);



  const mealOptions = [
    {
      key: "breakfast",  
      name:"Frukost",
      time: "06:30 - 11:00",
      description: "Starta dagen med nybakat bröd, färsk frukt, kaffe och en lugn atmosfär.",
      image: `${import.meta.env.BASE_URL}images/frruu.jpg`,
    },
    {
        key: "lunch",
      name: "Lunch",
      time: "12:00 - 15:00",
      description: "Säsongsbetonade rätter med eleganta smaker och noggrant utvalda råvaror.",
      image: `${import.meta.env.BASE_URL}images/buffe1.jpg`,
    },
    {
       key: "dinner", 
      name: "Middag",
      time: "17:00 - 22:00",
      description:  "En varm och exklusiv kvällsupplevelse med moderna rätter och stämningsfull miljö.",
      image: `${import.meta.env.BASE_URL}images/middag.webp`,
    },
  ];


  const menuData = {
    breakfast: {
        title: "Frukostmeny",
        info: "Frukost ingår i hotellbokningen för alla gäster.",
        buffet: [
      "Nygräddat bröd och croissanter",
      "Yoghurt, müsli och färsk frukt",
      "Äggröra, bacon och korv",
      "Mängder med pålägg och grönsaker",
      "Våfflor med chocklad och andra tillbehör",
      "Pannkakor med sylt och grädde",
      "Kaffe, oboy, te och juice"
        ]
    },
    
  lunch: {
    title: "Lunchmeny",
    buffetPrice: 195,
    aLaCarte: [
      {
        name: "Caesarsallad",
        description: "Kyckling, romansallad, parmesan och krutonger",
        price: 165
      },
      {
        name: "Räksmörgås",
        description: "Handskalade räkor, ägg, majonnäs och citron",
        price: 185
      },
      {
        name: "Vegetarisk pasta",
        description: "Krämig pasta med rostade grönsaker och parmesan",
        price: 155
      }
    ],
    kids: [
      {
        name: "Pannkakor",
        description: "Serveras med sylt och grädde",
        price: 75
      },
      {
        name: "Köttbullar med potatismos",
        description: "Barnportion med milda smaker",
        price: 89
      }
    ]
  },

  dinner: {
    title: "Middagsmeny",
    buffetPrice: 395,
    aLaCarte: [
      {
        name: "Grillad oxfilé",
        description: "Rödvinssås, potatisgratäng och säsongens grönsaker",
        price: 395
      },
      {
        name: "Halstrad lax",
        description: "Citronrisotto, sparris och brynt smör",
        price: 325
      },
      {
        name: "Tryffelpasta",
        description: "Krämig pasta med tryffel och parmesan",
        price: 275
      }
    ],
    kids: [
      {
        name: "Mini hamburgare",
        description: "Med pommes och ketchup",
        price: 95
      },
      {
        name: "Pasta bolognese",
        description: "Mild tomatsås och riven ost",
        price: 89
      }
    ]
  }
};



  // funderar på om jag ska ta bort denna. blir lite mycket på sidan maybeee
  const galleryImages = [
     `${import.meta.env.BASE_URL}images/frukost.webp`,
  `${import.meta.env.BASE_URL}images/lunch.webp`,
  `${import.meta.env.BASE_URL}images/frukt.webp`,
  ];

  const scrollToMeals = () => {
  mealSectionRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const scrollToBookingForm = () => {
  bookingFormRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const handleSelectMeal = (mealName) => {
  setBooking((prev) => ({
    ...prev,
    mealType: mealName,
  }));

  bookingFormRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          src= {`${import.meta.env.BASE_URL}images/resturang.jpg`}
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
  <button
    type="button"
    className="restaurant-hero-button primary"
    onClick={scrollToBookingForm}
  >
    Boka bord
  </button>

  <button
    type="button"
    className="restaurant-hero-button secondary"
    onClick={scrollToMeals}
  >
    Utforska måltider
  </button>
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

      <section className="restaurant-meals container" ref={mealSectionRef}>
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

                <div className="meal-actions">
            <button
                className="meal-button secondary"
                onClick={() => setActiveMenu(meal.key)}
                >
                    Meny
                    </button>

                    <button className="meal-button"
                 onClick={() => handleSelectMeal(meal.name)}
                    >
                Boka bord
             </button>
            </div>
            </div>

            </div>
          ))}
        </div>
        
      </section>

    {activeMenu && menuData[activeMenu] && (
  <div className="restaurant-menu-overlay" onClick={() => setActiveMenu(null)}>
    <div
      className="restaurant-menu-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="menu-header">
        <h3>{menuData[activeMenu].title}</h3>
        <button
          className="close-menu-button"
          onClick={() => setActiveMenu(null)}
        >
          Stäng
        </button>
      </div>

     {activeMenu === "breakfast" && (
  <>
    <div className="breakfast-menu-intro">
      <p>
        <strong>{menuData.breakfast.info}</strong>
      </p>
    </div>

    <h4 className="breakfast-menu-title">Frukostbuffé</h4>

    <ul className="breakfast-menu-list">
      {menuData.breakfast.buffet.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </>
)}


      {activeMenu === "lunch" && (
        <>
          <p className="menu-info">
            Lunchbuffé: <strong>{menuData.lunch.buffetPrice} kr</strong>
          </p>

          <h4>À la carte</h4>
          {menuData.lunch.aLaCarte.map((dish) => (
            <div className="menu-item" key={dish.name}>
              <div>
                <h5>{dish.name}</h5>
                <p>{dish.description}</p>
              </div>
              <span>{dish.price} kr</span>
            </div>
          ))}

          <h4>Barnmeny</h4>
          {menuData.lunch.kids.map((dish) => (
            <div className="menu-item" key={dish.name}>
              <div>
                <h5>{dish.name}</h5>
                <p>{dish.description}</p>
              </div>
              <span>{dish.price} kr</span>
            </div>
          ))}
        </>
      )}

      {activeMenu === "dinner" && (
        <>
          <p className="menu-info">
            Middagsbuffé: <strong>{menuData.dinner.buffetPrice} kr</strong>
          </p>

          <h4>À la carte</h4>
          {menuData.dinner.aLaCarte.map((dish) => (
            <div className="menu-item" key={dish.name}>
              <div>
                <h5>{dish.name}</h5>
                <p>{dish.description}</p>
              </div>
              <span>{dish.price} kr</span>
            </div>
          ))}

          <h4>Barnmeny</h4>
          {menuData.dinner.kids.map((dish) => (
            <div className="menu-item" key={dish.name}>
              <div>
                <h5>{dish.name}</h5>
                <p>{dish.description}</p>
              </div>
              <span>{dish.price} kr</span>
            </div>
          ))}
        </>
      )}
    </div>
  </div>
)}



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
        <section className="restaurant-booking-wrapper container" ref={bookingFormRef}>
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
                  <option value="">FRUKOST</option>
                  <option value="06.30">06:30</option>
                  <option value="07:00">07:00</option>
                  <option value="07:30">07:30</option>
                  <option value="08:00">08:00</option>
                  <option value="08:30">08:30</option>
                  <option value="09:00">09:00</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="">LUNCH</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="">MIDDAG</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                
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