declare interface Action {
  process(): Promise<void>;
  revert?(): Promise<void>;
}
