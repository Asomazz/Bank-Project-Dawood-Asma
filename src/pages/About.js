import React from "react";
import Navbar from "../components/Navbar";
import aboutImage from "../Pics/Capture.PNG";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="text-center mb-8">
          <img
            src={aboutImage}
            alt="About Us"
            className="w-64 h-64 rounded-full mx-auto mb-4 shadow-lg"
          />
          <h1 className="text-4xl font-bold text-orange-600 mb-4">About Us</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Dasma Bank is the brainchild of two passionate full stack
            developers, Dawood and Asmaa. Together, they have built this bank
            from the ground up with the vision of revolutionizing online
            banking. Their expertise in coding is unmatched, and they are on a
            mission to surpass Ali Alsarraf in the world of software
            development. With their combined skills, Dawood and Asmaa are
            dedicated to providing top-notch banking solutions that cater to the
            modern needs of their users. Join us on this journey and experience
            the future of banking.
          </p>
        </div>
      </main>
      <footer className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="flex space-x-4">
            <a href="/about" className="text-gray-700 hover:text-orange-600">
              About
            </a>
            <a href="/privacy" className="text-gray-700 hover:text-orange-600">
              Privacy Policy
            </a>
            <a
              href="/licensing"
              className="text-gray-700 hover:text-orange-600"
            >
              Licensing
            </a>
            <a href="/contact" className="text-gray-700 hover:text-orange-600">
              Contact
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-2">
          © 2024 CODED™. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default About;
