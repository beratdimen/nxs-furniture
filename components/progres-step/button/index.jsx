"use client";

export default function ProgressButton({ nextStep, prevStep }) {
  return (
    <div className="buttonContainer">
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}
