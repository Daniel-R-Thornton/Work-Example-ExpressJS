import styles from "../Wizard.module.css";
import { WizardStep, WizardProperty } from "../Wizard";

/**
 * @function WizardStepBody
 * @description Renders the content of a Wizard step.
 * @param {WizardStep<T>} step The Wizard step configuration.
 * @param {T} wizardData The data object that will be passed to the renderBody function.
 * @param {(name: keyof T, value: string) => void} onChange Function to call when a value changes.
 * @param {(name: keyof T, value: string) => void} onDateChange Function to call when a date value changes.
 * @param {Map<keyof T, string>} errors Map of errors for the step.
 * @returns {JSX.Element} The rendered content of the step.
 */
function WizardStepBody<T>({
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
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : prop.inputType === "date" ? (
        <input
          type="date"
          value={
            (wizardData[prop.name] as Date)?.toISOString()?.split("T")[0] ?? ""
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

export default WizardStepBody;
