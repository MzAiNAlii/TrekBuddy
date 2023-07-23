import "./Destinations.css";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

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
const storage = getStorage();

let Destinations = () => {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const fetchImageURLs = async () => {
      try {
        const imageNames = [
          "MureeHills.jpg",
          "KPK.jpg",
          "KaghanValley.jpg",
          "HunzaValley.jpg",
          "Gilgit-Baltistan.jpg",
          "AzadKashmir.jpg",
        ];

        const imagePromises = imageNames.map(async (imageName) => {
          const url = await getDownloadURL(ref(storage, imageName));
          return { url, caption: getImageCaption(imageName) };
        });

        const imageURLs = await Promise.all(imagePromises);
        setImageURLs(imageURLs);
      } catch (error) {
        console.error("Error fetching image URLs from Firebase Storage:", error);
      }
    };

    fetchImageURLs();
  }, []);

  const getImageCaption = (imageName) => {
    const nameWithoutExtension = imageName.split(".")[0];
    return nameWithoutExtension;
  };

  return (
    <>
      <h2 className="section_title">Top Destinations</h2>
      <span className="section_subtitle">Explore the beauty of North Pakistan</span>

      <div className="Destinations_container">
        {imageURLs.map((image, index) => (
          <div key={index} className="flex-item">
            <img src={image.url} alt={`Destination ${index + 1}`} />
            <div className="caption">{image.caption}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Destinations;
