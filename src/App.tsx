import React, { useState, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "./App.css";

interface IApp {
  principal: number;
  interestRate: number;
  termInYears: number;
  result: number;
}

function App() {
  const [state, setState] = useState<IApp>({
    interestRate: 0,
    principal: 0,
    result: 0,
    termInYears: 0,
  });

  const calculateMonthlyMortgagePayment = (
    principal: number,
    interestRate: number,
    termInYears: number
  ) => {
    interestRate = interestRate === 0 ? 0 : interestRate / 100;
    const monthlyInterestRate = interestRate === 0 ? 0 : interestRate / 12;
    const numberOfMonthlyPayments = termInYears * 12;
    return (
      (monthlyInterestRate *
        principal *
        Math.pow(1 + monthlyInterestRate, numberOfMonthlyPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfMonthlyPayments) - 1) || 0
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedState = {
      ...state,
      [event.target.name]: Number(event.target.value),
    };
    updatedState.result =
      calculateMonthlyMortgagePayment(
        updatedState.principal,
        updatedState.interestRate,
        updatedState.termInYears
      ) || 0;
    setState(updatedState);
  };

  return (
    <div className="mt-5 mb-5">
      <Container>
        <Row className="justify-content-center">
          <Col
            md={{
              size: 8,
            }}
            lg={{
              size: 6,
            }}
            xl={{
              size: 5,
            }}
          >
            <Card>
              <CardHeader className="text-center">
                Mortgage Calculator
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
                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="result">Result</Label>
                        <Input
                          type="number"
                          name="result"
                          id="result"
                          value={state.result}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button>Calculate</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
