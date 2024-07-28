var canvas=document.getElementById('canvas');  
var ctx=canvas.getContext('2d');

var painting=false;
var penSize=2;
var eraserSize=10;
var isEraser=false;
var color="black";

document.getElementById('colorPicker').addEventListener('change',function(e)
{
    color=e.target.value;
})

document.getElementById('penSize').addEventListener('change',function(e)
{
    penSize=e.target.value;
})

document.getElementById('erase').addEventListener('click',function(e)
{
    isEraser=true;
})

document.getElementById('clear').addEventListener('click',function(e)
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

document.getElementById('save').addEventListener('click',function(e)
{
    var link=document.createElement('a');  //creates an anchor tag
    link.download='painting.png';     
    link.href=canvas.toDataURL();    
    link.click();    //triggers download
})

canvas.addEventListener('mousedown',function(e)
{
    painting=true;
    draw(e);
})

canvas.addEventListener('mouseup',function(e)
{
    painting=false
    ctx.beginPath();
    saveDrawing();
})

canvas.addEventListener('mousemove',draw)
function draw(e)
{
    if(!painting) return 

    ctx.lineWidth = isEraser ? eraserSize : penSize;   //Sets the width of the line based on the selected pen size.
    ctx.lineCap = 'round';     //Sets the shape of the ends of the lines to be round.
    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;   //makes the drawing tool act as an eraser when isEraser is true otherwise act as color

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);  //Draws a line to the current mouse position.
    ctx.stroke();  //Strokes the current path with the current strokeStyle  means used to draw the lines on the canvas using linto moveto commands
    ctx.beginPath();  //Begins a new path
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);   //Moves the starting point for the next line to the current mouse position.
    saveDrawing();  //autosaving into the localstorage
}

canvas.addEventListener('touchmove',draw)

canvas.addEventListener('touchstart',function(e){
    painting=true
    draw(e)
})

canvas.addEventListener('touchend',function(e){
    painting=false;
    ctx.beginPath()
    saveDrawing();
})

// canvas.addEventListener('touch')

//saves drawing data to browser's local storage
function saveDrawing() {
    const drawingData = canvas.toDataURL();   //canvas.toDataURL represents the image drawn on the canvas.
    localStorage.setItem('painting', drawingData);   //storing the image into the local storage by the variable and image with extension like(painting.png)
}


window.onload = function() {
    const savedDrawing = localStorage.getItem('painting');
    if (savedDrawing) {
        const img = new Image();  //created an object to continue drawing
        img.src = savedDrawing;  //assigning address of the image which is stored in localstorage to the created object
        img.onload = function() {   //onload is an event..on image onloading the function occurs.
            ctx.drawImage(img, 0, 0);   //draws image by placing the image on the top-left corner
        };
    }
};

