import React, { useState, useRef } from "react";
import "./ATSChecker.css";
import html2pdf from "html2pdf.js";

const ATSChecker = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const resultRef = useRef();

  const getATSScore = (resumeText, jobDescription) => {
    const stopWords = ['the', 'and', 'for', 'with', 'you', 'your', 'are', 'that', 'this'];

    const jdWords = jobDescription
      .toLowerCase()
      .match(/\b(\w+)\b/g)
      ?.filter(word => word.length > 3 && !stopWords.includes(word)) || [];

    const resumeWords = resumeText.toLowerCase();
    let matchedKeywords = [];
    let missingKeywords = [];

    jdWords.forEach(word => {
      if (resumeWords.includes(word)) {
        matchedKeywords.push(word);
      } else {
        missingKeywords.push(word);
      }
    });

    const score = jdWords.length === 0 ? 0 : Math.round((matchedKeywords.length / jdWords.length) * 100);
    return { score, matchedKeywords, missingKeywords };
  };

  const handleCheck = () => {
    const analysis = getATSScore(resumeText, jobDesc);
    setResult(analysis);
  };

  const handleExportPDF = () => {
    if (resultRef.current) {
      html2pdf().from(resultRef.current).save("ATS-Analysis.pdf");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => alert("Failed to copy!"));
  };

  return (
    <div className="ats-checker-container">
      <h2 className="title">ATS Resume Checker</h2>

      <div className="input-section">
        <textarea
          className="input-textarea"
          placeholder="Paste your RESUME here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
        <textarea
          className="input-textarea"
          placeholder="Paste JOB DESCRIPTION here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
        <button className="check-btn" onClick={handleCheck}>Check ATS Score</button>
      </div>

      {result && (
        <div className="ats-result" ref={resultRef}>
          <h3>ATS Score: {result.score}%</h3>
          <div className="score-bar-container">
            <div
              className="score-bar"
              style={{ width: `${result.score}%` }}
            ></div>
          </div>

          <p><strong>Matched Keywords:</strong></p>
          <p className="matched-keywords">{result.matchedKeywords.join(", ") || "None"}</p>

          <p><strong>Missing Keywords:</strong></p>
          <p className="missing-keywords">{result.missingKeywords.join(", ") || "None"}</p>

          <div className="utility-buttons">
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(result.matchedKeywords.join(", "))}
            >
              Copy Matched
            </button>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(result.missingKeywords.join(", "))}
            >
              Copy Missing
            </button>
            <button
              className="export-btn"
              onClick={handleExportPDF}
            >
              Export PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
