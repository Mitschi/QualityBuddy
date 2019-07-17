import { Document } from 'mongoose';

export interface Sonarqube extends Document {
    id: string;
    name: number;
    violations: number;
    metric: number;
    lineCoverage: number;
    files: number;
    numberOfLines: number;
    bugs: number;
    lastCommitDate: Date;
    status: string;
}
