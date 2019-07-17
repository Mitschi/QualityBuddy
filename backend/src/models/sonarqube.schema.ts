import * as mongoose from 'mongoose';

export const SonarqubeSchema = new mongoose.Schema({
    id: String,
    name: Number,
    violations: Number,
    metric: Number,
    lineCoverage: Number,
    files: Number,
    numberOfLines: Number,
    bugs: Number,
    lastCommitDate: Date,
    status: String,
});
