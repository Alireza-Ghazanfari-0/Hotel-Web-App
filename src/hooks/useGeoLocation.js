import { useState } from "react";
import toast from "react-hot-toast";

const useGeoLocation = function () {
  const [position, setPosition] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function getLocation() {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setPosition({ latitude: latitude, longitude: longitude });
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          setIsLoading(false);
        },
        (error) => {
          toast.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      toast("Geolocation is not supported by this browser.");
    }
  }

  return { getLocation, position, isLoading };
};

export default useGeoLocation;
