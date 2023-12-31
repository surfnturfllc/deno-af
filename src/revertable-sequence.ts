/// <reference types="./types.d.ts" />


export class RevertableSequence {
  steps: RevertableAction[];

  constructor(steps: RevertableAction[]) {
    this.steps = steps;
  }

  async process() {
    for await (const _ of this) {
      // do nothing
    }
  }
  
  async *[Symbol.asyncIterator]() {
    if (this.steps.length === 0) {
      return;
    }

    const queue = [];

    queue.push(this.steps[0]);

    let count = 0;
    let error = false;

    while (queue.length) {
      const step = queue.shift();

      if (!step) break;

      try {
        if (error) {
          if (step.revert) {
            await step.revert();
          }
          count -= 1;
        } else {
          await step.process();
          count += 1;
        }
      } catch {
        error = true;
        count -= 1;
      } finally {
        if (this.steps.length > count) {
          queue.push(this.steps[count]);
        }

        yield { done: queue.length < 1, value: true };
      }
    }
  }
}
