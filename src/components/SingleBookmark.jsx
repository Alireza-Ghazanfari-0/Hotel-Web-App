import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "./context/BookmarkProvider";
import Loader from "./Loader";

function SingleBookmark() {
  const { id } = useParams();
  const { currentIsLoading, currentBookmark, getID } = useBookmarks();
  const navigate = useNavigate();
  useEffect(() => {
    getID(id);
  }, [id]);
  if (currentIsLoading) <Loader />;
  // console.log(currentBookmark);

  return (
    <div className="single-bookmark">
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        back <IoArrowBack />
      </button>
      <div
        style={{ paddingTop: "15px", paddingLeft: "2rem", fontSize: "30px" }}
      >
        {currentBookmark.cityName}
      </div>
      <div className="bookmark-from-bookmarlist">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />

        <div>{currentBookmark.cityName}</div>
        <div>{currentBookmark.country}</div>
        <div></div>
      </div>
    </div>
  );
}

export default SingleBookmark;
