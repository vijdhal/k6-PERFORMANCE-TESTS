import dotenv from 'dotenv';
dotenv.config();

export const USERS = process.env.USERS || 100; // Default to 100 if not set
export const DURATION = process.env.DURATION || '1m'; // Default to 1 minute if not set
export const BASE_URL = process.env.BASE_URL ;
