import React, { useState } from "react";
import styles from "./Wizard.module.css"; // Import the CSS module

export interface WizardProps<T> {
  showWizard: boolean;
  steps: WizardStep<T>[];
  onFinish: (data: T) => void;
  width?: string;
  height?: string;
}

export interface WizardStep<T> {
  title: React.ReactNode;
  icon: React.ReactNode;
  properties?: WizardProperty<T>[];
  renderBody?: (data: T) => React.ReactNode;
}

export interface WizardProperty<T> {
  name: keyof T;
  inputType: "text" | "number" | "select" | "date";
  label: string;
  options?: string[];
}

// Main Wizard Component
export function Wizard<T>({
  width = "500px",
  height = "auto",
  onFinish,
  showWizard,
  steps,
}: WizardProps<T>) {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<T>({} as T);

  if (!showWizard) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      onFinish(wizardData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleChange = (name: keyof T, value: string) => {
    setWizardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <dialog open={showWizard} className={styles["wizard-overlay"]}>
      <div className={styles["wizard-content"]} style={{ width, height }}>
        <StepHeader step={currentStepData} stepIndex={currentStep} />
        <StepBody
          step={currentStepData}
          wizardData={wizardData}
          onChange={handleChange}
        />
        <StepFooter
          isLastStep={isLastStep}
          onBack={handleBack}
          onNext={handleNext}
          isBackDisabled={currentStep === 0}
        />
      </div>
    </dialog>
  );
}

// StepHeader Component
function StepHeader<T>({
  step,
  stepIndex,
}: {
  step: WizardStep<T>;
  stepIndex: number;
}) {
  return (
    <header className={styles["wizard-header"]}>
      <h2>{`Step ${stepIndex + 1}`}</h2>
      <div>{step.icon}</div>
    </header>
  );
}

// StepBody Component
function StepBody<T>({
  step,
  wizardData,
  onChange,
}: {
  step: WizardStep<T>;
  wizardData: T;
  onChange: (name: keyof T, value: string) => void;
}) {
  return (
    <main className={styles["wizard-body"]}>
      {step.title}
      {step.renderBody && step.renderBody(wizardData)}
      {step.properties &&
        renderProperties(step.properties, wizardData, onChange)}
    </main>
  );
}

// Render Properties
function renderProperties<T>(
  properties: WizardProperty<T>[],
  wizardData: T,
  onChange: (name: keyof T, value: string) => void
) {
  return properties.map((prop) => (
    <div key={prop.name.toString()} className={styles["wizard-field"]}>
      <label>{prop.label}</label>
      {prop.inputType === "select" ? (
        <select
          value={(wizardData[prop.name] as string) || ""}
          onChange={(e) => onChange(prop.name, e.target.value)}
        >
          <option value="">Select an option</option>
          {prop.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={prop.inputType}
          placeholder={prop.label}
          value={(wizardData[prop.name] as string) || ""}
          onChange={(e) => onChange(prop.name, e.target.value)}
        />
      )}
    </div>
  ));
}

// StepFooter Component
function StepFooter({
  isLastStep,
  onBack,
  onNext,
  isBackDisabled,
}: {
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  isBackDisabled: boolean;
}) {
  return (
    <footer className={styles["wizard-footer"]}>
      <button
        onClick={onBack}
        className={styles["wizard-back"]}
        disabled={isBackDisabled}
      >
        Back
      </button>
      <button onClick={onNext} className={styles["wizard-next"]}>
        {isLastStep ? "Finish" : "Next"}
      </button>
    </footer>
  );
}

export default Wizard;
