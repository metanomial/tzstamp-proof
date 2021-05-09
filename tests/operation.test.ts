import { Operation } from "../src/mod.ts";
import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";

Deno.test("Prepend operation", () => {
  const bytes = new Uint8Array([0, 0, 45, 255]);
  const op = Operation.prepend(bytes);

  // Cast to string
  assertEquals(String(op), "Prepend 00002dff");

  // Serialize as JSON
  assertEquals(JSON.stringify(op), '["prepend","00002dff"]');

  // Commit operation to byte array
  assertEquals(
    op.commit(new Uint8Array([128, 15])),
    new Uint8Array([0, 0, 45, 255, 128, 15]),
  );
});

Deno.test("Append operation", () => {
  const bytes = new Uint8Array([0, 0, 45, 255]);
  const op = Operation.append(bytes);

  // Cast to string
  assertEquals(String(op), "Append 00002dff");

  // Serialize as JSON
  assertEquals(JSON.stringify(op), '["append","00002dff"]');

  // Commit operation to byte array
  assertEquals(
    op.commit(new Uint8Array([0, 128, 15])),
    new Uint8Array([0, 128, 15, 0, 0, 45, 255]),
  );
});

Deno.test("SHA-256 operation", () => {
  const op = Operation.sha256();

  // Cast to string
  assertEquals(String(op), "SHA-256");

  // Serialize as JSON
  assertEquals(JSON.stringify(op), '["sha-256"]');

  // Commit operation to byte array
  assertEquals(
    op.commit(new Uint8Array([104, 101, 108, 108, 111])),
    // deno-fmt-ignore
    new Uint8Array([
       44, 242,  77, 186,  95, 176, 163,  14,
       38, 232,  59,  42, 197, 185, 226, 158,
       27,  22,  30,  92,  31, 167,  66,  94,
      115,   4,  51,  98, 147, 139, 152,  36,
    ]),
  );
});

Deno.test("Blake2b operation", () => {
  const op = Operation.blake2b();

  // Cast to string
  assertEquals(String(op), "Blake2b-256");

  // Serialize as JSON
  assertEquals(JSON.stringify(op), '["blake2b"]');

  // Commit operation to byte array
  assertEquals(
    op.commit(new Uint8Array([104, 101, 108, 108, 111])),
    // deno-fmt-ignore
    new Uint8Array([
       50,  77, 207,   2, 125, 212, 163,  10,
      147,  44,  68,  31,  54,  90,  37, 232,
      107,  23,  61, 239, 164, 184, 229, 137,
       72,  37,  52, 113, 184,  27, 114, 207,
    ]),
  );
});