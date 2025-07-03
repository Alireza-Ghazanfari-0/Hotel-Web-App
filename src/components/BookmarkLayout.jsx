import React from "react";
import { Outlet } from "react-router-dom";
import Map from "./Map";
import { useBookmarks } from "./context/BookmarkProvider";

function BookmarkLayout() {
  const { bookmarksData } = useBookmarks();
  return (
    <div className="app-layout">
      <div className="childd child-app-1">
        <Outlet />
      </div>

      <Map hotelsOrBookmarksData={bookmarksData} />
    </div>
  );
}

export default BookmarkLayout;
