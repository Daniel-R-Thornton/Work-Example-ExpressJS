import "./App.css";
import Wizard from "./components/Wizard/Wizard";
import { CreateClientInput } from "./types";

function App() {
  return (
    <Wizard<CreateClientInput>
      onFinish={(data) => {
        console.log(data);
        // Add logic to submit data to API/database
      }}
      showWizard
      steps={[
        {
          title: "Step 1: Basic Information",
          icon: "📝",
          properties: [
            {
              inputType: "text",
              name: "Name",
              label: "Name",
            },
            {
              inputType: "date",
              name: "DateOfBirth",
              label: "Date of Birth",
            },
          ],
        },
        {
          title: "Step 2: Additional Details",
          icon: "🗣️",
          properties: [
            {
              inputType: "text",
              name: "MainLanguage",
              label: "Main Language",
            },
            {
              inputType: "text",
              name: "SecondaryLanguage",
              label: "Secondary Language",
            },
            {
              inputType: "number",
              name: "FundingSourceId",
              label: "Funding Source ID",
            },
          ],
        },
        {
          title: "Confirm Details",
          icon: "✅",
          renderBody: (data) => (
            <div>
              <p>Name: {data?.Name ?? "unset"}</p>
              <p>Main Language: {data?.MainLanguage ?? "unset"}</p>
              <p>Secondary Language: {data?.SecondaryLanguage ?? "unset"}</p>
              <p>
                Date of Birth: {data?.DateOfBirth?.toDateString() ?? "unset"}
              </p>
              <p>Funding Source ID: {data?.FundingSourceId ?? "unset"}</p>
            </div>
          ),
        },
      ]}
    />
  );
}

export default App;
