import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
function BookmarkProvider({ children }) {
  // const baseUrl = "http://localhost:8000/bookmarks";
  const baseUrl = "https://json-server-repo-for-hotel-app.onrender.com/bookmarks";
  // const { isLoading, data: bookmarksData } = useFetch(baseUrl);
  const [bookmarksData, setBookmarksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState([]);
  const [currentIsLoading, setCurrentIsLoading] = useState(false);
  // const useSearchParams();

  useEffect(() => {
    async function getBookmark() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(baseUrl);
        console.log(data);
        setBookmarksData(data);
      } catch (error) {
        toast.error(`1${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    getBookmark();
  }, []);

  const getID = function (id) {
    async function gett() {
      try {
        setCurrentIsLoading(true);
        const { data } = await axios.get(`${baseUrl}/${id}`);
        // console.log(data);

        setCurrentBookmark(data);
      } catch (error) {
        toast.error(`2${error.message}`);
      } finally {
        setCurrentIsLoading(false);
      }
    }
    gett();
  };
  const createBookmark = async function (newBookmark) {
    try {
      const { data } = await axios.post(baseUrl, newBookmark);

      // setCurrentBookmark(data);
      console.log(data);

      setBookmarksData((prev) => [...prev, data]);
    } catch (error) {
      toast.error(`3${error.message}`);
    }
  };
  const deleteBookmark = function (id) {
    async function delBook() {
      try {
        await axios.delete(`${baseUrl}/${id}`);
        // console.log(data);
        setBookmarksData((prev) => {
          return prev.filter((item) => item.id !== id);
        });

        console.log(bookmarksData);
      } catch (error) {
        toast.error(`4${error.message}`);
      }
    }
    delBook();
  };

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarksData,
        createBookmark,
        currentBookmark,
        getID,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;

export function useBookmarks() {
  return useContext(BookmarkContext);
}
