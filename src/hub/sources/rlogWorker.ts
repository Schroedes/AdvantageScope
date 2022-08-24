import Log from "../log/Log";
import RLOGDecoder from "./RLOGDecoder";

self.onmessage = (event) => {
  let { id, payload } = event.data;
  function resolve(result: any) {
    self.postMessage({ id: id, payload: result });
  }
  function reject() {
    self.postMessage({ id: id });
  }

  if (!payload.success) reject();

  let log = new Log();
  let decoder = new RLOGDecoder();
  let success = decoder.decode(log, payload.raw);
  if (success) {
    resolve(log.toSerialized());
  } else {
    reject();
  }
};
