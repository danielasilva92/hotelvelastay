import React from "react";
import "./RoomCard.css";

function RoomCard({ room, onSelect, buttonText = "BOKA" }) {
  return (
    <div
      className="room-card luxury-room-card"
      onClick={() => onSelect(room)}
    >
      <div className="room-image-wrapper">
        <img
          className="room-image-tag"
          src={room.imageUrl}
          alt={room.name}
        />
      </div>

      <div className="room-card-content">
        <div className="room-card-header">
          <h3 className="room-card-title">{room.name}</h3>
          <span className="room-card-size">{room.size || "35 M²"}</span>
        </div>
        <p className="room-card-description">{room.description}</p>
        <div className="room-card-footer">
          <p className="room-card-price">
            från <span>{room.price}</span> <small>kr / natt</small>
          </p>

          <button
            className="room-card-button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(room);
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;