import { Group } from './group';
import { Filter } from './filter';
export class Role {
  dataHref: string;
  id: number;
  name: string;
  groups: Group[] = [];
  filters: Filter[] = [];
}