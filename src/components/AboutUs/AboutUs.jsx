import React from "react";
import "./AboutUs.css";

function AboutUs() {
 const stats = [
    { value: "2013", label: "GRUNDAT" },
    { value: "114", label: "RUM & SVITER" },
    { value: "4.9", label: "GÄSTBETYG" },
  ];

  return (
    <section id="om" className="about-section">
      <div className="about-container">
        <p className="about-subtitle">VÅR HISTORIA</p>
        <h2 className="about-title">Om Hotel Vela Stay</h2>
        <div className="about-divider"></div>

        <p className="about-text">
          Namnet <span className="about-highlight">Vela</span> bär på en personlig betydelse.
          Det är inspirerat av min egen familj – mina fyra barn, vars namn alla börjar på
          bokstaven <span className="about-highlight">V</span>, och mitt eget namn som slutar på
          <span className="about-highlight"> ela</span>. Tillsammans bildar de ordet
          <span className="about-highlight"> Vela</span>, en symbol för familj, gemenskap och
          något som betyder mer än bara ett namn.
        </p>

        <p className="about-text">
          Hotel Vela Stay skapades med tanken att vara en plats där människor känner sig
          välkomna, omhändertagna och hemma. Varje detalj, från atmosfären till servicen,
          är utformad för att skapa en varm och minnesvärd upplevelse för våra gäster.
        </p>

        <div className="about-stats">
          {stats.map((stat) => (
            <div className="about-stat" key={stat.label}>
              <h3 className="about-stat-value">{stat.value}</h3>
              <p className="about-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default AboutUs;