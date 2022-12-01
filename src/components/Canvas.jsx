import React from 'react'

const Canvas = () => {
    const audioPlayer = React.useRef(new Audio('./assets/Asgore.mp3'));
    let tempHp = 100;
    let bossHp = 100; 
    const [playerHealth, setplayerHealth] = React.useState(100);
    const [enemyHealth, setEnemyHealth] = React.useState(100);
    const [mute, setMute] = React.useState(true);
    const canvasRef = React.useRef(null);
    const gameLimit = 10;
    let tempCircle = [];

    const playerHit = () =>{
        tempHp -= 1;
        setplayerHealth(tempHp);
    }

    const enemyKill = (e) =>{
        const k = e.key;
        if(k==='w' || k==='s' || k==='a' || k==='d'){
            bossHp -= 1;
            setEnemyHealth(bossHp);
        }
    }

    React.useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.width = window.innerHeight * .33;
    canvas.height = window.innerHeight * .33;
    let ctx = canvas.getContext('2d');
    function Player(){
        class Sprite{
            constructor(xPos, yPos, height, width){
                this.xPos = xPos;
                this.yPos = yPos;
                this.height = height;
                this.width = width;
            }

            draw(ctx){
                ctx.beginPath();
                let img = new Image();
                img.onload = () =>{
                    ctx.drawImage(img, this.xPos, this.yPos, this.height, this.width);
                };
                img.src = './assets/images/player.png'
            }

            update(x, y){
                ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
                this.draw(ctx);
                if(this.xPos + x + this.width < canvas.width && this.xPos + x > 0){
                    this.xPos += x;
                }
                if(this.yPos + y + this.width < canvas.width && this.yPos + y > 0){
                    this.yPos += y;
                }

            }
        }
        //player Body load function 
        let player = new Sprite(canvas.width*.5-10, canvas.width*.5-10, 20, 20);
        player.draw(ctx);
    
        //Input
        const keyInput = (e) =>{
            let x_velocity = 0;
            let y_velocity = 0;
            if(e.key === 'w'){
                y_velocity = -4;
            }else if(e.key === 's'){
                y_velocity = 4;
            }
            //X velocity
            if(e.key === 'a'){
                x_velocity = -4;
            }else if(e.key === 'd'){
                x_velocity = 4;
            }
            player.update(x_velocity,y_velocity);
        }
        document.addEventListener('keydown', keyInput);

        //Enemy Circles
        class Circles{
            constructor(xPos, yPos, width, speed){
                this.xPos = xPos;
                this.yPos = yPos;
                this.width = width;
                this.speed = speed;
                this.velocity_x = 2*speed+ Math.random();
                this.velocity_y = speed+ Math.random(); 
            }

            draw(ctx){
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.rect(this.xPos, this.yPos, this.width, this.width);
                ctx.fill();
                ctx.globalAlpha = .7;
                ctx.stroke();
            }

            update(){
                this.draw(ctx);
                if(this.xPos+this.width > canvas.width){
                    this.velocity_x = -this.speed;
                }
                if(this.yPos+this.width > canvas.width){
                    this.velocity_y = -this.speed;
                }
                if(this.yPos < 0){
                    this.velocity_y = this.speed;
                }
                if(this.xPos < 0){
                    this.velocity_x = this.speed;
                } 
                this.xPos += Math.random()* (2*this.velocity_x);
                this.yPos += Math.random()*this.velocity_y;
            
            }
        }

        for(let i=0; i<gameLimit; i++){
            let horizontal = (canvas.width * i/gameLimit );
            let circle = new Circles(Math.random()*horizontal, Math.floor(Math.random()*(canvas.width*.33)), 15,(Math.random() * 1)+.1);
            tempCircle.push(circle);
        }

        for(let i=0; i<tempCircle.length; i++){
            tempCircle[i].draw(ctx);
        }

        let updateCircle = () =>{
            requestAnimationFrame(updateCircle);
            for(let i=0; i!==tempCircle.length; i++){
                tempCircle[i].update();
                if (tempCircle[i].xPos > player.xPos && tempCircle[i].xPos < player.xPos + player.width 
                    && tempCircle[i].yPos > player.yPos && tempCircle[i].yPos < player.yPos + player.width) {
                    playerHit();
                }
            }
        }
        updateCircle();
    }
    document.addEventListener('keyup', enemyKill);
    Player();
    return () =>{ 
        document.removeEventListener('keyup', enemyKill);
    };
    },[]);

    //audio
    React.useEffect(()=>{
        audioPlayer.current.volume = .4;
        if(mute){
            audioPlayer.current.play();
        }else{
            audioPlayer.current.pause();
        }
    },[mute]);
    
    //end
    const [end, setEnd] = React.useState(false);
    const [win, setWin] = React.useState(true);
    React.useEffect(()=>{
        if(enemyHealth<0 && playerHealth>0 && end===false){
            setEnd(true);
            setWin(true);
        }else if(playerHealth<0 && enemyHealth>0 && end===false){
            setEnd(true);
            setWin(false);
        }
    },[enemyHealth, playerHealth])
    return  (
        <div>
            <img className='music' onClick={()=>setMute(!mute)} src={`./assets/images/${mute?'volumeMinus':'volumePlus'}.png`} alt="" /> 
            <div className='result' style={{display:end?'block':'none'}}><p>Log:<br/>{win?'You Won!!':'You lost!!'}</p></div> 
            <div className='enemyWrapper'> 
                <progress value={enemyHealth} max={100} min={1} />
                <img className='enemy' src="./assets/images/Asgore.gif" alt="" height='180' />
            </div>
            <div className='playerWrapper'> 
                <progress value={playerHealth} max={100} min={1} />
                <img className='player' src="./assets/images/main.png" alt="" height='80' width='80'/>
            </div>  <canvas className='mainCanvas' ref={canvasRef}/>
        </div>
    )
}

export default Canvas