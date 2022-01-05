const movingSpeed=300;
export default class MovingImage{
    constructor(image, startTop=50, startLeft=50, newTop=50, newLeft=50){
        //URL of image for src img tag
        this.image=image;
        //start and new are coordinates of square in browser
        this.startTop=startTop;
        this.startLeft=startLeft;
        this.newTop=newTop;
        this.newLeft=newLeft;
        this.piece=null;
        //speed for left and right movement
        this.xvelocity=(newLeft-startLeft)/movingSpeed;
        //speed for up and down movement
        this.yvelocity=(startTop-newTop)/movingSpeed;
        this.createPiece();
        this.x=startLeft;
        this.y=startTop;
        this.counter = 1
        setTimeout(()=>{
            //function removes the newly created moving piece element as react site re-renders the static piece
            this.destroyPiece()
        }, movingSpeed)
    }
    //x and Y are css variables in style.css. line 228
    get x(){
        return parseFloat(getComputedStyle(this.piece).getPropertyValue("--x"))
    }
    get y(){
        return parseFloat(getComputedStyle(this.piece).getPropertyValue("--y"))
    }
    set x(value){
        this.piece.style.setProperty("--x", value)
    }
    set y(value){
        this.piece.style.setProperty("--y", value)
    }
    //called with constructor
    createPiece(){
        var piece = document.createElement('img')
        this.piece=piece
        piece.src=this.image
        piece.classList.add("movingPiece");
        piece.setAttribute("id", "activeAn");
        this.x=this.startLeft;
        this.y=this.startTop;
        // console.log(this.startTop-this.newTop);
        // console.log(this.startLeft-this.newLeft);

        document.getElementById('root').appendChild(piece);
    }
    destroyPiece(){
        document.getElementById("activeAn").remove()
    }

    
    update(delta){
        if(this.counter===1){
            this.y -= this.yvelocity
            this.y += this.xvelocity
            this.counter+=1;
        }else{
            this.x += this.xvelocity * delta
            this.y -= this.yvelocity * delta
        }

    }
    // update(time){
    //     if(lastTime!=null && playing===true){
    //         const delta=time-lastTime
    //     }
    //     lastTime=time
    //     window.requestAnimationFrame(update)
    // }
}