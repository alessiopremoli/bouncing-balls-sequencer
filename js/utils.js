export function mapNumberToNote(number) {
    switch (number) {
        case 1:
            return 'C';
        case 2:
            return 'C#';
        case 3:
            return 'D';
        case 4:
            return 'D#';
        case 5:
            return 'E';
        case 6:
            return 'F';
        case 7:
            return 'F#';
        case 8:
            return 'G';
        case 9:
            return 'G#';
        case 10:
            return 'A';
        case 11:
            return 'A#';
        case 12:
            return 'B';


    }
};

export function mapNumberToNoteWinterAirport(number, octave) {
    switch (number) {
        case 1:
            return 'F' + (+octave - 1);
        case 2:
            return 'Ab' + (+octave - 1) ;
        case 3:
            return 'C' + octave;
        case 4:
            return 'Db' + octave;
        case 5:
            return 'Eb' + octave;
        case 6:
            return 'F' + octave;
        case 7:
            return 'Ab' + octave;
        case 8:
            return 'C' + (+octave + 1);
        case 9:
            return 'Db' + (+octave + 1);
        case 10:
            return 'Eb' + (+octave + 1);
        case 11:
            return 'F' + (+octave + 1);
        case 12:
            return 'Ab' + (+octave + 1);
    }
}

export const signum = num => num / Math.abs(num)