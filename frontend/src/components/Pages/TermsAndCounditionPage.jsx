import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndCounditionPage = () => {
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("/d");
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center px-5 py-8 gap-6">
      <div className="w-full md:w-[70%] lg:w-[50%]">
        1.The show will run only if minimum of 6 tickets are sold in that show.
        <br></br>
        2.Seats layout page for Cine Square Cinemas is for representational
        purposes only and actual seat layout might vary.<br></br> 3.Tickets are
        compulsory for children of 3 years & above.<br></br> 4.Patrons below the
        age of 18 Years cannot be admitted for movies certified A.<br></br>{" "}
        5.For 3D movies, ticket price included charges towards usage of 3d
        glasses.<br></br> 6.Outside food & Beverage are not allowed in the
        cinema premises.<br></br> 7.Items like carry-bags, eatable, helmets,
        handbags are not allowed inside the theatres and are strictly
        prohibited.<br></br> 8.Items like laptops, camera, knives, lighter,
        match box, cigarettes, firearms, and all types of inflammable objects
        are strictly prohibited.<br></br> 9.Patrons under the influence of
        alcohol or any other form of drugs will not be allowed inside the cinema
        premises.<br></br> 10.Tickets once purchased cannot be cancelled,
        exchange or refunded.<br></br> 11.Decision(s) taken by Cine Square
        Cinemas Shall be final and binding, rights of reserved.<br></br>
        12.Ticket prices are subject to change without any prior notification.
        <br></br>
        13.Recording of a film through mobile or camera is strictly prohibited
        and is a punishable offence.<br></br>
      </div>

      <div>
        <button onClick={cancelHandler}>Cancel</button>
        <button>Accept</button>
      </div>
    </div>
  );
};

export default TermsAndCounditionPage;
