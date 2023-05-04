import { ExtensionContext } from "@foxglove/studio";
import { initTurtlePanel } from "./ControlsPanel";

export function activate(extensionContext: ExtensionContext): void {
  extensionContext.registerPanel({ name: "example-panel", initPanel: initTurtlePanel });
}
