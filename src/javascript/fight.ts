import App from './app';
import { IFighter } from './Fighter';

let player1: IFighter;
let player2: IFighter;

const fight = fighter1 => fighter2 => {
  player1 = Object.assign( Object.create( Object.getPrototypeOf(fighter1)), fighter1);
  player2 = Object.assign( Object.create( Object.getPrototypeOf(fighter2)), fighter2);

  setTimeout(() => {
    const root = document.getElementById('root') as HTMLDivElement;
    root.innerHTML = '';
    root.style.backgroundImage = 'url(http://2.bp.blogspot.com/-1jTKOb4ibm8/UxVZ-dSxo9I/AAAAAAAAACU/IIp8fZlucfA/s1600/chino.jpg)';

    const healthBarContainer = document.createElement('div') as HTMLDivElement;
    healthBarContainer.classList.add('healthbar-container');
    root.appendChild(healthBarContainer);

    const dummyDiv = document.createElement('div') as HTMLDivElement;
    dummyDiv.classList.add('dummy');
    root.appendChild(dummyDiv);

    const printFighter = (fighter): void => {
      const fighterImg = document.createElement('img') as HTMLImageElement;
      fighterImg.classList.add('fighter');
      const { img, isSecond } = fighter;
      fighterImg.src = img;
      fighterImg.style.backgroundRepeat = 'no-repeat';
      fighterImg.style.height = '550px';
      fighterImg.style.width = '300px';
      dummyDiv.appendChild(fighterImg);
      if(!isSecond){
        fighterImg.style.transform = 'rotateY(180deg)';
      }
    }

    printFighter(fighter1);
    printFighter(fighter2);

    const createHealthBar = (health, name) => {
      const healthBar = document.createElement('progress');
      healthBar.classList.add('nes-progress', 'is-success');
      healthBarContainer.appendChild(healthBar);
      healthBar.max = health;
      
      const fighterName = document.createElement('div');
      fighterName.classList.add('name');
      fighterName.innerHTML = name;
      fighterName.appendChild(healthBar);
      healthBarContainer.appendChild(fighterName);

      return healthBar;
    };

    const healthBar1 = createHealthBar(fighter1.health, fighter1.name);
    const healthBar2 = createHealthBar(fighter2.health, fighter2.name);

    const makePunch = (firstFighter, secondFighter, healthBar): void => {
      firstFighter.health = firstFighter.health - secondFighter.getHitPower() - firstFighter.getBlockPower();
      healthBar.value = firstFighter.health;
    };

    const showWinnerModal = (name): void => {
      const winnerEl = document.getElementById('winner') as HTMLAudioElement;
      winnerEl.play();
      setTimeout(() => {
        const winnerModalEl =  document.getElementById('winner-modal') as HTMLDialogElement;
        winnerModalEl.showModal();
        document.querySelector('#winner-modal .title').innerHTML = `${name} won!`;
        document.getElementById('replay-modal').addEventListener(
          'click',
          () => fight(player1)(player2),
          false
        );
        document.getElementById('main-menu-modal').addEventListener('click', () => new App(), false);
      }, 500);
    }

    function battle(){
      makePunch(fighter1, fighter2, healthBar1);
      console.log(`${fighter1.name} left ${fighter1.health} points of damage`);
      if (fighter1.health <= 0) {
        console.log(`${fighter2.name} wins!`);
        showWinnerModal(fighter2.name);
        return;
      }

      makePunch(fighter2, fighter1, healthBar2);
      console.log(`${fighter2.name} left ${fighter2.health} points of damage`);
      const kickEl = document.getElementById('kick') as HTMLAudioElement;
      kickEl.play();
      if (fighter2.health <= 0) {
        console.log(`${fighter1.name} wins!`);
        showWinnerModal(fighter1.name);
        return;
      }

      setTimeout(battle, 1000);
    }
    battle();
  }, 500);

}

export default fight;