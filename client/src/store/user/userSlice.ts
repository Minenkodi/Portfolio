import { createSlice } from '@reduxjs/toolkit';

export type UserState = {
    isAuthenticated: boolean;
    user: { id: string; email: string; name: string } | null;
}

const initialState: UserState = {
    isAuthenticated: false,
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Stub: login
        loginSuccessMock: (state) => {
            state.isAuthenticated = true;
            state.user = { id: 'u1', email: 'test@example.com', name: 'Test User' };
        },
        // Stub: logout
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

// Експортуємо дії для використання в компонентах
export const { loginSuccessMock, logout } = userSlice.actions;

export default userSlice.reducer;