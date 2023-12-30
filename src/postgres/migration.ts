/// <reference types="./types.d.ts" />


export class Migration {
  private db: Client;
  private queries: { migrate: string, revert: string };
  
  constructor(client: Client, migrate: string, revert: string) {
    this.db = client;
    this.queries = { migrate, revert };
  }

  async migrate(): Promise<void> {
    try {
      await this.db.connect();
      await this.db.queryObject(this.queries.migrate);
      await this.db.end();
    } catch (e) {
      if (e) {
        console.error(e);
      }
      throw e;
    }
  }

  async revert(): Promise<void> {
    try {
      await this.db.connect();
      await this.db.queryObject(this.queries.revert);
      await this.db.end();
    } catch (e) {
      if (e) {
        console.error(e);
      }
    }
  }
}
