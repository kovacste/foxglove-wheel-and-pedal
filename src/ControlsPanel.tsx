import { PanelExtensionContext } from "@foxglove/studio";
import { drawWheel} from "./SteeringWheel";


type VehicleStatusMessage = {
  header: {
    seq: number;
    stamp: {
      sec: number;
      nsec: number;
    };
    frame_id: string;
  },
  tm: string;
  drivemode: number;
  steeringmode: number;
  gearshitf: number;
  speed: number;
  drivepedal: number;
  brakepedal: number;
  angle: number;
  lamp: number;
  light: number;
}

function initPanel(panelContext: PanelExtensionContext) {
  const panelDiv = document.createElement("div");
  panelDiv.style.margin = "auto";
  panelDiv.style.display = "flex";
  panelDiv.style.height = "100%";
  panelContext.panelElement.appendChild(panelDiv);

  const canvas = document.createElement("canvas");
  panelDiv.appendChild(canvas);
  canvas.width = 500;
  canvas.height = 500;
  canvas.style.width = "50%";
  canvas.style.height = "50%";
  canvas.style.objectFit = "scale-down";

  const context = canvas.getContext("2d");

  const debug = document.createElement('div');
  debug.innerText = 'Debug panel';
  debug.style.height = '200px';
  debug.style.width = '500px';

  panelContext.panelElement.appendChild(debug);

  if (!context) {
    panelDiv.innerText = "unable to get 2d context";
    return;
  }
  context.fillStyle = "red";

  panelContext.watch("currentFrame");
  panelContext.subscribe(["/vehicle_status"]);
  panelContext.onRender = (renderState, done) => {
    context.fillStyle = "red";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    const newMsg = (renderState.currentFrame
        ?.filter((msgEvent) => msgEvent.topic === "/vehicle_status")
        .map((messageEvent) => messageEvent.message) ?? []) as VehicleStatusMessage[];


    let correctedAngle = -5 * (newMsg[0]?.angle ? newMsg[0]?.angle : 0) - Math.PI / 2;

    drawWheel(context, 100, 100, 50, correctedAngle);

    done();
  };
}

export { initPanel };