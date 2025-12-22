import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";
function HotelsProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrentHotel, setIsLoadinCurrentHotel] = useState(false);
  const [serachParams] = useSearchParams();
  const destination = serachParams.get("destination" || "");
  const room = JSON.parse(serachParams.get("options"))?.room;
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setIsLoadinCurrentHotel(true);
    setCurrentHotel(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadinCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadinCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        getHotel,
        currentHotel,
        setCurrentHotel,
        isLoadingCurrentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
