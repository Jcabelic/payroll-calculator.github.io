// document.getElementById('calculator-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const basicIncome = parseFloat(document.getElementById('basicIncome').value);
//     const deductions = parseFloat(document.getElementById('deductions').value);
//     const otherIncome = parseFloat(document.getElementById('otherIncome').value);
//     const paymentFrequency = document.getElementById('paymentFrequency').value;

//     // Calculate the total income
//     const totalIncome = basicIncome + otherIncome - deductions;

//     // Find the applicable SSS deduction based on the income range
//     let effectiveSSS = 0;
//     for (let record of sssTable) {
//         if (totalIncome >= record.StartAmount && totalIncome <= record.Credit) {
//             effectiveSSS = record.Total;
//             break;
//         }
//     }

//     const resultsDiv = document.getElementById('results');
//     const resultText = document.getElementById('resultText');
//     resultText.innerText = `Total Income: ${totalIncome.toFixed(2)} \n Applicable SSS Deduction: ${effectiveSSS} \n Net Income: ${(totalIncome - effectiveSSS).toFixed(2)}`;
//     resultsDiv.classList.remove('hidden');
// });





const paymentFrequency = document.getElementById('paymentFrequency');
const paymentBatch = document.getElementById('paymentBatch');
const batchContainer = document.getElementById('batchContainer');
const payrollB = document.getElementById('payrollB');

paymentFrequency.addEventListener('change', () => {
  if (paymentFrequency.value === 'semi-monthly') {
    batchContainer.classList.remove('hidden');
  } else {
    batchContainer.classList.add('hidden');
    payrollB.classList.add('hidden'); // Hide Payroll B if switching back to monthly
  }
});

paymentBatch.addEventListener('change', () => {
  if (paymentBatch.value === 'B') {
    payrollB.classList.remove('hidden');
  } else {
    payrollB.classList.add('hidden');
  }
});


