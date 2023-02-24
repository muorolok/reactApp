import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const List = ({ data, handleEdit, handleDelete }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [editableIndex, setEditableIndex] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleEditClick = (index) => {
    setEditableIndex(index);
    setName(data[index].name);
    setDescription(data[index].description);
  };

  const handleSaveClick = () => {
    handleEdit(editableIndex, name, description);
    setEditableIndex(null);
    setName("");
    setDescription("");
  };

  const handleCancelClick = () => {
    setEditableIndex(null);
    setName("");
    setDescription("");
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: "10%" }}>S.No.</th>
          <th style={{ width: "15%" }}>Name</th>
          <th style={{ width: "50%" }}>Description</th>
          <th style={{ width: "15%" }}>Operations</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <td>{index + 1}</td>
            <td>
              {editableIndex === index ? (
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                item.name
              )}
            </td>
            <td>
              {editableIndex === index ? (
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              ) : (
                item.description
              )}
            </td>
            <td>
              {editableIndex === index ? (
                <>
                  <Button
                    variant="success"
                    style={{ fontSize: "0.8rem" }}
                    onClick={handleSaveClick}
                    className="mx-2"
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    variant="danger"
                    style={{ fontSize: "0.8rem" }}
                    onClick={handleCancelClick}
                  >
                    <FaTimes />
                  </Button>
                </>
              ) : (
                <>
                <Button
                    variant="danger"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrash />
                  </Button>
                  {hoveredIndex === index && (
                    <Button
                      variant="warning"
                      style={{ fontSize: "0.8rem" }}
                      onClick={() => handleEditClick(index)}
                      className="mx-2"
                    >
                      <FaEdit />
                    </Button>
                  )}
                  
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default List;
