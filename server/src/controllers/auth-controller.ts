import { type Request, type Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as db from '../db';
import { QUERIES } from "../datasources/queries";

const generateToken = (user: { id: number, email: string }) => {
    return jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '99999h' }
    );
};


export const register = async (req: Request, res: Response) => {
    const { email, password, name, lastname } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const values = [email, passwordHash, name, lastname];

        const result = await db.query(QUERIES.INSERT_NEW_USER, values);
        const newUser = result.rows[0];

        const token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '9999h'
            }
        );

        return res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, email: newUser.email },
            token
        });

    } catch (error: unknown) {
        // Handle Unique Violation (Postgres Error Code 23505)
        if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === '23505') {
            return res.status(409).json({ error: 'Email already in use' });
        }

        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const result = await db.query(QUERIES.SELECT_USER_BY_EMAIL, [email]);
        const user = result.rows[0] as { id: number; email: string; password_hash: string } | undefined;

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user);

        return res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                // Add other non-sensitive fields here if needed
            },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};