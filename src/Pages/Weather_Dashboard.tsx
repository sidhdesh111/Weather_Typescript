import React, { lazy, Suspense } from "react";
import { Button } from "../components/ui/button";
import { AlertCircleIcon, MapPin, RefreshCw } from "lucide-react";
import Use_GeoLocation from "../Hooks/Use_GeoLocation";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  UseForeCastQuery,
  UseReservedGeoQuery,
  UseWeatherQuery,
} from "../Hooks/Use_WeatherData";

const Favourite_City = lazy(() => import("../components/Favourite_City"));
const WeatherDetails = lazy(() => import("../components/WeatherDetails"));

const WeatherForcast = lazy(() => import("../components/WeatherForcast"));
const LoadingSkeleton = lazy(() => import("../components/LoadingSkeleton"));
const Hourly_Temperature = lazy(
  () => import("../components/ui/Hourly_Temperature"),
);
const CurrentWeather = lazy(() => import("../components/CurrentWeather"));

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
    <div className="space-y-4">
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
          <Suspense fallback={<LoadingSkeleton />}>
            <Favourite_City />
          </Suspense>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <Suspense fallback={<LoadingSkeleton />}>
            <CurrentWeather
              data={WeatherQuery?.data!}
              locationName={LocationName[0]}
            />
          </Suspense>
          {/* current Weather */}
          {/* hourly temp  */}
          <Suspense fallback={<LoadingSkeleton />}>
            <Hourly_Temperature data={ForcastQuery?.data!} />
          </Suspense>
        </div>
        <div className="grid justify-between grid-cols-1 lg:grid-cols-2 gap-4">
          {/* details  */}
          <Suspense fallback={<LoadingSkeleton />}>
            <WeatherDetails data={WeatherQuery.data!} />
          </Suspense>
          {/* forecast  */}
          <Suspense fallback={<LoadingSkeleton />}>
            <WeatherForcast data={ForcastQuery.data!} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default Weather_Dashboard;
