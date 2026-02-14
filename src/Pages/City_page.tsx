import React, { lazy, Suspense } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { UseForeCastQuery, UseWeatherQuery } from "../Hooks/Use_WeatherData";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircleIcon, MapPin, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";

const LoadingSkeleton = lazy(() => import("../components/LoadingSkeleton"));
const WeatherDetails = lazy(() => import("../components/WeatherDetails"));
const WeatherForcast = lazy(() => import("../components/WeatherForcast"));
const Hourly_Temperature = lazy(
  () => import("../components/ui/Hourly_Temperature"),
);
const CurrentWeather = lazy(() => import("../components/CurrentWeather"));

const Favourite_button = lazy(() => import("../components/Favourite_button"));

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
          <h1>
            {params?.cityname}, {WeatherQuery.data?.sys.country}
          </h1>
          <div>
            <Suspense fallback={<LoadingSkeleton />}>
              <Favourite_button
                data={{ ...WeatherQuery?.data!, name: params.cityname }}
              />
            </Suspense>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="flex flex-col justify-between gap-4">
            <Suspense fallback={<LoadingSkeleton />}>
              <CurrentWeather data={WeatherQuery?.data!} />
            </Suspense>
            {/* current Weather */}
            {/* hourly temp  */}
            <Suspense fallback={<LoadingSkeleton />}>
              <Hourly_Temperature data={ForcastQuery?.data!} />
            </Suspense>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
    </>
  );
};

export default City_page;
