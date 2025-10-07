"use client";
import LineChart from "@/components/charts/line-chart";
import YearRangePicker from "@/components/elements/year-range-picker";

export default function Home() {
  const chartData = [
    { name: "2013", sales: 4000 },
    { name: "2014", sales: 3000 },
    { name: "2015", sales: 2000 },
    { name: "2016", sales: 2780 },
    { name: "2017", sales: 1890 },
    { name: "2018", sales: 2390 },
    { name: "2019", sales: 3490 },
    { name: "2020", sales: 4590 },
    { name: "2021", sales: 5690 },
    { name: "2022", sales: 6790 },
    { name: "2023", sales: 7890 },
    { name: "2024", sales: 8990 },
  ];

  const lineConfigs = [{ dataKey: "sales", stroke: "#8884d8", name: "Sales" }];

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <YearRangePicker
        onRangeChange={(startYear, endYear) => console.log(startYear, endYear)}
      />
      <LineChart
        data={chartData}
        lines={lineConfigs}
        xAxisKey="name"
        height={400}
      />
    </div>
  );
}
