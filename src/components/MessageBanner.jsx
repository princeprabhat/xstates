import React from "react";

const MessageBanner = ({ country, state, city }) => {
  return (
    <>
      {country && state && city && (
        <div style={{ fontSize: "18px", fontWeight: "900" }}>
          You selected{" "}
          <span style={{ fontWeight: "900", fontSize: "25px" }}>{city}</span>,{" "}
          <span style={{ color: "gray" }}>
            {state}, {country}
          </span>
        </div>
      )}
    </>
  );
};

export default MessageBanner;
