import React from "react";
import { Link } from "react-router-dom";
import { useBookmarks } from "./context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import { BiTrash } from "react-icons/bi";
import Loader from "./Loader";

function BookmarkList() {
  const { isLoading, bookmarksData, deleteBookmark } = useBookmarks();
  const handleDelete = async function (e, id) {
    e.preventDefault();
    await deleteBookmark(id);
    // console.log(id);
  };
  // console.log(bookmarksData);
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
        Bookmark List
      </div>
      <div style={{ marginLeft: "2rem" }}>
        (To bookmark a new place, click on it on the map)
      </div>
      <div>
        {bookmarksData.map((item) => (
          <Link
            className="bookmark-from-bookmarlist"
            to={`/bookmarks/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            key={item.id}
          >
            <ReactCountryFlag svg countryCode={item.countryCode} />

            <div>{item.cityName}</div>
            <div>{item.country}</div>
            <div
              className="trash"
              onClick={(e) => {
                handleDelete(e, item.id);
              }}
            >
              <BiTrash />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookmarkList;
