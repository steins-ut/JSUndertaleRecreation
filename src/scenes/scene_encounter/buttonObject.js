import { GameObjectFactory } from "../../gameObject.js";
import { ImageRendererFactory } from "../../imageRenderer.js";
import { TextFactory } from "../../text.js";

export const ButtonFactory = function(properties = {})
{
    let gameObject = GameObjectFactory({objectName: properties.objectName,
                                        position: properties.position});
    var imageRenderer = ImageRendererFactory();

    var highlighted = false;
    var actionName = (typeof properties.actionName !== "string") ? true : properties.actionName;
    var btnImage = (typeof properties.image !== "object") ? window.resourceManager.getResource("nosprite").image : properties.image;
    var btnImageHighlighted = (typeof properties.imageHighlighted !== "object") ? window.resourceManager.getResource("nosprite").image : properties.imageHighlighted;

    var drawButton = function(ctx) 
    {
        if(highlighted) { imageRenderer.drawImage(ctx, this.getWorldPosition().x, this.getWorldPosition().y, btnImageHighlighted); return;}
        imageRenderer.drawImage(ctx, this.getWorldPosition().x, this.getWorldPosition().y, btnImage);
    };

    var setHighlighted = function(newHighlighted) { highlighted = newHighlighted; };
    var setActive = function(active) { if (active) {actionStart(); return;} actionExit(); };

    var actionStart = function() { console.log("No actionStart() has been given."); };
    actionStart = (typeof properties.actionStart !== "function") ? actionStart: properties.actionStart;

    var actionUpdate = function(deltaTime) { console.log("No actionUpdate() has been given."); };
    actionUpdate = (typeof properties.actionUpdate !== "function") ? actionUpdate: properties.actionUpdate;

    var actionExit = function() { console.log("No actionExit() has been given."); };
    actionExit = (typeof properties.actionExit !== "function") ? actionExit: properties.actionExit;

    return Object.freeze(Object.assign({uiDraw: drawButton, 
                                        setHighlighted, 
                                        setActive,
                                        actionUpdate,
                                        actionName}, gameObject));
};

export const FightButton = function(fighterData, ui) 
{
    var actionUpdate = function(deltaTime) {};

    return Object.freeze(ButtonFactory({actionName: "FIGHT",
                                        actionUpdate, 
                                        image: window.resourceManager.getResource("spr_btnFight").image, 
                                        imageHighlighted: window.resourceManager.getResource("spr_btnFight_s").image,
                                        objectName: "btnFight",
                                        position: {x: 33, y: 431}}));

};


export const ActButton = function(fighterData, ui) 
{
    var actionUpdate = function(deltaTime) {};

    return Object.freeze(ButtonFactory({actionName: "ACT",
                                        actionUpdate, 
                                        image: window.resourceManager.getResource("spr_btnAct").image, 
                                        imageHighlighted: window.resourceManager.getResource("spr_btnAct_s").image,
                                        objectName: "btnAct",
                                        position: {x: 186, y: 431}}));


};

export const ItemButton = function(fighterData, ui) 
{
    var items = [fighterData.inventory.slice(0, 4), fighterData.inventory.slice(4, 8)];
    var currItem = 0;
    var currPage = 0;
    var lastPage = currPage;

    var actionStart = function() 
    {
        items = [fighterData.inventory.slice(0, 4), fighterData.inventory.slice(4, 8)];
        for(let i = 0; i < 4; i++) 
        { 
            ui.addElement(TextFactory({text: "* " + items[currPage][i],
                                        position: {x: ui.getElement("arenaBoxGroup", "arenaBox").getWorldPosition().x + 16 + (i%2*320),
                                                    y: ui.getElement("arenaBoxGroup", "arenaBox").getWorldPosition().y + 8 + Math.floor(i/2) * 96},
                                        fontName: "EightBitOperatorJVE",
                                        fontSize: "28px",
                                        }), "itemTexts", "item" + i);
        }
    };
    var actionUpdate = function(deltaTime) 
    {
        items = [fighterData.inventory.slice(0, 4), fighterData.inventory.slice(4, 8)];
        if(window.inputHandler.getKeyPressed("ArrowUp") && currItem >= 2){currItem -= 2; window.resourceManager.getResource("snd_squeak").playSound();}
        else if(window.inputHandler.getKeyPressed("ArrowDown") && currItem < 2){currItem += 2; window.resourceManager.getResource("snd_squeak").playSound();}
        else if(window.inputHandler.getKeyPressed("ArrowLeft"))
        {
            if(currItem % 2 == 0 && currPage != 0){currPage--; currItem++; window.resourceManager.getResource("snd_squeak").playSound();}
            else if(currItem % 2 == 1){currItem--; window.resourceManager.getResource("snd_squeak").playSound();}
        }
        else if(window.inputHandler.getKeyPressed("ArrowRight"))
        {
            if(currItem % 2 == 1 && currPage < items.length - 1){currPage++; currItem--; window.resourceManager.getResource("snd_squeak").playSound();}
            else if(currItem % 2 == 0){currItem++; window.resourceManager.getResource("snd_squeak").playSound();}
        }
        else if(window.inputHandler.getKeyPressed("KeyZ")){console.log(items[currPage][currItem]); window.resourceManager.getResource("snd_select").playSound();}

        if(lastPage != currPage) 
        {
            for(let i = 0; i < 4; i++) 
            { 
                ui.getElement("itemTexts", "item" + i).changeProperties({text: "* " + items[currPage][i]});
            }
            lastPage = currPage;
        } 

    };
    var actionExit = function() 
    {
        for(let i = 0; i < 4; i++) { ui.removeElement("itemTexts", "item" + i);}
        currItem = currPage = lastPage = 0;
    }

    return Object.freeze(ButtonFactory({actionName: "Item",
                                        actionStart,
                                        actionUpdate,
                                        actionExit,
                                        image: window.resourceManager.getResource("spr_btnItem").image, 
                                        imageHighlighted: window.resourceManager.getResource("spr_btnItem_s").image,
                                        objectName: "btnItem",
                                        position: {x: 346, y: 431}}));


};

export const MercyButton = function(fighterData, ui) 
{
    var actionUpdate = function(deltaTime) {};

    return Object.freeze(ButtonFactory({actionName: "MERCY",
                                        actionUpdate, 
                                        image: window.resourceManager.getResource("spr_btnMercy").image, 
                                        imageHighlighted: window.resourceManager.getResource("spr_btnMercy_s").image,
                                        objectName: "btnMercy",
                                        position: {x: 501, y: 431}}));


};

export const CharacterButton = function() {}