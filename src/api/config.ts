declare const __OPENWEATHER_API__: string;
export const API_Config = {
  Base_URL: "https://api.openweathermap.org/data/2.5",
  GEO: "https://api.openweathermap.org/geo/1.0",
  API_Key: __OPENWEATHER_API__,
  Default_params: {
    units: "metric",
    appid: __OPENWEATHER_API__,
  },
};
