import { MdLocationOn } from "react-icons/md";
import {
  HiBookmark,
  HiCalendar,
  HiHome,
  HiLogin,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../../features/auth/context/AuthProvider";

function Header() {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "travelingDateRange",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync URL With Destination When Change URL
  useEffect(() => {
    const destinationFromUrl = searchParams.get("destination") || "";
    setDestination(destinationFromUrl);
  }, [location.search, searchParams]);

  const handleOptions = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "inc" ? prev[name] + 1 : prev[name] - 1,
    }));
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });

    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  const isBookmarkPage = location.pathname === "/bookmark";
  const isHomePage = location.pathname === "/";

  return (
    <header className="header-compact">
      <div className="header-top-compact">
        <div className="header-nav-compact">
          <button
            className={`nav-btn-compact ${isHomePage ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            <HiHome className="nav-icon-compact" />
            <span className="nav-text-compact">Home</span>
          </button>
          <button
            className={`nav-btn-compact ${isBookmarkPage ? "active" : ""}`}
            onClick={() => navigate("/bookmark")}
          >
            <HiBookmark className="nav-icon-compact" />
            <span className="nav-text-compact">Bookmarks</span>
          </button>
          <div className="header-logo-compact" onClick={() => navigate("/")}>
            BookingHotel&nbsp;
          </div>
        </div>
        <div className="header-user-compact">
          <UserCompact />
        </div>
      </div>

      <div className="search-form-compact">
        <div className="search-input-group-compact">
          <MdLocationOn className="search-icon-compact" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            name="destination"
            id="destination"
            placeholder="Where are you going?"
            className="search-input-compact"
          />
        </div>
        <div className="search-input-group-compact date-group-compact">
          <div
            className="date-dropdown-compact"
            onClick={() => setOpenDate(!openDate)}
          >
            <HiCalendar className="search-icon-compact" />
            <span className="date-value-compact">
              {date[0].startDate.toString() !== date[0].endDate.toString()
                ? `${format(date[0].startDate, "MM/dd")} - ${format(
                    date[0].endDate,
                    "MM/dd"
                  )}`
                : format(date[0].startDate, "MM/dd")}
            </span>
          </div>
          {openDate && (
            <div className="date-picker-container-compact">
              <DateRange
                onChange={(item) => setDate([item.travelingDateRange])}
                ranges={date}
                className="date-picker-compact"
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
                rangeColors={["#667eea"]}
              />
            </div>
          )}
        </div>
        <div className="search-input-group-compact">
          <div
            className="guest-dropdown-compact"
            onClick={() => setOpenOptions(!openOptions)}
          >
            <span className="guest-value-compact">
              {options.adult} Adult • {options.children} Child • {options.room}{" "}
              Room
            </span>
          </div>
          {openOptions && (
            <GuestOptionListCompact
              options={options}
              setOpenOptions={setOpenOptions}
              handleOptions={handleOptions}
            />
          )}
        </div>
        <button className="search-btn-compact" onClick={handleSearch}>
          <HiSearch className="search-btn-icon-compact" />
        </button>
      </div>
    </header>
  );
}

export default Header;

function GuestOptionListCompact({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "guest-dropdown-compact", () =>
    setOpenOptions(false)
  );

  return (
    <div className="guest-options-compact" ref={optionsRef}>
      <OptionItemCompact
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLimit={1}
        label="Adults"
      />
      <OptionItemCompact
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLimit={0}
        label="Children"
      />
      <OptionItemCompact
        handleOptions={handleOptions}
        type="room"
        options={options}
        minLimit={1}
        label="Rooms"
      />
    </div>
  );
}

function OptionItemCompact({ options, type, minLimit, handleOptions, label }) {
  return (
    <div className="option-item-compact">
      <span className="option-label-compact">{label}</span>
      <div className="option-counter-compact">
        <button
          className="counter-btn-compact minus"
          onClick={() => handleOptions(type, "dec")}
          disabled={options[type] <= minLimit}
        >
          <HiMinus />
        </button>
        <span className="counter-value-compact">{options[type]}</span>
        <button
          className="counter-btn-compact plus"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}

function UserCompact() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="user-container-compact">
      {isAuthenticated ? (
        <div className="user-authenticated-compact">
          <span className="user-authenticated-welcome">
            Welcome, Dear {user.name}{" "}
          </span>
          <button
            className="logout-btn-compact"
            onClick={logout}
            title="Logout"
          >
            <HiLogout className="logout-icon-compact" />
          </button>
        </div>
      ) : (
        <button
          className={`login-btn-compact ${isLoginPage ? "active" : ""}`}
          onClick={() => navigate("/login")}
          title="Login / Sign up"
        >
          <HiLogin className="login-icon-compact" />
        </button>
      )}
    </div>
  );
}
