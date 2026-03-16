import { useState } from "react";
import "./SpaPage.css";

function SpaPage() {
  const [booking, setBooking] = useState({
    name: "",
    roomNumber: "",
    treatment: "",
    date: "",
    time: "",
  });

const treatments = [
  {
    name: "Klassisk Massage",
    duration: "60 min",
    price: 800,
    description:
      "En klassisk helkroppsmassage som mjukar upp spända muskler och ger kroppen ny energi. Perfekt för djup avslappning och återhämtning.",
    image: `${import.meta.env.BASE_URL}images/klassisk.png`,
  },
  {
    name: "Aromaterapi Massage",
    duration: "90 min",
    price: 1100,
    description:
      "En lugnande massage med noggrant utvalda eteriska oljor som stimulerar sinnena och skapar balans mellan kropp och själ.",
    image: `${import.meta.env.BASE_URL}images/aroma.webp`,
  },
  {
    name: "Hot Stone Massage",
    duration: "60 min",
    price: 900,
    description:
      "En djupt avslappnande behandling där varma stenar används för att lösa upp spänningar och ge kroppen en behaglig värme.",
    image: `${import.meta.env.BASE_URL}images/massage-hotstone.jpg`,
  },
  {
    name: "Ansiktsbehandling",
    duration: "60 min",
    price: 950,
    description:
      "En vårdande ansiktsbehandling som rengör, återfuktar och ger huden ny lyster. Din hud lämnas mjuk, fräsch och strålande.",
    image: `${import.meta.env.BASE_URL}images/ansikte.png`,
  },
  {
    name: "Kroppspeeling",
    duration: "45 min",
    price: 600,
    description:
      "En uppfriskande kroppspeeling som varsamt avlägsnar döda hudceller och gör huden silkeslen och återfuktad.",
    image: `${import.meta.env.BASE_URL}images/massage-bodyscrub.jpg`,
  },
  {
    name: "Spa paket",
    duration: "120 min",
    price: 1800,
    description:
      "En komplett spa-upplevelse med flera behandlingar som ger total avkoppling och förnyad energi för både kropp och sinne.",
    image: `${import.meta.env.BASE_URL}images/paketet.png`,
  },
];

  const facilities = [
    {
      title: "Bastu",
      text: "Njut av en varm och rogivande stund i vår exklusiva bastu.",
      image: `${import.meta.env.BASE_URL}images/bastu.jpg`,
    },
    {
      title: "Spa Lounge",
      text: "Koppla av i en stillsam miljö med levande ljus och skandinavisk design.",
      image: `${import.meta.env.BASE_URL}images/spapage.png`,
    },
    {
      title: "Jacuzzi",
      text: "Låt kroppen återhämta sig i vår uppvärmda jacuzzi med utsikt och lugn atmosfär.",
      image: `${import.meta.env.BASE_URL}images/jaccuzzi.png`,
    },
  ];

  //känner samma sak här, kanske för mycket??
  // tungt med så många bilder maybee
  //behöver isåfall konventera alla 39736689347 bilder
  // aint nobody got time for that
  //TODO: tar nog bort dessa sen, blir lite to much ;/

  const galleryImages = [
    `${import.meta.env.BASE_URL}images/spa22.jpg`,
    `${import.meta.env.BASE_URL}images/spa33.jpg`,
    `${import.meta.env.BASE_URL}images/bokning.jpg`,
  ];

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
const [confirmedSpaBooking, setConfirmedSpaBooking] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectTreatment = (treatmentName) => {
    setBooking((prev) => ({
      ...prev,
      treatment: treatmentName,
    }));

    const bookingForm = document.getElementById("spa-booking-form");
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  const spaBooking = {
    ...booking,
    bookingId: `SPA${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem("latestSpaBooking", JSON.stringify(spaBooking));

  setConfirmedSpaBooking(spaBooking);
  setBookingConfirmed(true);

  setBooking({
    name: "",
    roomNumber: "",
    treatment: "",
    date: "",
    time: "",
  });
};

  return (
    <div className="spa-page">
     <section className="spa-hero luxury-spa-hero">
  <img
    src= {`${import.meta.env.BASE_URL}images/spaavdelning.jpg`}
    alt="Spa & Wellness"
    className="spa-hero-image"
  />

  <div className="spa-hero-overlay"></div>

  <div className="spa-hero-content">
    <p className="spa-kicker">Vela Wellness Experience</p>
    <h1>Spa & Wellness</h1>
    <p className="spa-hero-text">
      Återhämtning, värme och stillhet i en exklusiv miljö skapad för total avkoppling.
    </p>

    <div className="spa-hero-actions">
      <a href="#spa-booking-form" className="spa-hero-button primary">
        Boka behandling
      </a>
      <a href="#spa-facilities" className="spa-hero-button secondary">
        Utforska faciliteter
      </a>
    </div>
  </div>
</section>



      <section className="spa-intro container">
        <p>
          Välkommen till vår exklusiva spa- och wellnessupplevelse. Här kan du
          koppla av i bastu, njuta av vår jacuzzi och unna dig behandlingar i en
          varm, lugn och lyxig miljö skapad för total återhämtning.
        </p>
      </section>

      <section className="spa-gallery container">
        <div className="spa-gallery-grid">
          {galleryImages.map((image, index) => (
            <div className="spa-gallery-card" key={index}>
              <img src={image} alt={`Spa miljö ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="spa-facilities container"  id="spa-facilities">
        <div className="section-heading">
          <p className="section-kicker">Faciliteter</p>
          <h2>Våra spa-upplevelser</h2>
        </div>

        <div className="facilities-grid">
          {facilities.map((facility) => (
            <div className="facility-card" key={facility.title}>
              <div className="facility-image-wrapper">
                <img src={facility.image} alt={facility.title} />
              </div>
              <div className="facility-content">
                <h3>{facility.title}</h3>
                <p>{facility.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="spa-treatments container">
        <div className="section-heading">
          <p className="section-kicker">Behandlingar</p>
          <h2>Välj din behandling</h2>
        </div>

        <div className="treatments-grid">
           {treatments.map((treatment) => (
    <div className="treatment-card" key={treatment.name}>
      <div className="treatment-image-wrapper">
        <img src={treatment.image} alt={treatment.name} className="treatment-image" />
      </div>

      <div className="treatment-card-content">
        <h3>{treatment.name}</h3>

        <p className="treatment-description">{treatment.description}</p>

        <div className="treatment-meta">
          <span>{treatment.duration}</span>
          <span>{treatment.price} SEK</span>
        </div>

        <button
          className="treatment-button"
          onClick={() => handleSelectTreatment(treatment.name)}
        >
          Välj denna behandling
              </button>
            </div>
            </div>
          ))}
        </div>
      </section>

     {bookingConfirmed && confirmedSpaBooking ? (
  <section className="spa-confirmation container">
    <div className="spa-confirmation-card">
      <div className="spa-confirmation-icon">✓</div>

      <p className="spa-confirmation-kicker">Spa-bokningen är klar</p>
      <h2>Din behandling är bokad</h2>

      <p className="spa-confirmation-text">
        Tack {confirmedSpaBooking.name}! Din spa-bokning är nu registrerad.
        Vi ser fram emot att välkomna dig till en stund av lugn och återhämtning.
      </p>

      <div className="spa-confirmation-details">
        <div className="spa-confirmation-row">
          <span>Boknings-ID</span>
          <strong>{confirmedSpaBooking.bookingId}</strong>
        </div>

        <div className="spa-confirmation-row">
          <span>Behandling</span>
          <strong>{confirmedSpaBooking.treatment}</strong>
        </div>

        <div className="spa-confirmation-row">
          <span>Rumsnummer</span>
          <strong>{confirmedSpaBooking.roomNumber}</strong>
        </div>

        <div className="spa-confirmation-row">
          <span>Datum</span>
          <strong>{confirmedSpaBooking.date}</strong>
        </div>

        <div className="spa-confirmation-row">
          <span>Tid</span>
          <strong>{confirmedSpaBooking.time}</strong>
        </div>
      </div>

      <button
        className="spa-confirmation-button"
        onClick={() => setBookingConfirmed(false)}
      >
        Boka en ny behandling
      </button>
    </div>
  </section>
) : (
  <section className="spa-booking-wrapper container" id="spa-booking-form">
    <form className="spa-booking-form" onSubmit={handleSubmit}>
      <h2>Boka behandling</h2>

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
          placeholder="Till exempel 67"
          required
        />
      </div>

      <div className="form-group">
        <label>Behandling *</label>
        <select
          name="treatment"
          value={booking.treatment}
          onChange={handleInputChange}
          required
        >
          <option value="">Välj behandling</option>
          {treatments.map((treatment) => (
            <option key={treatment.name} value={treatment.name}>
              {treatment.name}
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
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
          </select>
        </div>
      </div>

      <button type="submit" className="spa-submit-button">
        Bekräfta behandling
      </button>
    </form>
  </section>

)}

     

      <section className="spa-info container">
        <div className="spa-info-card">
          <h3>Viktigt att veta</h3>
          <ul>
            <li>Vänligen kom 15 minuter före din behandling</li>
            <li>Mobiltelefoner ska vara avstängda</li>
            <li>Badkläder krävs i poolen och jacuzzi</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default SpaPage;

                                                            


                                            