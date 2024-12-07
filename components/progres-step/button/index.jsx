"use client";

export default function ProgressButton({ nextStep, prevStep }) {
  return (
    <div className="buttonContainer">
      <button className="nextPrevious" onClick={prevStep}>
        Previous
      </button>
      <button className="nextPrevious" onClick={nextStep}>
        Next
      </button>
    </div>
  );
}
