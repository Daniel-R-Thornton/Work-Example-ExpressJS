import "./App.css";
import { Languages } from "./assets/Languages";
import Wizard from "./components/Wizard/Wizard";
import { CreateClientInput } from "./api/types";
import { useState } from "react";
import useFundingSources from "./hooks/useFundingSources";
function App() {
  const [showWizard, setShowWizard] = useState(false);
  const { fundingSources, isLoading } = useFundingSources();
  return (
    <div>
      <button
        disabled={isLoading}
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
                inputType: "select",
                name: "FundingSourceId",
                label: "Funding Source Name",
                options: fundingSources.map(
                  (fundingSource) => fundingSource.name
                ),
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
