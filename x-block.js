class XBlockElement extends HTMLElement {

  debugMode = false;
  templateContent = "<div><slot></slot></div>";
  innerContainer = null;
  slot = null;
  direction = null;

  constructor() {

    super();
    
    // Create the shadow root from the template
    const template = document.createElement("template");
    template.innerHTML = this.templateContent;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    // Memorize the inner container and slot
    this.innerContainer = this.shadowRoot.querySelector("div");
    this.slot = this.shadowRoot.querySelector("slot");
  }

  connectedCallback() {

    // Check if we are in debug mode
    this.debugMode = this.hasAttribute("debug") || this.parentElement.debugMode;

    // Configure the body if it's the top level block
    if (this.parentNode.nodeName === "BODY") {
      this.parentElement.style.padding = "0";
      this.parentElement.style.margin = "0";
      this.parentElement.style.display = "flex";
      this.parentElement.style.height = "100vh";
      this.parentElement.style.minHeight = "100vh";
    } 

    // Configure the block
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (this.debugMode) {
      this.style.border = `2px solid #${randomColor}`;
      this.style.margin = "2px";
    }
    this.style.flexGrow = "0";
    this.style.alignSelf = "auto";
    this.style.display = "flex";
    this.style.justifyContent = "flex-start";
    this.style.overflowX = this.hasAttribute("scrollableX") ? "auto" : "hidden";
    this.style.overflowY = this.hasAttribute("scrollableY") ? "auto" : "hidden";
    
    // Configure the inner container
    this.innerContainer.style.display = "flex";
    this.innerContainer.style.flexGrow = "0";
    this.innerContainer.style.alignSelf = "flex-start";
    this.innerContainer.style.backgroundColor = this.debugMode ? `#${randomColor}22` : "transparent";

    // Configure the slot
    this.slot.style.display = "flex";
    this.slot.style.flexGrow = "0";
    this.slot.style.overflow = "auto";

    // Set the correct size
    this.configureDirection();
    this.configureSize();
    this.configureDock();
  }

  // Get the direction 
  // Can be 'horizontal' or 'vertical'
  // default is 'horizontal'
  configureDirection() {

    let directionValue = this.getAttribute("direction");
    if (!directionValue) directionValue = "horizontal";
    
    this.direction = directionValue;

    switch (this.direction) {
      case "vertical":
        this.slot.style.flexDirection = "column";
        break;
      default:
        this.slot.style.flexDirection = "row";
        break;
    }
  }

  // Get the size, with the pattern 'width,height'
  // Can be 'auto' (sized to the content), fill (sized to the parent) or a CSS size
  // the default is 'fill'
  configureSize() {

    let sizeValue = this.getAttribute("size");
    if (!sizeValue) sizeValue = "fill,fill";

    const sizes = sizeValue.split(",").map((s) => s.trim().toLowerCase());
    if (sizes.length < 2) sizes.push("fill");

    const parentDirection = this.parentElement.direction;
    const [width, height] = parentDirection === "vertical" ? sizes.reverse() : sizes;

    switch (width) {
      case "auto":
        this.style.flexGrow = "0";
        break;
      case "fill":
        this.style.flexGrow = "1";
        if (this.parentNode.nodeName === "X-BLOCK") {
          this.parentElement.fill();
        }
        break;
      default:
        this.style.flexShrink = "0";
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
        this.style.flexBasis = height;
        break;
    }
  }

  // Get the dock, with the pattern 'x,y'
  // Can be 'left', 'center', 'right' and 'top', 'center', 'bottom'
  // the default is 'center,center'
  configureDock() {

    let dockValue = this.getAttribute("dock");
    if (!dockValue) dockValue = "center,center";

    const docks = dockValue.split(",").map((s) => s.trim().toLowerCase());
    if (docks.length < 2) docks.push("center");

    const [horizontal, vertical] = docks;
    switch (horizontal) {
      case "left":
        this.style.justifyContent = "flex-start";
        break;
      case "center":
        this.style.justifyContent = "center";
        break;
      case "right":
        this.style.justifyContent = "flex-end";
        break;
      default:
        break;
    }
    switch (vertical) {
      case "top":
        this.innerContainer.style.alignSelf = "flex-start";
        break;
      case "center":
        this.innerContainer.style.alignSelf = "center";
        break;
      case "bottom":
        this.innerContainer.style.alignSelf = "flex-end";
        break;
      default:
        break;
    }
  }

  disconnectedCallback() {
  }

  fill() {
    this.style.flexGrow = "1";
    this.innerContainer.style.flexGrow = "1";
    this.innerContainer.style.alignSelf = "stretch";
    this.slot.style.flexGrow = "1";
  }

}

customElements.define("x-block", XBlockElement);


