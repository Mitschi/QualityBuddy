import { Document } from 'mongoose';

export interface Sonarqube extends Document {
    id: string;
    name: string;
    violations: number;
    metric: number;
    line_coverage: number;
    files: number;
    ncloc: number;
    bugs: number;
    last_commit_date: Date;
    alert_status: string;
}
