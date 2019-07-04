import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('RepoController (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('get repos', () => {
        return request(app.getHttpServer())
        .get('/repo')
        .expect(200)
        .expect(({body}) => {
            expect(body).toBeDefined();
            // expect(body)
            console.log(body[0]);
        });
    });
});
