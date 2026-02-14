import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Button } from "./ui/button";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { UseLocationSearch } from "../Hooks/Use_WeatherData";
import { useNavigate } from "react-router-dom";
import { Use_SearchHistory } from "../Hooks/Use_SearchHistory";
import { format } from "date-fns";
import { Use_Favorite } from "../Hooks/Use_Favorite";

const SearchBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const { data: LocationData, isLoading } = UseLocationSearch(query);
  const { history, AddStorage, ClearStorage } = Use_SearchHistory();
  const { Fav, removeFav } = Use_Favorite();

  const HandleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    AddStorage.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    setQuery("");
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        className="relative w-fit lg:w-full justify-start text-sm text-muted-foreground sm:pr-12  lg:w-64"
        onClick={() => setOpen((prev) => !prev)}
        variant={"outline"}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities....
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search for a city...."
        />
        <CommandList>
          {query.length > 2 && !isLoading && Fav.length > 0 && (
            <CommandEmpty>No result found.</CommandEmpty>
          )}

          {/* Favourite City  */}

          {Fav.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex justify-between items-center px-2 my-2">
                  <p className="text-xs text-muted-foreground">
                    Favourite City
                  </p>
                </div>
                {Fav.map((city) => (
                  <CommandItem
                    key={`${city.lat}-${city.lon}`}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                    onSelect={HandleSelect}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{city.name},</span>
                    {city.state && (
                      <span className="text-muted-foreground">
                        {city.state},
                      </span>
                    )}
                    {city.country && (
                      <span className="text-muted-foreground">
                        {city.country}
                      </span>
                    )}
                    {city.addedAt && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {format(city.addedAt, "MMM d, h:mm a")}
                      </span>
                    )}
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() => removeFav(city.id)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {/* Search history  */}
          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex justify-between items-center px-2 my-2">
                  <p className="text-xs text-muted-foreground">
                    Recent Searches
                  </p>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => ClearStorage.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map((city) => (
                  <CommandItem
                    key={`${city.lat}-${city.lon}`}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                    onSelect={HandleSelect}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{city.name},</span>
                    {city.state && (
                      <span className="text-muted-foreground">
                        {city.state},
                      </span>
                    )}
                    {city.country && (
                      <span className="text-muted-foreground">
                        {city.country}
                      </span>
                    )}
                    {city.searchedAt && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {format(city.searchedAt, "MMM d, h:mm a")}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {/* Search Data    */}

          {LocationData && LocationData.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {LocationData.map((city) => {
                return (
                  <CommandItem
                    key={`${city.lat}-${city.lon}`}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                    onSelect={HandleSelect}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{city.name},</span>
                    {city.state && (
                      <span className="text-muted-foreground">
                        {city.state},
                      </span>
                    )}
                    {city.country && (
                      <span className="text-muted-foreground">
                        {city.country}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
