export default class InputHandler
{
    constructor()
    {
        this._keyMap = 
        {
            "ArrowLeft": {"keypressed" : false, "keyheld": false},
            "ArrowRight": {"keypressed" : false, "keyheld": false},
            "ArrowUp": {"keypressed" : false, "keyheld": false},
            "ArrowDown": {"keypressed" : false, "keyheld": false},
            "KeyZ": {"keypressed" : false, "keyheld": false},
            "KeyX": {"keypressed" : false, "keyheld": false},
        };
        document.addEventListener('keydown', (event) =>
        {
            event.preventDefault();
            if(!event.repeat && this._keyMap[event.code] != undefined)
            {
                this._keyMap[event.code].keyheld = true;
                this._keyMap[event.code].keypressed = true;
            }
        });
        document.addEventListener("keyup", (event) => 
        {
            event.preventDefault();
            if(this._keyMap[event.code] != undefined)
            {
                this._keyMap[event.code].keyheld = false;
            }
        });
    }

    update()
    {
        for(let key in this._keyMap)
        {
            this._keyMap[key].keypressed = false;
        }
    }

    /**
     * Returns true if key is pressed
     * @param {string} key 
     * @returns {boolean}
     */
    getKeyPressed(key) {let _tmp = this._keyMap[key].keypressed; this._keyMap[key].keypressed = false; return _tmp;}

    /**
     * Returns true if key is held
     * @param {string} key 
     * @returns {boolean}
     */
    getKeyHeld(key) {return this._keyMap[key].keyheld;}
    
}