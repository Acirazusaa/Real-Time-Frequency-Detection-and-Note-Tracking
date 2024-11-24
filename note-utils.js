function hzToNote(freq)
{
    var note = 12 * (Math.log(freq / 440) / Math.log(2));
    return Math.round(note) + 49;
}

function noteString(note)
{
    const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    const letter = notes[(note - 1) % notes.length];
    const octave = Math.floor((note + 8) / notes.length); // Adjusted to shift one octave higher

    return letter + (letter.length < 2 ? '.' : '') + octave;
}

function hzToNoteString(freq)
{
    return noteString(hzToNote(freq));
}

function noteToHz(note)
{
    return 440 * Math.pow(2, (note - 49) / 12);
}
