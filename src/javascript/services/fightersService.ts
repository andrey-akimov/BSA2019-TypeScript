import { getData } from '../helpers/apiHelper';

class FighterService {
  getFighters() {
    return getData('fighters.json');
  }

  getFighterDetails(_id) {
    return getData(`details/fighter/${_id}.json`);
  }
}

export const fighterService = new FighterService();
