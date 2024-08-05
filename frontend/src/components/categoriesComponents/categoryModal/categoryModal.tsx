import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Category } from "../../../models/category";
import { useState } from "react";
import CategoryIcon from "../categoryIcon/categoryIcon";
import CategoryService from "../../../services/categotyService";

interface CategoryModalProps {
  show: boolean;
  handleClose: () => void;
  category?: Category;
}

function CategoryModal({ show, handleClose, category }: CategoryModalProps) {
  const [id, _] = useState(category?.categoryId ?? 0);
  const [name, setName] = useState(category?.name ?? "");
  const [minWeight, setMinWeight] = useState(() => {
    if (!category) {
      return "0";
    }
    return (category.minCategoryWeightGrams / 1000).toString();
  });
  const [iconName, setIconName] = useState(category?.icon ?? "clipIcon");
  const [displayErrorWeightExists, setDisplayErrorWeightExists] =
    useState(false);

  function roundAndSetWeight(weight: string) {
    let val = Number(weight);
    if (val > 999999999) {
      val = 999999999;
    }
    val = Math.floor(val * 100) / 100;
    setMinWeight(val.toString());
  }

  const isExistingCategory = !!category;
  const theFirstCategoryFromZeroWeight = isExistingCategory && category.minCategoryWeightGrams === 0;

  async function finishPressed() {
    const minCategoryWeightGrams = Number(minWeight) * 1000;
    const category: Category = {
      categoryId: id,
      name: name,
      minCategoryWeightGrams: minCategoryWeightGrams,
      icon: iconName,
    };
    let res;
    if (isExistingCategory) {
      res = await CategoryService.put(category);
    } else {
      res = await CategoryService.post(category);
    }
    if (res.statusCode === 409) {
      setDisplayErrorWeightExists(true);
    } else {
      handleClose();
    }
  }

  async function handleDelete() {
    await CategoryService.delete(id);
    handleClose();
  }

  const title = isExistingCategory ? "Edit Category" : "Add Category";
  const finishButtonText = isExistingCategory ? "Update" : "Add";

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={128}
          />

          <br />

          <Form.Label>Minimum category weight:</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={minWeight}
            onChange={(e) => roundAndSetWeight(e.target.value)}
            disabled={theFirstCategoryFromZeroWeight}
          />
          <Form.Label>
            The max weight for the category will be up to the next category
          </Form.Label>

          <br />
          <br />

          <Form.Label>Icon:</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="Info">
              <CategoryIcon name={iconName} size={20} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setIconName("clipIcon")}>
                <CategoryIcon name="clipIcon" size={20} />
              </Dropdown.Item>

              <Dropdown.Item onClick={() => setIconName("brushIcon")}>
                <CategoryIcon name="brushIcon" size={20} />
              </Dropdown.Item>

              <Dropdown.Item onClick={() => setIconName("compassIcon")}>
                <CategoryIcon name="compassIcon" size={20} />
              </Dropdown.Item>

              <Dropdown.Item onClick={() => setIconName("hammerIcon")}>
                <CategoryIcon name="hammerIcon" size={20} />
              </Dropdown.Item>

              <Dropdown.Item onClick={() => setIconName("magnetIcon")}>
                <CategoryIcon name="magnetIcon" size={20} />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>

      <Modal.Footer className="justify-content-between">
        {isExistingCategory && (
          <Button variant="danger" onClick={() => handleDelete()} disabled={theFirstCategoryFromZeroWeight}>
            Delete
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => finishPressed()}>
          {finishButtonText}
        </Button>
        {theFirstCategoryFromZeroWeight && (
          <div>{"Can't delete or change the weight of the first category."}</div>
        )}
        {displayErrorWeightExists && (
          <div>{"Error! Category with same weight already exists."}</div>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryModal;
