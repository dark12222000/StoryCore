entities.Container = function(config){
  entities.Item.call(this, config);
}

entities.Container.prototype = Object.create(entities.Item.prototype);

//return our entire weight including contents
entities.Container.prototype.getWeight = function(){
  return this.weight + this.inventory.getWeight();
}
