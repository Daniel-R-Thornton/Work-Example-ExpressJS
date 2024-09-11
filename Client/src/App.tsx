import "./App.css";
import { Languages } from "./assets/Languages";
import Wizard from "./components/Wizard/Wizard";
import { CreateClientInput } from "./types";
import { useState } from "react";

function App() {
  const [showWizard, setShowWizard] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShowWizard((old) => !old);
        }}
      >
        ShowMeTheModal
      </button>
      <Wizard<CreateClientInput>
        onFinish={(data) => {
          console.log(data);
          setShowWizard(false);
          // Add logic to submit data to API/database
        }}
        onCancel={() => {
          console.log("Cancelled");
          setShowWizard(false);
        }}
        showWizard={showWizard}
        steps={[
          {
            title: "Step 1: Basic Information",
            icon: "📝",
            properties: [
              {
                inputType: "text",
                name: "Name",
                label: "Name",
                required: true,
              },
              {
                inputType: "date",
                name: "DateOfBirth",
                label: "Date of Birth",
                required: true,
              },
            ],
          },
          {
            title: "Step 2: Additional Details",
            icon: "🗣️",
            properties: [
              {
                inputType: "select",
                name: "MainLanguage",
                label: "Main Language",
                options: Languages.map((Language) => Language.name),

                required: true,
              },
              {
                inputType: "select",
                name: "SecondaryLanguage",
                label: "Secondary Language",
                options: Languages.map((Language) => Language.name),
                required: false,
              },
              {
                inputType: "number",
                name: "FundingSourceId",
                label: "Funding Source ID",
                required: true,
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
    </div>
  );
}

export default App;
