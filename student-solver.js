/* =========================================
   CalcPro - Student Math Solver
   ========================================= */


/* ================================
   Helpers
================================ */

function studentFormat(value) {

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "Error";
    }

    if (Number.isInteger(number)) {
        return String(number);
    }

    return String(
        Number(number.toFixed(10))
    );
}


/* ================================
   GCD / HCF
================================ */

function studentGCD(a, b) {

    a = Math.abs(
        Math.trunc(Number(a))
    );

    b = Math.abs(
        Math.trunc(Number(b))
    );

    while (b !== 0) {

        const temp = b;

        b = a % b;
        a = temp;

    }

    return a;
}


/* ================================
   LCM
================================ */

function studentLCM(a, b) {

    a = Math.abs(
        Math.trunc(Number(a))
    );

    b = Math.abs(
        Math.trunc(Number(b))
    );

    if (a === 0 || b === 0) {
        return 0;
    }

    return Math.abs(
        a * b
    ) / studentGCD(a, b);
}


/* ================================
   Fraction Simplifier
================================ */

function simplifyFraction(
    numerator,
    denominator
) {

    numerator =
        Math.trunc(Number(numerator));

    denominator =
        Math.trunc(Number(denominator));


    if (denominator === 0) {

        throw new Error(
            "Denominator cannot be zero"
        );

    }


    if (numerator === 0) {

        return {
            numerator: 0,
            denominator: 1,
            value: 0,
            text: "0"
        };

    }


    const divisor =
        studentGCD(
            numerator,
            denominator
        );


    numerator /= divisor;
    denominator /= divisor;


    if (denominator < 0) {

        numerator *= -1;
        denominator *= -1;

    }


    return {

        numerator:
            numerator,

        denominator:
            denominator,

        value:
            numerator / denominator,

        text:
            numerator +
            "/" +
            denominator

    };

}


/* ================================
   Fraction Addition
================================ */

function addFractions(
    aNumerator,
    aDenominator,
    bNumerator,
    bDenominator
) {

    const commonDenominator =
        Number(aDenominator) *
        Number(bDenominator);


    const first =
        Number(aNumerator) *
        Number(bDenominator);


    const second =
        Number(bNumerator) *
        Number(aDenominator);


    const numerator =
        first + second;


    return simplifyFraction(
        numerator,
        commonDenominator
    );

}


/* ================================
   Fraction Subtraction
================================ */

function subtractFractions(
    aNumerator,
    aDenominator,
    bNumerator,
    bDenominator
) {

    const commonDenominator =
        Number(aDenominator) *
        Number(bDenominator);


    const first =
        Number(aNumerator) *
        Number(bDenominator);


    const second =
        Number(bNumerator) *
        Number(aDenominator);


    const numerator =
        first - second;


    return simplifyFraction(
        numerator,
        commonDenominator
    );

}


/* ================================
   Fraction Multiplication
================================ */

function multiplyFractions(
    aNumerator,
    aDenominator,
    bNumerator,
    bDenominator
) {

    return simplifyFraction(

        Number(aNumerator) *
        Number(bNumerator),

        Number(aDenominator) *
        Number(bDenominator)

    );

}


/* ================================
   Fraction Division
================================ */

function divideFractions(
    aNumerator,
    aDenominator,
    bNumerator,
    bDenominator
) {

    if (
        Number(bNumerator) === 0
    ) {

        throw new Error(
            "Cannot divide by zero"
        );

    }


    return simplifyFraction(

        Number(aNumerator) *
        Number(bDenominator),

        Number(aDenominator) *
        Number(bNumerator)

    );

}


/* ================================
   Percentage
================================ */

function solvePercentage(
    value,
    percent
) {

    const number =
        Number(value);

    const percentage =
        Number(percent);


    const result =
        number *
        percentage /
        100;


    return {

        value:
            number,

        percent:
            percentage,

        result:
            result,

        steps: [

            `${studentFormat(percentage)}% of ${studentFormat(number)}`,

            `= (${studentFormat(percentage)} ÷ 100) × ${studentFormat(number)}`,

            `= ${studentFormat(result)}`

        ]

    };

}


/* ================================
   Percentage Increase
================================ */

function percentageIncrease(
    value,
    percent
) {

    const number =
        Number(value);

    const percentage =
        Number(percent);


    const increase =
        number *
        percentage /
        100;


    const result =
        number + increase;


    return {

        original:
            number,

        increase:
            increase,

        final:
            result,

        steps: [

            `Increase = ${studentFormat(number)} × ${studentFormat(percent)} ÷ 100`,

            `Increase = ${studentFormat(increase)}`,

            `Final = ${studentFormat(number)} + ${studentFormat(increase)}`,

            `Final = ${studentFormat(result)}`

        ]

    };

}


/* ================================
   Percentage Decrease
================================ */

function percentageDecrease(
    value,
    percent
) {

    const number =
        Number(value);

    const percentage =
        Number(percent);


    const decrease =
        number *
        percentage /
        100;


    const result =
        number - decrease;


    return {

        original:
            number,

        decrease:
            decrease,

        final:
            result,

        steps: [

            `Decrease = ${studentFormat(number)} × ${studentFormat(percent)} ÷ 100`,

            `Decrease = ${studentFormat(decrease)}`,

            `Final = ${studentFormat(number)} - ${studentFormat(decrease)}`,

            `Final = ${studentFormat(result)}`

        ]

    };

}


/* ================================
   Ratio Simplifier
================================ */

function simplifyRatio(
    a,
    b
) {

    a = Number(a);
    b = Number(b);


    if (
        !Number.isFinite(a) ||
        !Number.isFinite(b)
    ) {

        throw new Error(
            "Invalid ratio"
        );

    }


    if (
        a === 0 &&
        b === 0
    ) {

        throw new Error(
            "Both ratio values cannot be zero"
        );

    }


    const divisor =
        studentGCD(a, b);


    const first =
        a / divisor;


    const second =
        b / divisor;


    return {

        first:
            first,

        second:
            second,

        text:
            `${studentFormat(first)} : ${studentFormat(second)}`,

        steps: [

            `${studentFormat(a)} : ${studentFormat(b)}`,

            `HCF = ${studentFormat(divisor)}`,

            `= ${studentFormat(a)} ÷ ${studentFormat(divisor)} : ${studentFormat(b)} ÷ ${studentFormat(divisor)}`,

            `= ${studentFormat(first)} : ${studentFormat(second)}`

        ]

    };

}


/* ================================
   Average
================================ */

function solveAverage(numbers) {

    if (
        !Array.isArray(numbers) ||
        numbers.length === 0
    ) {

        throw new Error(
            "Enter numbers"
        );

    }


    const values =
        numbers.map(Number);


    if (
        values.some(
            value =>
                !Number.isFinite(value)
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


    const average =
        total /
        values.length;


    return {

        total:
            total,

        count:
            values.length,

        average:
            average,

        steps: [

            `Numbers = ${values.join(", ")}`,

            `Sum = ${values.join(" + ")}`,

            `Sum = ${studentFormat(total)}`,

            `Average = ${studentFormat(total)} ÷ ${values.length}`,

            `Average = ${studentFormat(average)}`

        ]

    };

}


/* ================================
   Simple Linear Equation
   ax + b = c
================================ */

function solveLinearEquation(
    a,
    b,
    c
) {

    a = Number(a);
    b = Number(b);
    c = Number(c);


    if (
        !Number.isFinite(a) ||
        !Number.isFinite(b) ||
        !Number.isFinite(c)
    ) {

        throw new Error(
            "Invalid equation"
        );

    }


    if (a === 0) {

        if (b === c) {

            return {

                type:
                    "infinite",

                steps: [
                    `${studentFormat(b)} = ${studentFormat(c)}`,
                    "Statement is always true."
                ]

            };

        }


        return {

            type:
                "none",

            steps: [
                `${studentFormat(b)} = ${studentFormat(c)}`,
                "Statement is false.",
                "No solution."
            ]

        };

    }


    const x =
        (c - b) / a;


    return {

        x:
            x,

        steps: [

            `Equation: ${studentFormat(a)}x + ${studentFormat(b)} = ${studentFormat(c)}`,

            `Subtract ${studentFormat(b)} from both sides:`,

            `${studentFormat(a)}x = ${studentFormat(c)} - ${studentFormat(b)}`,

            `${studentFormat(a)}x = ${studentFormat(c - b)}`,

            `Divide both sides by ${studentFormat(a)}:`,

            `x = ${studentFormat(c - b)} ÷ ${studentFormat(a)}`,

            `x = ${studentFormat(x)}`

        ]

    };

}


/* ================================
   Square
================================ */

function solveSquare(value) {

    const number =
        Number(value);

    const result =
        number * number;


    return {

        result:
            result,

        steps: [

            `${studentFormat(number)}²`,

            `= ${studentFormat(number)} × ${studentFormat(number)}`,

            `= ${studentFormat(result)}`

        ]

    };

}


/* ================================
   Square Root
================================ */

function solveSquareRoot(value) {

    const number =
        Number(value);


    if (number < 0) {

        throw new Error(
            "Negative square root is not a real number"
        );

    }


    const result =
        Math.sqrt(number);


    return {

        result:
            result,

        steps: [

            `√${studentFormat(number)}`,

            `= ${studentFormat(result)}`

        ]

    };

}


/* ================================
   Power
================================ */

function solvePower(
    base,
    exponent
) {

    base =
        Number(base);

    exponent =
        Number(exponent);


    const result =
        Math.pow(
            base,
            exponent
        );


    return {

        result:
            result,

        steps: [

            `${studentFormat(base)}^${studentFormat(exponent)}`,

            `= ${Array(
                Math.max(
                    0,
                    Math.trunc(exponent)
                )
            )
            .fill(studentFormat(base))
            .join(" × ") || "1"}`,

            `= ${studentFormat(result)}`

        ]

    };

}


/* ================================
   BODMAS Evaluator
================================ */

function evaluateBODMAS(expression) {

    if (
        typeof expression !== "string" ||
        !expression.trim()
    ) {

        throw new Error(
            "Enter an expression"
        );

    }


    let clean =
        expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**");


    /*
      নিরাপদ সীমিত expression:
      numbers, decimal, + - * / % ** parentheses
    */

    if (
        !/^[0-9+\-*/%().\s*]+$/.test(
            clean
        )
    ) {

        throw new Error(
            "Expression contains unsupported characters"
        );

    }


    /*
      Function constructor ব্যবহার করার আগে
      allowed character check করা হচ্ছে।
    */

    let result;

    try {

        result =
            Function(
                `"use strict"; return (${clean})`
            )();

    } catch(error) {

        throw new Error(
            "Invalid mathematical expression"
        );

    }


    if (
        typeof result !== "number" ||
        !Number.isFinite(result)
    ) {

        throw new Error(
            "Calculation result is invalid"
        );

    }


    return {

        expression:
            expression,

        result:
            result,

        steps: [

            `Expression: ${expression}`,

            `Apply BODMAS order`,

            `Result = ${studentFormat(result)}`

        ]

    };

}


/* ================================
   Step Builder
================================ */

function createStudentSolution(
    title,
    steps,
    result
) {

    return {

        title:
            title,

        steps:
            steps,

        result:
            studentFormat(result)

    };

}


/* ================================
   Save Student Calculation
================================ */

function saveStudentCalculation(
    expression,
    result
) {

    if (
        typeof saveToHistory ===
        "function"
    ) {

        saveToHistory(
            expression,
            result,
            "Student"
        );

        return;

    }


    if (
        typeof saveCalculation ===
        "function"
    ) {

        saveCalculation(
            expression,
            result,
            "Student"
        );

    }

}


/* ================================
   Universal Student Solver
================================ */

function studentSolve(
    type,
    data
) {

    try {

        let solution;


        switch(type) {


            case "percentage":

                solution =
                    solvePercentage(
                        data.value,
                        data.percent
                    );

                break;


            case "percentage-increase":

                solution =
                    percentageIncrease(
                        data.value,
                        data.percent
                    );

                break;


            case "percentage-decrease":

                solution =
                    percentageDecrease(
                        data.value,
                        data.percent
                    );

                break;


            case "ratio":

                solution =
                    simplifyRatio(
                        data.a,
                        data.b
                    );

                break;


            case "average":

                solution =
                    solveAverage(
                        data.numbers
                    );

                break;


            case "fraction-add":

                solution =
                    addFractions(
                        data.aNumerator,
                        data.aDenominator,
                        data.bNumerator,
                        data.bDenominator
                    );

                break;


            case "fraction-subtract":

                solution =
                    subtractFractions(
                        data.aNumerator,
                        data.aDenominator,
                        data.bNumerator,
                        data.bDenominator
                    );

                break;


            case "fraction-multiply":

                solution =
                    multiplyFractions(
                        data.aNumerator,
                        data.aDenominator,
                        data.bNumerator,
                        data.bDenominator
                    );

                break;


            case "fraction-divide":

                solution =
                    divideFractions(
                        data.aNumerator,
                        data.aDenominator,
                        data.bNumerator,
                        data.bDenominator
                    );

                break;


            case "linear-equation":

                solution =
                    solveLinearEquation(
                        data.a,
                        data.b,
                        data.c
                    );

                break;


            case "square":

                solution =
                    solveSquare(
                        data.value
                    );

                break;


            case "square-root":

                solution =
                    solveSquareRoot(
                        data.value
                    );

                break;


            case "power":

                solution =
                    solvePower(
                        data.base,
                        data.exponent
                    );

                break;


            case "bodmas":

                solution =
                    evaluateBODMAS(
                        data.expression
                    );

                break;


            case "gcd":

                const gcd =
                    studentGCD(
                        data.a,
                        data.b
                    );

                solution = {

                    result:
                        gcd,

                    steps: [

                        `Numbers: ${data.a} and ${data.b}`,

                        `HCF / GCD = ${gcd}`

                    ]

                };

                break;


            case "lcm":

                const lcm =
                    studentLCM(
                        data.a,
                        data.b
                    );

                solution = {

                    result:
                        lcm,

                    steps: [

                        `Numbers: ${data.a} and ${data.b}`,

                        `LCM = ${lcm}`

                    ]

                };

                break;


            default:

                throw new Error(
                    "Unknown solver type"
                );

        }


        return {

            success:
                true,

            solution:
                solution

        };


    } catch(error) {

        return {

            success:
                false,

            error:
                error.message ||
                "Unable to solve"

        };

    }

}