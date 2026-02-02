import type { ReviewConfig } from '../config';
import { drkovacs } from './drkovacs';

export const clients = {
  drkovacs,
} satisfies Record<string, ReviewConfig>;
