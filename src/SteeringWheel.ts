export function drawWheel(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, angle: number) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    let x2 = centerX + radius * Math.cos(angle);
    let y2 = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(x2, y2, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}