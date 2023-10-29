import React from 'react';

const getYear = () => {
  return new Date().getFullYear();
};

export const Footer = () => {
  const currentYear = getYear();

  return (
    <>
      <footer className="footer footer-center w-full p-4 bg-gray-300 text-gray-800">
        <div className="text-center">
          <p>
            Copyright © {currentYear} -
            <a
              className="font-semibold"
              href="mailto:m.sohanemon@gmail.com"
            >
              Ignacio Fernández Bescós
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
