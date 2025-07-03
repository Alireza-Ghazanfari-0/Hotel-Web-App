import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import HomeBody from "./components/HomeBody";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import SearchedHotelList from "./components/searchedHotelList";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout";
import BookmarkList from "./components/BookmarkList";
import SingleBookmark from "./components/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark";
import Login from "./components/Login";
import BookmarkProvider from "./components/context/BookmarkProvider";
import AuthenticationProvider from "./components/context/AuthenticationProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthenticationProvider>
      <BookmarkProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<HomeBody />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<SearchedHotelList />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BookmarkList />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="addBookmark" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </HotelsProvider>
      </BookmarkProvider>
    </AuthenticationProvider>
  );
}

export default App;
