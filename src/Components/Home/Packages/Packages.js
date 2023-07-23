import "./Packages.css"
import firebase from "firebase/compat/app"; 
import { useEffect , useState} from "react"
import "firebase/compat/storage"; 
import { initializeApp } from "firebase/app";

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

  
let Packages = () =>{
    const getImageUrlFromFirebaseStorage = async (imageName) => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(imageName);
        const imageUrl = await fileRef.getDownloadURL();
        return imageUrl;
      };
    const [economyClassImageUrl, setEconomyClassImageUrl] = useState("");
    const [businessClassImageUrl, setBusinessClassImageUrl] = useState("");
    const [firstClassImageUrl, setFirstClassImageUrl] = useState("");
    useEffect(() => {
        getImageUrlFromFirebaseStorage("EconomyClass-icon.png")
          .then((url) => setEconomyClassImageUrl(url))
          .catch((error) => console.log("Error getting Economy Class image URL:", error));
    
        getImageUrlFromFirebaseStorage("BusinessClass-icon.png")
          .then((url) => setBusinessClassImageUrl(url))
          .catch((error) => console.log("Error getting Business Class image URL:", error));
    
        getImageUrlFromFirebaseStorage("FirstClass-icon.png")
          .then((url) => setFirstClassImageUrl(url))
          .catch((error) => console.log("Error getting First Class image URL:", error));
      }, []);
    return(
        <>
            <div className="Package_container" >
                <div>
            <h1 className = "header">What We Offer</h1>
            </div>
            <div className="section_container">
                
                <div className="content_container">
                <div className="Section_content">
                <img src={economyClassImageUrl} alt="Econnomy Class Icon"/>
                <h3 >Economy Class</h3>
                <p >Budget-friendly accommodation with affordable dining options</p>
                <button>Explore</button>
                </div>

                 <div className="Section_content">
                <img src={firstClassImageUrl}  alt="First Class Icon"/>
                <h3 >First Class</h3>
                <p >Premium hotels with fine dining experiences, showcasing local & international cuisine</p>
                <button>Explore</button>
                </div>
                 
                 <div className="Section_content">
                <img src={businessClassImageUrl}  alt="Business Class Icon"/>
                <h3>Business Class</h3>
                <p>High-end Accommodation with exclusive private guided tours</p>
                <button>Explore</button>
                </div>
                </div>
                </div>
        </div>
        </>
    )
}

export default Packages