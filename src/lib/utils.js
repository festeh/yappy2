
import { uuid } from 'uuidv4';

export function generateID() {
  const id = uuid();
  return id;
}
