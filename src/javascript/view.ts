class View {
  element;

  createElement({ tagName, classNames = [], attributes = {} }) {
    const element = document.createElement(tagName);
    classNames.forEach(className => element.classList.add(className));
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }
}

export default View;
