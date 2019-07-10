import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DatabaseTestingModule } from '../src/database/database-testing.module';
import { RepoModule } from '../src/repo/repo.module';
import { RepoDto } from '../src/repo/repo.dto';
import { HttpStatus } from '@nestjs/common';

describe('RepoController (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [DatabaseTestingModule, RepoModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        return request(app.getHttpServer())
        .delete('/repo');
    });

    const repo: RepoDto = {
        id: 'test',
        href: '/repo/test',
        name: 'TestingRepo',
        slug: 'Tester/TestingRepo',
        token: 'somegreatlongtoken',
        type: 'Travis',
        workspace: 'undefined',
    };

    it('Create Repo', () => {
        return request(app.getHttpServer())
        .post('/repo')
        .set('Accept', 'application/json')
        .send(repo)
        .expect(({ body }) => {
            expect(body.name).toEqual(repo.name);
            expect(body.id).toEqual(repo.id);
            expect(body.href).toEqual(repo.href);
            expect(body.slug).toEqual(repo.slug);
          })
          .expect(HttpStatus.CREATED);
    });

    it('Should requect duplicated repo', () => {
        return request(app.getHttpServer())
        .post('/repo')
        .set('Accept', 'application/json')
        .send(repo)
        .expect(({ body }) => {
            expect(body.message).toEqual('Repo already exists');
          })
          .expect(HttpStatus.BAD_REQUEST);
    });

    it('get repo', () => {
        return request(app.getHttpServer())
        .get('/repo/test')
        .expect(200)
        .expect(({body}) => {
            expect(body).toBeDefined();
            expect(body.name).toEqual(repo.name);
            expect(body.id).toEqual(repo.id);
            expect(body.href).toEqual(repo.href);
            expect(body.slug).toEqual(repo.slug);
        });
    });
});
