import React, { useState, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { calculateMonthlyMortgagePayment } from "./helper";

interface IMonthlyMortgagePayment {
  interestRate: number;
  principal: number;
  purchaseMortgageResult: number;
  termInYears: number;
}

export default () => {
  const [state, setState] = useState<IMonthlyMortgagePayment>({
    interestRate: 0,
    principal: 0,
    purchaseMortgageResult: 0,
    termInYears: 0,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedState = {
      ...state,
      [event.target.name]: Number(event.target.value),
    };
    updatedState.purchaseMortgageResult = calculateMonthlyMortgagePayment(
      updatedState.principal,
      updatedState.interestRate,
      updatedState.termInYears
    );
    setState(updatedState);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        Purchase Mortgage Calculator
      </CardHeader>
      <CardBody>
        <Form>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="principal">Principal</Label>
                <Input
                  type="number"
                  name="principal"
                  id="principal"
                  value={state.principal}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Interest Rate</Label>
                <Input
                  type="number"
                  name="interestRate"
                  id="interestRate"
                  value={state.interestRate}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="termInYears">Term in years</Label>
                <Input
                  type="number"
                  name="termInYears"
                  id="termInYears"
                  value={state.termInYears}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr></hr>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="purchaseMortgageResult">Purchase Mortgage</Label>
                <Input
                  type="number"
                  name="purchaseMortgageResult"
                  id="purchaseMortgageResult"
                  value={state.purchaseMortgageResult}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
