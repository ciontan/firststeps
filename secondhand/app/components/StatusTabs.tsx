import React from "react";

interface StatusTabsProps {
  activeTab: string;
  counts: Record<string, number>;
  onTabChange: (tab: string) => void;
}

const tabs = ["all", "active", "pending", "sold", "draft"] as const;

const StatusTabs: React.FC<StatusTabsProps> = ({
  activeTab,
  counts,
  onTabChange,
}) => (
  <div className="w-full">
    <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-3 sm:px-4 py-2 rounded-full font-wix text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
            activeTab === tab
              ? "bg-brown text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <span className="hidden sm:inline">
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({counts[tab]})
          </span>
          <span className="sm:hidden">
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default StatusTabs;
