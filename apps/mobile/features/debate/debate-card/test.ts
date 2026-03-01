import { act, renderHook } from "@testing-library/react-native";

import { debateCardSeeds } from "./data";
import useDebateCardStore from "./store";

describe("debate-card store", () => {
  beforeEach(() => {
    useDebateCardStore.getState().reset();
  });

  it("initialises with an empty debates list", () => {
    const { result } = renderHook(() => useDebateCardStore());
    expect(result.current.debates).toHaveLength(0);
  });

  it("populates debates via setDebates", () => {
    const { result } = renderHook(() => useDebateCardStore());

    act(() => {
      result.current.setDebates(debateCardSeeds);
    });

    expect(result.current.debates).toHaveLength(debateCardSeeds.length);
    expect(result.current.debates[0]?.id).toBe("seed-debate-card-1");
  });

  it("preserves debate fields after setDebates", () => {
    const { result } = renderHook(() => useDebateCardStore());

    act(() => {
      result.current.setDebates(debateCardSeeds);
    });

    const first = result.current.debates[0];
    expect(first?.status).toBe("live");
    expect(first?.participants).toHaveLength(3);
  });

  it("tracks selected debate via setField", () => {
    const { result } = renderHook(() => useDebateCardStore());

    act(() => {
      result.current.setField("selectedId", "seed-debate-card-1");
    });

    expect(result.current.values.selectedId).toBe("seed-debate-card-1");
  });

  it("resets all state on reset()", () => {
    const { result } = renderHook(() => useDebateCardStore());

    act(() => {
      result.current.setDebates(debateCardSeeds);
      result.current.setField("selectedId", "seed-debate-card-1");
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.debates).toHaveLength(0);
    expect(result.current.values.selectedId).toBeNull();
  });
});
