(function(){
  const SIZE = 256;
  let ctx = null;

  function init(canvas){
    ctx = canvas.getContext('2d');
    canvas.width = SIZE;
    canvas.height = SIZE;
  }

  function drawArrow(fromX, fromY, toX, toY){
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const arrowLength = 5;
    ctx.lineTo(toX - arrowLength * Math.cos(angle - Math.PI / 6),
               toY - arrowLength * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - arrowLength * Math.cos(angle + Math.PI / 6),
               toY - arrowLength * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }

  function show(worm){
    if(!ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const cellSize = 28;
    const offset = 4;
    // draw data field on upper half
    for(let i=0;i<32;i++){
      const col = i % 8;
      const row = Math.floor(i / 8);
      const x = offset + col * cellSize;
      const y = offset + row * cellSize;
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.fillRect(x,y,cellSize,cellSize);
      ctx.strokeRect(x,y,cellSize,cellSize);
      ctx.fillStyle = '#000';
      ctx.fillText(worm.data[i].toFixed(2), x + cellSize/2, y + 2);
      // draw index arrow below cell
      const idxY = y + cellSize + 8;
      ctx.fillText(i, x + cellSize/2, idxY + 2);
      drawArrow(x + cellSize/2, idxY, x + cellSize/2, y + cellSize);
    }

    const progStartY = offset + 4 * cellSize + 20;
    ctx.textBaseline = 'top';
    for(let i=0;i<32;i++){
      const col = i % 8;
      const row = Math.floor(i / 8);
      const x = offset + col * cellSize;
      const y = progStartY + row * cellSize;
      const ins = worm.program[i];
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.fillRect(x,y,cellSize,cellSize);
      ctx.strokeRect(x,y,cellSize,cellSize);
      ctx.fillStyle = '#000';
      ctx.fillText(i, x + cellSize/2, y + 2);
      ctx.fillText(`d${ins.dst}`, x + cellSize/2, y + 12);
    }
  }

  window.wormDebug = { init, show };
})();
