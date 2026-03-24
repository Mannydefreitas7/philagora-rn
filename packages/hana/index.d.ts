import { LitElement } from 'lit';
export type EventsTargetType = 'local' | 'global';
/**
 * Spline scene viewer
 */
export declare class SplineViewer extends LitElement {
  static styles: import('lit').CSSResult;
  /**
   * The url of the .hanacode file as exported from Spline Editor.
   */
  url: string | null;
  /**
   * The width of the canvas
   */
  width: number | undefined;
  /**
   * The height of the canvas
   */
  height: number | undefined;
  /**
   * Preloading strategy ('lazy' or 'eager')
   */
  loading: "lazy" | "eager";
  /**
   * Enables auto unloading of the canvas / spline when it leaves the viewport
   */
  unloadable: boolean;
  /**
   * Target of the mouse events, can either be 'local' (ie the canvas) or global (window)
   */
  eventsTarget: EventsTargetType | undefined;
  private _hana?;
  protected _loaded: boolean;
  protected _container: HTMLElement;
  protected _canvas: HTMLCanvasElement;
  protected _logo: HTMLElement;
  protected _slot: HTMLElement;
  private _loadedUrl;
  constructor();
  protected unload(): void;
  protected load(): void;
  onLoaded: () => void;
  updated(changedProperties: Map<string | number | symbol, unknown>): void;
  connectedCallback(): void;
}
declare global {
  interface HTMLElementTagNameMap {
    'hana-viewer': SplineViewer;
  }
}
