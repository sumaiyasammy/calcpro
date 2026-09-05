/* =========================================
   CalcPro - Master Engine
   ========================================= */

const CalcProEngine = {

    /* ---------- General ---------- */

    general(expression) {

        if (
            typeof expression !== "string" ||
            !expression.trim()
        ) {
            throw new Error("Expression is empty");
        }

        const clean = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")
            .replace(/\^/g, "**");

        /*
         * শুধুমাত্র সাধারণ mathematical characters
         * অনুমোদন করা হচ্ছে।
         */

        if (!/^[0-9+\-*/%().\s*]+$/.test(clean)) {
            throw new Error(
                "Invalid characters in expression"
            );
        }

        let result;

        try {

            result = Function(
                `"use strict"; return (${clean})`
            )();

        } catch (error) {

            throw new Error(
                "Invalid calculation"
            );

        }

        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {
            throw new Error(
                "Invalid calculation result"
            );
        }

        return {
            expression: expression,
            result: result,
            displayResult:
                CalcProEngine.format(result)
        };
    },


    /* ---------- Student ---------- */

    student(type, data) {

        if (
            typeof studentSolve !== "function"
        ) {
            throw new Error(
                "Student Solver is not loaded"
            );
        }

        return studentSolve(
            type,
            data
        );
    },


    /* ---------- Business ---------- */

    business(type, data) {

        if (
            typeof businessSolve !== "function"
        ) {
            throw new Error(
                "Business Calculator is not loaded"
            );
        }

        return businessSolve(
            type,
            data
        );
    },


    /* ---------- Scientific ---------- */

    scientific(type, data) {

        if (
            typeof scientificSolve !== "function"
        ) {
            throw new Error(
                "Scientific Calculator is not loaded"
            );
        }

        return scientificSolve(
            type,
            data
        );
    },


    /* ---------- Format ---------- */

    format(value) {

        const number =
            Number(value);

        if (
            !Number.isFinite(number)
        ) {
            return "Error";
        }

        if (
            Number.isInteger(number)
        ) {
            return String(number);
        }

        return String(
            Number(
                number.toFixed(12)
            )
        );
    },


    /* ---------- History ---------- */

    saveHistory(
        expression,
        result,
        mode = "General"
    ) {

        const item = {

            expression:
                String(expression),

            result:
                String(result),

            mode:
                String(mode),

            time:
                new Date().toISOString()

        };


        let history = [];

        try {

            history =
                JSON.parse(
                    localStorage.getItem(
                        "calcpro_history"
                    ) || "[]"
                );

        } catch (error) {

            history = [];

        }


        if (!Array.isArray(history)) {
            history = [];
        }


        history.unshift(item);


        /*
         * সর্বোচ্চ 100টি calculation
         */

        history =
            history.slice(0, 100);


        localStorage.setItem(
            "calcpro_history",
            JSON.stringify(history)
        );


        return item;
    },


    /* ---------- Get History ---------- */

    getHistory() {

        try {

            const history =
                JSON.parse(
                    localStorage.getItem(
                        "calcpro_history"
                    ) || "[]"
                );

            return Array.isArray(history)
                ? history
                : [];

        } catch (error) {

            return [];

        }
    },


    /* ---------- Clear History ---------- */

    clearHistory() {

        localStorage.removeItem(
            "calcpro_history"
        );

    },


    /* ---------- Delete History Item ---------- */

    deleteHistory(index) {

        const history =
            this.getHistory();

        if (
            index < 0 ||
            index >= history.length
        ) {
            return false;
        }

        history.splice(
            index,
            1
        );

        localStorage.setItem(
            "calcpro_history",
            JSON.stringify(history)
        );

        return true;
    },


    /* ---------- Copy ---------- */

    async copy(value) {

        try {

            await navigator
                .clipboard
                .writeText(
                    String(value)
                );

            return true;

        } catch (error) {

            return false;

        }
    },


    /* ---------- Universal Solve ---------- */

    solve(
        mode,
        type,
        data
    ) {

        switch (mode) {

            case "general":

                return this.general(
                    data.expression
                );


            case "student":

                return this.student(
                    type,
                    data
                );


            case "business":

                return this.business(
                    type,
                    data
                );


            case "scientific":

                return this.scientific(
                    type,
                    data
                );


            default:

                throw new Error(
                    "Unknown calculator mode"
                );
        }
    },


    /* ---------- Save Result Automatically ---------- */

    solveAndSave(
        mode,
        type,
        data
    ) {

        const result =
            this.solve(
                mode,
                type,
                data
            );


        let expression = "";
        let finalResult = "";


        if (mode === "general") {

            expression =
                result.expression;

            finalResult =
                result.result;

        }

        else if (
            result &&
            result.solution
        ) {

            expression =
                result.solution.title ||
                type;

            finalResult =
                result.solution.result;

        }

        else if (
            result &&
            result.result !== undefined
        ) {

            expression =
                type;

            finalResult =
                result.result;

        }


        if (
            finalResult !== "" &&
            finalResult !== undefined
        ) {

            this.saveHistory(
                expression,
                finalResult,
                mode
            );

        }


        return result;
    }

};


/* =========================================
   Global Access
   ========================================= */

window.CalcProEngine =
    CalcProEngine;