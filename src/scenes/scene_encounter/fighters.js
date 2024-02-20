import { FightButton, ActButton, ItemButton, MercyButton } from "./buttonObject.js";
import { ArenaBoxFactory } from "./arenaBox.js";
import { FillBarFactory } from "./fillBar.js";
import { TextFactory } from "../../text.js";
import { ImageRendererFactory } from "../../imageRenderer.js";

export const UndertaleFighter = function(fighterData, scene)
{ 
    var data = fighterData;
                    
    var currentAction = 0;
    
    var prepareUI = function()
    {
        scene.getUI().addElement(FightButton(data, scene.getUI()), "buttonGroup", 0);
        scene.getUI().getElement("buttonGroup", 0).setHighlighted(true);
        scene.getUI().addElement(ActButton(data, scene.getUI()), "buttonGroup", 1);
        scene.getUI().addElement(ItemButton(data, scene.getUI()), "buttonGroup", 2);
        scene.getUI().addElement(MercyButton(data, scene.getUI()), "buttonGroup", 3);

        scene.getUI().addElement(ArenaBoxFactory({position: {x: 33, y: 249},
                                        objectName: "ArenaBox",}), "arenaBoxGroup", "arenaBox");

        scene.getUI().addElement(FillBarFactory({position: {x: 256, y: 402},
                                        objectName: "FighterSelfHealthBar",
                                        width: Math.ceil(111 * fighterData.stats.currHP / 92),
                                        height: 20,
                                        currentValue: fighterData.stats.currHP,
                                        maxValue: fighterData.stats.maxHP,
        }),"fighterInfoGroup", "healthBar");

        scene.getUI().addElement(TextFactory({text: fighterData.name, 
                                    position: {x: 33, y: 402},
                                    fontName: "MarsNeedsCunnilingus",
                                    fontSize: "24px"}), "fighterInfoGroup", "fighterName");
                                
        scene.getUI().addElement(TextFactory({text: "LV " + fighterData.stats.lv, 
                                    position: {x: 133, y: 402},
                                    fontName: "MarsNeedsCunnilingus",
                                    fontSize: "24px"}), "fighterInfoGroup", "fighterLevel");

        scene.getUI().addElement(TextFactory({text: "HP ", 
                                    position: {x: 225, y: 401},
                                    fontName: "EightBitOperatorJVE",
                                    fontSize: "24px"}), "fighterInfoGroup", "thetextleftofthehealthbar");

        scene.getUI().addElement(TextFactory({text: fighterData.stats.currHP + " / " + fighterData.stats.maxHP, 
                                    position: {x: scene.getUI().getElement("fighterInfoGroup", "healthBar").getWorldPosition().x + scene.getUI().getElement("fighterInfoGroup", "healthBar").getProperties().width + 14, y: 402},
                                    fontName: "MarsNeedsCunnilingus",
                                    fontSize: "24px"}), "fighterInfoGroup", "fighterHealth");                        

        scene.getUI().addElement(TextFactory({text: "* Waiting for enemy turn...", 
                                    position: {x: scene.getUI().getElement("arenaBoxGroup", "arenaBox").getWorldPosition().x + 16, y: scene.getUI().getElement("arenaBoxGroup", "arenaBox").getWorldPosition().y + 8},
                                    fontName: "EightBitOperatorJVE",
                                    fontSize: "28px",
                                    instant: false}), "arenaBoxGroup", "roundText",);    
    };

    var updateChoosing = function() 
    {
        if(window.inputHandler.getKeyPressed("KeyZ"))
        {
            STATE_STACK.push("ACTING"); 
            window.resourceManager.getResource("snd_select").playSound();
            scene.getUI().removeElement("arenaBoxGroup", "roundText");
            scene.getUI().getElement("buttonGroup", currentAction).setActive(true);
        }

        if(currentAction > 0 && window.inputHandler.getKeyPressed("ArrowLeft")) 
        {
            scene.getUI().getElement("buttonGroup", currentAction).setHighlighted(false); 
            currentAction--; 
            window.resourceManager.getResource("snd_squeak").playSound(); 
            scene.getUI().getElement("buttonGroup", currentAction).setHighlighted(true); 
        }
        if(currentAction < 3 && window.inputHandler.getKeyPressed("ArrowRight")) 
        {
            scene.getUI().getElement("buttonGroup", currentAction).setHighlighted(false); 
            currentAction++; 
            window.resourceManager.getResource("snd_squeak").playSound(); 
            scene.getUI().getElement("buttonGroup", currentAction).setHighlighted(true); 
        }
    };

    var updateActing = function() 
    {
        if(window.inputHandler.getKeyPressed("KeyX")) 
        { 
            STATE_STACK.pop(); 
            scene.getUI().addElement(TextFactory({text: "* Waiting for enemy turn...", 
                                position: {x: scene.getUI().getElement("arenaBoxGroup", "arenaBox").getWorldPosition().x + 16, y: scene.getUI().getElement("arenaBoxGroup", "arenaBox").getWorldPosition().y + 8},
                                fontName: "EightBitOperatorJVE",
                                fontSize: "28px",
                                instant: false}), "arenaBoxGroup", "roundText",);
            scene.getUI().getElement("buttonGroup", currentAction).setActive(false);
        }
        scene.getUI().getElement("buttonGroup", currentAction).actionUpdate();
    };

    const STATES =
    {
        CHOOSING: {update: updateChoosing.bind(this)},
        ACTING: {update: updateActing.bind(this)},
        ENDING_TURN: {update: function() {console.log("ending turn lmao");}}
    };

    var STATE_STACK = ["CHOOSING"];

    var getFighterData = function() { return fighterData; };

    var update = function(deltaTime)
    {
        STATES[STATE_STACK[STATE_STACK.length - 1]].update(deltaTime);
    };

    return Object.freeze({update, prepareUI, getFighterData});
};

export const EncounterFighter = function (fighterData, scene) {
    
    let imageRenderer = ImageRendererFactory();

    var renderSprite = function(ctx, x, y)
    {
        imageRenderer.drawImage(ctx, x, y);
    };

}