import styles from "../Wizard.module.css";

/**
 * Renders the footer of the wizard, which contains the "Back" and "Next" buttons.
 *
 * @param {boolean} isLastStep True if the current step is the last one, false otherwise.
 * @param {() => void} onBack Called when the user clicks the "Back" button.
 * @param {() => void} onNext Called when the user clicks the "Next" button.
 * @param {boolean} isBackDisabled True if the "Back" button should be disabled, false otherwise.
 * @returns {JSX.Element} The footer component.
 */
export function StepFooter({
  isLastStep,
  onBack,
  onNext,
  isBackDisabled,
  finalStepButtonText = "Finish",
}: {
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  isBackDisabled: boolean;
  finalStepButtonText?: string;
}) {
  return (
    <footer className={styles["wizardFooter"]}>
      <button
        onClick={onBack}
        className={styles["wizardBack"]}
        disabled={isBackDisabled}
      >
        Back
      </button>
      <button onClick={onNext} className={styles["wizardNext"]}>
        {isLastStep ? finalStepButtonText : "Next"}
      </button>
    </footer>
  );
}

export default StepFooter;
