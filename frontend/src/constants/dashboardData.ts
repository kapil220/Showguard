import {
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  XCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export interface PipelineStage {
  label: string;
  desc: string;
  borderCol: string;
  dotCol: string;
  bgCol: string;
  iconBg: string;
  iconText: string;
  countBg: string;
  countText: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  count: number;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    label: "New",
    desc: "Just booked",
    borderCol: "border-l-[#8c85f9]",
    dotCol: "bg-[#8c85f9]",
    bgCol: "bg-[#8c85f9]",
    iconBg: "bg-[#8c85f9]/10",
    iconText: "text-[#8c85f9]",
    countBg: "bg-[#8c85f9]/10",
    countText: "text-[#8c85f9]",
    icon: CalendarIcon,
    count: 0
  },
  {
    label: "Contacted",
    desc: "Awaiting reply",
    borderCol: "border-l-[#3b82f6]",
    dotCol: "bg-[#3b82f6]",
    bgCol: "bg-[#3b82f6]",
    iconBg: "bg-[#3b82f6]/10",
    iconText: "text-[#3b82f6]",
    countBg: "bg-[#3b82f6]/10",
    countText: "text-[#3b82f6]",
    icon: ChatBubbleLeftEllipsisIcon,
    count: 0
  },
  {
    label: "Confirmed",
    desc: "Said yes",
    borderCol: "border-l-[#10b981]",
    dotCol: "bg-[#10b981]",
    bgCol: "bg-[#10b981]",
    iconBg: "bg-[#10b981]/10",
    iconText: "text-[#10b981]",
    countBg: "bg-[#10b981]/10",
    countText: "text-[#10b981]",
    icon: CheckCircleIcon,
    count: 0
  },
  {
    label: "At Risk",
    desc: "High risk after contact",
    borderCol: "border-l-[#f43f5e]",
    dotCol: "bg-[#f43f5e]",
    bgCol: "bg-[#f43f5e]",
    iconBg: "bg-[#f43f5e]/10",
    iconText: "text-[#f43f5e]",
    countBg: "bg-[#f43f5e]/10",
    countText: "text-[#f43f5e]",
    icon: ExclamationTriangleIcon,
    count: 0
  },
  {
    label: "Showed",
    desc: "Completed",
    borderCol: "border-l-[#14b8a6]",
    dotCol: "bg-[#14b8a6]",
    bgCol: "bg-[#14b8a6]",
    iconBg: "bg-[#14b8a6]/10",
    iconText: "text-[#14b8a6]",
    countBg: "bg-[#14b8a6]/10",
    countText: "text-[#14b8a6]",
    icon: UserIcon,
    count: 0
  },
  {
    label: "No-Show",
    desc: "Did not show",
    borderCol: "border-l-[#ef4444]",
    dotCol: "bg-[#ef4444]",
    bgCol: "bg-[#ef4444]",
    iconBg: "bg-[#ef4444]/10",
    iconText: "text-[#ef4444]",
    countBg: "bg-[#ef4444]/10",
    countText: "text-[#ef4444]",
    icon: XCircleIcon,
    count: 0
  },
  {
    label: "Recovery",
    desc: "Awaiting rebook",
    borderCol: "border-l-[#f59e0b]",
    dotCol: "bg-[#f59e0b]",
    bgCol: "bg-[#f59e0b]",
    iconBg: "bg-[#f59e0b]/10",
    iconText: "text-[#f59e0b]",
    countBg: "bg-[#f59e0b]/10",
    countText: "text-[#f59e0b]",
    icon: ArrowPathIcon,
    count: 0
  }
];
