/*
 * We're the player. Only one of us exists, and we're responsible for making ourselves.
 * We exist outside the entityManager
 */

function PlayerProto(config){
  entities.Character.call(this, config);
  this.inventory = new Inventory(config);
}

PlayerProto.prototype = Object.create(entities.Character.prototype);

//TODO roll stats
//TODO classes?

//create ourselves
window.Player = new PlayerProto({name: 'Player', description: 'A being of pure energy'});
