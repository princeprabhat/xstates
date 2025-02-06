import React from "react";

const MessageBanner = ({ country, state, city }) => {
  return (
    <>
      {country && state && city && (
        <div style={{ fontSize: "18px" }}>
          You selected{" "}
          <span style={{ fontWeight: "900", fontSize: "25px" }}>{country}</span>
          ,{" "}
          <span style={{ color: "gray" }}>
            {state}, {city}
          </span>
        </div>
      )}
    </>
  );
};

export default MessageBanner;
