import React from "react";
import Lottie from "lottie-react";
import homebg from "../assets/homebg.json";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col p-6 md:px-20 overflow-hidden">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center z-100">
        <h1
          className="text-[20px] md:text-[48px] md:text-[64px] font-extrabold"
          style={{ fontFamily: "'Merriweather Sans'" }}
        >
          <span className="text-custom-purple">Stock</span>
          <span className="text-custom-blue">Sync</span>
        </h1>
        <div className="space-x-4 md:space-x-[34px] text-[12px] md:text-[20px] italic font-bold">
          <Link
            to="/login"
            className="px-6 md:px-10 py-1 md:py-2 border text-custom-blue hover:bg-custom-blue rounded-full"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 md:px-10 py-1 md:py-2 bg-custom-purple text-white rounded-full shadow-md hover:bg-custom-purple"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center flex-grow lg:mt-[-200px]">
        {/* Right Animation (GIF) - Appears on top in mobile */}
        <div className="lg:w-2/3 flex justify-center top-0">
          <Lottie
            animationData={homebg}
            loop={true}
            className="max-w-[80%] md:max-w-[100%]"
          />
        </div>

        {/* Left Content (Text) */}
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <h2
            className="text-[26px] md:text-[32px] font-extrabold mb-4"
            style={{ fontFamily: "'Merienda'" }}
          >
            Seamless Inventory, Smarter Business
          </h2>
          <p
            className="text-[16px] md:text-[20px] font-regular leading-normal mb-6"
            style={{ fontFamily: "'Merienda One'" }}
          >
            Track, manage, and optimize your <br />
            inventory with ease— all in one powerful <br />
            platform.
          </p>
          <button
            className="px-6 md:px-10 py-1 md:py-2 text-[12px] md:text-[20px] bg-custom-purple hover:bg-custom-purple text-white font-bold rounded-full shadow-md"
            style={{ fontFamily: "'Merriweather'" }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
// import React from "react";
// import Lottie from "lottie-react";
// import homebg from "../assets/homebg.json";
// import { Link } from "react-router-dom";

// const LandingPage = () => {
//   return (
//     <div className="p-4 md:p-10 items-center">
//       {/* <div className=""> */}
//         <nav className="w-full flex justify-between items-center">
//           <h1
//             className="text-[64px] font-extrabold"
//             style={{ fontFamily: "'Merriweather Sans'" }}
//           >
//             <span className="text-custom-purple">Stock</span>
//             <span className="text-custom-blue">Sync</span>
//           </h1>
//           <div
//             className="space-x-[34px] text-[20px] bold italic"
//             style={{ fontFamily: "'Merriweather'" }}
//           >
//             <Link
//               to="/login"
//               className="px-10 py-2 bg-custom-blue border border-deepblue-800 shadow-lg rounded-full text-custom-blue bg-custom-blue:hover"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="px-10 py-2 bg-custom-purple border  shadow-lg rounded-full text-white shadow-md bg-custom-purple:hover"
//             >
//               Register
//             </Link>
//           </div>
//         </nav>

//         <div className="flex flex-col lg:flex-row">
//           {/* Left Content */}
//           <div className="text-center lg:text-left lg:w-1/2">
//             <h2
//               className="text-[32px] font-extrabold mb-4"
//               style={{ fontFamily: "'Merienda'" }}
//             >
//               Seamless Inventory, Smarter Business
//             </h2>
//             <p className="text-[20px] font-regular mb-6 text-lg"
//             style={{ fontFamily: "'Merienda'" }}>
//               Track, manage, and optimize your <br />
//               inventory with ease— all in one powerful <br />
//               platform.
//             </p>
//             <button className="px-10 py-2 bg-custom-purple rounded-full text-white shadow-md bg-custom-purple:hover">
//               Get Started
//             </button>
//           </div>

//           {/* Right Image */}
//            <div className="lg:w-2/3 mt-10 lg:mt-0 flex justify-center">
//             <Lottie animationData={homebg} loop={true} className=""/>
//           </div>
//         </div>
//       {/* </div> */}
//     </div>
//   );
// };

// export default LandingPage;
