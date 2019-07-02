import { Document } from 'mongoose';

export interface Build extends Document {
    state: string;
    duration: number;
    started_at: Date;
    finished_at: Date;
}
