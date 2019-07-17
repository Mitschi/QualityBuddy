import * as mongoose from 'mongoose';

export const SonarqubeSchema = new mongoose.Schema({
    id: String,
    name: String,
    violations: Number,
    metric: Number,
    lineCoverage: Number,
    files: Number,
    numberOfLines: Number,
    bugs: Number,
    lastCommitDate: Date,
    status: String,
});
