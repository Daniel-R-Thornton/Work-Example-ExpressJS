import styles from "../Wizard.module.css";
import { WizardStep } from "../Wizard";

/**
 * Renders the header for a step of the wizard, including the step number,
 * a renderable icon, and a cancel button.
 *
 * @param {{ step: WizardStep<T>, stepIndex: number, onCancel: () => void }}
 *            props Step data, step index, and cancel callback.
 * @returns {JSX.Element} The rendered header.
 */
export function StepHeader<T>({
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

export default StepHeader;
