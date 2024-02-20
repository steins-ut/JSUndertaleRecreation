export const GameObjectFactory = function(properties = {})
{
    var objName = (typeof properties.objectName === "undefined") ? "GameObject": properties.objectName;
    var position = (typeof properties.position !== "object") ? {x: 0, y: 0}: properties.position;
    var parent = (typeof properties.parent === "undefined") ? null: properties.parent;

    var getObjectName = function() { return objName; };
    var setObjectName = function() { objName = newObjName; };
    var getWorldPosition = function()
    {
        if(parent != null) { return {"x": parent.position.x + position.x, "y": parent.position.y + position.y}; }
        return position;
    };
    var getLocalPosition = function(){ return position; };
    var translate = function(x, y) { position.x += x; position.y += y; };
    var setParent = function(newParent) { parent = newParent; };
    var getParent = function(){ return parent; };

    return Object.freeze
    ({
        getObjectName,
        setObjectName,
        getWorldPosition,
        getLocalPosition,
        translate,
        setParent,
        getParent
    });
};