import React from "react";
import "./TabNavigation.css";

const TabItems = ({ activeTab, onTabChange }) => {
  const tabItems = [
    { id: "banner", name: "Banner principal" },
    { id: "rutas", name: "Rutas populares" },
    { id: "sobre", name: "Sobre wehike" },
  ];

  return (
    <div className="tab-list">
      {tabItems.map((tab) => (
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
