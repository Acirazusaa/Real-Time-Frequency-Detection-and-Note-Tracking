function simpleNotation2VexTab(notation, currentIndex) {
  let tabs = "";
  let noteCounter = 0;
  let lastNote = "";
  for (let tabstave of notation.split("N")) {
    tabs += "tabstave notation=true tablature=false";
    let metaIndex;
    if ((metaIndex = tabstave.indexOf("; ")) >= 0) {
      let [timeSignature] = tabstave.slice(1, metaIndex).split(" ");
      tabs += ` time=${timeSignature}`;
    }
    tabs += "\n";
    // console.log(tabstave);
    for (const barMatches of tabstave.matchAll(/\[[;\/0-9 #A-G-]+]/g)) {
      let bar = barMatches[0].slice(1, -1);
      if ((metaIndex = bar.indexOf("; ")) >= 0) {
        bar = bar.slice(metaIndex + 2);
      }
      //   console.log(bar);
      const notes = bar.split(" ");
      for (const note of notes) {
        if (note === "-") {
          tabs += `notes ##\n`;
          continue;
        }
        const octave = note.slice(-1);
        const tone = note.slice(0, -1);
        tabs += `notes ${tone}/${octave}`;
        if (currentIndex === noteCounter) {
          tabs += " $.ah/bottom.$";
        }
        if (lastNote !== note) {
          tabs += ` $.top.$ $${tone}$`;
        }
        lastNote = note;
        tabs += "\n";
        noteCounter += 1;
      }
      tabs += "notes |\n";
    }
  }
  if (tabs.endsWith("notes |\n")) {
    tabs = tabs.slice(0, -"notes |\n".length);
  }
  tabs += "notes =|=";
  return tabs;
}
function extractNotes(notation) {
  let results = [];
  for (let tabstave of notation.split("N")) {
    for (const barMatches of tabstave.matchAll(/\[[;\/0-9 #A-G-]+]/g)) {
      let bar = barMatches[0].slice(1, -1);
      let metaIndex;
      if ((metaIndex = bar.indexOf("; ")) >= 0) {
        bar = bar.slice(metaIndex + 2);
      }
      const notes = bar.split(" ");
      for (const note of notes) {
        if (note === "-") {
          continue;
        }
        const octave = note.slice(-1);
        const tone = note.slice(0, -1);
        results.push(`${tone}${octave}`);
      }
    }
  }
  return results;
}
