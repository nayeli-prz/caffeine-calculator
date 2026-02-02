// State
let selectedMethod = null;
let selectedExtraction = 0;
let selectedTeaCaffeine = 0;
let totalWaterUnit = 'ml';
let drinkUnit = 'oz';
let teaUnit = 'ml';
let espressoShot = null;

// Elements
const brewMethods = document.querySelectorAll('.brew-method');
const moreOptionsToggle = document.getElementById('moreOptionsToggle');
const additionalMethods = document.getElementById('additionalMethods');
const coffeeInputs = document.getElementById('coffeeInputs');
const espressoInputs = document.getElementById('espressoInputs');
const teaInputs = document.getElementById('teaInputs');
const calculateBtn = document.getElementById('calculateBtn');
const emptyState = document.getElementById('emptyState');
const resultContent = document.getElementById('resultContent');
const caffeineAmount = document.getElementById('caffeineAmount');
const warningText = document.getElementById('warningText');
const accordionToggle = document.getElementById('accordionToggle');
const calculationDetails = document.getElementById('calculationDetails');
const formulaText = document.getElementById('formulaText');
const inputsText = document.getElementById('inputsText');
const clearBtn = document.getElementById('clearBtn');

// More options toggle
moreOptionsToggle.addEventListener('click', () => {
    additionalMethods.classList.toggle('expanded');
    moreOptionsToggle.textContent = additionalMethods.classList.contains('expanded')
        ? 'Less Options'
        : 'More Options';
});

// Brew method selection
brewMethods.forEach(method => {
    method.addEventListener('click', () => {
        brewMethods.forEach(m => m.classList.remove('selected'));
        method.classList.add('selected');

        selectedMethod = method.dataset.method;

        // Show/hide appropriate inputs
        if (method.dataset.tea) {
            selectedTeaCaffeine = parseFloat(method.dataset.tea);
            coffeeInputs.style.display = 'none';
            espressoInputs.classList.remove('visible');
            teaInputs.classList.add('visible');
        } else if (selectedMethod === 'espresso') {
            selectedExtraction = parseFloat(method.dataset.extraction);
            coffeeInputs.style.display = 'none';
            espressoInputs.classList.add('visible');
            teaInputs.classList.remove('visible');
        } else {
            selectedExtraction = parseFloat(method.dataset.extraction);
            coffeeInputs.style.display = 'block';
            espressoInputs.classList.remove('visible');
            teaInputs.classList.remove('visible');
        }

        validateInputs();
    });
});

// Espresso selection
const espressoBtns = document.querySelectorAll('.espresso-btn');
espressoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        espressoBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        espressoShot = btn.dataset.espresso;
        validateInputs();
    });
});

// Unit toggles
const unitBtns = document.querySelectorAll('.unit-btn');
unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const field = btn.dataset.field;
        const unit = btn.dataset.unit;

        // Update button states
        const siblings = btn.parentElement.querySelectorAll('.unit-btn');
        siblings.forEach(s => s.classList.remove('selected'));
        btn.classList.add('selected');

        // Update state
        if (field === 'totalWater') {
            const currentValue = parseFloat(totalWaterInput.value);

            // Convert the value if there's input
            if (currentValue && !isNaN(currentValue)) {
                // Convert current value to ml first
                let valueInMl = currentValue;
                if (totalWaterUnit === 'oz') {
                    valueInMl = currentValue * 29.5735;
                } else if (totalWaterUnit === 'cups') {
                    valueInMl = currentValue * 236.588;
                }

                // Convert from ml to the new unit
                let newValue = valueInMl;
                if (unit === 'oz') {
                    newValue = valueInMl / 29.5735;
                } else if (unit === 'cups') {
                    newValue = valueInMl / 236.588;
                }

                // Update the input with converted value
                totalWaterInput.value = newValue.toFixed(1);
            }

            totalWaterUnit = unit;

            // Recalculate ratio/beans when water unit changes
            if (ratioInput.value) {
                calculateFromRatio();
            } else if (beansInput.value) {
                updateRatioFromBeans();
            }
        }
        if (field === 'drink') drinkUnit = unit;
        if (field === 'tea') teaUnit = unit;
    });
});

// Input validation
const beansInput = document.getElementById('beansInput');
const totalWaterInput = document.getElementById('totalWaterInput');
const drinkInput = document.getElementById('drinkInput');
const teaWaterInput = document.getElementById('teaWaterInput');
const ratioInput = document.getElementById('ratioInput');

[beansInput, totalWaterInput, drinkInput, teaWaterInput].forEach(input => {
    input.addEventListener('input', validateInputs);
});

// Ratio calculation logic
let isUpdatingFromRatio = false;

totalWaterInput.addEventListener('input', () => {
    if (!isUpdatingFromRatio) {
        calculateFromRatio();
    }
});

ratioInput.addEventListener('input', () => {
    calculateFromRatio();
});

beansInput.addEventListener('input', () => {
    if (!isUpdatingFromRatio) {
        updateRatioFromBeans();
    }
});

function calculateFromRatio() {
    const water = parseFloat(totalWaterInput.value);
    const ratio = parseFloat(ratioInput.value);

    if (water && ratio && ratio > 0) {
        isUpdatingFromRatio = true;
        // Calculate beans: water (ml) / ratio = beans (g)
        let waterInMl = water;
        if (totalWaterUnit === 'oz') {
            waterInMl = water * 29.5735;
        } else if (totalWaterUnit === 'cups') {
            waterInMl = water * 236.588;
        }
        const calculatedBeans = waterInMl / ratio;
        beansInput.value = calculatedBeans.toFixed(1);
        isUpdatingFromRatio = false;
        validateInputs();
    }
}

function updateRatioFromBeans() {
    const water = parseFloat(totalWaterInput.value);
    const beans = parseFloat(beansInput.value);

    if (water && beans && beans > 0) {
        isUpdatingFromRatio = true;
        // Calculate ratio: water (ml) / beans (g) = ratio
        let waterInMl = water;
        if (totalWaterUnit === 'oz') {
            waterInMl = water * 29.5735;
        } else if (totalWaterUnit === 'cups') {
            waterInMl = water * 236.588;
        }
        const calculatedRatio = waterInMl / beans;
        ratioInput.value = calculatedRatio.toFixed(1);
        isUpdatingFromRatio = false;
    }
}

function validateInputs() {
    let isValid = false;

    if (selectedMethod) {
        if (selectedMethod === 'espresso') {
            isValid = espressoShot !== null;
        } else if (selectedTeaCaffeine > 0) {
            isValid = teaWaterInput.value && parseFloat(teaWaterInput.value) > 0;
        } else {
            isValid = beansInput.value && parseFloat(beansInput.value) > 0 &&
                      totalWaterInput.value && parseFloat(totalWaterInput.value) > 0 &&
                      drinkInput.value && parseFloat(drinkInput.value) > 0;
        }
    }

    calculateBtn.disabled = !isValid;
}

// Calculate caffeine
calculateBtn.addEventListener('click', () => {
    let caffeine = 0;
    let formula = '';
    let inputs = '';

    if (selectedMethod === 'espresso') {
        const caffeinePerShot = 70; // average
        caffeine = espressoShot === 'single' ? caffeinePerShot : caffeinePerShot * 2;
        formula = `Espresso shot caffeine = ${caffeinePerShot}mg per shot`;
        inputs = `${espressoShot === 'single' ? 'Single' : 'Double'} shot = ${caffeine}mg`;
    } else if (selectedTeaCaffeine > 0) {
        const waterMl = teaUnit === 'oz'
            ? parseFloat(teaWaterInput.value) * 29.5735
            : parseFloat(teaWaterInput.value);
        const caffeinePerOz = selectedTeaCaffeine / 8; // caffeine per oz
        caffeine = (waterMl / 29.5735) * caffeinePerOz;

        const methodName = selectedMethod === 'chai' ? 'Chai Tea' :
                         selectedMethod === 'earlgrey' ? 'Earl Grey Tea' : 'Green Tea';
        formula = `${methodName} caffeine = ~${selectedTeaCaffeine}mg per 8oz`;
        inputs = `${teaWaterInput.value}${teaUnit} × ${caffeinePerOz.toFixed(1)}mg/oz = ${Math.round(caffeine)}mg`;
    } else {
        const beans = parseFloat(beansInput.value);
        let totalWaterMl = parseFloat(totalWaterInput.value);
        if (totalWaterUnit === 'oz') {
            totalWaterMl = totalWaterMl * 29.5735;
        } else if (totalWaterUnit === 'cups') {
            totalWaterMl = totalWaterMl * 236.588;
        }
        const drinkMl = drinkUnit === 'oz'
            ? parseFloat(drinkInput.value) * 29.5735
            : parseFloat(drinkInput.value);

        const caffeinePerGram = 11;
        const totalCaffeine = beans * caffeinePerGram;
        const extractedCaffeine = totalCaffeine * selectedExtraction;
        const consumedCaffeine = extractedCaffeine * (drinkMl / totalWaterMl);

        caffeine = consumedCaffeine;

        const methodName = selectedMethod === 'pourover' ? 'Pour Over' :
                         selectedMethod === 'mokapot' ? 'Moka Pot' :
                         selectedMethod === 'drip' ? 'Drip Coffee' : 'French Press';

        formula = `(grams of beans × 11mg caffeine per gram) × ${(selectedExtraction * 100).toFixed(0)}% extraction (${methodName}) × (amount drunk ÷ total brewed)`;
        inputs = `(${beans}g × 11mg/g) × ${selectedExtraction} × (${drinkInput.value}${drinkUnit} ÷ ${totalWaterInput.value}${totalWaterUnit}) = ${Math.round(caffeine)}mg`;
    }

    // Display results
    const roundedCaffeine = Math.round(caffeine);
    caffeineAmount.textContent = roundedCaffeine + 'mg';

    // Set color based on amount
    caffeineAmount.className = 'caffeine-amount';
    if (roundedCaffeine < 100) {
        caffeineAmount.classList.add('safe');
    } else if (roundedCaffeine >= 100 && roundedCaffeine < 140) {
        caffeineAmount.classList.add('moderate');
    } else if (roundedCaffeine >= 140 && roundedCaffeine < 200) {
        caffeineAmount.classList.add('warning');
        warningText.classList.add('visible');
    } else {
        caffeineAmount.classList.add('danger');
        warningText.classList.add('visible');
    }

    // Update calculation details
    formulaText.textContent = formula;
    inputsText.textContent = inputs;

    // Show results
    emptyState.style.display = 'none';
    resultContent.classList.add('visible');
});

// Accordion toggle
accordionToggle.addEventListener('click', () => {
    accordionToggle.classList.toggle('expanded');
    calculationDetails.classList.toggle('visible');
});

// Clear button
clearBtn.addEventListener('click', () => {
    // Reset all inputs
    beansInput.value = '';
    totalWaterInput.value = '';
    drinkInput.value = '';
    teaWaterInput.value = '';
    ratioInput.value = '';

    // Reset selections
    brewMethods.forEach(m => m.classList.remove('selected'));
    espressoBtns.forEach(b => b.classList.remove('selected'));

    // Reset state
    selectedMethod = null;
    selectedExtraction = 0;
    selectedTeaCaffeine = 0;
    espressoShot = null;

    // Hide results
    resultContent.classList.remove('visible');
    emptyState.style.display = 'block';
    warningText.classList.remove('visible');
    accordionToggle.classList.remove('expanded');
    calculationDetails.classList.remove('visible');

    // Reset inputs visibility
    coffeeInputs.style.display = 'block';
    espressoInputs.classList.remove('visible');
    teaInputs.classList.remove('visible');

    validateInputs();
});
