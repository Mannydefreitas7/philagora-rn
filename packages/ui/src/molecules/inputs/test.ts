import { render, screen } from "@testing-library/react-native";
import { UITextfield } from "./component";
import { uITextfieldSeeds } from "./data";

describe("UITextfield component", () => {
  it("renders without crashing", () => {
    render(UITextfield({ placeholder: uITextfieldSeeds[0].placeholder }));
    expect(screen.getByPlaceholderText(uITextfieldSeeds[0].placeholder)).toBeTruthy();
  });

  it("renders a label when labelProps is provided", () => {
    const seed = uITextfieldSeeds[1];
    render(
      UITextfield({
        placeholder: seed.placeholder,
        labelProps: { value: seed.label ?? "" },
      })
    );
    expect(screen.getByText(seed.label ?? "")).toBeTruthy();
  });

  it("renders error message when isInvalid and error are set", () => {
    const seed = uITextfieldSeeds[1];
    render(
      UITextfield({
        placeholder: seed.placeholder,
        isInvalid: true,
        error: seed.error,
      })
    );
    expect(screen.getByText(seed.error ?? "")).toBeTruthy();
  });

  it("does not render error when isInvalid is false", () => {
    const seed = uITextfieldSeeds[1];
    render(
      UITextfield({
        placeholder: seed.placeholder,
        isInvalid: false,
        error: seed.error,
      })
    );
    expect(screen.queryByText(seed.error ?? "")).toBeNull();
  });
});
