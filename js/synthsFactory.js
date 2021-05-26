import * as Tone from 'tone';

const reverb = new Tone.Reverb({
    decay: 15,
    wet: 0.5
});
let tVolume = null;
let tFilter = null;
let tPan = null;


export const winterSynth = (panning, vol) => {
    let tVolume = new Tone.Volume(vol);
    let tPan = new Tone.Panner(panning);
    
    let synth = new Tone.PolySynth({
        envelope: { release: 2 }
    });
    let tFilter = new Tone.Filter(800, "lowpass");

    synth.connect(tVolume);
    tVolume.connect(tFilter);
    tFilter.connect(tPan);
    tPan.connect(reverb);
    reverb.toDestination();

    return synth;
}

export const disposeSynth = () => {
    tPan && tPan.dispose();
    tFilter && tFilter.dispose();
    tVolume && tVolume.dispose();
    synth && synth.dispose();
}