import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";
import List from "./List";

const FormComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);

  const handleSave = (event) => {
    event.preventDefault();
    if (name && description) {
      setData([...data, { name, description }]);

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
      toast.error("No data found in local storage.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
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

  const handleEdit = (index, name, description) => {
    const newData = [...data];
    newData[index].name = name;
    newData[index].description = description;
    setData(newData);
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
            Save
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

      <List data={data} handleEdit={handleEdit} handleDelete={handleDelete} />

      <ToastContainer />
    </div>
  );
};

export default FormComponent;
