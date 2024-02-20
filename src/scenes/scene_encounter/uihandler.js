export const UIHandler = function()
{
    var elements = {};

    var addElement = function(element, elementGroup, elementID)
    {
        if(typeof element === "object")
        {
            if(elementGroup !== "none") 
            {
                if(elements[elementGroup] === undefined) { elements[elementGroup] = {};}
                elements[elementGroup][elementID] = element; 
                return;
            }
            elements[elementID] = element;
        }
    };

    var getElement = function(elementGroup, elementID)
    {
        if(elementGroup !== "none") 
        {
            return elements[elementGroup][elementID];
        }
        return elements[elementID];
    };

    var getElementGroup = function(elementGroup)
    {
        return elements[elementGroup];
    };

    var removeElement = function(elementGroup, elementID)
    {
        if(elementGroup !== "none") 
        {
            if(elements[elementGroup] === undefined) { return ;}
            delete elements[elementGroup][elementID]; 
            return;
        }
        delete elements[elementID];
    };

    var removeElementGroup = function(elementGroup)
    {
        delete elements[elementGroup];
    };

    var update = function(deltaTime)
    {
        for(let key in elements)
        {
            if(typeof elements[key].uiUpdate !== "undefined") {elements[key].uiUpdate(deltaTime);}
            else
            {
                Object.keys(elements[key]).forEach((key2) => {if(typeof elements[key][key2].uiUpdate !== "undefined") {elements[key][key2].uiUpdate(deltaTime);}});
            }
        }
    };

    var draw = function(ctx)
    {
        ctx.drawImage(window.resourceManager.getResource("bg_normal").image, 15, 6);
        for(let key in elements)
        {
            if(typeof elements[key].uiDraw !== "undefined"){elements[key].uiDraw(ctx);}
            else
            {
                Object.keys(elements[key]).forEach((key2) => {if(typeof elements[key][key2].uiDraw !== "undefined") {elements[key][key2].uiDraw(ctx);}});
            }
        }
    };

    return Object.freeze({addElement, getElement, getElementGroup, removeElement, removeElementGroup, update, draw});

};