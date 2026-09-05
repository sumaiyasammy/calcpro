/* =========================================
   CalcPro - Scientific Calculator Engine
   ========================================= */


/* ---------- Constants ---------- */

const CALCPRO_PI = Math.PI;
const CALCPRO_E = Math.E;


/* ---------- Validation ---------- */

function scientificNumber(value) {

    const n = Number(value);

    if (!Number.isFinite(n)) {
        throw new Error("Invalid number");
    }

    return n;
}


/* ---------- Degrees / Radians ---------- */

function toRadians(degrees) {
    return scientificNumber(degrees) * Math.PI / 180;
}

function toDegrees(radians) {
    return scientificNumber(radians) * 180 / Math.PI;
}


/* ---------- Trigonometry ---------- */

function scientificSin(value, angleMode = "DEG") {

    const n = scientificNumber(value);

    return angleMode === "RAD"
        ? Math.sin(n)
        : Math.sin(toRadians(n));
}


function scientificCos(value, angleMode = "DEG") {

    const n = scientificNumber(value);

    return angleMode === "RAD"
        ? Math.cos(n)
        : Math.cos(toRadians(n));
}


function scientificTan(value, angleMode = "DEG") {

    const n = scientificNumber(value);

    return angleMode === "RAD"
        ? Math.tan(n)
        : Math.tan(toRadians(n));
}


/* ---------- Inverse Trigonometry ---------- */

function scientificAsin(value, angleMode = "DEG") {

    const n = scientificNumber(value);

    if (n < -1 || n > 1) {
        throw new Error(
            "asin input must be between -1 and 1"
        );
    }

    const result = Math.asin(n);

    return angleMode === "RAD"
        ? result
        : toDegrees(result);
}


function scientificAcos(value, angleMode = "DEG") {

    const n = scientificNumber(value);

    if (n < -1 || n > 1) {
        throw new Error(
            "acos input must be between -1 and 1"
        );
    }

    const result = Math.acos(n);

    return angleMode === "RAD"
        ? result
        : toDegrees(result);
}


function scientificAtan(value, angleMode = "DEG") {

    const n = scientificNumber(value);

    const result = Math.atan(n);

    return angleMode === "RAD"
        ? result
        : toDegrees(result);
}


/* ---------- Hyperbolic Functions ---------- */

function scientificSinh(value) {
    return Math.sinh(
        scientificNumber(value)
    );
}


function scientificCosh(value) {
    return Math.cosh(
        scientificNumber(value)
    );
}


function scientificTanh(value) {
    return Math.tanh(
        scientificNumber(value)
    );
}


/* ---------- Powers ---------- */

function scientificPower(
    base,
    exponent
) {

    const a =
        scientificNumber(base);

    const b =
        scientificNumber(exponent);

    const result =
        Math.pow(a, b);

    if (!Number.isFinite(result)) {
        throw new Error(
            "Result is too large"
        );
    }

    return result;
}


/* ---------- Square ---------- */

function scientificSquare(value) {

    const n =
        scientificNumber(value);

    return n * n;
}


/* ---------- Cube ---------- */

function scientificCube(value) {

    const n =
        scientificNumber(value);

    return n * n * n;
}


/* ---------- Square Root ---------- */

function scientificSqrt(value) {

    const n =
        scientificNumber(value);

    if (n < 0) {
        throw new Error(
            "Square root requires a non-negative number"
        );
    }

    return Math.sqrt(n);
}


/* ---------- Cube Root ---------- */

function scientificCbrt(value) {

    const n =
        scientificNumber(value);

    return Math.cbrt(n);
}


/* ---------- Nth Root ---------- */

function scientificNthRoot(
    value,
    root
) {

    const n =
        scientificNumber(value);

    const r =
        scientificNumber(root);

    if (r === 0) {
        throw new Error(
            "Root cannot be zero"
        );
    }

    if (
        n < 0 &&
        Number.isInteger(r) &&
        Math.abs(r % 2) === 1
    ) {

        return -Math.pow(
            Math.abs(n),
            1 / r
        );

    }

    if (n < 0) {
        throw new Error(
            "Invalid real root"
        );
    }

    return Math.pow(
        n,
        1 / r
    );
}


/* ---------- Logarithm ---------- */

function scientificLog(value) {

    const n =
        scientificNumber(value);

    if (n <= 0) {
        throw new Error(
            "Log requires a positive number"
        );
    }

    return Math.log10(n);
}


/* ---------- Natural Log ---------- */

function scientificLn(value) {

    const n =
        scientificNumber(value);

    if (n <= 0) {
        throw new Error(
            "Ln requires a positive number"
        );
    }

    return Math.log(n);
}


/* ---------- Log with Custom Base ---------- */

function scientificLogBase(
    value,
    base
) {

    const n =
        scientificNumber(value);

    const b =
        scientificNumber(base);

    if (n <= 0) {
        throw new Error(
            "Value must be positive"
        );
    }

    if (
        b <= 0 ||
        b === 1
    ) {
        throw new Error(
            "Invalid logarithm base"
        );
    }

    return Math.log(n) / Math.log(b);
}


/* ---------- Factorial ---------- */

function scientificFactorial(value) {

    const n =
        Math.trunc(
            scientificNumber(value)
        );

    if (n < 0) {
        throw new Error(
            "Factorial requires a non-negative integer"
        );
    }

    if (n > 170) {
        throw new Error(
            "Number is too large"
        );
    }

    let result = 1;

    for (
        let i = 2;
        i <= n;
        i++
    ) {
        result *= i;
    }

    return result;
}


/* ---------- Percentage ---------- */

function scientificPercent(value) {

    return scientificNumber(value) / 100;
}


/* ---------- Reciprocal ---------- */

function scientificReciprocal(value) {

    const n =
        scientificNumber(value);

    if (n === 0) {
        throw new Error(
            "Cannot divide by zero"
        );
    }

    return 1 / n;
}


/* ---------- Absolute Value ---------- */

function scientificAbs(value) {

    return Math.abs(
        scientificNumber(value)
    );
}


/* ---------- Floor ---------- */

function scientificFloor(value) {

    return Math.floor(
        scientificNumber(value)
    );
}


/* ---------- Ceiling ---------- */

function scientificCeil(value) {

    return Math.ceil(
        scientificNumber(value)
    );
}


/* ---------- Round ---------- */

function scientificRound(value) {

    return Math.round(
        scientificNumber(value)
    );
}


/* ---------- Random ---------- */

function scientificRandom() {

    return Math.random();
}


/* ---------- Combinations ---------- */

function scientificCombination(
    n,
    r
) {

    n = Math.trunc(
        scientificNumber(n)
    );

    r = Math.trunc(
        scientificNumber(r)
    );

    if (
        n < 0 ||
        r < 0 ||
        r > n
    ) {
        throw new Error(
            "Invalid n or r"
        );
    }

    return (
        scientificFactorial(n) /
        (
            scientificFactorial(r) *
            scientificFactorial(n - r)
        )
    );
}


/* ---------- Permutations ---------- */

function scientificPermutation(
    n,
    r
) {

    n = Math.trunc(
        scientificNumber(n)
    );

    r = Math.trunc(
        scientificNumber(r)
    );

    if (
        n < 0 ||
        r < 0 ||
        r > n
    ) {
        throw new Error(
            "Invalid n or r"
        );
    }

    return (
        scientificFactorial(n) /
        scientificFactorial(n - r)
    );
}


/* ---------- Scientific Notation ---------- */

function toScientificNotation(value) {

    const n =
        scientificNumber(value);

    return n.toExponential();
}


/* ---------- Number Formatting ---------- */

function formatScientificNumber(
    value,
    decimals = 10
) {

    const n =
        Number(value);

    if (!Number.isFinite(n)) {
        return "Error";
    }

    return Number(
        n.toFixed(decimals)
    ).toString();
}


/* ---------- Universal Scientific Solver ---------- */

function scientificSolve(
    type,
    data
) {

    try {

        let result;

        switch (type) {

            case "sin":

                result =
                    scientificSin(
                        data.value,
                        data.angleMode
                    );

                break;


            case "cos":

                result =
                    scientificCos(
                        data.value,
                        data.angleMode
                    );

                break;


            case "tan":

                result =
                    scientificTan(
                        data.value,
                        data.angleMode
                    );

                break;


            case "asin":

                result =
                    scientificAsin(
                        data.value,
                        data.angleMode
                    );

                break;


            case "acos":

                result =
                    scientificAcos(
                        data.value,
                        data.angleMode
                    );

                break;


            case "atan":

                result =
                    scientificAtan(
                        data.value,
                        data.angleMode
                    );

                break;


            case "sinh":

                result =
                    scientificSinh(
                        data.value
                    );

                break;


            case "cosh":

                result =
                    scientificCosh(
                        data.value
                    );

                break;


            case "tanh":

                result =
                    scientificTanh(
                        data.value
                    );

                break;


            case "power":

                result =
                    scientificPower(
                        data.base,
                        data.exponent
                    );

                break;


            case "square":

                result =
                    scientificSquare(
                        data.value
                    );

                break;


            case "cube":

                result =
                    scientificCube(
                        data.value
                    );

                break;


            case "sqrt":

                result =
                    scientificSqrt(
                        data.value
                    );

                break;


            case "cbrt":

                result =
                    scientificCbrt(
                        data.value
                    );

                break;


            case "nth-root":

                result =
                    scientificNthRoot(
                        data.value,
                        data.root
                    );

                break;


            case "log":

                result =
                    scientificLog(
                        data.value
                    );

                break;


            case "ln":

                result =
                    scientificLn(
                        data.value
                    );

                break;


            case "log-base":

                result =
                    scientificLogBase(
                        data.value,
                        data.base
                    );

                break;


            case "factorial":

                result =
                    scientificFactorial(
                        data.value
                    );

                break;


            case "percent":

                result =
                    scientificPercent(
                        data.value
                    );

                break;


            case "reciprocal":

                result =
                    scientificReciprocal(
                        data.value
                    );

                break;


            case "absolute":

                result =
                    scientificAbs(
                        data.value
                    );

                break;


            case "floor":

                result =
                    scientificFloor(
                        data.value
                    );

                break;


            case "ceil":

                result =
                    scientificCeil(
                        data.value
                    );

                break;


            case "round":

                result =
                    scientificRound(
                        data.value
                    );

                break;


            case "combination":

                result =
                    scientificCombination(
                        data.n,
                        data.r
                    );

                break;


            case "permutation":

                result =
                    scientificPermutation(
                        data.n,
                        data.r
                    );

                break;


            default:

                throw new Error(
                    "Unknown scientific operation"
                );
        }


        return {

            success: true,

            result:
                formatScientificNumber(
                    result
                )

        };


    } catch (error) {

        return {

            success: false,

            result: "Error",

            error:
                error.message ||
                "Calculation failed"

        };

    }

}