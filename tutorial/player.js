import {Sitting,Running,Jumping,Falling} from './playerStates.js'

export class Player{
    constructor(game){
        this.game=game
        this.width=100;
        this.height=91.3;
        this.x=0;
        this.y=this.game.height-this.height;
        this.vy=0;
        this.image=document.getElementById('player')
        this.speed =0;
        this.maxspeed=10
        this.weight=1;
        this.states=[new Sitting(this), new Running(this), new Jumping(this),new Falling(this)]
        this.currentState = this.states[0];
        this.currentState.enter()
        this.frameX=0;
        this.frameY=0
        this.maxFrame=6
        this.fps=20;
        this.frameInterval= 100/this.fps;
        this.frameTimer=0;
    }
    update(input, deltaTime){
        this.currentState.handleInput(input)
        // horizontal
        this.x+=this.speed
        if(input.includes('ArrowRight')) this.speed=this.maxspeed;
        else if(input.includes('ArrowLeft')) this.speed=-this.maxspeed;
        else this.speed=0;
        if(this.x<0) this.x=0;
        if(this.x>this.game.width-this.width) this.x=this.game.width-this.width

        //vertical

        // if(input.includes('ArrowUp') && this.onGround()) this.vy-=30
        this.y+=this.vy
        if(!this.onGround()) this.vy+=this.weight
        else this.vy=0

        // animation
        if(this.frameTimer>this.frameInterval){
            this.frameTimer=0
            if(this.frameX<this.maxFrame) this.frameX++
            else this.frameX=0
        }
        else{
            this.frameTimer+=deltaTime;
        }
        // if(this.frameX<this.maxFrame) this.frameX++;
        // else this.frameX=0
    }

    draw(context){
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
    }
    onGround(){
       return this.y >=this.game.height-this.height; 
    }

    setState(state){
        this.currentState=this.states[state]
        this.currentState.enter()
    }
}