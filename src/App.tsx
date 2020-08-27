import React from "react";
import { Container, Row, Col } from "reactstrap";
import PurchaseMortgageCalculator from "./PurchaseMortgageCalculator";
import RefinanceMortgageCalculator from "./RefinanceMortgageCalculator";
import "./App.css";

interface IApp {
  interestRate: number;
  principal: number;
  purchaseMortgageResult: number;
  termInYears: number;
}

function App() {
  return (
    <div className="mt-5 mb-5">
      <Container>
        <Row>
          <Col>
            <PurchaseMortgageCalculator></PurchaseMortgageCalculator>
          </Col>
          <Col>
            <RefinanceMortgageCalculator></RefinanceMortgageCalculator>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
