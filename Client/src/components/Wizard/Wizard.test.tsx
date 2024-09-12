import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Wizard, { WizardStep } from "./Wizard";

describe("Wizard Component", () => {
  const steps: WizardStep<object>[] = [
    {
      title: <p>Step 1 Content</p>,
      icon: <span>🔍</span>,
      properties: [],
    },
    {
      title: <p>Step 2 Content</p>,
      icon: <span>✅</span>,
      properties: [],
    },
  ];

  it("should render the wizard when showWizard is true", () => {
    render(
      <Wizard
        showWizard={true}
        steps={steps}
        onFinish={() => {}}
        onCancel={() => {}}
      />
    );

    // Check if the wizard is present in the document
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    // Check if the first step content is rendered
    expect(screen.getByText("Step 1 Content")).toBeInTheDocument();
    // Check if the icon for the first step is rendered
    expect(screen.getByText("🔍")).toBeInTheDocument();
  });

  it("should not render the wizard when showWizard is false", () => {
    render(
      <Wizard
        showWizard={false}
        steps={steps}
        onFinish={() => {}}
        onCancel={() => {}}
      />
    );

    // The wizard should not be present when showWizard is false
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should handle navigation to the next step", () => {
    render(
      <Wizard
        showWizard={true}
        steps={steps}
        onFinish={() => {}}
        onCancel={() => {}}
      />
    );

    // Click the "Next" button to go to the next step
    fireEvent.click(screen.getByText("Next"));

    // Check if the second step content is rendered
    expect(screen.getByText("Step 2 Content")).toBeInTheDocument();
    // Check if the icon for the second step is rendered
    expect(screen.getByText("✅")).toBeInTheDocument();
  });

  it("should call onFinish when finishing the wizard", () => {
    const onFinish = vi.fn();
    render(
      <Wizard
        showWizard={true}
        steps={steps}
        onFinish={onFinish}
        onCancel={() => {}}
      />
    );

    // Click the "Next" button to go to the last step
    fireEvent.click(screen.getByText("Next"));
    // Click the "Finish" button
    fireEvent.click(screen.getByText("Finish"));

    // Check if the onFinish function has been called
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("should handle the back navigation", () => {
    render(
      <Wizard
        showWizard={true}
        steps={steps}
        onFinish={() => {}}
        onCancel={() => {}}
      />
    );

    // Click the "Next" button to go to the next step
    fireEvent.click(screen.getByText("Next"));
    // Click the "Back" button to return to the previous step
    fireEvent.click(screen.getByText("Back"));

    // Check if the first step content is rendered again
    expect(screen.getByText("Step 1 Content")).toBeInTheDocument();
    // Check if the icon for the first step is rendered
    expect(screen.getByText("🔍")).toBeInTheDocument();
  });

  it("should disable the back button on the first step", () => {
    render(
      <Wizard
        showWizard={true}
        steps={steps}
        onFinish={() => {}}
        onCancel={() => {}}
      />
    );

    // Check if the "Back" button is disabled on the first step
    expect(screen.getByText("Back")).toBeDisabled();
  });

  it("should not show the next button on the last step", () => {
    render(
      <Wizard
        showWizard={true}
        steps={steps}
        onFinish={() => {}}
        onCancel={() => {}}
      />
    );

    // Click the "Next" button to go to the second step
    fireEvent.click(screen.getByText("Next"));
    // Check if the "Next" button is not rendered on the last step
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });
});
