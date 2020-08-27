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
import { calculateRefinanceMortgagePayment } from "./helper";

interface IRefinanceMortgage {
  loanAmount: number;
  interestRate: number;
  termInYears: number;
  newInterestRate: number;
  newTermInYears: number;
  numberOfPaymentsMade: number;

  interestSaved: number;
  oldMonthlyMortgage: {
    monthlyMortgagePayment: number;
    remainingInterest: number;
  };
  newMonthlyMortgage: {
    newMortgageTotal: number;
    monthlyMortgagePayment: number;
    remainingInterest: number;
  };
  totalPaid: number;
}

export default () => {
  const [state, setState] = useState<IRefinanceMortgage>({
    interestRate: 0,
    termInYears: 0,
    loanAmount: 0,
    newInterestRate: 0,
    newTermInYears: 0,
    numberOfPaymentsMade: 0,
    interestSaved: 0,
    newMonthlyMortgage: {
      monthlyMortgagePayment: 0,
      newMortgageTotal: 0,
      remainingInterest: 0,
    },
    oldMonthlyMortgage: {
      monthlyMortgagePayment: 0,
      remainingInterest: 0,
    },
    totalPaid: 0,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedState = {
      ...state,
      [event.target.name]: Number(event.target.value),
    };
    const {
      interestSaved,
      newMonthlyMortgage,
      oldMonthlyMortgage,
      totalPaid,
    } = calculateRefinanceMortgagePayment(
      updatedState.loanAmount,
      updatedState.interestRate,
      updatedState.termInYears,
      updatedState.newInterestRate,
      updatedState.newTermInYears,
      updatedState.numberOfPaymentsMade
    );

    updatedState.interestSaved = interestSaved;
    updatedState.oldMonthlyMortgage = oldMonthlyMortgage;
    updatedState.newMonthlyMortgage = newMonthlyMortgage;
    updatedState.totalPaid = totalPaid;

    setState(updatedState);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        Refinance Mortgage Calculator
      </CardHeader>
      <CardBody>
        <Form>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="loanAmount">Loan Amount</Label>
                <Input
                  type="number"
                  name="loanAmount"
                  id="loanAmount"
                  value={state.loanAmount}
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
                <Label for="newInterestRate">New Interest Rate</Label>
                <Input
                  type="number"
                  name="newInterestRate"
                  id="newInterestRate"
                  value={state.newInterestRate}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="newTermInYears">New Term In Years</Label>
                <Input
                  type="number"
                  name="newTermInYears"
                  id="newTermInYears"
                  value={state.newTermInYears}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="numberOfPaymentsMade">
                  Number Of Payments Made
                </Label>
                <Input
                  type="number"
                  name="numberOfPaymentsMade"
                  id="numberOfPaymentsMade"
                  value={state.numberOfPaymentsMade}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr></hr>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="interestSaved">Interest Saved</Label>
                <Input
                  type="number"
                  name="interestSaved"
                  id="interestSaved"
                  value={state.interestSaved}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Card>
            <CardHeader>Old Monthly Mortgage</CardHeader>
            <CardBody>
              <Row form>
                <Col>
                  <FormGroup>
                    <Label for="oldMonthlyMortgage_monthlyMortgagePayment">
                      Monthly Mortgage Payment
                    </Label>
                    <Input
                      type="number"
                      name="oldMonthlyMortgage_monthlyMortgagePayment"
                      id="oldMonthlyMortgage_monthlyMortgagePayment"
                      value={state.oldMonthlyMortgage.monthlyMortgagePayment}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col>
                  <FormGroup>
                    <Label for="oldMonthlyMortgage_monthlyMortgagePayment">
                      Remaining Interest
                    </Label>
                    <Input
                      type="number"
                      name="oldMonthlyMortgage_monthlyMortgagePayment"
                      id="oldMonthlyMortgage_monthlyMortgagePayment"
                      value={state.oldMonthlyMortgage.remainingInterest}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card className="mt-3">
            <CardHeader>New Monthly Mortgage</CardHeader>
            <CardBody>
              <Row form>
                <Col>
                  <FormGroup>
                    <Label for="newMonthlyMortgage_newMortgageTotal">
                      New Mortgage Total
                    </Label>
                    <Input
                      type="number"
                      name="newMonthlyMortgage_newMortgageTotal"
                      id="newMonthlyMortgage_newMortgageTotal"
                      value={state.newMonthlyMortgage.newMortgageTotal}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col>
                  <FormGroup>
                    <Label for="newMonthlyMortgage_monthlyMortgagePayment">
                      Monthly Mortgage Payment
                    </Label>
                    <Input
                      type="number"
                      name="newMonthlyMortgage_monthlyMortgagePayment"
                      id="newMonthlyMortgage_monthlyMortgagePayment"
                      value={state.newMonthlyMortgage.monthlyMortgagePayment}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col>
                  <FormGroup>
                    <Label for="newMonthlyMortgage_remainingInterest">
                      Remaining Interest
                    </Label>
                    <Input
                      type="number"
                      name="newMonthlyMortgage_remainingInterest"
                      id="newMonthlyMortgage_remainingInterest"
                      value={state.newMonthlyMortgage.remainingInterest}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </CardBody>
    </Card>
  );
};
