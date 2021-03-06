import * as mongoose from 'mongoose';

export const BuildSchema = new mongoose.Schema({
    state: String,
    duration: Number,
    started_at: Date,
    finished_at: Date,
    number: Number,
    repo_id: String,
    commit: {
        id: String,
        sha: String,
        message: String,
        committed_at: Date,
    },
});
