'use strict';

// DOM Elements
const sectionCalcEl = document.querySelector('.section__calculator');
const grossIncomeField = document.getElementById('gross-income');
const hourlyRateField = document.getElementById('hourly-rate');
const incomeFreeField = document.getElementById('income-free');
const creditBalanceField = document.getElementById('credit-balance');
const submitBtnEl = document.querySelector('.js-submit__btn');
const clearBtnEl = document.querySelector('.js-clear__btn');
const resultsEl = document.querySelector('.results__display');
const creditAccruedEl = document.querySelector('.credit__accrued');
const creditUsedEl = document.querySelector('.credit__used');
const creditBalanaceEl = document.querySelector('.credit__balance');
const dpsPaymentEl = document.querySelector('.dps__payment');
const calcBtnEl = document.querySelector('.section__calcBtn');
const recalcBtnEl = document.querySelector('.recalcBtn');
const secondaryHeading = document.querySelector('.heading__secondary');
const resultsDescription = document.querySelector('.js-results__description');

// Variables
let grossIncome,
  hourlyRate,
  incomeFree,
  creditBalance,
  nonIncomeFree,
  fortnightAccrual,
  creditUsed,
  dpsPayment;

// Functions

function initForm() {
  grossIncomeField.value =
    hourlyRateField.value =
    incomeFreeField.value =
    creditBalanceField.value =
      '';

  grossIncomeField.blur();
  hourlyRateField.blur();
  incomeFreeField.blur();
  creditBalanceField.blur();
  grossIncome =
    hourlyRate =
    incomeFree =
    nonIncomeFree =
    creditBalance =
    creditUsed =
    fortnightAccrual =
      0;
}

function calcCreditAccrual(hourlyRate = 0) {
  fortnightAccrual = 48 - hourlyRate;
  return fortnightAccrual;
}

function calcCreditUsed(grossIncome = 0, incomeFree = 0, creditBalance = 0) {
  nonIncomeFree = grossIncome - incomeFree;
  if (grossIncome <= nonIncomeFree && grossIncome <= creditBalance) {
    return Number(grossIncome);
  } else if (nonIncomeFree <= creditBalance && nonIncomeFree <= grossIncome) {
    return Number(nonIncomeFree);
  } else {
    return Number(creditBalance);
  }
}

function calcDpsPayment(usedCredits) {
  const dpsMaxPension = 967.5;
  const assessableIncome = dpsMaxPension - usedCredits;
  if (assessableIncome <= incomeFree) {
    return Number(incomeFree) + Number(usedCredits);
  } else {
    const halfPortion = (assessableIncome - incomeFree) * 0.5;
    return Number(incomeFree) + Number(halfPortion) + Number(usedCredits);
  }
}

function displayResults(
  creditAccrued = 0,
  usedCredits = 0,
  dpsPayment = 0,
  creditBalance = 0
) {
  creditAccruedEl.innerHTML = creditAccrued;
  creditUsedEl.innerHTML = usedCredits;
  dpsPaymentEl.innerHTML = `$${dpsPayment}`;
  creditBalanaceEl.innerHTML = creditBalance;
  resultsDescription.innerHTML = `Your DPS payment will be: <span>$${dpsPayment}</span>`;

  resultsEl.classList.remove('hidden');
  resultsDescription.classList.remove('hidden');
}

// Event Listeners

calcBtnEl.addEventListener('click', function (e) {
  e.preventDefault();
  initForm();
  calcBtnEl.classList.add('hidden');
  secondaryHeading.classList.add('hidden');
  sectionCalcEl.classList.remove('hidden');
});

submitBtnEl.addEventListener('click', function (e) {
  e.preventDefault();
  grossIncome = grossIncomeField.value;
  hourlyRate = hourlyRateField.value;
  incomeFree = incomeFreeField.value;
  creditBalance = creditBalanceField.value;

  const creditAccrued = calcCreditAccrual(hourlyRate);
  let currentCreditBalance = Number(creditBalance) + Number(creditAccrued);
  const usedCredits = calcCreditUsed(
    grossIncome,
    incomeFree,
    currentCreditBalance
  );

  const dpsPayment = calcDpsPayment(usedCredits);
  currentCreditBalance = currentCreditBalance - usedCredits;

  sectionCalcEl.classList.add('hidden');

  displayResults(creditAccrued, usedCredits, dpsPayment, currentCreditBalance);
});

clearBtnEl.addEventListener('click', function (e) {
  e.preventDefault();

  initForm();
});

recalcBtnEl.addEventListener('click', function (e) {
  e.preventDefault();

  initForm();

  resultsEl.classList.add('hidden');
  sectionCalcEl.classList.remove('hidden');
});
