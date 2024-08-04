import { useState } from 'react';
import './App.css';
import VehiclesPage from './components/vehiclesComponents/vehiclesPage/vehiclesPage';
import CategoriesPage from './components/categoriesComponents/categoriesPage/categoriesPage';
import ManufacturersPage from './components/manufacturersComponents/manufacturersPage/manufacturersPage';

type tabType = 'Vehicles' | 'Manufacturers' | 'Categories';

function App() {
  const [tab, setTab] = useState<tabType>('Vehicles')
  const tabs: tabType[] = ['Vehicles', 'Manufacturers', 'Categories']

  function renderTab(tab: tabType){
    return <button key={`tab-${tab}`} type="button" onClick={()=>setTab(tab)}>
        {tab}
      </button>
  }

  return (
    <div className='app'>
      <div className='Tabs'>
          {tabs.map(renderTab)}
      </div>

      {tab === 'Vehicles' && <VehiclesPage />}
      {tab === 'Manufacturers' && <ManufacturersPage />}
      {tab === 'Categories' && <CategoriesPage />}
    </div>
  );
}

export default App;
