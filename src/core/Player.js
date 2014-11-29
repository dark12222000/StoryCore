/*
 * We're the player. Only one of us exists, and we're responsible for making ourselves.
 * We exist outside the entityManager
 */

function PlayerProto(){
}

//TODO roll stats
//TODO classes?
PlayerProto.prototype = new entities.Character();
//create ourselves
window.Player = new PlayerProto();
