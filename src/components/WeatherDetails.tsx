import React from "react";
import { WeatherData } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Compass, Gauge, icons, Sunrise, Sunset, WindIcon } from "lucide-react";
import { format } from "date-fns";
import { timeStamp } from "node:console";
import { title } from "node:process";

interface WeatherDetailsType {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsType) => {
  console.log(data);

  const { wind, sys, main } = data;

  const formatTime = (time: number): string => {
    return format(new Date(time * 1000), "h:mm a");
  };

  const GetWindDirection = (deg: number): string => {
    const Dir = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index = Math.round((deg % 360 < 0 ? deg + 360 : deg) / 45) % 8;

    // console.log(index);
    return Dir[index];
  };

  const Details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-gray-500",
    },
    {
      title: "Wind Direction",
      value: `${GetWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "rext-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hpa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
        <CardContent className="pt-4">
          <div className="grid sm:grid-cols-2 gap-6">
            {Details.map((items, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg border p-4">
                <items.icon className={`h-5 w-5 ${items.color}`} />
                <div>
                    <h2 className="text-bold text-sm leading-none">{items.title}</h2>
                    <p className="text-sm text-muted-foreground">{items.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default WeatherDetails;
