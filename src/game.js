import { deepClone } from "./index.js";
import { UndertaleEncounter } from "./scenes/scene_encounter/encounterScenes.js";


export const Game = function(GAME_WIDTH, GAME_HEIGHT, ctx)
{
    window.resourceManager.loadSound("snd_squeak", "../resources/sounds/snd_squeak.wav");
    window.resourceManager.loadSound("snd_select", "../resources/sounds/snd_select.wav");
    window.resourceManager.loadSound("snd_txt1", "../resources/sounds/SND_TXT1.wav");
    window.resourceManager.loadSound("snd_txt2", "../resources/sounds/SND_TXT2.wav");
    window.resourceManager.loadImage("spr_btnFight", "../resources/img/buttons/btnFight.png");
    window.resourceManager.loadImage("spr_btnFight_s", "../resources/img/buttons/btnFight_s.png");
    window.resourceManager.loadImage("spr_btnAct", "../resources/img/buttons/btnAct.png");
    window.resourceManager.loadImage("spr_btnAct_s", "../resources/img/buttons/btnAct_s.png");
    window.resourceManager.loadImage("spr_btnItem", "../resources/img/buttons/btnItem.png");
    window.resourceManager.loadImage("spr_btnItem_s", "../resources/img/buttons/btnItem_s.png");
    window.resourceManager.loadImage("spr_btnMercy", "../resources/img/buttons/btnMercy.png");
    window.resourceManager.loadImage("spr_btnMercy_s", "../resources/img/buttons/btnMercy_s.png");
    window.resourceManager.loadImage("nosprite", "../resources/img/nospr.jpg");
    window.resourceManager.loadImage("bg_normal", "../resources/img/background.png");
    window.resourceManager.loadFont("MarsNeedsCunnilingus", 'url(../resources/fonts/Mars_Needs_Cunnilingus.ttf)');
    window.resourceManager.loadFont("EightBitOperatorJVE", 'url(../resources/fonts/8BitOperatorJVE.ttf)');

    var testPlayerData = 
    {
        "name": "YOU",
        "type": "human",
        "gold": 0,
        "equpiment": {
            "weapon": "none",
            "armor": "none"
        },
        "stats": 
        {
            "xp": 0,
            "lv": 1,
            "maxHP": 20,
            "currHP": 20,
            "atk": 10,
            "def": 10,
            "inv": 5
        },
        "inventory": [0, 1, 2, 3, 4, 5, 6, 7]
    };
    var testMonsterData = 
    {
        "name": "mald",
        "type": "monster",
        "gold": 0,
        "equpiment": {
            "weapon": "none",
            "armor": "none"
        },
        "stats": 
        {
            "xp": 0,
            "lv": 1,
            "maxHP": 69,
            "currHP": 69,
            "atk": 20,
            "def": 5,
            "inv": 5
        },
        "inventory": [0, 1, 2, 3, 4, 5, 6, 7]
    };

    var fighters = { "defenders": {}, "offenders": {}};
    fighters.defenders.testHuman = testPlayerData;

    var scene = UndertaleEncounter(fighters);

    var update = function(deltaTime)
    {
        scene.update(deltaTime);
        window.inputHandler.update();
        scene.draw(ctx);
    };

    return Object.freeze({update});
};