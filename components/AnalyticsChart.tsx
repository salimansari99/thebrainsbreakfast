"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart({ data }: { data: any[] }) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#6366f1" />
          <Line type="monotone" dataKey="likes" stroke="#22c55e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
