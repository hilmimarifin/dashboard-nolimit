"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart as PieChartRecharts,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PieChartData {
  name: string;
  value: number;
  fill?: string;
  [key: string]: string | number | undefined;
}

interface PieChartProps {
  data: PieChartData[];
  innerRadius?: number;
  className?: string;
  loading?: boolean;
}

export function PieChart({
  data,
  innerRadius = 0,
  className,
  loading,
}: PieChartProps) {
  return (
    <div className={cn("mx-auto w-full h-full aspect-square ", className)}>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChartRecharts>
            <Legend />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={"60%"}
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.fill ||
                    `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
                  }
                />
              ))}
            </Pie>
          </PieChartRecharts>
        </ResponsiveContainer>
      )}
    </div>
  );
}
