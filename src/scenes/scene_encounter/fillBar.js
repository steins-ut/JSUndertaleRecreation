import { GameObjectFactory } from "../../gameObject.js";

export const FillBarFactory = function(properties = {})
{
    let gameObject = GameObjectFactory({objectName: properties.objectName,
                                        position: properties.position});

    var width = (typeof properties.width !== "number") ? 111: properties.width;
    var height = (typeof properties.height !== "number") ? 20: properties.height;
    var currVal = (typeof properties.currentValue !== "number") ? 0: properties.currentValue;
    var maxVal = (typeof properties.maxValue !== "number") ? 100: properties.maxValue;
    var backgroundColor = (typeof properties.backgroundColor !== "string") ? "red": properties.backgroundColor;
    var foregroundColor = (typeof properties.foregroundColor !== "string") ? "yellow": properties.foregroundColor;

    var uiDraw = function(ctx)
    {
        ctx.save();
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(this.getWorldPosition().x, this.getWorldPosition().y, width, height);
        ctx.fillStyle = foregroundColor;
        let fillValue =  Math.min(Math.max(currVal / maxVal, 0), 1);
        ctx.fillRect(this.getWorldPosition().x, this.getWorldPosition().y, width * fillValue, height);
        ctx.restore();
    };

    var changeProperties = function(newProperties)
    {
        width = (typeof newProperties.width === "undefined") ? width : newProperties.width;
        height = (typeof newProperties.height === "undefined") ? height : newProperties.height;
        currVal = (typeof newProperties.currVal === "undefined") ? currVal : newProperties.currVal;
        maxVal = (typeof newProperties.maxVal === "undefined") ? maxVal : newProperties.maxVal;
        backgroundColor = (typeof newProperties.backgroundColor === "undefined") ? backgroundColor : newProperties.backgroundColor;
        foregroundColor = (typeof newProperties.foregroundColor === "undefined") ? foregroundColor : newProperties.foregroundColor;
    };

    var getProperties = function()
    {
        return Object.freeze({

            width,
            height,
            currVal,
            maxVal,
            backgroundColor,
            foregroundColor

        });
    };

    return Object.freeze(Object.assign({ uiDraw, changeProperties, getProperties }, gameObject));

};