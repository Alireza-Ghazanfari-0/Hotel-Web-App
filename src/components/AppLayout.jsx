import React from "react";
import { Outlet } from "react-router-dom";
import Map from "./Map";
import { useHotels } from "./context/HotelsProvider";

function AppLayout() {
  const { hotelsListData } = useHotels();

  return (
    <div className="app-layout">
      <div className="childd child-app-1">
        <Outlet />
      </div>

      <Map hotelsOrBookmarksData={hotelsListData} />
    </div>
  );
}

export default AppLayout;
