import { getData, IData } from '../helpers/apiHelper';

interface IFighterService {
  getFighters(): Promise<IData[] | IData>,
  getFighterDetails(_id: string): Promise<IData[] | IData>
}

class FighterService implements IFighterService {
  public getFighters() {
    return getData('fighters.json');
  }

  public getFighterDetails(_id) {
    return getData(`details/fighter/${_id}.json`);
  }
}

const fighterService = new FighterService();

export {
  fighterService,
  IFighterService
}