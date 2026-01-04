import type { T_TileCoords } from '../types';
import { generate_initial_tile_value, generate_id } from './utils';

type T_TileValue = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;
export class Tile {
  #id: number;
  #value: T_TileValue;

  /**
   * Movement returns removed tiles,
   * which may have the same coordinates as the merged tiles.
   * That’s why we need to store coordinates inside the Tile class.
   */
  #coordinates: T_TileCoords;

  /**
   * The tile that this tile was merged with.
   * This is used for getting the coordinates of the merged tile before removing it.
   */
  mergedInTile: Tile | null = null;

  constructor(coordinates: T_TileCoords, value?: T_TileValue) {
    this.#id = generate_id();
    this.#value = value || generate_initial_tile_value();
    this.#coordinates = coordinates;
  }

  doubble() {
    const new_value = this.#value * 2;

    if (new_value > 2048) {
      console.error('Tile value cannot be greater than 2048');
      return;
    }
    this.#value = new_value as T_TileValue;
  }

  merge(tile: Tile) {
    this.mergedInTile = tile;
  }

  get id() {
    return this.#id;
  } 

  get coords() {
    return this.#coordinates;
  }

  set coords(coordinates: T_TileCoords) {
    this.#coordinates = coordinates;
  }

  get value() {
    return this.#value;
  }
}
