Inventory = function(config){
  if(!config){
    config = {};
  }
  this.maxWeight = config.maxWeight || 25; //default to about a small chest. Set to 0 to ignore.
  this.maxItems = config.maxItems || 10; //you can max out in either amounts or weight (or both). Set to 0 to ignore.
  this.acceptsType = config.acceptsType || entities.Item.prototype; //Use this if you want to restrict the types that can be added. Set to null to ignore.
  this.inventory = config.contents || [];
}

//return a count of items
Inventory.prototype.getItemsCount = function(){
  return this.inventory.length;
};

//get the weight of the inventory. Inventories by themselves have no weight.
Inventory.prototype.getWeight = function(){
  var weight = 0;
  for(var i = 0; i < this.inventory.length; i++){
    if(this.inventory[i] && this.inventory[i].getWeight){
      weight = weight + this.inventory[i].getWeight();
    }
  }
};

//Add an item
Inventory.prototype.addItem = function(item){
  //check type
  if(this.acceptsType && item instanceof this.acceptsType){
    //check weight
    if(this.maxWeight && ( this.getWeight() + item.getWeight() <= this.maxWeight ) ){
      //check item count
      if(this.maxItems && this.getItemsCount() < this.maxItems){
        this.inventory.push(item);
        return true;
      }
    }
  }
  return false;
};

//remove an item by id, returning the item that was removed
Inventory.prototype.removeItem = function(id){
  for(var i = 0; i < this.inventory.length; i++){
    if(this.inventory[i].id === id){
      return this.inventory.splice(i, 1);
    }
  }
  return false;
};

//remove an item from ourselves and add it to the foreign inventory if we can
Inventory.prototype.transferTo = function(itemId, Inv){
  for(var i = 0; i < this.inventory.length; i++){
    if(this.inventory[i].id === id){
      //try to add, and if that works, remove it from ourselves
      if(Inv.addItem(this.inventory[i])){
        this.removeItem(itemId);
        return true;
      }
    }
  }
  return false;
};
