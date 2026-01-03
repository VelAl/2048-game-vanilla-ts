import { generate_initial_tile_value, generate_id } from './utils';

export class Tile {
  id: number;
  value: number;

  constructor(value?: number) {
    this.id = generate_id();
    this.value = value || generate_initial_tile_value();
  }

  doubble() {
    this.value *= 2;
  }
}
