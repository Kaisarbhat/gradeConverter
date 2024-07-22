import React, { useState } from 'react';
import './App.css';

function App() {
  const [cgpa, setCgpa] = useState('');
  const [percentage, setPercentage] = useState('');
  const [conversionType, setConversionType] = useState('cgpaToPercentage');
  const [cgpaScale, setCgpaScale] = useState('10');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const convertGrade = () => {
    let calculatedResult;
    let inputValue;
    let conversionDescription;

    if (conversionType === 'cgpaToPercentage') {
      inputValue = parseFloat(cgpa);
      const maxCgpa = cgpaScale === '10' ? 10 : 4;
      if (isNaN(inputValue) || inputValue < 0 || inputValue > maxCgpa) {
        setResult(`Invalid input. CGPA should be between 0 and ${maxCgpa}.`);
        return;
      }
      if (cgpaScale === '10') {
        calculatedResult = (inputValue * 9.5).toFixed(2);
      } else {
        calculatedResult = ((inputValue / 4) * 100).toFixed(2);
      }
      conversionDescription = `CGPA ${inputValue} (${cgpaScale}-point scale) ≈ ${calculatedResult}%`;
    } else {
      inputValue = parseFloat(percentage);
      if (isNaN(inputValue) || inputValue < 0 || inputValue > 100) {
        setResult('Invalid input. Percentage should be between 0 and 100.');
        return;
      }
      if (cgpaScale === '10') {
        calculatedResult = (inputValue / 9.5).toFixed(2);
      } else {
        calculatedResult = ((inputValue / 100) * 4).toFixed(2);
      }
      conversionDescription = `${inputValue}% ≈ CGPA ${calculatedResult} (${cgpaScale}-point scale)`;
    }

    setResult(calculatedResult);
    setHistory([conversionDescription, ...history.slice(0, 9)]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="App">
      <h1>Grade Converter</h1>
      <div className="converter">
        <select 
          value={conversionType} 
          onChange={(e) => setConversionType(e.target.value)}
          className="select-conversion"
        >
          <option value="cgpaToPercentage">CGPA to Percentage</option>
          <option value="percentageToCgpa">Percentage to CGPA</option>
        </select>
        {conversionType === 'cgpaToPercentage' && (
          <select
            value={cgpaScale}
            onChange={(e) => setCgpaScale(e.target.value)}
            className="select-conversion"
          >
            <option value="10">10-point CGPA scale</option>
            <option value="4">4-point CGPA scale</option>
          </select>
        )}
        {conversionType === 'cgpaToPercentage' ? (
          <input
            type="number"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            placeholder={`Enter CGPA (0-${cgpaScale})`}
            step="0.01"
          />
        ) : (
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Enter Percentage (0-100)"
            step="0.01"
          />
        )}
        <button onClick={convertGrade}>Convert</button>
      </div>
      {result && (
        <div className="result">
          <h2>Result:</h2>
          <p>{conversionType === 'cgpaToPercentage' ? `${result}%` : `CGPA ${result}`}</p>
        </div>
      )}
      <div className="history">
        <h2>Conversion History</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No conversion history yet.</p>
        )}
        {history.length > 0 && (
          <button onClick={clearHistory}>Clear History</button>
        )}
      </div>
    </div>
  );
}

export default App;