/*
 * We're the gender object! We handle stuff like Gender!
 */

window.Gender = {
  male: 'male',
  female: 'female',
  neuter: 'neuter',
  herm: 'herm',
  default: this.neuter,
  possible: [this.male, this.female, this.neuter, this.herm], //currently, possible random draws
  random: function(){ //Mostly used for generating enemies probs
    return this.possible[_random(this.possible.length)]; //give them a possible draw
  }
};
