import { ExtensionContext } from "@foxglove/studio";
import { initPanel } from "./ControlsPanel";

export function activate(extensionContext: ExtensionContext): void {
  extensionContext.registerPanel({ name: "example-panel", initPanel: initPanel });
}
