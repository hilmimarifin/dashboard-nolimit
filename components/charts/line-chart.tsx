import {
  LineChart as LineRechart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Type definitions
export interface LineConfig {
  dataKey: string;
  stroke: string;
  name?: string;
  strokeWidth?: number;
  dot?: boolean;
  activeDot?: { r: number };
  type?: "monotone" | "linear" | "step" | "stepBefore" | "stepAfter";
}

export interface LineChartProps {
  data: Record<string, unknown>[];
  lines: LineConfig[];
  xAxisKey: string;
  height?: string | number;
  width?: string | number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  gridStrokeDasharray?: string;
  margin?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
  xAxisLabel?: string;
  yAxisLabel?: string;
  className?: string;
}

export default function LineChart({
  data,
  lines,
  xAxisKey,
  height = 400,
  width = "100%",
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  gridStrokeDasharray = "3 3",
  margin = {
    top: 5,
    right: 30,
    left: 20,
    bottom: 5,
  },
  xAxisLabel,
  yAxisLabel,
  className = "",
}: LineChartProps) {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width={width} height="100%">
        <LineRechart data={data} margin={margin}>
          {showGrid && <CartesianGrid strokeDasharray={gridStrokeDasharray} />}

          <XAxis
            dataKey={xAxisKey}
            label={
              xAxisLabel
                ? { value: xAxisLabel, position: "insideBottom", offset: -5 }
                : undefined
            }
          />

          <YAxis
            label={
              yAxisLabel
                ? { value: yAxisLabel, angle: -90, position: "insideLeft" }
                : undefined
            }
          />

          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}

          {lines.map((line, index) => (
            <Line
              key={`line-${line.dataKey}-${index}`}
              type={line.type || "monotone"}
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name}
              strokeWidth={line.strokeWidth || 2}
              dot={line.dot !== undefined ? line.dot : true}
              activeDot={line.activeDot || { r: 6 }}
            />
          ))}
        </LineRechart>
      </ResponsiveContainer>
    </div>
  );
}
