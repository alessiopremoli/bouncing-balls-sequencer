const reverb = new Tone.Reverb({
    decay: 15,
    wet: 0.5
});
let tVolume = null;
let tFilter = null;
let tPan = null;

synthArray = [];

const winterSynth = (panning, vol) => {
    console.log(vol);
    tVolume = new Tone.Volume(vol);
    tPan = new Tone.Panner(panning);
    
    synth = new Tone.Synth({
        envelope: { release: 2 }
    });
    tFilter = new Tone.Filter(800, "lowpass");

    synth.connect(tVolume);
    tVolume.connect(tFilter);
    tFilter.connect(tPan);
    tPan.connect(reverb);
    reverb.toDestination();

    return synth;
}

const disposeSynth = () => {
    tPan && tPan.dispose();
    tFilter && tFilter.dispose();
    tVolume && tVolume.dispose();
    synth && synth.dispose();
}