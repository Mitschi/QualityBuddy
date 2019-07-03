export interface BuildDTO {
    state: string;
    duration: number;
    started_at: Date;
    finished_at: Date;
    number: number;
    repo_id: string;
    commit: {
        id: string;
        sha: string;
        message: string;
        committed_at: Date;
    };
}
