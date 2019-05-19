class Fighter {
  constructor(name, health, attack, defense){
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
  }

  luckyChance(){
    return Math.floor(Math.random() * 2) + 1;
  }

  getHitPower(){
    return this.attack * this.luckyChance();
  }

  getBlockPower(){
    return this.defense * this.luckyChance();
  }
}

export default Fighter;