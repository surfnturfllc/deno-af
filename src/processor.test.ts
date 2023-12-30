/// <reference types="./types.d.ts" />

import { describe, it } from "https://deno.land/std@0.210.0/testing/bdd.ts";
import { assertExists } from "https://deno.land/std@0.210.0/assert/mod.ts";

import sinon from "npm:sinon";

import { Processor } from "./processor.ts";


function createMockAction() {
  return {
    process: sinon.spy(() => Promise.resolve()),
    revert: sinon.spy(() => Promise.resolve()),
  };
}

function createMockErrorAction() {
  return {
    process: sinon.spy(() => Promise.reject()),
    revert: sinon.spy(() => Promise.resolve()),
  };
}


describe("Processor", () => {
  it("can be instantiated", () => {
    const processor = new Processor([]);
    assertExists(processor);
  });

  it("runs actions in sequential order", async () => {
    const action1 = createMockAction();
    const action2 = createMockAction();
    const action3 = createMockAction();

    const processor = new Processor([action1, action2, action3]);
    await processor.process();

    sinon.assert.callOrder(action1.process, action2.process, action3.process);
  });

  it("reverts actions if an error is produced", async () => {
    const action1 = createMockAction();
    const action2 = createMockAction();
    const action3 = createMockErrorAction();

    const processor = new Processor([action1, action2, action3]);
    await processor.process();

    sinon.assert.callOrder(
      action1.process,
      action2.process,
      action3.process,
      action2.revert,
      action1.revert,
    );
    sinon.assert.notCalled(action3.revert);
  });
});
