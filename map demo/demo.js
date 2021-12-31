const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var attackFlag=0;
var attackFrom = 0;
var attackTo = 0;

function drawCircles() {
  circles.forEach(circle => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.font = "20px Arial";
  ctx.fillText(circle.id, circle.x, circle.y);
});
}
function start(){
  console.log("start");
  var img = document.getElementById("myImgId");
  canvas.style.position = "absolute";
  canvas.style.left = img.offsetLeft+ "px";
  canvas.style.top = img.offsetTop+ "px";
  drawCircles();
}
start();

function isIntersect(point, circle) {
  return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
}

canvas.addEventListener('click', (e) => {
	var rect = canvas.getBoundingClientRect();var rect = canvas.getBoundingClientRect();
  const pos = {
    x: e.clientX-rect.left,
    y: e.clientY-rect.top
  };
  console.log(pos.x);
  console.log(pos.y);
  for (let circle of circles)  {
    console.log(isIntersect(pos, circle))
    if (isIntersect(pos, circle) && attackFlag && !attackFrom) {
      //alert('click on circle: ' + circle.id);
      attackFrom = circle.id;
      document.getElementById("msg").innerHTML="Attack from territory "+ circle.id+ " to..";
      break;
    } else if(isIntersect(pos, circle) && attackFlag && !attackTo){
      attackTo = circle.id;
      document.getElementById("msg").innerHTML="Attack!!";
      circle.color = 'rgb(0,0,255)';
      drawCircles();
      break;
    }

  }
});

function setAttack(){
  attackFlag = 1;
  document.getElementById("msg").innerHTML="Choose territory to attack from ..";
}