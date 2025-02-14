import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center">
      <div className="space-y-2">
        <a
          href="https://github.com/MishraShardendu22"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-blue-400 transition duration-300"
        >
          GitHub: MishraShardendu22
        </a>
        <a
          href="https://www.linkedin.com/in/shardendumishra22/"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-blue-400 transition duration-300"
        >
          LinkedIn: shardendumishra22
        </a>
      </div>
    </footer>
  );
};

export default Footer;
