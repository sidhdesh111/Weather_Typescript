import React from "react";
import { WeatherData } from "../api/types";
import { Use_Favorite } from "../Hooks/Use_Favorite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavBTNtype {
  data: WeatherData;
}

const Favourite_button = ({ data }: FavBTNtype) => {
  const { addFavourite, removeFav, isFav } = Use_Favorite();

  const lat = data.coord.lat;
  const lon = data.coord.lon;

  const isCurrentlyFav = isFav(lat, lon);

  const HandleFavToggle = () => {
    const cityId = `${lat}-${lon}`;

    if (isCurrentlyFav) {
      removeFav(cityId);
      toast.error(`Removed ${data.name} from Favourites`);
    } else {
      addFavourite({
        name: data.name,
        lat,
        lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} as Favourite`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFav ? "default" : "outline"}
      onClick={HandleFavToggle}
      size="icon"
      className={isCurrentlyFav ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star
        className={`h-4 w-4 ${
          isCurrentlyFav ? "fill-current" : ""
        }`}
      />
    </Button>
  );
};

export default Favourite_button;
