import FightersView from './fightersView';
import { fighterService } from './services/fightersService';
import { IData } from './helpers/apiHelper';

interface IApp {
  startApp(): void;
}

class App implements IApp {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById('root') as HTMLDivElement;
  static loadingElement = document.getElementById('loading-overlay') as HTMLDivElement;

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';
      
      const fighters = await fighterService.getFighters() as IData[];
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element as HTMLDivElement;
      App.rootElement.innerHTML = '';

      App.rootElement.appendChild(fightersElement);

      const clickEl = document.getElementById('click') as HTMLAudioElement;
      const click = () => clickEl.play();
      document.addEventListener('click', click, false);
    } catch (error) {
      console.warn(error) as never;
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }
}

export default App;