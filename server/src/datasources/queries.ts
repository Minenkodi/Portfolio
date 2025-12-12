export const QUERIES = Object.freeze({
    INSERT_NEW_USER: `
            INSERT INTO users (email, password_hash, user_full_name)
            VALUES ($1, $2, $3) 
            RETURNING id, email, created_at
        `,
    SELECT_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1`
});