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

/**
 * @function renderProperties
 * @description Renders a Wizard step property into a labeled input field.
 * @param {WizardProperty<T>[]} properties The properties to render.
 * @param {T} wizardData The data object used in the renderBody function.
 * @param {(name: keyof T, value: string) => void} onChange Function called when a value changes.
 * @param {(name: keyof T, value: string) => void} onDateChange Function called when a date value changes.
 * @param {Map<keyof T, string>} errors Map of errors for the step.
 * @returns {JSX.Element[]} The rendered content of the step.
 */
function renderProperties<T>(
  properties: WizardProperty<T>[],
  wizardData: T,
  onChange: (name: keyof T, value: string) => void,
  onDateChange: (name: keyof T, value: string) => void,
  errors: Map<keyof T, string>
): JSX.Element[] {
  return properties.map((prop) => {
    const { name, inputType, label, required, options } = prop;

    const value = wizardData[name] as
      | string
      | number
      | readonly string[]
      | undefined;

    const renderInput = () => {
      switch (inputType) {
        case "select":
          return (
            <select
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
            >
              <option value="">Select an option</option>
              {options?.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          );
        case "date":
          return (
            <input
              type="date"
              value={
                value instanceof Date ? value.toISOString().split("T")[0] : ""
              }
              onChange={(e) => onDateChange(name, e.target.value)}
            />
          );
        default:
          return (
            <input
              type={inputType}
              placeholder={label}
              value={value || ""}
              onChange={(e) => onChange(name, e.target.value)}
            />
          );
      }
    };

    return (
      <div key={name as string} className={styles["wizard-field"]}>
        <label>
          {label}
          {required && <span className={styles["required-asterisk"]}>*</span>}
        </label>
        {renderInput()}
        {errors.get(name) && (
          <p className={styles["error-message"]}>{errors.get(name)}</p>
        )}
      </div>
    );
  });
}

export default WizardStepBody;
