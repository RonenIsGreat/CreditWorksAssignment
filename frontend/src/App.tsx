import { useState } from "react";
import "./App.css";
import VehiclesPage from "./components/vehiclesComponents/vehiclesPage/vehiclesPage";
import CategoriesPage from "./components/categoriesComponents/categoriesPage/categoriesPage";
import ManufacturersPage from "./components/manufacturersComponents/manufacturersPage/manufacturersPage";
import { Button } from "react-bootstrap";

type tabType = "Vehicles" | "Manufacturers" | "Categories";

function App() {
  const [selectedTab, setSelectedTab] = useState<tabType>("Vehicles");
  const tabs: tabType[] = ["Vehicles", "Manufacturers", "Categories"];

  function renderTab(tab: tabType) {
    let variant = "secondary";
    if (tab === selectedTab) {
      variant = "dark";
    }

    return (
      <Button
        key={`tab-${tab}`}
        variant={variant}
        color="red"
        onClick={() => setSelectedTab(tab)}
      >
        {tab}
      </Button>
    );
  }

  return (
    <div className="app">
      <div className="tabs">{tabs.map(renderTab)}</div>

      {selectedTab === "Vehicles" && <VehiclesPage />}
      {selectedTab === "Manufacturers" && <ManufacturersPage />}
      {selectedTab === "Categories" && <CategoriesPage />}
    </div>
  );
}

export default App;
