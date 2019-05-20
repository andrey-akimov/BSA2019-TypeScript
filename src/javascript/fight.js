const fight = fighter1 => fighter2 => {
  
  setTimeout(() => {
    const root = document.getElementById('root');
    root.innerHTML = '';

    const healthBarContainer = document.createElement('div');
    healthBarContainer.classList.add('healthbar-container');
    root.appendChild(healthBarContainer);

    const dummyDiv = document.createElement('div');
    dummyDiv.classList.add('dummy');
    root.appendChild(dummyDiv);

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

    const makePunch = (firstFighter, secondFighter, healthBar) => {
      firstFighter.health = firstFighter.health - secondFighter.getHitPower() - firstFighter.getBlockPower();
      healthBar.value = firstFighter.health;
    };

    function battle(){
      makePunch(fighter1, fighter2, healthBar1);
      console.log(`${fighter1.name} left ${fighter1.health} points of damage`);
      if (fighter1.health <= 0) {
        console.log(`${fighter2.name} wins!`);
        return;
      }
      makePunch(fighter2, fighter1, healthBar2);
      console.log(`${fighter2.name} left ${fighter2.health} points of damage`);
      if (fighter2.health <= 0) {
        console.log(`${fighter1.name} wins!`);
        return;
      }
      setTimeout(battle, 500);
    }
    battle();
  }, 500);

}

export default fight;