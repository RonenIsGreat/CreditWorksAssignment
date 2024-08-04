import useAsyncMemo from "../../../hooks/useAsyncMemo";
import ManufacturerService from "../../../services/manufacturerService";
import ManufacturersTable from "../manufacturersTable/manufacturersTable";

function ManufacturersPage() {
    const items = useAsyncMemo(()=>ManufacturerService.get(), [], null);

  function renderTable(){
    if (items === null){
      return "Loading..."
    }

    return <ManufacturersTable manufacturers={items} />
  }

    return (
      <div className="manufacturers-page">
        {"Manufacturers Page"}
        {renderTable()}
      </div>
    );
  }
  
  export default ManufacturersPage;
  