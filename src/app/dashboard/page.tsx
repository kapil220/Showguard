// Risk board placeholder — green/yellow/red view the contractor checks
// before leaving the office. Wired to real data once scoreAppointmentRisk
// and outcome capture are implemented.
export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-semibold">Risk Board</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Appointments will appear here once GoHighLevel ingestion and risk scoring are
        wired up.
      </p>
    </main>
  );
}
