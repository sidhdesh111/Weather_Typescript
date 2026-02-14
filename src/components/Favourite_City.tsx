import React from "react";
import { Use_Favorite } from "../Hooks/Use_Favorite";
import { Card, CardContent, CardTitle } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { UseWeatherQuery } from "../Hooks/Use_WeatherData";
import { Button } from "./ui/button";
import { Loader, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface FavCityTableProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const Favourite_City = () => {
  const { Fav, removeFav } = Use_Favorite();

  console.log(Fav);

  if (!Fav?.length) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-medium tracking-tight">Favourites City</h1>

      <ScrollArea className="w-full py-4">
        <div className="flex gap-4">
          {Fav.map((city) => {
            return (
              <FavCityTablet key={city.id} {...city} onRemove={removeFav} />
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

function FavCityTablet({ id, name, lat, lon, onRemove }: FavCityTableProps) {
  const navigate = useNavigate();

  const { data: WeaherData, isLoading } = UseWeatherQuery({ lat, lon });

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role="button"
      tabIndex={0}
      className="relative flex min-w-[15.6rem] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Remove ${name} from Favourites.`);
        }}
        className=" absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
      >
        <X className="w-4 h-4" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : WeaherData ? (
        <>
          <div className="flex flex-col items-center gap-1">
            <img
              src={`https://openweathermap.org/img/wn/${WeaherData.weather[0].icon}.png`}
              className="h-12 w-12"
            />
            <div className="flex items-end gap-2">
              <p className="font-medium">{name},</p>
              <p className="text-sm text-muted-foreground">
                {WeaherData.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {Math.round(WeaherData.main.temp)}° C
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {WeaherData.weather[0].description}
            </p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Favourite_City;
