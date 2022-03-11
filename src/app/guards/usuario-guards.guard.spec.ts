import { TestBed } from '@angular/core/testing';

import { UsuarioGuardsGuard } from './usuario-guards.guard';

describe('UsuarioGuardsGuard', () => {
  let guard: UsuarioGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
