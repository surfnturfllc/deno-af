declare interface RevertableAction {
  process(): Promise<void>;
  revert(): Promise<void>;
}
