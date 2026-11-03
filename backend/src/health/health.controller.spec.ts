import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('devuelve ok y una versión semver', () => {
    const health = controller.check();
    expect(health.status).toBe('ok');
    expect(health.version).toMatch(/^\d+\.\d+\.\d+/);
  });
});
