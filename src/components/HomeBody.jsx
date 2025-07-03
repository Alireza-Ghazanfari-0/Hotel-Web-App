import React from "react";
import { FaEuroSign } from "react-icons/fa6";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";

function HomeBody() {
  // console.log(useFetch("http://localhost:8000/hotels"));
  // const { data, isLoading } = useFetch("http://localhost:8000/hotels");
  const { data, isLoading } = useFetch("https://json-server-repo-for-hotel-app.onrender.com/hotels");
  if (isLoading) <Loader />;
  // console.log(data);

  return (
    <div>
      <div className="home-subject">Near Locations</div>
      <div className="home-body-container">
        {data.map((item) => (
          <div className="single-item" key={item.id}>
            <img src={item.xl_picture_url} alt="" className="img-single" />
            <div>&nbsp;{item.smart_location}</div>
            <div style={{ opacity: "0.5" }}>&nbsp;{item.name}</div>
            <div>
              <FaEuroSign /> {item.price} per night
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeBody;
