import type { ForeCastData } from "@/src/api/types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

interface HourlyTempType {
  data: ForeCastData;
}

const Hourly_Temperature = ({ data }: HourlyTempType) => {
  const ChartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  console.log(ChartData);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-50 w-full [&>svg]:!focus:outline-none">
          <ResponsiveContainer
            width={"100%"}
            height={"100%"}
            className="!focus:outline-none"
          >
            <LineChart
              tabIndex={-1}
              data={ChartData}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2  shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-muted-foreground uppercase text-[0.7rem]">Temperature</span>
                            <span className="font-bold">{payload[0].value}°</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-muted-foreground uppercase text-[0.7rem]">Feels Likes</span>
                            <span className="font-bold">{payload[1].value}°</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }}
              />

              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Hourly_Temperature;
