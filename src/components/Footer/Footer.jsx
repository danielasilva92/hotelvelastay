import './Footer.css';
// en funktion för footer, denna ligger längst ner med info om hotellet
function Footer() {

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>Hotel Vela Stay</h3>
                <p>Lyxig komfort i hjärtat av staden</p>
                </div>
                <div className="footer-section">
                    <h4>Kontakt</h4>
                    <p>Storgatan 1</p>
                    <p>123 45 Solstaden</p>
                    <p>Telefon: +46 123 456 789</p>
                    <p>Email: info@hotelvelastay.se</p>
                </div>
                
                <div className="footer-section">
                    <h4>Följ oss</h4>
                    <p>Facebook: /hotelvelastay</p>
                    <p>Instagram: @hotelvelastay</p>
                    <p>Twitter: @hotelvelastay</p>
                </div>
                <div className="footer-section">
                    <h4>Öppettider</h4>
                    <p>Reception: Öppet dygnet runt</p>
                    <p>Restaurang: 07:00 - 22:00</p>
                    <p>Spa: 09:00 - 20:00</p>
                </div>
            </div>

            <div className="footer-bottom">
                    <p>© 2013 Hotel Vela Stay. Alla rättigheter förbehållna.</p>
                </div>
        </footer>
    );

}
export default Footer;