import React, { useState } from "react";
import styles from "./Wizard.module.css"; // Import the CSS module
import WizardStepFooter from "./Step/WizardStepFooter";
import WizardStepHeader from "./Step/WizardStepHeader";
import WizardStepBody from "./Step/WizardStepBody";

export interface WizardProps<T> {
  showWizard: boolean;
  steps: WizardStep<T>[];
  onFinish: (data: T) => void;
  width?: string;
  height?: string;
  onCancel: () => void;
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
  options?: { value: string; label: string }[];
  required?: boolean;
}

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
          (prop.inputType === "date" && !isValidDate(value as string))
        ) {
          newErrors.set(prop.name, `${prop.label} is required`);
        }
      }
    });

    setErrors(newErrors);
    return newErrors.size === 0;
  };

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        onFinish(wizardData);
        setCurrentStep(0);

        setWizardData({} as T);
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
    const date = value ? new Date(value) : undefined;
    setWizardData((prevData) => ({
      ...prevData,
      [name]: date,
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
        <WizardStepHeader
          step={currentStepData}
          stepIndex={currentStep}
          onCancel={onCancel}
        />
        <WizardStepBody
          step={currentStepData}
          wizardData={wizardData}
          onChange={handleChange}
          onDateChange={handleDateChange}
          errors={errors}
        />
        <WizardStepFooter
          isLastStep={isLastStep}
          onBack={handleBack}
          onNext={handleNext}
          isBackDisabled={currentStep === 0}
        />
      </div>
    </dialog>
  );
}

export default Wizard;
