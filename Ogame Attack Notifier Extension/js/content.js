var interval = 0;
var planetLinkList = [];
var timer;
(function() {
    planetLinkList = getPlanetsLinks();
    if (!validateUniverse()) return;

    interval = randomTime(1, 5);

    $( `<p id="countdownRefresh">${getTimeStr(interval)}</p>` ).insertAfter( "#norm" );

    timer = setInterval(notifierLoop, 1000);
})();

/**
 * 
 * @param {number} num 
 * @param {number} size 
 */
function pad(num, size) {
    var s = num+"";
    if (s.length < size) s = "0" + s;
    return s;
}

/**
 * 
 * @param {Array} planetList 
 */
function getRandomPlanetOrMoon(planetList){
    var index = Math.floor(Math.random() * planetList.length);
    return planetList[index];
}

/**
 * 
 * @param {number} min 
 * @param {number} max 
 */
function randomTime(min, max) {
    return Math.round(min + Math.random() * (max - min));
}

/**
 * 
 * @param {number} seconds 
 */
function getTimeStr(seconds) {
	if (seconds < 0)
		return '';
	var h = 0, m = 0, s = 0;
	h = pad(Math.floor(seconds / 3600), 2);
	seconds = seconds % 3600;
	m = pad(Math.floor(seconds / 60), 2);
	seconds = seconds % 60;
    s = pad(seconds, 2);

    return h+':'+m+':'+s;
}

/**
 * 
 */
function notifierLoop(){

    if (checkIncomingAttack()){
        console.log(checkIncomingAttack());
    }

    interval--;

    if (interval == 0){
        clearInterval(timer);
        window.location.href = getRandomPlanetOrMoon(planetLinkList);
    }else{
        document.getElementById("countdownRefresh").innerText = getTimeStr(interval);
    }
}

/**
 * Check if user is receiving an attack
 */
function checkIncomingAttack(){
    var eventList = $('.eventFleet');

    for (let i = 0; i < eventList.length; i++) {
        const missinType = eventList[i].getAttribute("data-mission-type");

        if (missinType == 1){
            return true;
        }
    }
    return false;
}

/**
 * Gets a array containing of all the planets URLs
 */
function getPlanetsLinks(){
    var planetList = $('.planetlink');
    var moonList = $('.moonlink');

    var planetLinkList = [];

    for (let i = 0; i < planetList.length; i++) {
        planetLinkList.push(planetList[i].getAttribute("href"));
    }

    for (let i = 0; i < moonList.length; i++) {
        planetLinkList.push(moonList[i].getAttribute("href"));
    }

    return planetLinkList;
}

/**
 * Validate is user using the extension is on a specific server and Language.
 */
function validateUniverse(){

    var allowedUniverse = ["Bermuda", "en"];

    var universeName = document.getElementsByName("ogame-universe-name")[0].getAttribute("content");
    var language = document.getElementsByName("ogame-language")[0].getAttribute("content");

    if (allowedUniverse[0] == universeName && allowedUniverse[1] == language){
        return true;
    }
    return false;
}