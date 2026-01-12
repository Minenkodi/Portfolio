import type { Request, Response } from 'express';
import * as db from '../db';
import { QUERIES } from '../datasources/queries';
import { QueryResultRow } from "pg";

 
interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        email: string;
    }
}

export const getGoals = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user?.userId;
        const result = await db.query<QueryResultRow>(QUERIES.SELECT_GOALS_BY_USER_ID, [userId]);
        res.json(result.rows);
    } catch (error: unknown) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const createGoal = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user?.userId;
        const { name, goal_amount, goal_target_date } = req.body;
        const result = await db.query<QueryResultRow>(QUERIES.INSERT_GOAL, [userId, name, goal_amount, goal_target_date]);
        res.status(201).json(result.rows[0]);
    } catch (error: unknown) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateGoal = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user?.userId;
        const { id } = req.params;
        const { name, goal_amount, goal_target_date } = req.body;
        const result = await db.query<QueryResultRow>(QUERIES.UPDATE_GOAL, [id, userId, name, goal_amount, goal_target_date]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        res.json(result.rows[0]);
    } catch (error: unknown) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteGoal = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user?.userId;
        const { id } = req.params;
        const result = await db.query<QueryResultRow>(QUERIES.DELETE_GOAL, [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        res.json({ id });
    } catch (error: unknown) {
        res.status(500).json({ error: (error as Error).message });
    }
};
