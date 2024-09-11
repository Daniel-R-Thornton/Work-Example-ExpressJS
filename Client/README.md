# Daniel Thornton's Example Project Front End

## Getting Started

### Step 1: Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the URL of the repository.

### Step 2: Navigate to the Project Directory and then Client folder

Change into the project directory:

```bash
cd <project-directory>/client
```

Replace `<project-directory>` with the name of the directory created by cloning the repository.

### Step 3: Install Dependencies

Install the necessary dependencies for the project using npm or yarn:

```bash
npm install
```

or

```bash
yarn install
```

### Step 4: Start the Development Server

Start the development server to see the project in action:

```bash
npm run dev
```

or

```bash
yarn dev
```

## Usage

### Importing the Wizard Component

Import the Wizard component into your React application:

```tsx
import Wizard from "./path/to/Wizard";
```

### Defining Steps and Properties

Create an array of steps and properties to configure the wizard:

```tsx
const steps: WizardStep<MyDataType>[] = [
  {
    title: "Step 1",
    icon: <Icon1 />,
    properties: [
      { name: "field1", inputType: "text", label: "Field 1", required: true },
      // Other properties
    ],
  },
  // Other steps
];
```

### Using the Wizard Component

Use the Wizard component in your application:

```tsx
<Wizard
  showWizard={true}
  steps={steps}
  onFinish={(data) => console.log("Wizard finished with data:", data)}
  onCancel={() => console.log("Wizard cancelled")}
  width="600px"
  height="auto"
/>
```

## Components

### Wizard

The main component for the wizard interface.

**Props:**

- `showWizard: boolean` - Determines if the wizard is visible.
- `steps: WizardStep<T>[]` - Array of steps to be displayed in the wizard.
- `onFinish: (data: T) => void` - Callback function when the wizard is finished.
- `width: string` - Optional width of the wizard.
- `height: string` - Optional height of the wizard.
- `onCancel: () => void` - Callback function when the wizard is cancelled.

### WizardStep<T>

Defines a step in the wizard.

**Properties:**

- `title: React.ReactNode` - Title of the step.
- `icon: React.ReactNode` - Icon for the step.
- `properties: WizardProperty<T>[]` - Array of properties for the step.
- `renderBody: (data: T) => React.ReactNode` - Function to render additional content in the step.

### WizardProperty<T>

Defines a property within a wizard step.

**Properties:**

- `name: keyof T` - Property name.
- `inputType: "text" | "number" | "select" | "date"` - Type of input.
- `label: string` - Label for the input field.
- `options: { value: string; label: string }[]` - Options for select inputs.
- `required: boolean` - Indicates if the field is required.

### AddClientWizardButton

Adds a button with and a pre-configuires wizard to allow users to simply click the button to get a client creation wizard.
