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

const calculateMonthlyInterestPayment = (
  monthlyInterestRate: number,
  remainingBalance: number
) => {
  return monthlyInterestRate * remainingBalance;
};

const calculateRefinanceMortgagePayment = (
  loanAmount: number,
  interestRate: number,
  termInYears: number,
  newInterestRate: number,
  newTermInYears: number,
  numberOfPaymentsMade: number
) => {
  // base monthly mortage payment
  const monthlyMortgagePayment = calculateMonthlyMortgagePayment(
    loanAmount,
    interestRate,
    termInYears
  );
  let remainingBalance = loanAmount;
  let totalPaid = 0;
  let totalInterest = 0;
  for (let i = 0; i < numberOfPaymentsMade; i++) {
    // convert interest rate into a monthly percentage rate
    const monthlyInterestPayment = calculateMonthlyInterestPayment(
      interestRate / 100 / 12,
      remainingBalance
    );
    const monthlyPrincipalPayment =
      monthlyMortgagePayment - monthlyInterestPayment;
    // if the total monthly payment is no longer less than remaining balance, then we are at our last payment
    if (remainingBalance - monthlyPrincipalPayment >= 0) {
      remainingBalance -= monthlyPrincipalPayment;
    }
    totalPaid += monthlyPrincipalPayment;
    totalInterest += monthlyInterestPayment;
  }
  // calculate the remaining interest at the end of the number of payments made
  const remainingInterest =
    monthlyMortgagePayment * termInYears * 12 - loanAmount - totalInterest;
  // the new mortgage total is the remaining balance
  const newMortgageTotal = remainingBalance;
  // lets calculate the new monthly mortgage payment with the new mortgage total
  const newMonthlyMortgagePayment = calculateMonthlyMortgagePayment(
    newMortgageTotal,
    newInterestRate,
    newTermInYears
  );
  //calculate remaining total interest
  const newRemainingInterest =
    newMonthlyMortgagePayment * newTermInYears * 12 - remainingBalance;
  // build out the response
  const response = {
    interestSaved: formatResult(remainingInterest - newRemainingInterest),
    oldMonthlyMortgage: {
      monthlyMortgagePayment: formatResult(monthlyMortgagePayment),
      remainingInterest: formatResult(remainingInterest),
    },
    newMonthlyMortgage: {
      newMortgageTotal: formatResult(newMortgageTotal),
      monthlyMortgagePayment: formatResult(newMonthlyMortgagePayment),
      remainingInterest: formatResult(newRemainingInterest),
    },
    totalPaid: formatResult(totalPaid),
  };
  return response;
};

const formatResult = (result: number) => {
  return isNaN(parseFloat(result.toFixed(2)))
    ? 0
    : parseFloat(result.toFixed(2));
};

export {
  calculateMonthlyInterestPayment,
  calculateRefinanceMortgagePayment,
  calculateMonthlyMortgagePayment,
  formatResult,
};
