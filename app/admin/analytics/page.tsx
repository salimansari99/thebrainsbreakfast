import AnalyticsChart from "@/components/admin/AnalyticsChart";

const mockData = [
  { date: "Jan 10", views: 120, likes: 30 },
  { date: "Jan 11", views: 210, likes: 70 },
  { date: "Jan 12", views: 300, likes: 110 },
];

export default function AnalyticsPage() {
  return (
    <section className="space-y-10">
      <h1 className="text-3xl font-semibold">Analytics</h1>
      <AnalyticsChart data={mockData} />
    </section>
  );
}
