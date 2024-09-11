import React, { useState } from "react";
import styles from "./Wizard.module.css"; // Import the CSS module

/**
 * Wizard component properties
 *
 * @prop {boolean} showWizard - Whether or not to show the wizard
 * @prop {WizardStep<T>[]} steps - Array of wizard steps
 * @prop {(data: T) => void} onFinish - Function to call when the wizard is finished
 * @prop {string} [width=500px] - Width of the wizard
 * @prop {string} [height=auto] - Height of the wizard
 * @prop {() => void} onCancel - Function to call when the wizard is cancelled
 */
export interface WizardProps<T> {
  showWizard: boolean;
  steps: WizardStep<T>[];
  onFinish: (data: T) => void;
  width?: string;
  height?: string;
  onCancel: () => void;
}

/**
 * Individual wizard step properties
 *
 * @prop {React.ReactNode} title - Title to display in the header
 * @prop {React.ReactNode} icon - Icon to display in the header
 * @prop {WizardProperty<T>[]} [properties] - Array of properties to display in the body
 * @prop {(data: T) => React.ReactNode} [renderBody] - Function to call to render the body
 */
export interface WizardStep<T> {
  title: React.ReactNode;
  icon: React.ReactNode;
  properties?: WizardProperty<T>[];
  renderBody?: (data: T) => React.ReactNode;
}

/**
 * Individual property properties
 *
 * @prop {keyof T} name - Name of the property
 * @prop {"text" | "number" | "select" | "date"} inputType - Type of input to display
 * @prop {string} label - Label to display next to the input
 * @prop {string[]} [options] - Options to display in a select input
 * @prop {boolean} [required] - Whether or not the property is required
 */
export interface WizardProperty<T> {
  name: keyof T;
  inputType: "text" | "number" | "select" | "date";
  label: string;
  options?: string[];
  required?: boolean;
}

// Main Wizard Component
export function Wizard<T>({
  width = "500px",
  height = "auto",
  onFinish,
  showWizard,
  steps,
  onCancel,
}: WizardProps<T>) {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<T>({} as T);
  const [errors, setErrors] = useState<Map<keyof T, string>>(new Map());

  if (!showWizard) return null;

  const validateStep = () => {
    const stepProperties = steps[currentStep]?.properties || [];
    const newErrors = new Map<keyof T, string>();

    stepProperties.forEach((prop) => {
      if (prop.required) {
        const value = wizardData[prop.name];
        if (
          value === undefined ||
          value === "" ||
          (prop.inputType === "date" &&
            new Date(value as string).toString() === "Invalid Date")
        ) {
          newErrors.set(prop.name, `${prop.label} is required`);
        }
      }
    });

    setErrors(newErrors);
    return newErrors.size === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        onFinish(wizardData);
      }
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

  const handleDateChange = (name: keyof T, value: string) => {
    const date = new Date(value);
    setWizardData((prevData) => ({
      ...prevData,
      [name]: date, // Store date in DATE format
    }));
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <dialog
      open={showWizard}
      className={styles["wizard-overlay"]}
      onClick={onCancel}
    >
      <div
        className={styles["wizard-content"]}
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        <StepHeader
          step={currentStepData}
          stepIndex={currentStep}
          onCancel={onCancel}
        />
        <StepBody
          step={currentStepData}
          wizardData={wizardData}
          onChange={handleChange}
          onDateChange={handleDateChange}
          errors={errors}
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
  onCancel,
}: {
  step: WizardStep<T>;
  stepIndex: number;
  onCancel: () => void;
}) {
  return (
    <header className={styles["wizard-header"]}>
      <h2>{`Step ${stepIndex + 1}`}</h2>
      <div>{step.icon}</div>
      <button title="Cancel" onClick={onCancel}>
        ❌
      </button>
    </header>
  );
}

// StepBody Component
function StepBody<T>({
  step,
  wizardData,
  onChange,
  onDateChange,
  errors,
}: {
  step: WizardStep<T>;
  wizardData: T;
  onChange: (name: keyof T, value: string) => void;
  onDateChange: (name: keyof T, value: string) => void;
  errors: Map<keyof T, string>;
}) {
  return (
    <main className={styles["wizard-body"]}>
      {step.title}
      {step.renderBody && step.renderBody(wizardData)}
      {step.properties &&
        renderProperties(
          step.properties,
          wizardData,
          onChange,
          onDateChange,
          errors
        )}
    </main>
  );
}

// Render Properties
function renderProperties<T>(
  properties: WizardProperty<T>[],
  wizardData: T,
  onChange: (name: keyof T, value: string) => void,
  onDateChange: (name: keyof T, value: string) => void,
  errors: Map<keyof T, string>
) {
  return properties.map((prop) => (
    <div key={prop.name.toString()} className={styles["wizard-field"]}>
      <label>
        {prop.label}
        {prop.required && (
          <span className={styles["required-asterisk"]}>*</span>
        )}
      </label>
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
      ) : prop.inputType === "date" ? (
        <input
          type="date"
          value={
            (wizardData[prop.name] as Date)?.toISOString().split("T")[0] ?? ""
          }
          onChange={(e) => onDateChange(prop.name, e.target.value)}
        />
      ) : (
        <input
          type={prop.inputType}
          placeholder={prop.label}
          value={(wizardData[prop.name] as string) || ""}
          onChange={(e) => onChange(prop.name, e.target.value)}
        />
      )}
      {errors.get(prop.name) && (
        <p className={styles["error-message"]}>{errors.get(prop.name)}</p>
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
