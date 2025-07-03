import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();

function HotelsProvider({ children }) {
  // const baseURL = "http://localhost:8000/hotels";
  const baseURL = "https://json-server-repo-for-hotel-app.onrender.com/hotels";
  const [currentHotel, setCurrentHotel] = useState("");
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchedLocation = searchParams.get("searchedLocation");
  const room = JSON.parse(searchParams.get("condition"))?.room;
  const { isLoading, data: hotelsListData } = useFetch(
    baseURL,
    `q=${searchedLocation}&accommodates_gte=${room}`
  );
  // console.log(hotelsListData);

  async function getSingleHotelData(id) {
    try {
      setIsLoadingCurrent(true);
      const response = await axios.get(`${baseURL}/${id}`);
      setCurrentHotel(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrent(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotelsListData,
        getSingleHotelData,
        currentHotel,
        isLoadingCurrent,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export const useHotels = function () {
  return useContext(HotelContext);
};
