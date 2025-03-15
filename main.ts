import { Plugin } from 'obsidian';

export default class SvgReplacePlugin extends Plugin {
  async onload() {
    console.log('Loading SVG Replace Plugin');
    
    this.registerMarkdownPostProcessor((element, context) => {
      element.querySelectorAll('p').forEach((p) => {
        let text = p.innerHTML;
        const matches = text.match(/t%(.*?)%/g);
        
        if (matches) {
          matches.forEach((match) => {
			const content = match.substring(2, match.length - 1);
			//console.log(content)
            const svg = this.generateFullWord(content);
            text = text.replace(match, svg.outerHTML);
          });
          p.innerHTML = text;
        }
      });
    });

	this.registerMarkdownPostProcessor((element, context) => {
		element.querySelectorAll('td').forEach((p) => {
			let text = p.innerHTML;
			const matches = text.match(/t%(.*?)%/g);
			
			if (matches) {
			matches.forEach((match) => {
				const content = match.substring(2, match.length - 1);
				//console.log(content)
				const svg = this.generateFullWord(content);
				text = text.replace(match, svg.outerHTML);
			});
			p.innerHTML = text;
			}
		});
		});
  }

  generateFullWord(word : string){
	const word_len = word.length / 4;

	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', `${1.5*word_len}em`);
    svg.setAttribute('height', '2em');
    svg.setAttribute('viewBox', `0 0 ${word_len * 50} 90`);

	svg.innerHTML = "";
	for(let i = 0; i < word_len; i++){
		svg.innerHTML +=  this.generateSymbol(parseInt(word.substring(i * 4, (i+1) * 4),16), i, "currentColor", 3);
	}
	

	return svg;
  }

  generateSymbol(content : number, offset : number, color : string, stroke_width : number) {
    //Middle line
	let svg_commands = `<line x1="${offset * 50 + 0}" y1="45" x2="${offset * 50 + 50}" y2="45" stroke="${color}" stroke-width="${stroke_width}" />`;
	
	// Top vertical lines
	if (0x8000 & content)
		svg_commands += `<line x1="${offset * 50 + 0}" y1="45" x2="${offset * 50 + 0}" y2="20" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x4000 & content)
		svg_commands += `<line x1="${offset * 50 + 25}" y1="5" x2="${offset * 50 + 25}" y2="35" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x2000 & content)
		svg_commands += `<line x1="${offset * 50 + 25}" y1="35" x2="${offset * 50 + 25}" y2="45" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x1000 & content)
		svg_commands += `<line x1="${offset * 50 + 50}" y1="45" x2="${offset * 50 + 50}" y2="20" stroke="${color}" stroke-width="${stroke_width}" />`;

	// Top diamond
	if (0x0800 & content)
		svg_commands += `<line x1="${offset * 50 + 0}" y1="20" x2="${offset * 50 + 25}" y2="5" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0400 & content)
		svg_commands += `<line x1="${offset * 50 + 25}" y1="5" x2="${offset * 50 + 50}" y2="20" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0200 & content)
		svg_commands += `<line x1="${offset * 50 + 50}" y1="20" x2="${offset * 50 + 25}" y2="35" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0100 & content)
		svg_commands += `<line x1="${offset * 50 + 25}" y1="35" x2="${offset * 50 + 0}" y2="20" stroke="${color}" stroke-width="${stroke_width}" />`;

	// Bottom vertical lines
	if (0x0080 & content)
		svg_commands += `<line x1="${offset * 50 + 0}" y1="50" x2="${offset * 50 + 0}" y2="65" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0040 & content)
		svg_commands += `<line x1="${offset * 50 + 25}" y1="50" x2="${offset * 50 + 25}" y2="80" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0020 & content)
		svg_commands += `<circle cx="${offset * 50 + 25}" cy="85" r="5" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0010 & content)
		svg_commands += `<line x1="${offset * 50 + 50}" y1="50" x2="${offset * 50 + 50}" y2="65" stroke="${color}" stroke-width="${stroke_width}" />`;

	// Bottom diamond
	if (0x0008 & content)
		svg_commands += `<line x1="${offset * 50 + 0}" y1="65" x2="${offset * 50 + 25}" y2="50" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0004 & content)
		svg_commands += `<line x1="${offset * 50 + 25}" y1="50" x2="${offset * 50 + 50}" y2="65" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0002 & content)
		svg_commands += `<line x1="${offset * 50 + 50}" y1="65" x2="${offset * 50 + 25}" y2="80" stroke="${color}" stroke-width="${stroke_width}" />`;
	if (0x0001 & content)
		svg_commands += `<line x1="${offset * 50 + 25}" y1="80" x2="${offset * 50 + 0}" y2="65" stroke="${color}" stroke-width="${stroke_width}" />`;
    return svg_commands;
  }

  onunload() {
    console.log('Unloading SVG Replace Plugin');
  }
}
