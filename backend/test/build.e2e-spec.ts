import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { BuildModule } from '../src/build/build.module';
import { DatabaseTestingModule } from '../src/database/database-testing.module';

describe('BuildController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
        imports: [DatabaseTestingModule, BuildModule],
    })
    .compile();
    app = module.createNestApplication();
    await app.init();
});

  it('get builds', () => {
    return request(app.getHttpServer())
      .get('/build')
      .expect(200)
      .expect(({body}) => {
          expect(body).toBeDefined();
      });
  });

  it('get builds by repository', () => {
    return request(app.getHttpServer())
      .get('/build/id')
      .expect(200)
      .expect(({body}) => {
          expect(body).toBeDefined();
      });
  });

  it('delete builds', () => {
    return request(app.getHttpServer())
    .delete('/build')
    .expect(200)
    .expect(({body}) => {
      expect(body).toBeDefined();
    });
  });
});
