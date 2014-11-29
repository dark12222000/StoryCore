Inventory = function(){
  this.maxWeight = 25; //default to about a small chest. Set to 0 to ignore.
  this.maxItems = 10; //you can max out in either amounts or weight (or both). Set to 0 to ignore.
  this.acceptsType = entities.Item; //Use this if you want to restrict the types that can be added. Set to null to ignore.
  this.inventory = [];
}

Inventory.prototype.addItem = function(item){
  //check type
  if(this.acceptsType && item instanceof this.acceptsType){
    //check weight
    if(this.maxWeight && ( this.getWeight() + item.getWeight() <= this.maxWeight ) ){
      //check item count
      if(this.maxItems && this.getItemsCount() < this.maxItems){
        this.inventory.push(item);
      }
    }
  }
};

Inventory.prototype.getItemsCount = function(){
  return this.inventory.length;
};

Inventory.prototype.getWeight = function(){
  var weight = 0;
  for(var i = 0; i < this.inventory.length; i++){
    if(this.inventory[i] && this.inventory[i].getWeight){
      weight = weight + this.inventory[i].getWeight();
    }
  }
};
