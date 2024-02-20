export const ImageRendererFactory = function()
{
    var applyEffects = {};
    var hslApplied = false;
    var scale = {width: 1, height: 1};
    
    applyEffects.scale = function(ctx, x, y, image, data)
    {
        ctx.translate(x + image.width/2, y + image.height/2);
        ctx.scale(data.width, data.height);
        ctx.translate(-x + image.width/-2, -y + image.height/-2);
        scale = data;
    };

    applyEffects.rotate = function(ctx, x, y, image, data)
    {
        ctx.translate((x + image.width/2) * scale, (y + image.height/2) * scale);
        ctx.rotate(data.value * Math.PI / 180);
        ctx.translate((-x + image.width/-2) * scale, (-y + image.height/-2) * scale);
    };

    applyEffects.hsl = function(ctx, x, y, image, data)
    {
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(image, x + (scale.width-1) * image.width, y + (scale.height-1) * image.height);

        ctx.globalCompositeOperation = data.l < 100 ? "color-burn" : "color-dodge";

        data.l = data.l >= 100 ? data.l - 100 : 100 - (100 - data.l);
        ctx.fillStyle = "hsl(0, 50%, " + data.l + "%)";
        ctx.fillRect(x + (scale.width-1) * image.width, y + (scale.height-1) * image.height, image.width * scale.width, image.height * scale.height);
        
        // adjust saturation
        ctx.globalCompositeOperation = "saturation";
        ctx.fillStyle = "hsl(0," + data.sat + "%, 50%)";
        ctx.fillRect(x + (scale.width-1) * image.width, y + (scale.height-1) * image.height, image.width * scale.width, image.height * scale.height);

        // adjust hue
        ctx.globalCompositeOperation = "hue";
        ctx.fillStyle = "hsl(" + data.hue + ",1%, 50%)";
        ctx.fillRect(x + (scale.width-1) * image.width, y + (scale.height-1) * image.height, image.width * scale.width, image.height * scale.height);
        hslApplied = true;
    };

    var drawImage = function(ctx, x, y, image, effects = {})
    {
        image = (typeof(image) !== "object") ? window.resourceManager.getResource(`nosprite`).image : image;
        ctx.save();
        for(let effect in effects)
        {
            applyEffects[effect](ctx, x, y, image, effects[effect]);
        }
        if (hslApplied)
        {
            ctx.globalCompositeOperation = "destination-in";
            ctx.drawImage(image, x + (scale.width-1) * image.width, y + (scale.height-1) * image.height);

            // reset comp. mode to default
            ctx.globalCompositeOperation = "source-over";
            hslApplied = false;
        }
        else {ctx.drawImage(image, x + (scale.width-1) * image.width, y + (scale.height-1) * image.height);}
        ctx.restore();
    };

    return Object.freeze
    ({
        drawImage
    });

};