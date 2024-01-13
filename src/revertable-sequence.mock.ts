import sinon from "npm:sinon";


export class MockRevertableSequence {
  steps: RevertableAction[];

  constructor() {
    this.steps = [];
  }

  process = sinon.stub().resolves();

  [Symbol.asyncIterator] = sinon.stub().yields({ done: true, value: true });
}
