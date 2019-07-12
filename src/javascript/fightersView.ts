import View from './view';
import FighterView from './fighterView';
import Fighter from './Fighter';
import fight from './fight';
import { fighterService } from './services/fightersService';

class FightersView extends View {
  constructor(fighters) {
    super();
    
    this.createFighters(fighters);
  }

  fightersDetailsMap = new Map();

  fightFunc;

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleFighterClick.bind(this));
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', classNames: ['fighters'] });
    this.element.append(...fighterElements);
  }

  async handleFighterClick(event, fighter) {
    try {
      // map a fighter
      const { _id } = fighter;
      const thisMap = this.fightersDetailsMap;
      if (!thisMap.has(_id) || !thisMap.get(_id).health) {
        const loadingElement = document.getElementById('loading-overlay');
        loadingElement.style.visibility = 'visible';
        const fighterDetails = await fighterService.getFighterDetails(_id);
        thisMap.set(_id, { ...fighter, ...fighterDetails });
        loadingElement.style.visibility = 'hidden';
      }

      // modal
      const FighterModalEl = document.getElementById('fighter-modal') as HTMLDialogElement;
      FighterModalEl.showModal();
      const currentFighter = thisMap.get(_id);
      const temporaryData = { ...currentFighter };
      const { name, health, attack, defense } = temporaryData;
  
      const calculateProgressBar = (elementId, fighterProp, maxVal?) => {
        const progressBarEl = document.getElementById(elementId) as HTMLProgressElement;
        progressBarEl.value = fighterProp;
        progressBarEl.max = maxVal ? maxVal : fighterProp * 2;
      }
      calculateProgressBar('health-progress', health);
      calculateProgressBar('attack-progress', attack);
      calculateProgressBar('defense-progress', defense, 4);

      const addProgressBtnListener = (action, prop) => {
        const evListener = () => {
          if ((temporaryData[prop] <= 1 && action === 'minus')
            || (temporaryData[prop] >= currentFighter[prop] * 2 && action !== 'minus')){
              return false;
            }
          temporaryData[prop] = action === 'minus' ? temporaryData[prop] - 1 : temporaryData[prop] + 1;
          const progressBarEl = document.getElementById(`${prop}-progress`) as HTMLProgressElement;
          progressBarEl.value = temporaryData[prop];
        }
        document.getElementById(`${action}-${prop}`).addEventListener('click', evListener, false);
      }
      addProgressBtnListener('minus', 'health');
      addProgressBtnListener('plus', 'health');
      addProgressBtnListener('minus', 'attack');
      addProgressBtnListener('plus', 'attack');
  
      const nameInput = document.getElementById('name_field') as HTMLInputElement;
      nameInput.value = name;

      const selectListener = () => {
        removeSelectListener();
        const { health, attack, source } = temporaryData;
        if (this.fightFunc) {
          this.fightFunc(new Fighter(nameInput.value, health, attack, defense, source, false))
        } else {
          this.fightFunc = fight(new Fighter(nameInput.value, health, attack, defense, source, true));
        }
      };
      const modalSelect = document.getElementById('select-modal');
      const removeSelectListener = () => modalSelect.removeEventListener('click', selectListener, false);
      modalSelect.addEventListener('click', selectListener, false);
      document.getElementById('cancel-modal').addEventListener('click', removeSelectListener, false);
      
    } catch (error) {
      console.warn(error);
    }
    
  }
}

export default FightersView;