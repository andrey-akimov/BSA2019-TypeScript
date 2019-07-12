class View {
  element;

  protected createElement(
    { tagName, classNames = [], attributes = {} }:
    { tagName: string, classNames?: string[], attributes?: {} }
  ) {
    const element = document.createElement(tagName);
    classNames.forEach(className => element.classList.add(className));
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }
}

export default View;
