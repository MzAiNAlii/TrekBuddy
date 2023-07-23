import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Carousel } from "react-bootstrap"; 
import "./Carousel.css";

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
  initializeApp(firebaseConfig);
const CarouselComponent = () => {
  const getImageUrlFromFirebaseStorage = async (imageName) => {
    const storageRef = ref(getStorage(), imageName);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const imageNames = ["carousel_img1.jpg", "carousel_img4.jpg", "carousel_img3.jpg"];
    Promise.all(imageNames.map(getImageUrlFromFirebaseStorage))
      .then((urls) => setCarouselImages(urls))
      .catch((error) => console.log("Error fetching image URLs:", error));
  }, []);

  return (
    <Carousel fade>
      {carouselImages.map((imageUrl, index) => (
        <Carousel.Item key={index}>
          <img src={imageUrl} className="d-block w-100" alt={`carousel_img${index + 1}`} />
          <Carousel.Caption>
            <h1 className="carousel_title">Trek Buddy</h1>
            <p className="carousel_subtitle">
              Your ultimate destination for safe and affordable travel experiences in the breathtaking Northern areas
              of Pakistan. We are dedicated to curating unforgettable journeys that capture the essence of Pakistan's
              natural wonders and cultural richness. Whether you are a local adventurer seeking to embark on a
              soul-stirring escapade or an international traveler eager to immerse yourself in the enchanting beauty
              of Pakistan, we have designed our services to cater to all your travel dreams.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
