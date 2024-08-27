//

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>Phone: + 94 77 75 50 264</p>
        <p>Whatsapp: + 94 77 37 50 264</p>
        <p>
          Email:{" "}
          <a href="mailto:lakshanpd.cse21@gmail.com">
            lakshanpd.cse21@gmail.com
          </a>
        </p>
      </div>
      <div className="footer-section">
        <h3>Follow Us on</h3>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
      <div className="footer-section">
        <h3>Useful Informations</h3>
        <a
          href="https://en.wikipedia.org/wiki/Kataragama_temple"
          target="_blank"
          rel="noopener noreferrer"
        >
          Katharagama Temple
        </a>
        <br />
        <a
          href="https://si.wikipedia.org/wiki/%E0%B6%9A%E0%B7%92%E0%B6%BB%E0%B7%92_%E0%B7%80%E0%B7%99%E0%B7%84%E0%B7%99%E0%B6%BB,_%E0%B6%9A%E0%B6%AD%E0%B6%BB%E0%B6%9C%E0%B6%B8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Katharagama Kirivehera
        </a>
        <div style={{ height: "10px" }}></div>

        {/* Add useful information links here */}
        <p>More content coming soon...</p>
      </div>
    </footer>
  );
};

export default Footer;
