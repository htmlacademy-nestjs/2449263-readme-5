import { randomBytes } from 'node:crypto';

export function genRandomPassword (): string {
  return randomBytes(48).toString('hex');
};
