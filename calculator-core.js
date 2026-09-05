/* =========================================
   CalcPro - Calculator Core
   ========================================= */

const CALCPRO_CORE_HISTORY_KEY = "calcpro_history";


/* ================================
   Number Formatting
================================ */

function formatNumber(value) {

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "Error";
    }

    if (Number.isInteger(number)) {
        return String(number);
    }

    return String(
        Number(
            number.toFixed(12)
        )
    );
}


/* ================================
   Basic Operations
================================ */

function add(a, b) {
    return Number(a) + Number(b);
}


function subtract(a, b) {
    return Number(a) - Number(b);
}


function multiply(a, b) {
    return Number(a) * Number(b);
}


function divide(a, b) {

    if (Number(b) === 0) {
        throw new Error(
            "Cannot divide by zero"
        );
    }

    return Number(a) / Number(b);
}


/* ================================
   Percentage
================================ */

function percentage(value) {

    return Number(value) / 100;

}


/* ================================
   Power
================================ */

function power(base, exponent) {

    return Math.pow(
        Number(base),
        Number(exponent)
    );

}


/* ================================
   Square
================================ */

function square(value) {

    return Math.pow(
        Number(value),
        2
    );

}


/* ================================
   Square Root
================================ */

function squareRoot(value) {

    if (Number(value) < 0) {

        throw new Error(
            "Square root of a negative number is not real"
        );

    }

    return Math.sqrt(
        Number(value)
    );

}


/* ================================
   Average
================================ */

function average(numbers) {

    if (
        !Array.isArray(numbers) ||
        numbers.length === 0
    ) {

        throw new Error(
            "Enter at least one number"
        );

    }

    const values =
        numbers.map(Number);

    if (
        values.some(
            value => !Number.isFinite(value)
        )
    ) {

        throw new Error(
            "Invalid number"
        );

    }

    const total =
        values.reduce(
            (sum, value) =>
                sum + value,
            0
        );

    return total / values.length;

}


/* ================================
   Percentage Change
================================ */

function percentageChange(
    oldValue,
    newValue
) {

    const oldNumber =
        Number(oldValue);

    const newNumber =
        Number(newValue);

    if (oldNumber === 0) {

        throw new Error(
            "Original value cannot be zero"
        );

    }

    return (
        (newNumber - oldNumber) /
        Math.abs(oldNumber)
    ) * 100;

}


/* ================================
   GCD / HCF
================================ */

function gcd(a, b) {

    a = Math.abs(
        Math.trunc(Number(a))
    );

    b = Math.abs(
        Math.trunc(Number(b))
    );

    while (b !== 0) {

        const remainder =
            a % b;

        a = b;
        b = remainder;

    }

    return a;

}


/* ================================
   LCM
================================ */

function lcm(a, b) {

    a = Math.trunc(Number(a));
    b = Math.trunc(Number(b));

    if (a === 0 || b === 0) {
        return 0;
    }

    return Math.abs(
        a * b
    ) / gcd(a, b);

}


/* ================================
   Factorial
================================ */

function factorial(number) {

    number =
        Math.trunc(
            Number(number)
        );

    if (number < 0) {

        throw new Error(
            "Factorial requires a positive number"
        );

    }

    if (number > 170) {

        throw new Error(
            "Number is too large"
        );

    }

    let result = 1;

    for (
        let i = 2;
        i <= number;
        i++
    ) {

        result *= i;

    }

    return result;

}


/* ================================
   Discount
================================ */

function calculateDiscount(
    price,
    discountPercent
) {

    const original =
        Number(price);

    const percent =
        Number(discountPercent);

    const discount =
        original *
        percent /
        100;

    const finalPrice =
        original - discount;

    return {

        originalPrice:
            original,

        discount:
            discount,

        finalPrice:
            finalPrice,

        discountPercent:
            percent

    };

}


/* ================================
   Profit
================================ */

function calculateProfit(
    costPrice,
    sellingPrice
) {

    const cost =
        Number(costPrice);

    const selling =
        Number(sellingPrice);

    const profit =
        selling - cost;

    const profitPercent =
        cost === 0
            ? 0
            : (
                profit /
                cost
            ) * 100;

    return {

        costPrice:
            cost,

        sellingPrice:
            selling,

        profit:
            profit,

        profitPercent:
            profitPercent

    };

}


/* ================================
   VAT
================================ */

function calculateVAT(
    amount,
    vatPercent
) {

    const value =
        Number(amount);

    const percent =
        Number(vatPercent);

    const vat =
        value *
        percent /
        100;

    return {

        amount:
            value,

        vat:
            vat,

        total:
            value + vat

    };

}


/* ================================
   History
================================ */

function saveToHistory(
    expression,
    result,
    mode = "General"
) {

    let history = [];

    try {

        history =
            JSON.parse(
                localStorage.getItem(
                    CALCPRO_CORE_HISTORY_KEY
                ) || "[]"
            );

    } catch(error) {

        history = [];

    }


    if (!Array.isArray(history)) {
        history = [];
    }


    history.unshift({

        expression:
            String(expression),

        result:
            String(result),

        mode:
            String(mode),

        time:
            new Date().toISOString()

    });


    history =
        history.slice(0, 100);


    localStorage.setItem(
        CALCPRO_CORE_HISTORY_KEY,
        JSON.stringify(history)
    );

}


/* ================================
   Safe Calculation
================================ */

function safeCalculate(
    calculationFunction
) {

    try {

        const result =
            calculationFunction();

        return {

            success:
                true,

            result:
                formatNumber(result)

        };

    } catch(error) {

        return {

            success:
                false,

            result:
                "Error",

            message:
                error.message ||
                "Invalid calculation"

        };

    }

}