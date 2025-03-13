"use client"
import { useState } from 'react';
import Image from 'next/image';

const Converter = () => {
    const [value, setValue] = useState(0);  // This will store the input value
    const [unit, setUnit] = useState('cm');  // Default unit is centimeters
    const [convertedValue, setConvertedValue] = useState(0);  // This will store the converted value
    const [unit1, setUnit1] = useState('inch');  // Default conversion target unit is inch

    // Map decimal fractions to their Unicode counterparts
    const fractionSymbols = {
        "0.5": "½",
        "0.25": "¼",
        "0.75": "¾",
        "0.3333": "⅓",
        "0.6667": "⅔",
        "0.125": "⅛",
        "0.375": "⅜",
        "0.625": "⅝",
        "0.875": "⅞"
    };

    // Function to convert a decimal number to a mixed fraction string with Unicode fractions
    const toFractionUnicode = (decimal) => {
        // Get the whole number part
        const whole = Math.floor(decimal);
        
        // Get the decimal part
        const decimalPart = decimal - whole;

        // Handle simple fractions like 1/2, 1/4, etc.
        const simpleFraction = getSimpleFraction(decimalPart);

        if (simpleFraction) {
            // If there is a simple fraction (like 1/2, 1/4), return as mixed fraction with Unicode
            return ` ${simpleFraction}`;
        } else {
            // Return as just the whole number if there's no fractional part
            return `${whole}`;
        }
    };

    // Function to map decimal fraction to the nearest simple fraction (like 1/2, 1/4, etc.)
    const getSimpleFraction = (decimal) => {
        if (decimal === 0) return null;  // No fraction for whole number

        const fractionDecimals = Object.keys(fractionSymbols).map(Number);

        let closestFraction = null;
        let closestDifference = Infinity;

        // Find the closest fraction by comparing decimal values
        for (let fraction of fractionDecimals) {
            const difference = Math.abs(decimal - fraction);
            if (difference < closestDifference) {
                closestDifference = difference;
                closestFraction = fraction;
            }
        }

        // Return the fraction as Unicode symbol if found
        return closestFraction ? fractionSymbols[`${closestFraction}`] : null;
    };

    // Conversion factors from base unit (cm)
    const conversionRates = {
        mm: 10,
        cm: 1,
        meter: 0.01,
        km: 0.00001,
        inch: 0.393701,
        feet: 0.0328084,
        yard: 0.0109361,
        mile: 0.0000062137
    };

    // Function to handle unit conversion
    const convertValue = () => {
        let baseValue = 0;

        // Convert input value to centimeters first
        switch (unit) {
            case 'mm':
                baseValue = value / conversionRates.mm;
                break;
            case 'cm':
                baseValue = value;  // Already in cm
                break;
            case 'meter':
                baseValue = value / conversionRates.meter;
                break;
            case 'km':
                baseValue = value / conversionRates.km;
                break;
            case 'inch':
                baseValue = value / conversionRates.inch;
                break;
            case 'feet':
                baseValue = value / conversionRates.feet;
                break;
            case 'yard':
                baseValue = value / conversionRates.yard;
                break;
            case 'mile':
                baseValue = value / conversionRates.mile;
                break;
            default:
                break;
        }

        // Now convert the base value (in cm) to the selected target unit
        const result = baseValue * conversionRates[unit1];
        setConvertedValue(result);  // Set the converted value
    };

    // Handle the dropdown change for the initial unit
    const handleUnitChange = (e) => {
        setUnit(e.target.value);
        convertValue();  // Recalculate conversion when unit changes
    };

    // Handle the dropdown change for the target conversion unit
    const handleUnit1Change = (e) => {
        setUnit1(e.target.value);
        convertValue();  // Recalculate conversion when unit changes
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-500 rounded-lg relative shadow-lg w-full max-w-md mx-auto">
            {/* Inch Tape Image */}
            <Image
                src="/inch_tape.jpg"
                width={400}  // Adjust the size of the image
                height={200}
                alt="Inch Tape"
                className="mb-4 rounded-lg shadow-lg"
            />

            {/* Input Field */}
            <input
                type="number"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    convertValue();  // Recalculate conversion on value change
                }}
                className="p-4 bg-white text-black rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full"
                placeholder="Enter a value"
            />

            {/* From Unit Dropdown */}
            <div className="mb-4 text-white">
                <label htmlFor="unit" className="block text-lg font-semibold mb-2">From Unit:</label>
                <select
                    value={unit}
                    onChange={handleUnitChange}
                    className="p-3 w-full border rounded-lg bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="mm">Millimeter (mm)</option>
                    <option value="cm">Centimeter (cm)</option>
                    <option value="meter">Meter (m)</option>
                    <option value="km">Kilometer (km)</option>
                    <option value="inch">Inch (in)</option>
                    <option value="feet">Foot (ft)</option>
                    <option value="yard">Yard (yd)</option>
                    <option value="mile">Mile (mi)</option>
                </select>
            </div>

            {/* To Unit Dropdown */}
            <div className="mb-4 text-white">
                <label htmlFor="unit1" className="block text-lg font-semibold mb-2">To Unit:</label>
                <select
                    value={unit1}
                    onChange={handleUnit1Change}
                    className="p-3 w-full border rounded-lg bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="mm">Millimeter (mm)</option>
                    <option value="cm">Centimeter (cm)</option>
                    <option value="meter">Meter (m)</option>
                    <option value="km">Kilometer (km)</option>
                    <option value="inch">Inch (in)</option>
                    <option value="feet">Foot (ft)</option>
                    <option value="yard">Yard (yd)</option>
                    <option value="mile">Mile (mi)</option>
                </select>
            </div>

            {/* Dynamic Output */}
            <div className="text-xl font-semibold text-white mt-4">
                <p>{`From Value: ${value} ${unit}`}</p>
                <p>{`Converted Value: ${convertedValue.toFixed(4)} ${unit1}`}</p> {/* Decimal output */}
                <p>{`Unicode Fraction: ${toFractionUnicode(convertedValue)}`}</p> {/* Mixed fraction output with Unicode */}
            </div>
        </div>
    );
};

export default Converter;
