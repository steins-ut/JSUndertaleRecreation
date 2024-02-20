export const ResourceManager = (function()
{
    var resources = {};
    var resourcesLoaded = false;
    var audioCtx = new AudioContext();
    /**
     * Tries to load sound and add it to resources
     * @param {string} soundName 
     * @param {string} soundPath
     * @returns {void}
     */
    var loadSound = function(soundName, soundPath)
    {
        if(!resources[soundName]) 
        {
            let audio = AudioFactory(soundPath, audioCtx);
            audio.then((audio) => {audio.status = "loaded"; resources[soundName] = audio;}, (audio) => {audio.status = "failed"; resources[soundName] = audio;});
        }
    };

    /**
     * Tries to load image and add it to resources
     * @param {string} imgName 
     * @param {string} imgPath
     * @returns {void}
     */
    var loadImage = function(imgName, imgPath)
    {
        if(!resources[imgName])
        {
            let image = new Image();
            let status = "pending";
            resources[imgName] = {image, status};
            image.addEventListener("load", () => {resources[imgName].status = "loaded";}, {once: true});
            image.addEventListener("error", (e) => {resources[imgName].status = "failed"; resources[imgName].error = e.message;}, {once: true});
            image.src = imgPath;
        }
    };

    var loadFont = function(fontFace, fontURL)
    {
        let font = new FontFace(fontFace, fontURL);

        font.load().then((f) => { document.fonts.add(f); resources[fontFace] = {status: "loaded", font: f}; })
        .catch((e) => { resources[fontFace] = {status: "failed", error: e};});

    };

    /**
     * Gets resource by name
     * @param {string} resourceName
     */
    var getResource = function(resourceName) { return resources[resourceName]; };
    var getAllResources = function() { return resources; };
    var areResourcesLoaded = function() 
    { 
        if(!resourcesLoaded) 
        {
            resourcesLoaded = Object.keys(resources).every((key) => { 
                        if(resources[key].status === "loaded") {return true;} 
                        console.log(key + " is not loaded."); 
                        return false;});
        } 
        return resourcesLoaded; 
    };

    return Object.freeze
    ({
        loadSound,
        loadImage,
        loadFont,
        getResource,
        getAllResources,
        areResourcesLoaded
    });
    
})();

/**
 * Tries to load an audio file
 * @param {string} soundPath 
 * @param {AudioContext} audioCtx 
 * @returns {Promise<{playSound: Function, status: string}>}
 */
const AudioFactory = async function(soundPath, audioCtx)
{
    var status = "pending";
    var audioBuffer = null;
    let response = await fetch(soundPath);
    let arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    var playSound = function()
    {
        let trackSource = audioCtx.createBufferSource();
        trackSource.buffer = audioBuffer;
        trackSource.connect(audioCtx.destination);
        trackSource.start();

        return trackSource;
    };

    return {
        playSound,
        status
    };
};