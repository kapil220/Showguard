import React, { useState } from "react";
import {
  PlusIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { NewAppointmentModal, NewAppointmentData } from "../components/NewAppointmentModal";
import {
  BTN_PRIMARY,
  BTN_SECONDARY,
  SEARCH_INPUT,
  TAB_CONTAINER,
  TAB_ITEM_ACTIVE,
  TAB_ITEM_INACTIVE,
} from "../constants/uiStyles";
import appointmentCalenderImg from "../assets/appointmentCalender.png";

interface AppointmentItem extends NewAppointmentData {
  id: string;
  status: "Upcoming" | "Past" | "Confirmed" | "New";
  createdAt: string;
}

export const Appointments: React.FC = () => {
  const [filter, setFilter] = useState<"Upcoming" | "Past" | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleAddAppointment = (data: NewAppointmentData) => {
    const newAppt: AppointmentItem = {
      ...data,
      id: Date.now().toString(),
      status: "Upcoming",
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newAppt, ...prev]);
  };

  const handleDelete = (id: string) => {
    setAppointments((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter appointments based on search query and active tab
  const filteredAppointments = appointments.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.clientName.toLowerCase().includes(query) ||
      item.clientPhone.includes(query) ||
      item.clientEmail.toLowerCase().includes(query) ||
      item.repName.toLowerCase().includes(query);

    if (!matchesSearch) return false;
    if (filter === "All") return true;
    if (filter === "Upcoming") return ["Upcoming", "Confirmed", "New"].includes(item.status);
    if (filter === "Past") return item.status === "Past";
    return true;
  });

  return (
    <div className="flex-1 bg-canvas text-body p-6 flex flex-col gap-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink font-display">Appointments</h1>
          <p className="text-xs text-body-mid mt-0.5">
            {appointments.length} total · Manage all your appointments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsModalOpen(true)} className={BTN_PRIMARY}>
            <PlusIcon className="w-4 h-4" />
            <span>New Appointment</span>
          </button>

          <button onClick={handleRefresh} className={BTN_SECONDARY}>
            <ArrowPathIcon className={`w-4 h-4 text-body-mid ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Tab Pills */}
        <div className={TAB_CONTAINER}>
          {(["Upcoming", "Past", "All"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={filter === tab ? TAB_ITEM_ACTIVE : TAB_ITEM_INACTIVE}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlassIcon className="w-3.5 h-3.5 text-body-mid absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={SEARCH_INPUT}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-canvas border border-ink/10 rounded-xl overflow-hidden shadow-xs flex flex-col min-h-[460px]">
        {filteredAppointments.length === 0 ? (
          /* Empty State with appointmentCalender Image & Compact Text Size */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-canvas-soft/10">
            <img
              src={appointmentCalenderImg}
              alt="Appointment Calendar Illustration"
              className="w-52 h-52 md:w-56 md:h-56 object-contain mb-3 filter drop-shadow-xs"
            />
            <h3 className="text-base font-bold text-ink font-display">No appointments found</h3>
            <p className="text-xs text-body-mid mt-1 mb-5 max-w-xs leading-relaxed">
              Create an appointment or connect GHL to get started.
            </p>
            <button onClick={() => setIsModalOpen(true)} className={BTN_PRIMARY}>
              <PlusIcon className="w-4 h-4" />
              <span>Create Appointment</span>
            </button>
          </div>
        ) : (
          /* Appointments List Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-ink/10 bg-canvas-soft/60 text-[10px] uppercase font-bold text-body-mid tracking-wider font-display">
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Timezone</th>
                  <th className="py-3 px-4">Rep</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5 text-xs text-ink">
                {filteredAppointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-canvas-soft/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase shrink-0">
                          {appt.clientName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-ink">{appt.clientName}</div>
                          {appt.notes && (
                            <div className="text-[10px] text-body-mid truncate max-w-[160px]">
                              {appt.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-0.5 text-[11px]">
                        <div className="flex items-center gap-1 text-ink">
                          <PhoneIcon className="w-3 h-3 text-body-mid" />
                          <span>{appt.clientPhone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-body-mid">
                          <EnvelopeIcon className="w-3 h-3" />
                          <span>{appt.clientEmail}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="bg-canvas-soft border border-ink/10 text-ink text-[11px] font-medium px-2 py-0.5 rounded-md">
                        {appt.appointmentType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-0.5 text-[11px]">
                        <div className="flex items-center gap-1 font-semibold text-ink">
                          <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                          <span>{appt.scheduledDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-body-mid">
                          <ClockIcon className="w-3 h-3" />
                          <span>{appt.scheduledTime}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-body-mid text-[11px]">
                      {appt.clientTimezone}
                    </td>

                    <td className="py-3.5 px-4 text-[11px]">
                      {appt.repName ? (
                        <div className="flex items-center gap-1 text-ink">
                          <UserIcon className="w-3 h-3 text-body-mid" />
                          <span>{appt.repName}</span>
                        </div>
                      ) : (
                        <span className="text-body-mid italic">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {appt.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(appt.id)}
                        className="p-1 rounded text-body-mid hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete appointment"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      <NewAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAppointment}
      />
    </div>
  );
};
