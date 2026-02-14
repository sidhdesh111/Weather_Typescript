import { Use_local_storage } from "./Use_local_storage";

interface FavouriteSearchType {
  id: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  addedAt: number;
}

export function Use_Favorite() {
  const { storedValue, setStoredValue } =
    Use_local_storage<FavouriteSearchType[]>("favourite-search", []);

  const addFavourite = (
    city: Omit<FavouriteSearchType, "id" | "addedAt">
  ) => {
    const newFav: FavouriteSearchType = {
      ...city,
      id: `${city.lat}-${city.lon}`,
      addedAt: Date.now(),
    };

    const exist = storedValue.some((fav) => fav.id === newFav.id);
    if (exist) return;

    const newStoredValue = [newFav, ...storedValue].slice(0, 10);

    setStoredValue(newStoredValue);
  };

  const removeFav = (cityId: string) => {
    const newFavourite = storedValue.filter(
      (city) => city.id !== cityId
    );
    setStoredValue(newFavourite);
  };

  const isFav = (lat: number, lon: number): boolean => {
    return storedValue.some(
      (city) => city.lat === lat && city.lon === lon
    );
  };

  return {
    Fav: storedValue,
    addFavourite,
    removeFav,
    isFav,
  };
}
