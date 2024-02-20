import InputHandler from "./input.js";
import { ResourceManager } from "./resources.js";
import { Game } from "./game.js";

export const deepClone = function(obj)
{
    if(obj === null) {return null;}
    let clone = Object.assign({}, obj);
    Object.keys(clone).forEach((prop) =>
    {
        clone[prop] = (typeof(obj[prop]) === "object" ? deepClone(obj[prop]) : obj[prop]);
    });
    return clone;
};

window.onload = function(){const GAME_WIDTH = 640;
const GAME_HEIGHT = 480;

/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("gameCanvas");

/**@type {CanvasRenderingContext2D} */
let ctx =   canvas.getContext('2d');

canvas.style.width = GAME_WIDTH * 2 / window.devicePixelRatio + "px";
canvas.style.height = GAME_HEIGHT * 2 / window.devicePixelRatio + "px";

//canvas.style.width = GAME_WIDTH * 2 + "px";
//canvas.style.height = GAME_HEIGHT * 2 + "px";

canvas.width = GAME_WIDTH * window.devicePixelRatio * 2;
canvas.height = GAME_HEIGHT * window.devicePixelRatio * 2;

ctx.scale(window.devicePixelRatio * 2, window.devicePixelRatio * 2);

ctx.imageSmoothingEnabled = false;

window.resourceManager = ResourceManager;
window.inputHandler = new InputHandler();
console.log(window.resourceManager);

const game = Game(GAME_WIDTH, GAME_HEIGHT, ctx);

let lastTime = 0;
let frameLimiter = 0;
let FPS = 30;

function gameLoop(timeStamp)
{
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    frameLimiter += deltaTime;
    if(!document.hidden && resourceManager.areResourcesLoaded())
    {
        if(frameLimiter >= 1000/FPS)
        {
            game.update(deltaTime);
            frameLimiter = 0;
        }   
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);};