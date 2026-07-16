import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const logo = require("../../utils/png-clipart-bookmyshow-office-android-ticket-android-text-logo-removebg-preview.png");
  return (
    <div className="w-screen sm:pl-16 sm:pr-16 h-max mb-[50px] sm:mb-0 bg-[rgb(52,51,56)] text-[rgb(118,120,119)]">
      {/* Partner Section */}
      <div className="w-full h-max flex items-center justify-between gap-3 mb-3 p-4">
        <div className="sm:text-left text-center font-[600] sm:text-[18px] text-[12px] font-sans text-white">
          Design & Developed By
          <br></br>
          Rahul Birla
        </div>
        <div className="sm:w-[200px] sm:opacity-100 opacity-0 w-0 h-[40px] bg-red-500 text-white text-center font-sans font-semibold rounded-md flex items-center justify-center">
          <button>Contact Today!</button>
        </div>
      </div>

      {/* Links Section */}
      <div>
        <table className="w-full">
          <tbody>
            {/* Movies Now Showing In Indore */}
            <tr>
              <td>
                <div className="p-2 flex flex-col items-start justify-center">
                  <h2 className="mb-[20px] uppercase text-left text-[14px] text-[rgb(165,165,165)] font-[400]">
                    Movies Now Showing In Indore
                  </h2>
                  <ul className="flex flex-wrap items-center justify-start text-[12px] sm:pr-[5px]">
                    <NavLink to="/pushpa-2" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Pushpa 2: The Rule |
                      </li>
                    </NavLink>
                    <NavLink to="/baby-jhon" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Baby Jhon |
                      </li>
                    </NavLink>
                    <NavLink to="/the-lion-king" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        The Lion King |
                      </li>
                    </NavLink>
                    <NavLink to="/vanvass" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Vanvass |
                      </li>
                    </NavLink>
                    <NavLink to="/marco" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Marco |
                      </li>
                    </NavLink>
                    <NavLink to="/moana-2" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Moana 2 |
                      </li>
                    </NavLink>
                    <NavLink to="/solo-leaving" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Solo Leaving: Reawakening |
                      </li>
                    </NavLink>
                    <NavLink to="/trailers-screening" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Trailers Screening Show |
                      </li>
                    </NavLink>
                    <NavLink to="/sabarmati-report" className="no-underline">
                      <li className="hover:text-white cursor-pointer">
                        The Sabarmati Report
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </td>
            </tr>

            {/* Upcoming Movies in Indore */}
            <tr>
              <td>
                <div className="p-2 flex flex-col items-start justify-center">
                  <h2 className="mb-[20px] uppercase text-left text-[14px] text-[rgb(165,165,165)] font-[400]">
                    Upcoming Movies in Indore
                  </h2>
                  <ul className="flex flex-wrap items-center justify-start text-[12px]">
                    <NavLink to="/max-2024" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Max (2024) |
                      </li>
                    </NavLink>
                    <NavLink to="/best-christmas" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        The Best Christmas Pegeant Ever |
                      </li>
                    </NavLink>
                    <NavLink to="/sherlockholmes" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Srikakulam Sherlockholmes |
                      </li>
                    </NavLink>
                    <NavLink to="/oye-bhootni" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Oye Bhootni ke |
                      </li>
                    </NavLink>
                    <NavLink to="/barroz" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Barroz |
                      </li>
                    </NavLink>
                    <NavLink to="/vishyam-life" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Vishyam Life |
                      </li>
                    </NavLink>
                    <NavLink to="/rajakilli" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Rajakilli |
                      </li>
                    </NavLink>
                    <NavLink to="/aiangu" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Aiangu |
                      </li>
                    </NavLink>
                    <NavLink to="/out-of-syllabus" className="no-underline">
                      <li className="hover:text-white cursor-pointer">
                        Out Of Syllabus
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </td>
            </tr>

            {/* Movies By Genre */}
            <tr>
              <td>
                <div className="p-2 flex flex-col items-start justify-center">
                  <h2 className="mb-[20px] uppercase text-left text-[14px] text-[rgb(165,165,165)] font-[400]">
                    Movies By Genre
                  </h2>
                  <ul className="flex flex-wrap items-center justify-start text-[12px]">
                    <NavLink to="/action" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Action Movies |
                      </li>
                    </NavLink>
                    <NavLink to="/drama" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Drama Movies |
                      </li>
                    </NavLink>
                    <NavLink to="/thriller" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Thriller Movies |
                      </li>
                    </NavLink>
                    <NavLink to="/adventure" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Adventure Movies |
                      </li>
                    </NavLink>
                    <NavLink to="/animation" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Animation Movies |
                      </li>
                    </NavLink>
                    <NavLink to="/fantasy" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Fantasy Movies |
                      </li>
                    </NavLink>
                    <NavLink to="/classic" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Classic Movies |
                      </li>
                    </NavLink>
                    <NavLink to="/biography" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Biography Movies |
                      </li>
                    </NavLink>
                    <NavLink to="/mystery" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Mystery Movies |
                      </li>
                    </NavLink>
                    <NavLink to="/political" className="no-underline">
                      <li className="hover:text-white cursor-pointer">
                        Political Movies
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </td>
            </tr>

            {/* Movies By Language */}
            <tr>
              <td>
                <div className="p-2 flex flex-col items-start justify-center">
                  <h2 className="mb-[20px] uppercase text-left text-[14px] text-[rgb(165,165,165)] font-[400]">
                    Movies By Language
                  </h2>
                  <ul className="flex flex-wrap items-center justify-start text-[12px]">
                    <NavLink to="/hindi" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Movies in Hindi |
                      </li>
                    </NavLink>
                    <NavLink to="/english" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Movies in English |
                      </li>
                    </NavLink>
                    <NavLink to="/sindhi" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Movies in Sindhi |
                      </li>
                    </NavLink>
                    <NavLink to="/japanese" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Movies in Japanese |
                      </li>
                    </NavLink>
                    <NavLink to="/panjabi" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Movies in Panjabi |
                      </li>
                    </NavLink>
                    <NavLink to="/telugu" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Movies in Telugu |
                      </li>
                    </NavLink>
                    <NavLink to="/tamil" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Movies in Tamil |
                      </li>
                    </NavLink>
                    <NavLink to="/odia" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Movies in Odia |
                      </li>
                    </NavLink>
                    <NavLink to="/korean" className="no-underline">
                      <li className="hover:text-white cursor-pointer">
                        Movies in Korean
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </td>
            </tr>

            {/* Sports Events in Indore */}
            <tr>
              <td>
                <div className="p-2 flex flex-col items-start justify-center">
                  <h2 className="mb-[20px] uppercase text-left text-[14px] text-[rgb(165,165,165)] font-[400]">
                    Sports Events in Indore
                  </h2>
                  <ul className="flex flex-wrap items-center justify-start text-[12px]">
                    <NavLink to="/running" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Running |
                      </li>
                    </NavLink>
                    <NavLink to="/football" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Football |
                      </li>
                    </NavLink>
                    <NavLink to="/kabaddi" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Kabaddi |
                      </li>
                    </NavLink>
                    <NavLink to="/chess" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Chess |
                      </li>
                    </NavLink>
                    <NavLink to="/badminton" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Badminton |
                      </li>
                    </NavLink>
                    <NavLink to="/boxing" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Boxing |
                      </li>
                    </NavLink>
                    <NavLink to="/cricket" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Cricket |
                      </li>
                    </NavLink>
                    <NavLink to="/athletics" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Athletics |
                      </li>
                    </NavLink>
                    <NavLink to="/mma" className="no-underline">
                      <li className="hover:text-white cursor-pointer">
                        Mixed Martial Arts
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </td>
            </tr>

            {/* Cinema in Top Cities */}
            <tr>
              <td>
                <div className="p-2 flex flex-col items-start justify-center">
                  <h2 className="mb-[20px] uppercase text-left text-[14px] text-[rgb(165,165,165)] font-[400]">
                    Cinema in Top Cities
                  </h2>
                  <ul className="flex flex-wrap items-center justify-start text-[12px]">
                    <NavLink to="/mumbai" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Cinema in Mumbai |
                      </li>
                    </NavLink>
                    <NavLink to="/delhi-ncr" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Cinema in Delhi-NCR |
                      </li>
                    </NavLink>
                    <NavLink to="/chennai" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Cinema in Chennai |
                      </li>
                    </NavLink>
                    <NavLink to="/bengluru" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Cinema in Bengluru |
                      </li>
                    </NavLink>
                    <NavLink to="/hyderabad" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Cinema in Hyderabad |
                      </li>
                    </NavLink>
                    <NavLink to="/pune" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Cinema in Pune |
                      </li>
                    </NavLink>
                    <NavLink to="/kolkata" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Cinema in Kolkata |
                      </li>
                    </NavLink>
                    <NavLink to="/kochi" className="no-underline">
                      <li className="hover:text-white cursor-pointer">
                        Cinema in Kochi
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </td>
            </tr>

            {/* Countries */}
            <tr>
              <td>
                <div className="p-2 flex flex-col items-start justify-center">
                  <h2 className="mb-[20px] uppercase text-left text-[14px] text-[rgb(165,165,165)] font-[400]">
                    Countries
                  </h2>
                  <ul className="flex flex-wrap items-center justify-start text-[12px]">
                    <NavLink to="/indonesia" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Indonesia |
                      </li>
                    </NavLink>
                    <NavLink to="/singapore" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Singapore |
                      </li>
                    </NavLink>
                    <NavLink to="/uae" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        UAE |
                      </li>
                    </NavLink>
                    <NavLink to="/sri-lanka" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Sri Lanka |
                      </li>
                    </NavLink>
                    <NavLink to="/west-indies" className="no-underline">
                      <li className="hover:text-white cursor-pointer">
                        West Indies
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </td>
            </tr>

            {/* HELP Section */}
            <tr>
              <td>
                <div className="p-2 flex flex-col items-start justify-center">
                  <h2 className="mb-[20px] uppercase text-left text-[14px] text-[rgb(165,165,165)] font-[400]">
                    HELP
                  </h2>
                  <ul className="flex flex-wrap items-center justify-start text-[12px]">
                    <NavLink to="/about-us" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        About Us |
                      </li>
                    </NavLink>
                    <NavLink to="/contact-us" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Contact Us |
                      </li>
                    </NavLink>
                    <NavLink to="/current-opening" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Current Opening |
                      </li>
                    </NavLink>
                    <NavLink to="/faqs" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        FAQs |
                      </li>
                    </NavLink>
                    <NavLink to="/terms-conditions" className="no-underline">
                      <li className="mr-[5px] mb-[5px] hover:text-white cursor-pointer">
                        Terms And Conditions |
                      </li>
                    </NavLink>
                    <NavLink to="/privacy-policy" className="no-underline">
                      <li className="hover:text-white cursor-pointer">
                        Privacy Policy
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="pt-8 sm:gap-4 gap-1 flex items-center justify-center">
                  <div className="sm:w-[40%] w-[30%] h-[0.5px] bg-[rgb(132,131,136)]"></div>
                  <div className=" h-[50px] overflow-hidden flex items-center justify-center">
                    <div className="w-[80px] h-[80px] overflow-hidden flex items-center justify-center">
                      <img src={logo} alt="BookMyShow"></img>
                    </div>
                  </div>
                  <div className="sm:w-[40%] w-[30%] h-[0.5px] bg-[rgb(132,131,136)]"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center sm:p-[30px] p-[10px] text-[11px] text-[rgb(102,102,102)]">
        Copyright 2024 © Bigtree Entertainment Pvt. Ltd. All Rights Reserved.
        <br></br>
        The content and images used on this site are copyright protected and
        copyrights vests with the respective owners. The usage of the content
        and images on this website is intended to promote the works and no
        endorsement of the artist shall be implied. Unauthorized use is
        prohibited and punishable by law.
      </div>
    </div>
  );
};

export default Footer;
