import { UndertaleFighter, EncounterFighter } from "./fighters.js";
import { UIHandler } from "./uihandler.js";

export const UndertaleEncounter = function(fighterData)
{
    var fighters = [[], []];
    var currFighter = 0;
    var currSide = 0;
    var ui = UIHandler();
    var scene = {};

    Object.keys(fighterData.defenders).forEach( function(key) 
    {
        fighters[0].push(UndertaleFighter(fighterData.defenders[key], scene));
    });
    Object.keys(fighterData.offenders).forEach( function(key) 
    {
        fighters[1].push(EncounterFighter(fighterData.offenders[key], scene));
    });

    scene.update = function(deltaTime)
    {
        ui.update(deltaTime);
        fighters[currSide][currFighter].update(deltaTime);
    };
    
    scene.draw = function(ctx)
    {
        ctx.clearRect(0, 0, 640, 480);
        ui.draw(ctx);
    };
    
    scene.getUI = function() { return ui; };

    scene.getEnemyFighters = function() { return fighters[Math.abs(currSide - 1)] };
    
    fighters[currSide][currFighter].prepareUI(scene);
    
    return Object.freeze(scene);
};