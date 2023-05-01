import React from "react";
import {
  AiOutlineInstagram,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 LogoCandles All rights reserved</p>
      <p className="icons">
        <a
          href={"https://instagram.com/rosy___fox?igshid=YmMyMTA2M2Y="}
          target="_blank"
          className="instagram"
        >
          <AiOutlineInstagram />
        </a>
        <a href="mailto: abc@example.com">
          <AiOutlineMail />
        </a>
        <a href="tel:+380637009106">
          <AiOutlinePhone />
        </a>
      </p>
    </div>
  );
};

export default Footer;
