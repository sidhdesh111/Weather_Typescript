import React from "react";
import { ForeCastData } from "../api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
interface WeatherForcastType {
  data: ForeCastData;
}

interface DailyForcast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForcast = ({ data }: WeatherForcastType) => {
  const DailyForcasts = data.list.reduce(
    (acc, forcast) => {
      const date = format(new Date(forcast.dt * 1000), "yyyy-MM-dd");

      if (!acc[date]) {
        acc[date] = {
          temp_min: forcast.main.temp_min,
          temp_max: forcast.main.temp_max,
          humidity: forcast.main.humidity,
          wind: forcast.wind.speed,
          weather: forcast.weather[0],
          date: forcast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          forcast.main.temp_min,
        );
        acc[date].temp_max = Math.min(
          acc[date].temp_max,
          forcast.main.temp_max,
        );
      }
      return acc;
    },
    {} as Record<string, DailyForcast>,
  );

  const nextDays = Object.values(DailyForcasts).slice(0, 6);

  const formatTemp = (temp: number): string => {
    return `${temp}° C`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>5 Days Forecast's</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((data, index) => (
            <div
              className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
              key={data.date}
            >
              <div>
                <p className="font-medium">
                  {format(new Date(data.date * 1000), "EEE, MMM d")}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {data.weather.description}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  {formatTemp(data.temp_min)}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  {formatTemp(data.temp_max)}
                </span>
              </div>

              <div className="flex justify-end gap-4">
                <span className="flex items-center gap-1">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{data.humidity}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{data.wind} m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForcast;
