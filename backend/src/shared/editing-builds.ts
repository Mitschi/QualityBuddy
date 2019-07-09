import { Build } from '../types/build';
import { BuildDTO } from '../build/build.dto';

export async function editTravisBuildData(response): Promise<Build[]> {
    const builds = [];

    await response.data.builds.forEach(element => {
            const build: BuildDTO = {
                number: element.number,
                state: element.state,
                started_at: element.started_at,
                finished_at: element.finished_at,
                duration: element.duration,
                repo_id: element.repository.id,
                commit: {
                    id: element.commit.id,
                    message: element.commit.message,
                    committed_at: element.commit.committed_at,
                    sha: element.commit.sha,
                },
            };
            builds.push(build);
        });

    return builds;
}

export async function editBuddyBuildData(response, repoId: string): Promise<Build[]> {
    const builds = [];

    await response.data.executions.forEach(element => {
        const finishTime = new Date(element.finish_date);
        const startTime = new Date(element.start_date);
        const duration = new Date(finishTime.getTime() - startTime.getTime()).getSeconds();
        const build: BuildDTO = {
            number: element.id,
            state: (element.status === 'SUCCESSFUL' ? 'passed' : 'failed'),
            started_at: element.start_date,
            finished_at: element.finish_date,
            duration,
            repo_id: repoId,
            commit: {
                id: element.to_revision.committer.id,
                message: element.to_revision.message,
                committed_at: element.to_revision.commit_date,
                sha: element.to_revision.revision,
            },
        };

        builds.push(build);
    });

    return builds;
}
