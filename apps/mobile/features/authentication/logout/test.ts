import { act, renderHook } from "@testing-library/react-native";

jest.mock("@/utils/supabase", () => ({
	supabase: {
		auth: {
			signOut: jest.fn(),
		},
	},
}));

import useSessionStore from "@/stores/session";
import useUserStore from "@/stores/user";
import { supabase } from "@/utils/supabase";

import { logoutSeeds } from "./data";
import useLogoutStore from "./store";

const mockSignOut = supabase.auth.signOut as jest.Mock;

describe("logout feature store", () => {
	beforeEach(() => {
		mockSignOut.mockReset();
		useLogoutStore.getState().reset();

		useSessionStore.getState().setToken("token-123");
		useUserStore.setState({
			user: { id: logoutSeeds[0].userId, email: "john@smith.com" },
			token: "token-123",
			isLoggedIn: true,
		});
	});

	it("signs out and clears session + user stores", async () => {
		mockSignOut.mockResolvedValueOnce({ error: null });
		const { result } = renderHook(() => useLogoutStore());

		await act(async () => {
			const response = await result.current.logout();
			expect(response.error).toBeNull();
		});

		expect(mockSignOut).toHaveBeenCalledTimes(1);
		expect(useSessionStore.getState().token).toBeNull();
		expect(useSessionStore.getState().isLoggedIn).toBe(false);
		expect(useUserStore.getState().user).toBeNull();
		expect(useUserStore.getState().isLoggedIn).toBe(false);
	});

	it("stores error when signOut fails", async () => {
		mockSignOut.mockResolvedValueOnce({ error: { message: "network issue" } });
		const { result } = renderHook(() => useLogoutStore());

		await act(async () => {
			const response = await result.current.logout();
			expect(response.error).toBeTruthy();
		});

		expect(result.current.error).toBe("network issue");
		expect(result.current.submitting).toBe(false);
		expect(useSessionStore.getState().token).toBe("token-123");
		expect(useUserStore.getState().user?.id).toBe(logoutSeeds[0].userId);
	});
});
