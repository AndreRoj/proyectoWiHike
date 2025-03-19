import React from "react";
import "./TabNavigation.css";

const TabItems = ({ activeTab, onTabChange, tabs }) => {


  return (
    <div className="tab-list">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};
export default TabItems;
