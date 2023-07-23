import "./about.css"
import React, { useState, useEffect } from 'react';
import firebase from "firebase/compat/app"; 
import "firebase/compat/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyBcndkocEH7pz_Hqlh2ZKbqWr0q7gH_-bA",
  authDomain: "trekbuddy-4a266.firebaseapp.com",
  databaseURL: "https://trekbuddy-4a266-default-rtdb.firebaseio.com",
  projectId: "trekbuddy-4a266",
  storageBucket: "trekbuddy-4a266.appspot.com",
  messagingSenderId: "925273324303",
  appId: "1:925273324303:web:255d1b93d32ad4a2ad1c7a",
  measurementId: "G-Z1LZWV2LS3"
};
firebase.initializeApp(firebaseConfig);

let About = () => {
  const getImageUrlFromFirebaseStorage = async () => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child("aboutUs.jpg"); 
    const imageUrl = await fileRef.getDownloadURL();
    return imageUrl;
  };
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getImageUrlFromFirebaseStorage()
      .then((url) => setImageUrl(url))
      .catch((error) => console.log("Error getting image URL:", error));
  }, []);
    return(
      <section >
        <div className="about_container">

        <div className="about__section">
        <h2 className="section__title">Why Plan your trip with </h2>
        <h2 className="section__title1">Trek Buddy</h2>
        <div className="about__content">
         <p>Our travel website, provides you with unforgettable journeys and seamless travel experiences. We are dedicated to providing you with a seamless platform to discover, plan, and book your dream vacations.</p>
         </div>
         <div className="about__data">
            <div>
            <p> <i className='bx bxs-check-circle'></i> Explore a wide range of destinations across Pakistan</p>
            </div>
            <div>  
            <p> <i className='bx bxs-check-circle'></i> Efforlessly choose rentals that suits your preferences and budget.</p>
            </div>
            <div>  
            <p> <i className='bx bxs-check-circle'></i> Immerse yourself in a world of exciting activities and attractions.</p> 
            </div>        
            <div>
            <p> <i className='bx bxs-check-circle'></i> Embark on an extraordinary travel adventure with our travel website</p>  
            </div>            
          </div> 
          </div> 

            <div className="about__img">
            <img src={imageUrl} alt="About_Us"/>
            </div>

            </div>  

             <div>
    </div>     
      </section> 
    )
}

export default About