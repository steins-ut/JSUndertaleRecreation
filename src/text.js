export const TextFactory = function (properties)
{

    var position = (typeof properties.position !== "object") ? position : properties.position;
    var fontName =(typeof properties.fontName !== "string") ? "EightBitOperatorJVE" : properties.fontName; 
    var fontSize = (typeof properties.fontSize !== "string") ? "24px" : properties.fontSize;
    var text = (typeof properties.text !== "string") ? "No text has been given sad." : properties.text;
    var textSpeed = (typeof properties.textSpeed !== "number") ? 4 : properties.textSpeed;
    var textColor = (typeof properties.textColor !== "string") ? "#FFFFFF" : properties.textColor;
    var textSound = (typeof properties.textSound !== "string") ? "snd_txt2" : properties.textSound;
    var instant = (typeof properties.instant !== "boolean") ? true : properties.instant;
    var currTime = 0;
    var currWidth = 0;
    var lastIndex = 0;
    var currIndex = 0;

    var uiDraw = function(ctx)
    {
        ctx.save();
        ctx.font = fontSize + ' "' + fontName + '"';
        ctx.fillStyle = textColor;
        ctx.textBaseline = "top";
        if(instant) {ctx.fillText(text, position.x, position.y);}
        else
        {
            currWidth = 0;
            if(currTime > 1000/(60*textSpeed)) { currIndex = Math.min(currIndex + 1, text.length); currTime = 0; }
            if(currIndex > lastIndex) { window.resourceManager.getResource(textSound).playSound(); }
            for(let i = 0; i < currIndex; i++)
            {
                ctx.fillText(text[i], position.x + currWidth, position.y);
                currWidth += ctx.measureText(text[i]).width;
            }
            lastIndex = currIndex;
        }
        ctx.restore();
    };

    var uiUpdate = function(deltaTime) { currTime += deltaTime; };

    var changeProperties = function(newProperties)
    {
        position = (typeof newProperties.position !== "object") ? position : newProperties.position;
        fontName =(typeof newProperties.fontName !== "string") ? fontName : newProperties.fontName; 
        fontSize = (typeof newProperties.fontSize !== "string") ? fontSize : newProperties.fontSize;
        text = (typeof newProperties.text === "undefined") ? text : newProperties.text;
        textSpeed = (typeof newProperties.textSpeed !== "number") ? textSpeed : newProperties.textSpeed;
        textColor = (typeof newProperties.textColor !== "string") ? textColor : newProperties.textColor;
        textSound = (typeof newProperties.textSound !== "string") ? textSound : newProperties.textSound;
        instant = (typeof newProperties.instant !== "boolean") ? instant : newProperties.instant;
    }

    var isTextDone = function() { return currIndex == text.length; };
    var resetText = function() { currIndex = 0; currTime = 0; };

    return Object.freeze({uiDraw, uiUpdate, changeProperties, isTextDone, resetText});

};