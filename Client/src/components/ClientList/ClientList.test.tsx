import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import ClientList from "./ClientList";
import useClients from "../../hooks/useClients";
import useFundingSources from "../../hooks/useFundingSources";
import { languageFromId, toTileCase } from "../../utils/StringUtils";
import "@testing-library/jest-dom";

// Mock hooks
vi.mock("../../hooks/useClients", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../../hooks/useFundingSources", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../../utils/StringUtils", () => ({
  languageFromId: vi.fn(),
  toTileCase: vi.fn(),
}));

// Mock data
const mockClients = [
  {
    id: "1",
    name: "John Doe",
    dateOfBirth: "1990-01-01",
    mainLanguage: "jp",
    secondaryLanguage: "fr",
    fundingSourceId: "fs1",
  },
  {
    id: "2",
    name: "Jane Smith",
    dateOfBirth: "1985-05-15",
    mainLanguage: "es",
    secondaryLanguage: "en",
    fundingSourceId: "fs2",
  },
];

const mockFundingSources = [
  { id: "fs1", name: "Source 1" },
  { id: "fs2", name: "Source 2" },
];

const mockLanguageFromId = (id: string) => {
  switch (id) {
    case "jp":
      return "Japanese";
    case "es":
      return "Spanish";
    case "fr":
      return "French";
    default:
      return "English";
  }
};
const mockToTileCase = (name: string) => name.toUpperCase();

describe("ClientList", () => {
  beforeEach(() => {
    // Reset mocks
    (useClients as any).mockReturnValue({
      clients: mockClients,
      invalidate: vi.fn(),
    });
    (useFundingSources as any).mockReturnValue({
      fundingSources: mockFundingSources,
    });
    (languageFromId as any).mockImplementation(mockLanguageFromId);
    (toTileCase as any).mockImplementation(mockToTileCase);
  });

  test("renders ClientList component", () => {
    render(<ClientList />);
    expect(screen.getByText("Clients")).toBeInTheDocument();
  });

  test("renders client data correctly", () => {
    render(<ClientList />);

    // Check client data rendering
    expect(screen.getByText("JOHN DOE")).toBeInTheDocument();
    expect(screen.getByText("1/1/1990")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
    expect(screen.getByText("Source 1")).toBeInTheDocument();
    expect(screen.getByText("Source 2")).toBeInTheDocument();
  });
});
