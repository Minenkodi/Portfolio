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

export const getCategoryTypes = async (response: Response) => {
    try {
        const result = await db.query<QueryResultRow>(QUERIES.SELECT_CATEGORY_TYPES);
         
        return response.status(200).json(result.rows);
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const appendSimpleCategory = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const { name, categoryTypeId } = request.body;
        const values = [userId, categoryTypeId, name];
        const result = await db.query<QueryResultRow>(QUERIES.APPEND_SIMPLE_CATEGORY, values);
        return response.status(201).json(result.rows[0]);
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const getCategoriesByCategoryType = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const { categoryTypeId, balance } = request.query;
        const values = [userId, categoryTypeId];
        const dbQuery = balance ? QUERIES.SELECT_CATEGORY_BY_CATEGORY_TYPE_WITH_BALANCE : QUERIES.SELECT_CATEGORY_BY_CATEGORY_TYPE;
        const result = await db.query<QueryResultRow>(dbQuery, values);
        return response.status(200).json(balance ? result.rows[0] : result.rows);
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const getCategoryById = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const id = request.params.id;
        const values = [id, userId];
        const result = await db.query<QueryResultRow>(QUERIES.SELECT_CATEGORY_BY_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const updateCategoryById = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const id = request.params.id;
        const { name } = request.body;
        const values = [id, userId, name];
        const result = await db.query<QueryResultRow>(QUERIES.UPDATE_CATEGORY_BY_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}

export const deleteCategoryById = async (request: Request, response: Response) => {
    try {
        const { userId } = (request as AuthenticatedRequest).user!;
        const id = request.params.id;
        const values = [id, userId];
        await db.query<QueryResultRow>(QUERIES.DELETE_TRANSACTIONS_BY_CATEGORY_ID, values);
        const result = await db.query<QueryResultRow>(QUERIES.DELETE_CATEGORY_BY_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error: unknown) {
        return response.status(500).json({ message: (error as Error).message });
    }
}
