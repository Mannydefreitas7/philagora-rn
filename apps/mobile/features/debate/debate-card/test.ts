import { act, renderHook } from "@testing-library/react-native";
import { useStoreState, useStoreValue } from "zustand-x";
import { debateCardSeeds } from "./data";
import debateCardStore from "./store";

describe("debate-card store", () => {
	beforeEach(() => {
		debateCardStore.store.devtools.cleanup();
	});

	it("initialises with an empty debates list", () => {
		const { result } = renderHook(() => useStoreValue(debateCardStore, "debates"));
		expect(result.current).toHaveLength(0);
	});

	it("populates debates via setDebates", () => {
		const { result } = renderHook(() => useStoreState(debateCardStore, "debates"));
		const [debates, setDebates] = result.current;
		act(() => {
			setDebates(debateCardSeeds);
		});

		expect(debates).toHaveLength(debateCardSeeds.length);
		expect(debates[0]?.id).toBe("seed-debate-card-1");
	});

	it("preserves debate fields after setDebates", () => {
		const { result } = renderHook(() => useStoreState(debateCardStore, "debates"));
		const [debates, setDebates] = result.current;
		act(() => {
			setDebates(debateCardSeeds);
		});

		const first = debates[0];
		expect(first?.status).toBe("live");
		expect(first?.participants).toHaveLength(3);
	});

	it("tracks selected debate via setSelectedId", () => {
		const { result } = renderHook(() => useStoreState(debateCardStore, "selectedId"));
		const [selectedId, setSelectedId] = result.current;
		act(() => {
			setSelectedId("seed-debate-card-1");
		});

		expect(selectedId).toBe("seed-debate-card-1");
	});

	it("resets all state on reset()", () => {
		const {
			result: {
				current: [debates, setDebates],
			},
		} = renderHook(() => useStoreState(debateCardStore, "debates"));
		const {
			result: {
				current: [selectedId, setSelectedId],
			},
		} = renderHook(() => useStoreState(debateCardStore, "selectedId"));
		act(() => {
			setDebates(debateCardSeeds);
			setSelectedId("seed-debate-card-1");
		});

		act(() => {
			debateCardStore.store.devtools.cleanup();
		});

		expect(debates).toHaveLength(0);
		expect(selectedId).toBeUndefined();
	});
});
