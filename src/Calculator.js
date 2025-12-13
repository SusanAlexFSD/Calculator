import React, { useState } from "react";

const Calculator = () => {
    const [input, setInput] = useState(""); // For storing input expression
    const [calculation, setCalculation] = useState(""); // For showing real-time result

    const handleClick = (value) => {
        // Append value to input string
        setInput((prevInput) => {
            const newInput = prevInput + value;
            try {
                // Real-time calculation of the expression typed so far
                setCalculation(eval(newInput).toString());
            } catch (error) {
                setCalculation("Error");
            }
            return newInput;
        });
    };

    const handleClear = () => {
        setInput("");
        setCalculation("");
    };

    const handlePercentage = () => {
        if (input) {
            const percentageValue = (parseFloat(input) / 100).toString();
            setInput(percentageValue);
            setCalculation(percentageValue);
        }
    };

    const handleNegate = () => {
        if (input) {
            const negatedValue = (parseFloat(input) * -1).toString();
            setInput(negatedValue);
            setCalculation(negatedValue);
        }
    };

    const handleCalculate = () => {
        try {
            const result = eval(input).toString();
            setInput(result);  // Setting final result to input
            setCalculation(result); // Showing final result in calculation display
        } catch (error) {
            setInput("Error");
            setCalculation("Error");
        }
    };

    return (
        <div className="calculator">
            {/* Display area for input and calculation */}
            <div className="display">
                {/* Input Expression */}
                <div className="input">{input || "0"}</div>
                {/* Real-Time Calculation */}
                <div className="calculation">
                    {calculation || ""}
                </div>
            </div>

            <div className="buttons">
                {/* First row: C, +/-, %, / */}
                <button onClick={handleClear} className="special">C</button>
                <button onClick={handleNegate} className="special">+/-</button>
                <button onClick={handlePercentage} className="special">%</button>
                <button onClick={() => handleClick("/")} className="symbol">/</button>

                {/* Number and operator rows */}
                {["7", "8", "9", "*"].map((item) => (
                    <button onClick={() => handleClick(item)} key={item} className={["*", "/", "-", "+", "="].includes(item) ? "symbol" : ""}>{item}</button>
                ))}
                {["4", "5", "6", "-"].map((item) => (
                    <button onClick={() => handleClick(item)} key={item} className={["*", "/", "-", "+", "="].includes(item) ? "symbol" : ""}>{item}</button>
                ))}
                {["1", "2", "3", "+"].map((item) => (
                    <button onClick={() => handleClick(item)} key={item} className={item === "+" ? "symbol" : ""}>{item}</button>
                ))}

                {/* Bottom row: "0" spans 2 columns, then ".", then "=" */}
                <button onClick={() => handleClick("0")} className="zero">0</button>
                <button onClick={() => handleClick(".")}>.</button>
                <button onClick={handleCalculate} className="symbol">=</button>
            </div>
        </div>
    );
};

export default Calculator;
