import { GameObjectFactory } from "../../gameObject.js";

export const ArenaBoxFactory = function(properties = {})
{
    let gameObject = GameObjectFactory({objectName: properties.objectName,
                                        position: properties.position});
    var boxWidth = (typeof properties.width !== "number") ? 575: properties.width;
    var boxHeight = (typeof properties.height !== "number") ? 140: properties.height;
    var borderWidth = (typeof properties.borderWidth !== "number") ? 5 : properties.borderWidth;
    var borderColor = (typeof properties.borderColor !== "string") ? "#FFFFFF" : properties.borderColor;
    var fill = (typeof properties.fill !== "boolean") ? false : fill;
    var fillColor = (typeof properties.fillColor !== "string") ? "#000000" : properties.fillColor;

    var uiDraw = function(ctx)
    {
        ctx.save();
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = borderColor;
        ctx.rect(this.getWorldPosition().x, this.getWorldPosition().y, boxWidth, boxHeight);
        if(fill){ctx.fill();}
        ctx.lineWidth = borderWidth;
        ctx.stroke();
        ctx.restore();
    };

    var changeProperties = function(newProperties)
    {
        boxWidth = (typeof newProperties.boxWidth !== "number") ? boxWidth : newProperties.boxWidth;
        boxHeight = (typeof newProperties.boxHeight !== "number") ? boxHeight : newProperties.boxHeight;
        borderWidth = (typeof newProperties.borderWidth !== "number") ? borderWidth : newProperties.borderWidth;
        borderColor = (typeof newProperties.borderColor !== "string") ? borderColor : newProperties.borderColor;
        fill = (typeof newProperties.fill !== "boolean") ? fill : newProperties.fill;
        fillColor = (typeof newProperties.fillColor !== "string") ? fillColor : newProperties.fillColor;
    };

    return Object.freeze(Object.assign({uiDraw, changeProperties}, gameObject));
};