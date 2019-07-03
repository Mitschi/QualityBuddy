import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BuildController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
});
