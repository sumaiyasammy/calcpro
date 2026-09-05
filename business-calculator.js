/* =========================================
   CalcPro - Business Calculator Engine
   ========================================= */


/* ---------- Basic Validation ---------- */

function businessNumber(value) {
    const n = Number(value);

    if (!Number.isFinite(n)) {
        throw new Error("Invalid number");
    }

    return n;
}


/* ---------- Profit / Loss ---------- */

function calculateBusinessProfit(costPrice, sellingPrice) {

    const cost = businessNumber(costPrice);
    const selling = businessNumber(sellingPrice);

    const difference = selling - cost;

    const profitPercent =
        cost === 0 ? 0 : (difference / cost) * 100;

    const marginPercent =
        selling === 0 ? 0 : (difference / selling) * 100;

    return {
        costPrice: cost,
        sellingPrice: selling,
        profit: Math.max(difference, 0),
        loss: Math.max(-difference, 0),
        profitPercent: profitPercent,
        marginPercent: marginPercent,
        type:
            difference > 0
                ? "Profit"
                : difference < 0
                    ? "Loss"
                    : "No Profit / No Loss"
    };
}


/* ---------- Discount ---------- */

function calculateBusinessDiscount(
    originalPrice,
    discountValue,
    discountType = "percentage"
) {

    const price = businessNumber(originalPrice);
    const value = businessNumber(discountValue);

    let discountAmount;

    if (discountType === "fixed") {

        discountAmount = value;

    } else {

        discountAmount =
            price * value / 100;

    }

    if (discountAmount < 0) {
        throw new Error("Discount cannot be negative");
    }

    if (discountAmount > price) {
        discountAmount = price;
    }

    const finalPrice =
        price - discountAmount;

    const actualPercentage =
        price === 0
            ? 0
            : discountAmount / price * 100;

    return {
        originalPrice: price,
        discountAmount: discountAmount,
        discountPercent: actualPercentage,
        finalPrice: finalPrice
    };
}


/* ---------- VAT ---------- */

function calculateBusinessVAT(
    amount,
    vatPercent
) {

    const value = businessNumber(amount);
    const percent = businessNumber(vatPercent);

    const vat =
        value * percent / 100;

    return {
        amount: value,
        vatPercent: percent,
        vatAmount: vat,
        total: value + vat
    };
}


/* ---------- VAT Inclusive ---------- */

function calculateVATInclusive(
    totalAmount,
    vatPercent
) {

    const total = businessNumber(totalAmount);
    const percent = businessNumber(vatPercent);

    if (percent <= -100) {
        throw new Error("Invalid VAT rate");
    }

    const base =
        total / (1 + percent / 100);

    const vat =
        total - base;

    return {
        total: total,
        baseAmount: base,
        vatAmount: vat,
        vatPercent: percent
    };
}


/* ---------- Commission ---------- */

function calculateCommission(
    amount,
    commissionPercent
) {

    const value = businessNumber(amount);
    const percent = businessNumber(commissionPercent);

    const commission =
        value * percent / 100;

    return {
        amount: value,
        commissionPercent: percent,
        commission: commission,
        afterCommission: value - commission
    };
}


/* ---------- Markup ---------- */

function calculateMarkup(
    costPrice,
    markupPercent
) {

    const cost = businessNumber(costPrice);
    const percent = businessNumber(markupPercent);

    const markup =
        cost * percent / 100;

    const sellingPrice =
        cost + markup;

    return {
        costPrice: cost,
        markupPercent: percent,
        markupAmount: markup,
        sellingPrice: sellingPrice
    };
}


/* ---------- Revenue ---------- */

function calculateRevenue(
    unitPrice,
    quantity
) {

    const price = businessNumber(unitPrice);
    const qty = businessNumber(quantity);

    if (qty < 0) {
        throw new Error(
            "Quantity cannot be negative"
        );
    }

    return {
        unitPrice: price,
        quantity: qty,
        revenue: price * qty
    };
}


/* ---------- Unit Price ---------- */

function calculateUnitPrice(
    totalCost,
    quantity
) {

    const cost = businessNumber(totalCost);
    const qty = businessNumber(quantity);

    if (qty === 0) {
        throw new Error(
            "Quantity cannot be zero"
        );
    }

    return {
        totalCost: cost,
        quantity: qty,
        unitPrice: cost / qty
    };
}


/* ---------- Break Even ---------- */

function calculateBreakEven(
    fixedCost,
    sellingPricePerUnit,
    variableCostPerUnit
) {

    const fixed = businessNumber(fixedCost);
    const selling = businessNumber(
        sellingPricePerUnit
    );
    const variable = businessNumber(
        variableCostPerUnit
    );

    const contribution =
        selling - variable;

    if (contribution <= 0) {
        throw new Error(
            "Selling price must be greater than variable cost"
        );
    }

    const units =
        fixed / contribution;

    const sales =
        units * selling;

    return {
        fixedCost: fixed,
        sellingPricePerUnit: selling,
        variableCostPerUnit: variable,
        contributionPerUnit: contribution,
        breakEvenUnits: units,
        breakEvenSales: sales
    };
}


/* ---------- Salary / Deduction ---------- */

function calculateNetAmount(
    grossAmount,
    deductions = []
) {

    const gross =
        businessNumber(grossAmount);

    if (!Array.isArray(deductions)) {
        deductions = [];
    }

    const values =
        deductions.map(item =>
            businessNumber(item)
        );

    const totalDeduction =
        values.reduce(
            (sum, value) =>
                sum + value,
            0
        );

    return {
        grossAmount: gross,
        totalDeduction: totalDeduction,
        netAmount:
            gross - totalDeduction
    };
}


/* ---------- Tax ---------- */

function calculateSimpleTax(
    amount,
    taxPercent
) {

    const value = businessNumber(amount);
    const percent = businessNumber(taxPercent);

    const tax =
        value * percent / 100;

    return {
        amount: value,
        taxPercent: percent,
        taxAmount: tax,
        afterTax: value - tax
    };
}


/* ---------- Loan / Installment ---------- */

function calculateSimpleInstallment(
    principal,
    months,
    annualInterestRate = 0
) {

    const p = businessNumber(principal);
    const n = Math.trunc(
        businessNumber(months)
    );
    const annualRate =
        businessNumber(annualInterestRate);

    if (n <= 0) {
        throw new Error(
            "Months must be greater than zero"
        );
    }

    if (annualRate === 0) {

        return {
            principal: p,
            months: n,
            interest: 0,
            total: p,
            monthlyPayment: p / n
        };
    }

    const monthlyRate =
        annualRate / 100 / 12;

    const monthlyPayment =
        p *
        monthlyRate *
        Math.pow(
            1 + monthlyRate,
            n
        ) /
        (
            Math.pow(
                1 + monthlyRate,
                n
            ) - 1
        );

    const total =
        monthlyPayment * n;

    return {
        principal: p,
        months: n,
        annualInterestRate: annualRate,
        monthlyPayment: monthlyPayment,
        total: total,
        interest: total - p
    };
}


/* ---------- Business Summary ---------- */

function createBusinessSummary(data) {

    const result = {};

    if (
        data.costPrice !== undefined &&
        data.sellingPrice !== undefined
    ) {

        result.profitLoss =
            calculateBusinessProfit(
                data.costPrice,
                data.sellingPrice
            );
    }


    if (
        data.originalPrice !== undefined &&
        data.discountValue !== undefined
    ) {

        result.discount =
            calculateBusinessDiscount(
                data.originalPrice,
                data.discountValue,
                data.discountType ||
                    "percentage"
            );
    }


    if (
        data.vatAmount !== undefined &&
        data.vatPercent !== undefined
    ) {

        result.vat =
            calculateBusinessVAT(
                data.vatAmount,
                data.vatPercent
            );
    }


    if (
        data.commissionAmount !== undefined &&
        data.commissionPercent !== undefined
    ) {

        result.commission =
            calculateCommission(
                data.commissionAmount,
                data.commissionPercent
            );
    }


    return result;
}


/* ---------- Format Money ---------- */

function formatBusinessNumber(
    value,
    decimals = 2
) {

    const n = Number(value);

    if (!Number.isFinite(n)) {
        return "Error";
    }

    return n.toLocaleString(
        undefined,
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimals
        }
    );
}


/* ---------- Save Business Result ---------- */

function saveBusinessCalculation(
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
            "Business"
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
            "Business"
        );
    }
}


/* ---------- Universal Business Solver ---------- */

function businessSolve(type, data) {

    try {

        let result;

        switch (type) {

            case "profit":
                result =
                    calculateBusinessProfit(
                        data.costPrice,
                        data.sellingPrice
                    );
                break;


            case "discount":
                result =
                    calculateBusinessDiscount(
                        data.originalPrice,
                        data.discountValue,
                        data.discountType
                    );
                break;


            case "vat":
                result =
                    calculateBusinessVAT(
                        data.amount,
                        data.vatPercent
                    );
                break;


            case "vat-inclusive":
                result =
                    calculateVATInclusive(
                        data.totalAmount,
                        data.vatPercent
                    );
                break;


            case "commission":
                result =
                    calculateCommission(
                        data.amount,
                        data.commissionPercent
                    );
                break;


            case "markup":
                result =
                    calculateMarkup(
                        data.costPrice,
                        data.markupPercent
                    );
                break;


            case "revenue":
                result =
                    calculateRevenue(
                        data.unitPrice,
                        data.quantity
                    );
                break;


            case "unit-price":
                result =
                    calculateUnitPrice(
                        data.totalCost,
                        data.quantity
                    );
                break;


            case "break-even":
                result =
                    calculateBreakEven(
                        data.fixedCost,
                        data.sellingPricePerUnit,
                        data.variableCostPerUnit
                    );
                break;


            case "tax":
                result =
                    calculateSimpleTax(
                        data.amount,
                        data.taxPercent
                    );
                break;


            case "installment":
                result =
                    calculateSimpleInstallment(
                        data.principal,
                        data.months,
                        data.annualInterestRate
                    );
                break;


            default:
                throw new Error(
                    "Unknown business calculation"
                );
        }


        return {
            success: true,
            result: result
        };


    } catch (error) {

        return {
            success: false,
            error:
                error.message ||
                "Calculation failed"
        };

    }

}