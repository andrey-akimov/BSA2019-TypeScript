class Fighter {
  constructor(name, health, attack, defense, img, isSecond){
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.img = img;
    this.isSecond = isSecond;
  }

  _luckyChance(){
    return Math.floor(Math.random() * 2) + 1;
  }

  getHitPower(){
    return this.attack * this._luckyChance();
  }

  getBlockPower(){
    return this.defense * this._luckyChance();
  }
}

export default Fighter;