"use client";

export default function ProgressButton({ nextStep, prevStep }) {
  return (
    <div className="buttonContainer">
      <button className="previous" onClick={prevStep}>
        Previous
      </button>
      <button className="next" onClick={nextStep}>
        Next
      </button>
    </div>
  );
}
