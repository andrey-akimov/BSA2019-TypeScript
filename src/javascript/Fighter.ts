class Fighter {
  constructor(
    public name: string,
    public health: number,
    public attack: number,
    public defense: number,
    public img: string,
    public isSecond: boolean
  ){
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.img = img;
    this.isSecond = isSecond;
  }

  private _luckyChance(){
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