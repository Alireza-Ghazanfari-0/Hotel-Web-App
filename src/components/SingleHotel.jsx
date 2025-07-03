import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHotels } from "./context/HotelsProvider";
import Loader from "./Loader";

function SingleHotel() {
  const { id } = useParams();
  const { currentHotel, isLoadingCurrent, getSingleHotelData } = useHotels();

  useEffect(() => {
    getSingleHotelData(id);
  }, [id]);

  if (isLoadingCurrent || !currentHotel) <Loader />;

  return (
    <div className="single-hotel-page">
      <div className="single-child-1">{currentHotel.name}</div>
      <div className="single-child-2">{currentHotel.smart_location}</div>
      <img src={currentHotel.xl_picture_url} alt="" className="image" />
      <div className="single-child-3">{currentHotel.description}</div>
    </div>
  );
}

export default SingleHotel;
