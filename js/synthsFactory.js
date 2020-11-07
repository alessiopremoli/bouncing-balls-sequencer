const reverb = new Tone.Reverb({
    decay: 15,
    wet: 0.5
});

const winterSynth = panning => {

    pan = new Tone.Panner(panning);
    synth = new Tone.Synth();
    tFilter = new Tone.Filter(800, "lowpass");

    synth.connect(tFilter);
    tFilter.connect(pan);
    pan.connect(reverb);
    reverb.toDestination();


    return synth;
}