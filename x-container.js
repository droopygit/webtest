class XContainerElement extends HTMLElement {

  debugMode = false;

  constructor() {
    super();
  }

  connectedCallback() {

    // Check if we are in debug mode
    this.debugMode = this.getAttribute('debug') === "true";

    // Configure the body if is a top level container
    if (this.parentNode.nodeName === "BODY") {
      this.parentElement.style.padding = "0";
      this.parentElement.style.margin = "0";
      this.parentElement.style.minHeight = "100vh";
    }

    // Configure the container
    this.style.display = "flex";
    if (this.debugMode) {
      this.style.height = "calc(100vh - 4px)";
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      this.style.border = `2px solid #${randomColor}`;
    } else {
      this.style.height = "100vh";
      this.style.border = "0";
    }

    // Configure direction
    const direction = this.getAttribute('direction');
    switch (direction) {
      case "vertical":
        this.style.flexDirection = "column";
        break;
      default:
        this.style.flexDirection = "row";
        break;
    }

  }

  disconnectedCallback() {
  }

}

customElements.define("x-container", XContainerElement);


