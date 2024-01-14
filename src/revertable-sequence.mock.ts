import sinon from "npm:sinon";


export class MockRevertableSequence {
  steps: RevertableAction[];
  revert: boolean;

  constructor(steps: RevertableAction[], revert = false) {
    this.steps = steps;
    this.revert = revert;
  }

  process = sinon.stub().callsFake(async () => {
    for await (const step of this) {
      // do nothing
    }
  });

  [Symbol.asyncIterator] = sinon.stub().callsFake(function* () {
    for (const step of this.steps) {
      if (this.revert) {
        step.revert();
      } else {
        step.process();
      }
      yield { done: false, value: true };
    }
    yield { done: true, value: true };
  });
}
