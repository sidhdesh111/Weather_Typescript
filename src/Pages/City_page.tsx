import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { UseForeCastQuery, UseWeatherQuery } from "../Hooks/Use_WeatherData";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircleIcon, MapPin, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import LoadingSkeleton from "../components/LoadingSkeleton";
import WeatherDetails from "../components/WeatherDetails";
import WeatherForcast from "../components/WeatherForcast";
import Hourly_Temperature from "../components/ui/Hourly_Temperature";
import CurrentWeather from "../components/CurrentWeather";
import Favourite_button from "../components/Favourite_button";

const City_page = () => {
  const [searchParams] = useSearchParams();

  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = {
    lat,
    lon,
  };

  const WeatherQuery = UseWeatherQuery(coordinates);

  const ForcastQuery = UseForeCastQuery(coordinates);

  if (WeatherQuery.error || ForcastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Enable Location</AlertTitle>
        <AlertDescription className="text-inherit">
          Failed to load weather Data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (
    WeatherQuery?.isFetching ||
    ForcastQuery?.isFetching ||
    !params.cityname
  ) {
    return <LoadingSkeleton />;
  }
  return (
    <>
      <div className=" space-y-4">
        <div className="flex justify-between items-center">
          <h1>{params?.cityname}, {WeatherQuery.data?.sys.country}</h1>
          <div>
            <Favourite_button
              data={{ ...WeatherQuery?.data!, name: params.cityname }}
            />
          </div>
        </div>
        <div className="grid gap-6">
          <div className="flex flex-col justify-between gap-4">
            <CurrentWeather data={WeatherQuery?.data!} />
            {/* current Weather */}
            {/* hourly temp  */}
            <Hourly_Temperature data={ForcastQuery?.data!} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* details  */}
            <WeatherDetails data={WeatherQuery.data!} />
            {/* forecast  */}
            <WeatherForcast data={ForcastQuery.data!} />
          </div>
        </div>
      </div>
    </>
  );
};

export default City_page;
