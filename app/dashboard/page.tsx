
import DashboardClient from "./dashboardClient";
import {
  stats,
  leadStatuses,
  leadSources,
  todos,
  services,
} from "./data";

export default function DashboardPage() {
  return (
    <DashboardClient
      stats={stats}
      leadStatuses={leadStatuses}
      leadSources={leadSources}
      initialTodos={todos}
      services={services}
    />
  );
}
