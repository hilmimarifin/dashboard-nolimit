"use client";
import LineChart from "@/components/charts/line-chart";
import YearRangePicker from "@/components/elements/year-range-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useFetch } from "@/hooks/use-fetch";
import { DataPerYear } from "@/types/api";
import { useState } from "react";

const mapData = (data: DataPerYear[]) => {
  return data.map((item) => ({
    year: item.date,
    total: item.value,
  }));
};
export default function Home() {
  const [startYear, setStartYear] = useState(
    (new Date().getFullYear() - 10).toString()
  );
  const [endYear, setEndYear] = useState(new Date().getFullYear().toString());
  const { data, isLoading } = useFetch({ startYear, endYear });
  const chartData = mapData(data?.[1] || []);

  const lineConfigs = [
    { dataKey: "total", stroke: "#8884d8", name: "Populasi" },
  ];
  return (
    <div className="container pt-6 p-4 bg-gradient-to-br from-background to-background/90 space-y-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard Populasi US per Tahun</h1>
      <Card className="shadow-lg">
        <CardContent className="space-y-2">
          <Label>Periode Tahun</Label>
          <YearRangePicker
            startYear={Number(startYear)}
            endYear={Number(endYear)}
            onRangeChange={(startYear, endYear) => {
              setStartYear(startYear?.toString() || "");
              setEndYear(endYear?.toString() || "");
            }}
          />
        </CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardContent>
          <LineChart
            data={chartData.sort((a, b) => a.year.localeCompare(b.year))}
            lines={lineConfigs}
            xAxisKey="year"
            height={400}
            loading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
