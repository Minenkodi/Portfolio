import { QUERIES } from "../datasources/queries";
import * as db from '../db';
import { Response, Request } from "express";
import { QueryResultRow } from "pg";

 
interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        email: string;
    }
}

export const selectTransactionsByUserId = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const values = [userId];
        const result = await db.query<QueryResultRow>(QUERIES.SELECT_TRANSACTIONS_BY_USER_ID, values);
        return response.status(200).json(result.rows);
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const selectBalanceByUserId = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const values = [userId];
        const result = await db.query<QueryResultRow>(QUERIES.SELECT_BALANCE_BY_USER_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : { amount: 0 });
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const appendTransaction = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const { categoryId, when, amount } = request.body;
        const values = [userId, categoryId, when, amount];
        const result = await db.query<QueryResultRow>(QUERIES.APPEND_TRANSACTION, values);
        return response.status(201).json(result.rows[0]);
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const updateTransactionById = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const id = request.params.id;
        const { when, amount } = request.body;
        const values = [id, userId, when, amount];
        const result = await db.query<QueryResultRow>(QUERIES.UPDATE_TRANSACTION, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const deleteTransactionById = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const id = request.params.id;
        const values = [id, userId];
        const result = await db.query<QueryResultRow>(QUERIES.DELETE_TRANSACTION, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const getTransactionById = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const id = request.params.id;
        const values = [id, userId];
        const result = await db.query<QueryResultRow>(QUERIES.SELECT_TRANSACTION_BY_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}
