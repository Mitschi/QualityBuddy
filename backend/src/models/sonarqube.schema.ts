import * as mongoose from 'mongoose';

export const SonarqubeSchema = new mongoose.Schema({
    id: String,
    name: String,
    violations: Number,
    metric: Number,
    line_coverage: Number,
    files: Number,
    ncloc: Number,
    bugs: Number,
    last_commit_date: Date,
    alert_status: String,
});
