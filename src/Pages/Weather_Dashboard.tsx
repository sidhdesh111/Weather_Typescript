import React from "react";
import { Button } from "../components/ui/button";
import { AlertCircleIcon, MapPin, RefreshCw } from "lucide-react";
import Use_GeoLocation from "../Hooks/Use_GeoLocation";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  UseForeCastQuery,
  UseReservedGeoQuery,
  UseWeatherQuery,
} from "../Hooks/Use_WeatherData";
import CurrentWeather from "../components/CurrentWeather";
import Hourly_Temperature from "../components/ui/Hourly_Temperature";
import WeatherDetails from "../components/WeatherDetails";
import WeatherForcast from "../components/WeatherForcast";
import Favourite_City from "../components/Favourite_City";

const Weather_Dashboard = () => {
  const {
    coodinates,
    error: LocationError,
    isLoading: LocationLoading,
    GetLocation,
  } = Use_GeoLocation();

  const WeatherQuery = UseWeatherQuery(coodinates);
  const ForcastQuery = UseForeCastQuery(coodinates);
  const GeoLocationQuery = UseReservedGeoQuery(coodinates);

  const HandleRefesh = () => {
    GetLocation();

    if (!coodinates) {
      WeatherQuery.refetch();
      ForcastQuery.refetch();
      GeoLocationQuery.refetch();
    }
  };

  if (
    LocationLoading ||
    WeatherQuery?.isFetching ||
    ForcastQuery?.isFetching ||
    GeoLocationQuery.isFetching
  ) {
    return <LoadingSkeleton />;
  }

  const LocationName: any = GeoLocationQuery?.data ?? [];

  if (LocationError) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Enable Location</AlertTitle>
        <AlertDescription className="text-inherit">
          {LocationError}

          <Button onClick={GetLocation} className="w-fit" variant={"outline"}>
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coodinates) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />

        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="text-inherit">
          <p>Please enable Location access to see your local weather.</p>

          <Button onClick={GetLocation} className="w-fit" variant={"outline"}>
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className=" space-y-4">
      <div className="flex justify-between items-center">
        <h1>My Location</h1>
        <Button
          onClick={HandleRefesh}
          variant={"outline"}
          disabled={WeatherQuery.isFetching || ForcastQuery.isFetching}
        >
          <RefreshCw
            className={`w-12 h-12 ${WeatherQuery.isFetching ? "animate-spin" : ""}`}
          />
        </Button>
      </div>
      <div>
        <div className="">
          <Favourite_City />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <CurrentWeather
            data={WeatherQuery?.data!}
            locationName={LocationName[0]}
          />
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
  );
};
export default Weather_Dashboard;
