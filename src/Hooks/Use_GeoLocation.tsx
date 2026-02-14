import React, { useEffect, useState } from "react";
import { coordinates } from "../api/types";

interface geoLocationStateType {
  coodinates: coordinates | null;
  error: string | null;
  isLoading: boolean;
}

const Use_GeoLocation = () => {
  const [locationData, setlocationData] = useState<geoLocationStateType>({
    coodinates: null,
    error: null,
    isLoading: false,
  });

  const GetLocation = () => {
    setlocationData((prev) => ({ ...prev, isLoading: true }));

    if (!navigator.geolocation) {
      setlocationData({
        coodinates: null,
        error: "Please Give Permission by the Browser",
        isLoading: false,
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
     //   console.log(pos);

        setlocationData({
          coodinates: {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission is denied, Please enable Location Access.";
            break;

          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location Information is Unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request Timeout.";
            break;
          default:
            errorMessage = "An Unknown error Occurred.";
            break;
        }

        setlocationData({
          coodinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    GetLocation();
  }, []);

  return { ...locationData, GetLocation };
};

export default Use_GeoLocation;
