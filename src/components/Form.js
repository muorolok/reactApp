import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";
import List from "./List";

const FormComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (event) => {
    event.preventDefault();
    if (name && description) {
      if (isEditing) {
        const newData = [...data];
        newData[editingIndex].name = name;
        newData[editingIndex].description = description;
        setData(newData);
        setIsEditing(false);
        setEditingIndex(null);
      } else {
        setData([...data, { name, description }]);
      }
      setName("");
      setDescription("");
    }
  };

  const handleSaveToLocal = () => {
    const updatedData = [...data];
    localStorage.setItem("data", JSON.stringify(updatedData));

    setName("");
    setDescription("");

    toast.success("Saved to Local", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const handleLoadFromLocal = () => {
    const storedData = JSON.parse(localStorage.getItem("data"));

    if (!storedData || storedData.length === 0) {
      setIsEmpty(true);
      toast.error("No data found in local storage.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        onClose: () => setIsEmpty(false),
      });
    } else {
      setData(storedData);
    }
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleEdit = (index) => {
    setName(data[index].name);
    setDescription(data[index].description);

    setIsEditing(true);
    setEditingIndex(index);
  };

  return (
    <div className="container">
      <Form onSubmit={handleSave}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Button variant="primary" type="submit">
            {isEditing ? "Edit" : "Save"}
          </Button>
          <Button
            variant="success"
            style={{ marginLeft: "0.5rem" }}
            onClick={handleSaveToLocal}
          >
            Save to Local
          </Button>
          <Button
            variant="info"
            style={{ marginLeft: "0.5rem" }}
            onClick={handleLoadFromLocal}
          >
            Local
          </Button>
        </div>
      </Form>
      {isEmpty && (
        <div style={{ marginBottom: "20px" }}>
          Data is empty in Local Storage
        </div>
      )}
      <List data={data} handleEdit={handleEdit} handleDelete={handleDelete} />

      <ToastContainer />
    </div>
  );
};

export default FormComponent;
