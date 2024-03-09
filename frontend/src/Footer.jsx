import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Quick Links Section */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="#products" className="hover:text-gray-300">
                Shop Makeup
              </a>
            </li>
            <li>
              <a href="#skincare" className="hover:text-gray-300">
                Skincare
              </a>
            </li>
            <li>
              <a href="#specials" className="hover:text-gray-300">
                Specials
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-gray-300">
                Beauty Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
          <p className="leading-loose">
            <span className="block">123 Beauty Street</span>
            <span className="block">Machhiwara City, MA 12345</span>
          </p>
          <p className="mt-2">
            Email: <a href="mailto:info@makeupstore.com">info@makeupstore.com</a>
          </p>
          <p className="mt-2">Phone: (123) 456-7890</p>
        </div>

        {/* Social Media Links Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-300"
            >
              <i className="fab fa-facebook-square"></i>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-300"
            >
              <i className="fab fa-twitter-square"></i>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-300"
            >
              <i className="fab fa-instagram-square"></i>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-300"
            >
              <i className="fab fa-pinterest-square"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
