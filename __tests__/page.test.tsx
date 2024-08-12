import { describe, it, expect } from 'vitest';
import { initialUsers } from '../app/constants';

describe('MOST IMPORTAT TESTS', () => {
  it('Will Florian be picked?', () => {
    expect(initialUsers).toContain("Florian");
  });
});