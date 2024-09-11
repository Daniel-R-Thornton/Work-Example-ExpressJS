import "./App.css";
import { Languages } from "./assets/Languages";
import Wizard from "./components/Wizard/Wizard";
import { CreateClientInput } from "./api/types";
import { useState } from "react";
import useFundingSources from "./hooks/useFundingSources";
import { createClient } from "./api/createClient";
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
        Add a client
      </button>
      <Wizard<CreateClientInput>
        onFinish={(data) => {
          createClient(data);
          setShowWizard(false);
        }}
        onCancel={() => {
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
                options: Languages.map((Language) => ({
                  label: Language.name,
                  value: Language.code,
                })),
                required: true,
              },
              {
                inputType: "select",
                name: "SecondaryLanguage",
                label: "Secondary Language",
                options: Languages.map((Language) => ({
                  label: Language.name,
                  value: Language.code,
                })),
                required: false,
              },
              {
                inputType: "select",
                name: "FundingSourceId",
                label: "Funding Source Name",
                options: fundingSources.map((fundingSource) => ({
                  label: fundingSource.name,
                  value: fundingSource.id,
                })),
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
                <p>
                  Main Language:{" "}
                  {Languages.find(
                    (Language) => Language.code === data?.MainLanguage
                  )?.name ?? "unset"}
                </p>
                <p>
                  Secondary Language:{" "}
                  {Languages.find(
                    (Language) => Language.code === data?.SecondaryLanguage
                  )?.name ?? "unset"}
                </p>
                <p>
                  Date of Birth: {data?.DateOfBirth?.toDateString() ?? "unset"}
                </p>
                <p>
                  Funding Source Name:{" "}
                  {fundingSources.find(
                    (fundingSource) =>
                      +fundingSource.id === +data?.FundingSourceId
                  )?.name ?? "unset"}
                </p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default App;
