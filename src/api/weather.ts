import { API_Config } from "./config";
import type {
  coordinates,
  ForeCastData,
  geocodingResponse,
  WeatherData,
} from "./types";
const apiKey = API_Config.API_Key;

if (!apiKey) {
  throw new Error("API key is missing");
}

class WeatherAPI {
  private createURL(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      ...params,
      appid: API_Config.API_Key!,
    });

    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getCurrentWeather({ lat, lon }: coordinates): Promise<WeatherData> {
    const URL = this.createURL(`${API_Config.Base_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_Config.Default_params.units,
    });

    return this.fetchData<WeatherData>(URL);
  }

  async getForecast({ lat, lon }: coordinates): Promise<ForeCastData> {
    const URL = this.createURL(`${API_Config.Base_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_Config.Default_params.units,
    });

    return this.fetchData<ForeCastData>(URL);
  }

  async reverseGeocode({
    lat,
    lon,
  }: coordinates): Promise<geocodingResponse[]> {
    const URL = this.createURL(`${API_Config.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });

    return this.fetchData<geocodingResponse[]>(URL);
  }

  async searchGeocode(query: string): Promise<geocodingResponse[]> {
    const URL = this.createURL(`${API_Config.GEO}/direct`, {
      q: query,
      limit: "5",
    });

    return this.fetchData<geocodingResponse[]>(URL);
  }
}

export const weatherAPI = new WeatherAPI();
