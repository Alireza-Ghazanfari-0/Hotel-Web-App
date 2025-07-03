import React from "react";
import { Link } from "react-router-dom";
import { useHotels } from "./context/HotelsProvider";
import { FaEuroSign } from "react-icons/fa6";
import Loader from "./Loader";

function SearchedHotelList() {
  const { isLoading, hotelsListData } = useHotels();
  // console.log(hotelsListData);
  if (isLoading) <Loader />;
  return (
    <div className="searched-hotel-list">
      <div
        style={{
          paddingLeft: "1.5rem",
          paddingTop: "1rem",
          fontWeight: "bold",
          paddingBottom: "1rem",
        }}
      >
        Searched Results:&nbsp;{hotelsListData.length}
      </div>
      <div>
        {hotelsListData.map((item) => (
          <Link
            className="single-hotel-div-in-searched-list"
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <img className="child-1" src={item.xl_picture_url} alt="" />
            <div className="child-2">{item.smart_location}</div>
            <div className="child-3">{item.name}</div>
            <div className="child-4">
              <FaEuroSign /> {item.price} per night
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchedHotelList;
