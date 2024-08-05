import { Button } from "react-bootstrap";
import useAsyncMemo from "../../../hooks/useAsyncMemo";
import CategoryService from "../../../services/categotyService";
import CategoriesTable from "../categorieTable/categorieTable";
import { useState } from "react";
import "./categoriesPage.css";
import CategoryModal from "../categoryModal/categoryModal";
import { Category } from "../../../models/category";

function CategoriesPage() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [categories, isLoading] = useAsyncMemo(
    () => CategoryService.get(),
    [refreshCount],
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    refreshData();
  };

  function refreshData() {
    setRefreshCount(refreshCount + 1);
    setSelectedCategory(undefined);
  }

  function renderCategoriesTable() {
    if (categories === null || isLoading) {
      return <div>{"Loading..."}</div>;
    }

    return (
      <CategoriesTable
        categories={categories}
        onRowPress={(category) => {
          setSelectedCategory(category);
          handleShow();
        }}
      />
    );
  }

  return (
    <div className="categories-page">
      {renderCategoriesTable()}

      <Button
        className="add-category-button"
        variant="primary"
        onClick={handleShow}
      >
        {"Add Category"}
      </Button>

      {showModal && (
        <CategoryModal
          show={showModal}
          handleClose={handleClose}
          category={selectedCategory}
        />
      )}
    </div>
  );
}

export default CategoriesPage;
