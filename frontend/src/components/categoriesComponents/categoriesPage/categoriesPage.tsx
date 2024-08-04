import useAsyncMemo from "../../../hooks/useAsyncMemo";
import CategoryService from "../../../services/categotyService";
import CategoriesTable from "../categorieTable/categorieTable";

function CategoriesPage() {
    const categories = useAsyncMemo(CategoryService.get, [], null);

    function renderCategoriesTable(){
      if (categories === null){
        return "Loading..."
      }

      return <CategoriesTable categories={categories} />
    }

    return (
      <div className="categories-page">
        {"Categories Page"}
        {renderCategoriesTable()}
      </div>
    );
  }
  
  export default CategoriesPage;
  