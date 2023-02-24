import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import FormComponent from "./components/Form";

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>React App</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
