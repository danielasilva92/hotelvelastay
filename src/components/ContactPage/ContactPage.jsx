import "./ContactPage.css";

// tog hjälp av AI här för att få fram rätt svg för mina symboler
//jag kommer ihåg mycket med SNÄLLA who in the RIGHT MIND kommer ihåg hela path nummret ?! den är endless :')
// den mäniskan som kan kordinatbeskrivning av vekotrform utan utan AI eller ikonbibliotek är en MASTERMIND
const Phone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const Mail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const MapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const Clock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12,6 12,12 16,14"></polyline>
  </svg>
);

//TODO: fixa så att man FAKTISK kan skicka meddelanden till hotellet

function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <img src= {`${import.meta.env.BASE_UR}images/kontata.jpg`}
          alt="Kontakta Hotel Vela Stay"
          className="contact-hero-image"
        />
        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-content">
          <p className="contact-kicker">Välkommen att höra av dig</p>
          <h1>Kontakta oss</h1>
          <p>
            Vi finns här för att hjälpa dig med bokningar, frågor och önskemål
            inför din vistelse på Hotel Vela Stay.
          </p>
        </div>
      </section>

      <section className="contact-main container">
        <div className="contact-grid">
          <div className="contact-info-card">
            <p className="section-kicker">Kontaktuppgifter</p>
            <h2>Vi hjälper dig gärna</h2>

            <div className="contact-item">
              <div className="contact-icon"><Phone /></div>
              <div>
                <h3>Telefon</h3>
                <p>+46 123 456 789</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><Mail /></div>
              <div>
                <h3>Email</h3>
                <p>info@hotelvela.se</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><MapPin /></div>
              <div>
                <h3>Adress</h3>
                <p>Storgatan 1, 123 45 Solstaden</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><Clock /></div>
              <div>
                <h3>Öppettider</h3>
                <p>Receptionen är öppen dygnet runt</p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <p className="section-kicker">Skicka en förfrågan</p>
            <h2>Hör av dig till oss</h2>

            <form className="contact-form">
              <div className="form-group">
                <label>Namn</label>
                <input type="text" placeholder="Ditt namn" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="din@email.se" />
              </div>

              <div className="form-group">
                <label>Telefon</label>
                <input type="tel" placeholder="+46 XX XXX XX XX" />
              </div>

              <div className="form-group">
                <label>Meddelande</label>
                <textarea rows="5" placeholder="Skriv ditt meddelande här..."></textarea>
              </div>

              <button type="submit" className="contact-button">
                Skicka meddelande
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-visit container">
        <div className="contact-visit-card">
          <div className="contact-visit-text">
            <p className="section-kicker">Besök oss</p>
            <h2>En plats för vila, komfort och upplevelser</h2>
            <p>
              Hotel Vela Stay ligger centralt och erbjuder en varm, exklusiv
              miljö för både avkoppling och minnesvärda vistelser.
            </p>
          </div>

          <div className="contact-visit-image-wrapper">
            <img src= {`${import.meta.env.BASE_URL}images/utsida.jpg`}
             alt="Hotel Vela Stay" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;