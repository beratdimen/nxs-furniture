"use client";
import "./style.css";

export default function ProgresStep({ activeStep, steps }) {
  return (
    <div className="progressContainer">
      <div className="progressBar">
        <div
          className="progress"
          style={{
            width: `${(activeStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>
      </div>
      <div className="progressSteps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index <= activeStep ? "active" : ""}`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
