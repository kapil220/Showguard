import React, { useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon, PhoneIcon, EnvelopeIcon, CalendarIcon, ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export interface Appointment {
  id: string;
  clientName: string;
  time: string;
  date: string;
  phone: string;
  email: string;
  status: string;
  notes?: string;
}

interface PipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  stageName: string;
  stageDescription: string;
  stageCount: number;
  stageColor: string; // Tailwind color e.g., 'bg-[#8c85f9]' or similar
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  appointments?: Appointment[];
}

const DEFAULT_APPOINTMENTS: Record<string, Appointment[]> = {
  "New": [
    { id: "1", clientName: "John Doe", date: "Today", time: "10:30 AM", phone: "+1 (555) 234-5678", email: "john.doe@example.com", status: "New", notes: "Prefers communication via SMS." },
    { id: "2", clientName: "Sarah Connor", date: "Today", time: "2:00 PM", phone: "+1 (555) 876-5432", email: "s.connor@example.com", status: "New", notes: "Requires access gate code." }
  ],
  "Contacted": [
    { id: "3", clientName: "Michael Scott", date: "Tomorrow", time: "11:00 AM", phone: "+1 (555) 999-8888", email: "m.scott@dundermifflin.com", status: "Contacted", notes: "Followed up with email confirmation." }
  ],
  "Confirmed": [
    { id: "4", clientName: "Bruce Wayne", date: "July 22, 2026", time: "9:00 AM", phone: "+1 (555) 000-1111", email: "bruce@waynecorp.com", status: "Confirmed", notes: "VIP Client. High importance." },
    { id: "5", clientName: "Peter Parker", date: "July 23, 2026", time: "4:30 PM", phone: "+1 (555) 111-2222", email: "spidey@dailybugle.com", status: "Confirmed" }
  ],
  "At Risk": [
    { id: "6", clientName: "Tony Stark", date: "Yesterday", time: "3:00 PM", phone: "+1 (555) 300-4000", email: "tony@stark.com", status: "At Risk", notes: "Missed pre-check confirmation call twice." }
  ],
  "Showed": [
    { id: "7", clientName: "Clark Kent", date: "July 18, 2026", time: "1:00 PM", phone: "+1 (555) 777-8888", email: "clark@dailyplanet.com", status: "Showed" }
  ],
  "No-Show": [
    { id: "8", clientName: "Walter White", date: "July 17, 2026", time: "10:00 AM", phone: "+1 (555) 444-5555", email: "heisenberg@pollos.com", status: "No-Show", notes: "Unreachable by phone." }
  ],
  "Recovery": [
    { id: "9", clientName: "Jesse Pinkman", date: "July 16, 2026", time: "11:30 AM", phone: "+1 (555) 222-3333", email: "jesse@yo.com", status: "Recovery", notes: "Sent automated rebook link." }
  ]
};

export const PipelineModal: React.FC<PipelineModalProps> = ({
  isOpen,
  onClose,
  stageName,
  stageDescription,
  stageCount,
  stageColor,
  icon: StageIcon,
  appointments
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  // Use passed appointments, or fallback to default mocked data for display
  const activeAppointments = appointments || DEFAULT_APPOINTMENTS[stageName] || [];

  const filteredAppointments = activeAppointments.filter((appt) =>
    appt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appt.phone.includes(searchQuery) ||
    appt.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-canvas border border-ink/10 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] relative z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-ink/10 flex items-start justify-between bg-canvas-soft">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 ${stageColor}`}>
              <StageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-ink font-display">{stageName} Stage</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md text-white ${stageColor}`}>
                  {stageCount} total
                </span>
              </div>
              <p className="text-xs text-body-mid mt-0.5">{stageDescription}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-body-mid hover:bg-ink/5 hover:text-ink transition-colors cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {/* Search bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-4 h-4 text-body-mid absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search appointments by name, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-canvas border border-ink/10 rounded-md py-2 pl-9 pr-4 text-xs font-medium text-ink placeholder-body-mid focus:outline-none focus:border-primary/50"
            />
          </div>

          {/* List header */}
          <div className="text-[10px] font-bold text-body-mid uppercase tracking-wider font-display mt-2">
            Appointments List ({filteredAppointments.length})
          </div>

          {/* Appointments Grid/List */}
          <div className="flex flex-col gap-3">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt) => (
                <div 
                  key={appt.id} 
                  className="p-4 bg-canvas-soft border border-ink/10 rounded-md shadow-sm hover:border-ink/20 transition-all flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-ink">{appt.clientName}</h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] text-body">
                        <div className="flex items-center gap-1">
                          <PhoneIcon className="w-3 h-3 text-body-mid" />
                          <span>{appt.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <EnvelopeIcon className="w-3 h-3 text-body-mid" />
                          <span>{appt.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end text-[10px] text-ink font-semibold">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3 text-body-mid" />
                        <span>{appt.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <ClockIcon className="w-3 h-3 text-body-mid" />
                        <span>{appt.time}</span>
                      </div>
                    </div>
                  </div>

                  {appt.notes && (
                    <div className="bg-canvas border border-ink/5 rounded p-2 text-[10px] text-body flex items-start gap-1.5">
                      <DocumentTextIcon className="w-3.5 h-3.5 text-body-mid shrink-0 mt-0.5" />
                      <span>{appt.notes}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-canvas-soft border border-ink/5 rounded-md flex flex-col items-center justify-center">
                <p className="text-xs text-body-mid font-medium">No appointments found</p>
                <p className="text-[10px] text-body-mid mt-1">Try refining your search keyword</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-ink/10 bg-canvas-soft flex justify-end">
          <button
            onClick={onClose}
            className="bg-ink hover:bg-ink-soft text-on-primary text-xs font-semibold py-1.5 px-4 rounded-md cursor-pointer transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
