import React, { useState } from "react";
import { XMarkIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import {
  FORM_LABEL,
  FORM_INPUT,
  FORM_INPUT_ICON,
  BTN_PRIMARY,
  BTN_CANCEL,
} from "../constants/uiStyles";

export interface NewAppointmentData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  appointmentType: string;
  scheduledDate: string;
  scheduledTime: string;
  clientTimezone: string;
  repName: string;
  notes: string;
}

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewAppointmentData) => void;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<NewAppointmentData>({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    appointmentType: "Consultation",
    scheduledDate: "2026-07-24",
    scheduledTime: "10:00",
    clientTimezone: "Eastern (New York)",
    repName: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-canvas border border-ink/10 rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col relative z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="py-4 px-5 border-b border-ink/10 flex items-center justify-between bg-canvas-soft">
          <h3 className="text-sm font-bold text-ink font-display">New Appointment</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-body-mid hover:bg-ink/5 hover:text-ink transition-colors cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
            
            {/* Client Name */}
            <div>
              <label className={FORM_LABEL}>
                Client Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="clientName"
                required
                placeholder="John Smith"
                value={formData.clientName}
                onChange={handleChange}
                className={FORM_INPUT}
              />
            </div>

            {/* 2-Column: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={FORM_LABEL}>
                  Client Phone <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="clientPhone"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  className={FORM_INPUT}
                />
                <span className="text-[10px] text-body-mid mt-1 block">
                  Include country code (e.g. +1 for US)
                </span>
              </div>

              <div>
                <label className={FORM_LABEL}>
                  Client Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  required
                  placeholder="john@example.com"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className={FORM_INPUT}
                />
              </div>
            </div>

            {/* Appointment Type */}
            <div>
              <label className={FORM_LABEL}>
                Appointment Type <span className="text-primary">*</span>
              </label>
              <select
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                className={FORM_INPUT}
              >
                <option value="Consultation">Consultation</option>
                <option value="Demo">Demo</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Onboarding">Onboarding</option>
                <option value="Strategy Session">Strategy Session</option>
              </select>
            </div>

            {/* 2-Column: Scheduled Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={FORM_LABEL}>
                  Scheduled Date <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="scheduledDate"
                    required
                    value={formData.scheduledDate}
                    onChange={handleChange}
                    className={FORM_INPUT_ICON}
                  />
                  <CalendarIcon className="w-4 h-4 text-body-mid absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className={FORM_LABEL}>
                  Scheduled Time <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="scheduledTime"
                    required
                    value={formData.scheduledTime}
                    onChange={handleChange}
                    className={FORM_INPUT_ICON}
                  />
                  <ClockIcon className="w-4 h-4 text-body-mid absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 2-Column: Client Timezone & Rep Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={FORM_LABEL}>
                  Client Timezone
                </label>
                <select
                  name="clientTimezone"
                  value={formData.clientTimezone}
                  onChange={handleChange}
                  className={FORM_INPUT}
                >
                  <option value="Eastern (New York)">Eastern (New York)</option>
                  <option value="Pacific (Los Angeles)">Pacific (Los Angeles)</option>
                  <option value="Central (Chicago)">Central (Chicago)</option>
                  <option value="Mountain (Denver)">Mountain (Denver)</option>
                  <option value="UTC">UTC</option>
                  <option value="GMT (London)">GMT (London)</option>
                </select>
              </div>

              <div>
                <label className={FORM_LABEL}>
                  Rep Name
                </label>
                <input
                  type="text"
                  name="repName"
                  placeholder="Assigned representative"
                  value={formData.repName}
                  onChange={handleChange}
                  className={FORM_INPUT}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className={FORM_LABEL}>
                Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={handleChange}
                className={`${FORM_INPUT} resize-none`}
              />
            </div>

          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-ink/10 bg-canvas-soft flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className={BTN_CANCEL}>
              Cancel
            </button>
            <button type="submit" className={BTN_PRIMARY}>
              Create Appointment
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
