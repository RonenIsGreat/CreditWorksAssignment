import useAsyncMemo from "../../../hooks/useAsyncMemo";
import ManufacturerService from "../../../services/manufacturerService";
import ManufacturersTable from "../manufacturersTable/manufacturersTable";

function ManufacturersPage() {
    const [items, isLoading] = useAsyncMemo(() => ManufacturerService.get(), [], null);

  function renderTable(){
    if (items === null || isLoading){
      return <div>{"Loading..."}</div>;
    }

    return <ManufacturersTable manufacturers={items} />
  }

    return (
      <div className="manufacturers-page">
        {renderTable()}
      </div>
    );
  }
  
  export default ManufacturersPage;
  