import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from 'moment';
import type {
    RequestAddTransaction,
    Transaction,
    TransactionsInitialState
} from "../../types";
import { getBalanceByCategoryType, getBalanceByUser } from "../balance/balanceSlice";
import { getGoals } from "../goals/goalsSlice";
import axios from "axios";
import { EXPENSE_CATEGORY_ID, INCOME_CATEGORY_ID } from "../../constants/categoryTypes";

interface TransactionResponse {
    id: string;
    category_type_id: string;
    category_id: string;
    when: string;
    amount: string;
    description: string;
}

const initialState: TransactionsInitialState = {
    transactions: [],
    currentTransaction: null,
    error: ''
};

const rawUrl = import.meta.env.VITE_API_KEY;
const API_URL = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
const TRANSACTIONS_URL = `${API_URL}/transactions`;
export const client = axios.create();

client.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getTransactionsByUser = createAsyncThunk(
    'transactions/getTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await client.get(TRANSACTIONS_URL);
            return data as TransactionResponse[];
        } catch {
            return rejectWithValue('Network error');
        }
    }
)

export const getTransactionById = createAsyncThunk(
    'transactions/getTransactionById',
    async (transactionId: string, { rejectWithValue }) => {
        try {
            const { data } = await client.get(`${TRANSACTIONS_URL}/${transactionId}`);
            return data as TransactionResponse;
        } catch {
            return rejectWithValue('Network error');
        }
    }
)

export const createTransaction = createAsyncThunk<TransactionResponse, RequestAddTransaction, { rejectValue: string }>(
    'transactions/createTransaction',
    async (newTransaction: RequestAddTransaction, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await client.post(TRANSACTIONS_URL, newTransaction);
            dispatch(getBalanceByUser());
            dispatch(getBalanceByCategoryType(INCOME_CATEGORY_ID));
            dispatch(getBalanceByCategoryType(EXPENSE_CATEGORY_ID));
            dispatch(getGoals());
            dispatch(getGoals());
            return data as TransactionResponse;
        } catch {
            return rejectWithValue('Network error');
        }
    }
)

export const updateTransaction = createAsyncThunk<TransactionResponse, Transaction, { rejectValue: string }>(
    'transactions/updateTransaction',
    async (updatedTransaction: Transaction, { rejectWithValue, dispatch }) => {
        try {
            const transactionId = updatedTransaction.id;
            const { data } = await client.put(`${TRANSACTIONS_URL}/${transactionId}`, updatedTransaction);
            dispatch(getBalanceByUser());
            dispatch(getBalanceByCategoryType(INCOME_CATEGORY_ID));
            dispatch(getBalanceByCategoryType(EXPENSE_CATEGORY_ID));
            dispatch(getGoals());
            dispatch(getGoals());
            return data as TransactionResponse;
        } catch {
            return rejectWithValue('Network error');
        }
    }
)

export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (transactionId: string, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await client.delete(`${TRANSACTIONS_URL}/${transactionId}`);
            dispatch(getBalanceByUser());
            dispatch(getBalanceByCategoryType(INCOME_CATEGORY_ID));
            dispatch(getBalanceByCategoryType(EXPENSE_CATEGORY_ID));
            dispatch(getGoals());
            dispatch(getGoals());
            return data as { id: string };
        } catch {
            return rejectWithValue('Network error');
        }
    }
)

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        clearCurrentTransaction: (state) => {
            state.currentTransaction = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getTransactionsByUser.fulfilled, (state, action) => {
                state.transactions = action.payload.map((transaction: TransactionResponse) => {
                    const { category_type_id: categoryTypeId, category_id: categoryId, when, ...rest } = transaction;
                    const correctDate = moment(when).format('YYYY-MM-DD');

                    return {
                        ...rest,
                        categoryId,
                        categoryTypeId,
                        when: correctDate
                    };
                })
            })

            .addCase(getTransactionsByUser.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(createTransaction.fulfilled, (state, action) => {
                const { when, category_type_id: categoryTypeId, category_id: categoryId, ...rest } = action.payload;
                const correctDate = moment(when).format('YYYY-MM-DD');
                const finalTransaction = {
                    ...rest,
                    when: correctDate,
                    categoryId,
                    categoryTypeId
                };
                state.transactions.push(finalTransaction);
            })

            .addCase(createTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(updateTransaction.fulfilled, (state, action) => {
                const { when, category_type_id: categoryTypeId, category_id: categoryId, ...rest } = action.payload;
                const correctDate = moment(when).format('YYYY-MM-DD');
                const finalTransaction = {
                    ...rest,
                    when: correctDate,
                    categoryId,
                    categoryTypeId
                };
                const updatedTransactionIndex = state.transactions.findIndex((transaction) =>
                    transaction.id === action.payload.id
                );
                state.transactions.splice(updatedTransactionIndex, 1, finalTransaction);
                state.currentTransaction = null;
            })

            .addCase(updateTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(getTransactionById.fulfilled, (state, action) => {
                // action.payload is of type TransactionResponse from the API
                const {
                    category_type_id: categoryTypeId,
                    category_id: categoryId,
                    amount,
                    when,
                    ...rest
                } = action.payload;

                state.currentTransaction = {
                    ...rest,
                    categoryId,
                    categoryTypeId,
                    amount: amount ? Number(amount).toFixed(2) : '0.00',
                    when: when ? moment(when).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
                };
            })

            .addCase(getTransactionById.rejected, (state, action) => {
                state.error = action.payload as string;
            })

        builder
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter((transaction) =>
                    transaction.id !== action.payload.id);
            })

            .addCase(deleteTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
            })

    },
});

export const { clearCurrentTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;