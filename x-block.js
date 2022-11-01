class XBlock extends HTMLDivElement {

  debugMode = false;

  constructor() {
    super();
  }

  connectedCallback() {

    // Check if we are in debug mode
    this.debugMode = this.getAttribute('x-debug') === "true";

    // Check if we are in a container or in a block
    if (this.parentElement.getAttribute("is") !== "x-container" && this.parentElement.getAttribute("is") !== "x-block") {
      console.error("x-block must be inside a x-container or x-block");
      return;
    }

    // Configure the block
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.style.border = this.debugMode ? `2px solid #${randomColor}` : "none";
    this.style.margin = this.debugMode ? "2px" : "0";
    this.style.flexGrow = 0;
    this.style.alignSelf = "auto";

    // Set the correct size
    this.enableSize();
    // this.enableAlign();
  }

  enableSize() {

    const size = this.getAttribute('x-size');
    const sizes = size.split(",").map((s) => s.trim().toLowerCase());

    const flexDirection = this.getFlexDirection(this);

    const [width, height] = flexDirection === "column" ? sizes.reverse() : sizes;

    switch (width) {
      case "auto":
        this.style.flexGrow = "0";
        break;
      case "fill":
        this.style.flexGrow = "1";
        break;
      default:
        this.style.flexBasis = width;
        break;
    }

    switch (height) {
      case "auto":
        this.style.alignSelf = "flex-start";
        break;
      case "fill":
        break;
      default:
        break;
    }
  }

  getFlexDirection(element) {
    if (!this.parentElement) return "row";
    if (this.parentElement.getAttribute("is") === "x-container") {
      return this.parentElement.style.flexDirection;
    }
    return this.getFlexDirection(this.parentElement);
  }

  // enableAlign() {
  //   const align = this.getAttribute('x-align');
  //   const [horizontal, vertical] = align.split(",").map((s) => s.trim().toLowerCase());
  //   switch (horizontal) {
  //     case "left":
  //       this.style.justifySelf = "flex-start";
  //       break;
  //     case "center":
  //       this.style.justifySelf = "center";
  //       break;
  //     case "right":
  //       this.style.justifySelf = "flex-end";
  //       break;
  //     default:
  //       break;
  //   }
  //   switch (vertical) {
  //     case "top":
  //       this.style.alignSelf = "flex-start";
  //       break;
  //     case "center":
  //       this.style.alignSelf = "center";
  //       break;
  //     case "bottom":
  //       this.style.alignSelf = "flex-end";
  //       break;
  //     default:
  //       break;
  //   }
  // }

  disconnectedCallback() {
  }

}

customElements.define("x-block", XBlock, { extends: "div" });


