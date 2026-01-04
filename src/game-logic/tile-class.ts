import { generate_initial_tile_value, generate_id } from './utils';

type T_TileValue = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;
export class Tile {
  id: number;
  value: T_TileValue;
  mergedWithTileId: number | null = null;

  constructor(value?: T_TileValue) {
    this.id = generate_id();
    this.value = value || generate_initial_tile_value();
  }

  doubble() {
    const new_value = this.value * 2;

    if (new_value > 2048) {
      console.error('Tile value cannot be greater than 2048');
      return;
    }
    this.value = new_value as T_TileValue;
  }

  mergedWith(tile: Tile) {
    this.mergedWithTileId = tile.id;
  }
}
