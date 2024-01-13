import sinon from "npm:sinon";


export class MockRevertableSequence {
  steps: RevertableAction[];

  constructor(steps: RevertableAction[]) {
    this.steps = steps;
  }

  process = sinon.stub().resolves();

  [Symbol.asyncIterator] = sinon.stub().yields({ done: true, value: true });
}
