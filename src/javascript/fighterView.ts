import View from './view';
import IFighter from './Fighter';

class FighterView extends View {
  constructor(fighter: IFighter, handleClick: void) {
    super();

    this.createFighter(fighter as IFighter, handleClick as void);
  }

  createFighter(fighter: IFighter, handleClick): void {
    const { name, source } = fighter;
    const nameElement = this.createName(name) as HTMLSpanElement;
    const imageElement = this.createImage(source) as HTMLImageElement;

    this.element = this.createElement({
      tagName: 'div',
      classNames: ['fighter', 'nes-btn', 'is-primary']
    }) as HTMLDivElement;
    this.element.append(imageElement, nameElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name: string): HTMLSpanElement {
    const nameElement = this.createElement({ tagName: 'span', classNames: ['name'] });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source: string) {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      classNames: ['fighter-image'],
      attributes
    });

    return imgElement as HTMLImageElement;
  }
}

export default FighterView;