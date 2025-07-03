import React, { useEffect, useState } from "react";
import useUrlLocation from "../hooks/useUrlLocation";
import toast from "react-hot-toast";
import axios from "axios";
import { useBookmarks } from "./context/BookmarkProvider";
import { useNavigate } from "react-router-dom";

function AddNewBookmark() {
  const { createBookmark } = useBookmarks();
  const [lat, lng] = useUrlLocation();
  const [newBookmark, setNewBookmark] = useState("");
  const navigate = useNavigate();
  // console.log(lat, lng);
  useEffect(() => {
    async function getLocationName() {
      try {
        const { data } = await axios.get(
          `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const newBookmarkData = {
          cityName: data.city,
          countryCode: data.countryCode,
          country: data.countryName,
          latitude: lat,
          longitude: lng,
          host_location: data.city + " " + data.countryName,
        };
        setNewBookmark(newBookmarkData);
        console.log(newBookmarkData);
        // console.log(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getLocationName();
  }, [lat, lng]);
  // console.log(newBookmark);
  async function handleSubmit(e) {
    e.preventDefault();
    await createBookmark(newBookmark);
    navigate(`/bookmarks`);
  }
  if (!newBookmark.cityName && !newBookmark.country) {
    return (
      <div>
        <h2 style={{ margin: "2rem", color: "pink" }}>It is unknown place !</h2>
        <button
          onClick={() => {
            navigate("/bookmarks");
          }}
        >
          back !
        </button>
      </div>
    );
  }

  return (
    <div className="form-page">
      <h2>Bookmark New Location</h2>
      <form className="form">
        <div className="form-group">
          <label htmlFor="city" className="label">
            City Name
          </label>

          <input
            type="text"
            id="city"
            className="input"
            value={newBookmark.cityName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country" className="label">
            Country
          </label>

          <input
            type="text"
            id="country"
            className="input"
            value={newBookmark.country}
          />
        </div>
        <div className="button-group">
          <button
            className="btn btn-back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Back
          </button>
          <button className="btn btn-add" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
