import React, { useEffect, useState } from "react";
import {
  BiBookmarkAlt,
  BiHome,
  BiSearch,
  BiPlusCircle,
  BiMinusCircle,
  BiLogOut,
} from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { HiCalendar } from "react-icons/hi";
import { MdNumbers } from "react-icons/md";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "./context/AuthenticationProvider";

function Header() {
  const [searchedLocation, setSearchedLocation] = useState("");
  // console.log(searchedLocation);
  const [openDate, setOpenDate] = useState(false);
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openCondition, setOpenCondition] = useState(false);
  const [condition, setCondition] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const handleSearch = () => {
    // const searchParamsDate = createSearchParams(selectionRange);
    const searchParams = createSearchParams({
      searchedLocation,
      date: JSON.stringify(selectionRange),
      condition: JSON.stringify(condition),
    });
    navigate({ pathname: "/hotels", search: searchParams.toString() });
    // navigate(`/hotels?${searchParams.toString()}`);
  };

  return (
    <div className="header">
      <Home />
      <div className="sub-header">
        <SearchBox
          searchedLocation={searchedLocation}
          setSearchedLocation={setSearchedLocation}
        />
        <DateSelector
          selectionRange={selectionRange}
          setSelectionRange={setSelectionRange}
          // handleSelect={handleSelect}
          openDate={openDate}
          setOpenDate={setOpenDate}
        />
        <Condition
          condition={condition}
          setCondition={setCondition}
          openCondition={openCondition}
          setOpenCondition={setOpenCondition}
        />
        <SearchIcon handleSearch={handleSearch} />
      </div>
      <Bookmark />
      <Login />
    </div>
  );
}

export default Header;

function Home() {
  return (
    <Link to="/" className="home-button">
      {" "}
      {<BiHome />}Home
    </Link>
  );
}
function SearchBox({ searchedLocation, setSearchedLocation }) {
  return (
    <div>
      <FaLocationDot className="location-marker" />
      <input
        value={searchedLocation}
        onChange={(e) => setSearchedLocation(e.target.value)}
        type="text"
        name="searcedLocation"
        id="searcedLocation"
        placeholder=" Where to go?"
        className="search-input"
      />
      {/* <span className="seperator"></span> */}
    </div>
  );
}

function DateSelector({
  selectionRange,
  setSelectionRange,
  openDate,
  setOpenDate,
}) {
  return (
    <div>
      <span>
        <HiCalendar />
      </span>

      <span className="date-pick" onClick={() => setOpenDate(!openDate)}>
        {`${format(selectionRange[0].startDate, "MM/dd/yyyy")}  to ${format(
          selectionRange[0].endDate,
          "MM/dd/yyyy"
        )}`}
      </span>
      {openDate && (
        <DateRange
          onChange={(item) => setSelectionRange([item.selection])}
          ranges={selectionRange}
          moveRangeOnFirstSelection={true}
          minDate={new Date()}
          className="date-range"
        />
      )}
    </div>
  );
}

function Condition({
  condition,
  setCondition,
  openCondition,
  setOpenCondition,
}) {
  return (
    <div>
      <MdNumbers style={{ marginBottom: "-3px" }} />
      <span
        onClick={() => setOpenCondition(!openCondition)}
        className="condition-pick"
      >
        {condition.adult} adult | {condition.children} children |{" "}
        {condition.room} room
      </span>
      {openCondition && (
        <div className="condition-window">
          <OptionItems
            type="adult"
            condition={condition}
            setCondition={setCondition}
            minimum={1}
          />
          <OptionItems
            type="children"
            condition={condition}
            setCondition={setCondition}
            minimum={0}
          />
          <OptionItems
            type="room"
            condition={condition}
            setCondition={setCondition}
            minimum={1}
          />
        </div>
      )}
    </div>
  );
}
function OptionItems({ type, condition, setCondition, minimum }) {
  return (
    <div className="option-item">
      <div>{type}</div>
      <div>
        <BiMinusCircle
          className="sign"
          onClick={() => {
            condition[type] > minimum &&
              setCondition((item) => {
                return { ...item, [type]: condition[type] - 1 };
              });
          }}
          // disabled={condition[type] < minimum}
        />
        &nbsp; {condition[type]} &nbsp;
        <BiPlusCircle
          className="sign"
          onClick={() => {
            setCondition((item) => {
              return { ...item, [type]: condition[type] + 1 };
            });
          }}
        />
      </div>
    </div>
  );
}

function SearchIcon({ handleSearch }) {
  return (
    <button className="search_icon" onClick={handleSearch}>
      {<BiSearch className="search_icon_inner" />}
    </button>
  );
}

function Bookmark() {
  return (
    <Link to="/bookmarks" style={{ textDecoration: "none", color: "inherit" }}>
      <button>Bookmark {<BiBookmarkAlt />}</button>
    </Link>
  );
}

function Login() {
  const { approve, loginInfo, setApprove } = useAuthentication();
  const navigate = useNavigate();
  if (approve)
    return (
      <div>
        Hi {loginInfo.name} !<br />
        <div
          className="logout"
          onClick={() => {
            navigate("/");
            setApprove(false);
          }}
        >
          Logout <BiLogOut />
        </div>
      </div>
    );
  return (
    <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
      <button>Login</button>
    </Link>
  );
}
