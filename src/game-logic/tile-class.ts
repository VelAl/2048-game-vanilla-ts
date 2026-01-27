import type { T_TileCoords } from '../types';
import { generate_initial_tile_value, generate_id } from './utils';

export class Tile {
  #id: number;
  #value: number;

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

  constructor(coordinates: T_TileCoords, value?: number) {
    this.#id = generate_id();
    this.#value = value || generate_initial_tile_value();
    this.#coordinates = coordinates;
  }

  double() {
    this.#value *= 2;
  }

  merge(tile: Tile) {
    this.mergedInTile = tile;
  }

  clearMergedTile() {
    this.mergedInTile = null;
  }

  get id() {
    return this.#id;
  }

  get coords() {
    return this.#coordinates;
  }

  set coords(coordinates: T_TileCoords) {
    this.#coordinates = coordinates;

    if (this.mergedInTile) {
      this.mergedInTile.coords = coordinates;
    }
  }

  get value() {
    return this.#value;
  }
}
