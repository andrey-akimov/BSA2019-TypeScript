interface IFighter {
  name: string,
  health: number,
  attack: number,
  defense: number,
  img: string,
  isSecond: boolean,
  source?: string
}

class Fighter implements IFighter {
  constructor(
    public name: string,
    public health: number,
    public attack: number,
    public defense: number,
    public img: string,
    public isSecond: boolean,
    public source?: string
  ){
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.img = img;
    this.isSecond = isSecond;
    this.source = source;
  }

  private _luckyChance(): number{
    return Math.floor(Math.random() * 2) + 1;
  }

  protected getHitPower(): number{
    return this.attack * this._luckyChance();
  }

  protected getBlockPower(): number{
    return this.defense * this._luckyChance();
  }
}

export default Fighter;
export { IFighter };