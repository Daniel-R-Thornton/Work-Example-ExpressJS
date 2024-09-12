import { Languages } from "../../assets/Languages";
import Wizard from "../Wizard/Wizard";
import { CreateClientInput } from "../../api/types";
import { useState } from "react";
import useFundingSources from "../../hooks/useFundingSources";
import { createClient } from "../../api/createClient";

/**
 * @function AddClientWizard
 * @description A wizard for adding a new client.
 * @returns {JSX.Element} The rendered wizard.
 */
export function AddClientWizardButton({ onFinish }: { onFinish?: () => void }) {
  const [showWizard, setShowWizard] = useState(false);
  const { fundingSources, isLoading } = useFundingSources();

  return (
    <>
      <Wizard<CreateClientInput>
        onFinish={async (data) => {
          await createClient(data);
          onFinish?.();
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
                name: "name",
                label: "Name",
                required: true,
              },
              {
                inputType: "date",
                name: "dateOfBirth",
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
                name: "mainLanguage",
                label: "Main Language",
                options: Languages.map((Language) => ({
                  label: Language.name,
                  value: Language.code,
                })),
                required: true,
              },
              {
                inputType: "select",
                name: "secondaryLanguage",
                label: "Secondary Language",
                options: Languages.map((Language) => ({
                  label: Language.name,
                  value: Language.code,
                })),
                required: false,
              },
              {
                inputType: "select",
                name: "fundingSourceId",
                label: "Funding Source Name",
                options: fundingSources.map((fundingSource) => ({
                  label: fundingSource.name,
                  value: fundingSource.id.toString(),
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
                <p>Name: {data?.name ?? "unset"}</p>
                <p>
                  Main Language:{" "}
                  {Languages.find(
                    (Language) => Language.code === data?.mainLanguage
                  )?.name ?? "unset"}
                </p>
                <p>
                  Secondary Language:{" "}
                  {Languages.find(
                    (Language) => Language.code === data?.secondaryLanguage
                  )?.name ?? "unset"}
                </p>
                <p>
                  Date of Birth: {data?.dateOfBirth?.toDateString() ?? "unset"}
                </p>
                <p>
                  Funding Source Name:{" "}
                  {fundingSources.find(
                    (fundingSource) =>
                      +fundingSource.id === +data?.fundingSourceId
                  )?.name ?? "unset"}
                </p>
              </div>
            ),
          },
        ]}
      />
      <button onClick={() => setShowWizard(true)} disabled={isLoading}>
        Add Client
      </button>
    </>
  );
}

export default AddClientWizardButton;
