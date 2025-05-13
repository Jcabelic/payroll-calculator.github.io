const paymentFrequency = document.getElementById('paymentFrequency');
const paymentBatch = document.getElementById('paymentBatch');
const batchContainer = document.getElementById('batchContainer');
const payrollB = document.getElementById('payrollB');
const calculateButtonA = document.getElementById('calculateButtonA');
paymentFrequency.addEventListener('change', () => {
  if (paymentFrequency.value === 'Semimonthly') {
    batchContainer.classList.remove('hidden');
    
  } else {
    batchContainer.classList.add('hidden');
    payrollB.classList.add('hidden'); // Hide Payroll B if switching back to monthly
  }
});

paymentBatch.addEventListener('change', () => {
  if (paymentBatch.value === 'B') {
    payrollB.classList.remove('hidden');
    calculateButtonA.classList.add('invisible')
  } else {
    payrollB.classList.add('hidden');
    calculateButtonA.classList.remove('invisible')
  }
});


  // New calculation functions
  function calculateSSS(basicIncome) {
    const entry = sssTable.find(row => basicIncome >= row.StartAmount && basicIncome <= row.Credit);
    return entry ? entry.EmployeeSSS + entry.EmployeeMPF : 0;
  }

  function calculatePhilHealth(income) {
    return Math.min(income * 0.04, 1800) / 2; // Monthly premium split
  }

  function calculatePagIBIG(income) {
    return income <= 15000 ? 100 : 200;
  }

  function calculateTax(income, frequency) {
    const table = wtaxTable[0][frequency === 'monthly' ? 'Monthly' : 'Semimonthly'];
    const bracket = table.find(b => income > b.StartAmount && income <= b.MaxAmount);
    if (!bracket) return 0;
    return bracket.Initial + ((income - bracket.StartAmount) * (bracket.AdditionalTaxPercent / 100));
  }

  function calculateNetPay(formId) {
    const frequency = paymentFrequency.value;
    const batch = paymentBatch.value;
    
    const basicA = parseFloat(document.getElementById('basicIncomeA').value) || 0;
    const deductionsA = parseFloat(document.getElementById('deductionsA').value) || 0;
    const otherA = parseFloat(document.getElementById('otherIncomeA').value) || 0;
    
    let grossA = basicA + otherA;
    let tax, sss, philhealth, pagibig, netPay;

    if (frequency === 'monthly') {
      sss = calculateSSS(basicA);
      philhealth = calculatePhilHealth(grossA);
      pagibig = calculatePagIBIG(basicA);
      tax = calculateTax(grossA - sss - philhealth - pagibig, 'monthly');
      netPay = grossA - deductionsA - sss - philhealth - pagibig - tax;
    } 
    else if (frequency === 'semi-monthly' && batch === 'A') {
      sss = calculateSSS(basicA) / 2;
      philhealth = calculatePhilHealth(grossA * 2) / 2;
      pagibig = calculatePagIBIG(basicA) / 2;
      tax = calculateTax(grossA - sss - philhealth - pagibig, 'Semimonthly');
      netPay = grossA - deductionsA - sss - philhealth - pagibig - tax;
    }
    else if (frequency === 'semi-monthly' && batch === 'B') {
      const basicB = parseFloat(document.getElementById('basicIncomeB').value) || 0;
      const deductionsB = parseFloat(document.getElementById('deductionsB').value) || 0;
      const otherB = parseFloat(document.getElementById('otherIncomeB').value) || 0;
      
      const grossB = basicB + otherB;
      const totalGross = grossA + grossB;
      
      const sssA = calculateSSS(basicA) / 2;
      const sssB = calculateSSS(basicB) / 2;
      const philhealth = calculatePhilHealth(totalGross * 2) / 2;
      const pagibig = (calculatePagIBIG(basicA) + calculatePagIBIG(basicB)) / 2;
      
      const monthlyTaxable = totalGross * 2 - (sssA + sssB + philhealth + pagibig) * 2;
      const monthlyTax = calculateTax(monthlyTaxable, 'monthly');
      
      tax = monthlyTax / 2;
      netPay = grossA - deductionsA - sssA - philhealth - pagibig - tax;
    }

    return {
      netPay: Math.round(netPay * 100) / 100,
      deductions: Math.round((sss + philhealth + pagibig + tax) * 100) / 100
    };
  }

  // Form submission handlers
  document.getElementById('calculator-form-A').addEventListener('submit', function(e) {
    e.preventDefault();
    const results = calculateNetPay('A');
    document.getElementById('resultsA').classList.remove('hidden');
    document.getElementById('resultTextA').textContent = 
      `Net Pay: ₱${results.netPay.toLocaleString()} | Deductions: ₱${results.deductions.toLocaleString()}`;
  });

  document.getElementById('calculator-form-B').addEventListener('submit', function(e) {
    e.preventDefault();
    const results = calculateNetPay('B');
    document.getElementById('resultsB').classList.remove('hidden');
    document.getElementById('resultTextB').textContent = 
      `Net Pay: ₱${results.netPay.toLocaleString()} | Deductions: ₱${results.deductions.toLocaleString()}`;
  });