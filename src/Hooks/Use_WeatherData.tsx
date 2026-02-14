import { useQuery } from "@tanstack/react-query";
import { coordinates } from "../api/types";
import { weatherAPI } from "../api/weather";
export const WEATHER_KEYS = {
  weather: (coords: coordinates) => ["weather", coords] as const,
  Forcast: (coords: coordinates) => ["forcast", coords] as const,
  ReservedGeo: (coords: coordinates) => ["reservedGeo", coords] as const,
  Search: (query: string) => ["location_search", query] as const,
};
export function UseWeatherQuery(coordinates: coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function UseForeCastQuery(coordinates: coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.Forcast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
}

export function UseReservedGeoQuery(coordinates: coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.ReservedGeo(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function UseLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.Search(query),
    queryFn:()=>weatherAPI.searchGeocode(query),
    enabled:query.length >= 3
  });
}
