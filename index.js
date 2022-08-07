class HTMLXDivElement extends HTMLDivElement {
    constructor() {
      super();
      console.log("xdiv created");
    }

}

customElements.define('xdiv', HTMLXDivElement, { extends: 'div' });


