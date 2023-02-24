import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ data, handleEdit, handleDelete }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
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
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
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
                  style={{ fontSize: '0.8rem' }}
                  onClick={() => handleEdit(index)}
                  className="mx-2"
                >
                  <FaEdit />
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default List;
