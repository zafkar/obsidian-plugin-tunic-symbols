import { Plugin } from 'obsidian';

export default class SvgReplacePlugin extends Plugin {
  async onload() {
    console.log('Loading SVG Replace Plugin');
    
    this.registerMarkdownPostProcessor((element, context) => {
      element.querySelectorAll('p').forEach((p) => {
        let text = p.innerHTML;
        const matches = text.match(/t:%(.*?)%/g);
        
        if (matches) {
          matches.forEach((match) => {
			const content = parseInt(match.substring(3, match.length - 1),16);
			console.log(content)
            const svg = this.generateSymbol(content, "white", 3);
            text = text.replace(match, svg.outerHTML);
          });
          p.innerHTML = text;
        }
      });
    });
  }

  generateSymbol(content : number, color : string, stroke_width : number) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '1.5em');
    svg.setAttribute('height', '2em');
    svg.setAttribute('viewBox', '0 0 50 90');
    //Middle line
	svg.innerHTML = `<line x1="0" y1="45" x2="50" y2="45" stroke="${color}" stroke-width="${stroke_width}" />`;
	
	// Top vertical lines
	if (0x8000 & content)
		svg.innerHTML += `<line x1="0" y1="45" x2="0" y2="20" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x4000 & content)
		svg.innerHTML += `<line x1="25" y1="5" x2="25" y2="35" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x2000 & content)
		svg.innerHTML += `<line x1="25" y1="35" x2="25" y2="45" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x1000 & content)
		svg.innerHTML += `<line x1="50" y1="45" x2="50" y2="20" stroke="${color}" stroke-width="${stroke_width}" />`;

	// Top diamond
	if (0x0800 & content)
		svg.innerHTML += `<line x1="0" y1="20" x2="25" y2="5" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0400 & content)
		svg.innerHTML += `<line x1="25" y1="5" x2="50" y2="20" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0200 & content)
		svg.innerHTML += `<line x1="50" y1="20" x2="25" y2="35" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0100 & content)
		svg.innerHTML += `<line x1="25" y1="35" x2="0" y2="20" stroke="${color}" stroke-width="${stroke_width}" />`;

	// Bottom vertical lines
	if (0x0080 & content)
		svg.innerHTML += `<line x1="0" y1="50" x2="0" y2="65" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0040 & content)
		svg.innerHTML += `<line x1="25" y1="50" x2="25" y2="80" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0020 & content)
		svg.innerHTML += `<circle cx="25" cy="85" r="5" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0010 & content)
		svg.innerHTML += `<line x1="50" y1="50" x2="50" y2="65" stroke="${color}" stroke-width="${stroke_width}" />`;

	// Bottom diamond
	if (0x0008 & content)
		svg.innerHTML += `<line x1="0" y1="65" x2="25" y2="50" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0004 & content)
		svg.innerHTML += `<line x1="25" y1="50" x2="50" y2="65" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0002 & content)
		svg.innerHTML += `<line x1="50" y1="65" x2="25" y2="80" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0001 & content)
		svg.innerHTML += `<line x1="25" y1="80" x2="0" y2="65" stroke="${color}" stroke-width="${stroke_width}" />`;
    return svg;
  }

  onunload() {
    console.log('Unloading SVG Replace Plugin');
  }
}
