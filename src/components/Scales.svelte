<script>
    // all notes
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    export let pulse = false;

    // modes and patterns
    let modes = [
        { name: 'Ionian (major)', num:"I", pattern: [2, 2, 1, 2, 2, 2, 1] },
        { name: 'Dorian (minor)', num:"ii", pattern: [2, 1, 2, 2, 2, 1, 2] },
        { name: 'Phrygian (minor)', num:"iii", pattern: [1, 2, 2, 2, 1, 2, 2] },
        { name: 'Lydian (major)', num:"IV", pattern: [2, 2, 2, 1, 2, 2, 1] },
        { name: 'Mixolydian (major)', num:"V", pattern: [2, 2, 1, 2, 2, 1, 2] },
        { name: 'Aeolian (natural minor)', num:"vi", pattern: [2, 1, 2, 2, 1, 2, 2] },
        { name: 'Locrian (diminished)', num:"vii", pattern: [1, 2, 2, 1, 2, 2, 2] }
    ];
    let othermodes = [ 
        { name: 'Blues', pattern: [3, 2, 1, 1, 3] }, 
        { name: 'Minor Pentatonic', pattern: [3, 2, 2, 3, 2] },
        { name: 'Major Pentatonic', pattern: [2, 2, 3, 2, 3] },
        { name: 'Diminished', pattern: [2, 1, 2, 1, 2, 1, 2, 1] },
        

    ];

    // root
    export let rootNote = 'C';

    // step through scale
    function generateStepScale(rootNote, scalePattern) {
        let rootIndex = notes.indexOf(rootNote);
        let scale = [rootNote];

        for (let step of scalePattern) {
            rootIndex = (rootIndex + step) % notes.length;
            scale.push(notes[rootIndex]);
        }
        return scale;
    }
    function generateOtherScale(rootNote, scalePattern) {
        let rootIndex = notes.indexOf(rootNote);
        let scale = [rootNote];

        for (let step of scalePattern) {
        rootIndex = (rootIndex + step) % notes.length;
        scale.push(notes[rootIndex]);
        }
        return scale;
    }


    // generate modes per scale
    function generateModesFromScale(rootNote) {
        let ionianScale = generateStepScale(rootNote, modes[0].pattern);
        let modeScales = [];
        //console.log(modeScales);
        for (let i = 0; i < modes.length; i++) {
            let modeName = modes[i].name;
            let pattern = modes[i].pattern;
            let num = modes[i].num;
            let modeRootNote = ionianScale[i];
            let scale = generateStepScale(modeRootNote, pattern);
    
            modeScales.push({ modeName, num, modeRootNote, scale });
        }
        return modeScales;
    }
    function generateOtherModesFromScale(rootNote) {
        let modeOtherScales = [];
        for (let i = 0; i < othermodes.length; i++) {
            let modeName = othermodes[i].name;
            let pattern = othermodes[i].pattern;
            let scale = generateOtherScale(rootNote, pattern);
    
            modeOtherScales.push({ modeName, rootNote, scale });
        }
        return modeOtherScales;
    }
    // setup modes
    let modeScales = generateModesFromScale(rootNote);
    let modeOtherScales = generateOtherModesFromScale(rootNote);

    // update from root
    $: modeScales = generateModesFromScale(rootNote);
    $: modeOtherScales = generateOtherModesFromScale(rootNote);

</script>


    {#each modeScales as { modeName, num, scale }}
        <h5>{modeName}</h5>
        <div class="container-fluid list-group-item {pulse ? 'pulse' : ''}">
            <div class="row">
                <div class="col num">{num}</div>
            {#each scale as note}
                <div class="col">{note}</div>
            {/each}
            </div>
        </div>
    {/each}
    <hr />
    {#each modeOtherScales as { modeName, scale }}
    <h5>{modeName}</h5>
    <div class="container-fluid list-group-item {pulse ? 'pulse' : ''}">
        <div class="row">
        {#each scale as note}
            <div class="col">{note}</div>
        {/each}
        </div>
    </div>
    {/each}
    <div class="arrow-container">
        <div class="arrow" id="arrow"></div>
    </div>
    
<style>
    h5 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 1.25em;
        font-weight: 100;
        text-align: left;
        margin-top: 20px;
    }
    .container .row .col {
        padding: 5px 0;
    }
    .container .row .col:hover {
        background-color: #dddddd;
    }
    .container-fluid.list-group-item {
        padding:0;
    }
    .container-fluid.list-group-item .row {
        padding:0;
        margin:0;
    }
    .container-fluid.list-group-item .row .col {
        padding:10px;
    }
    .pulse{
        animation:pulse 1500ms;
    }

    .row .col.num {
        border-right:1px solid #ddd;
        background-color:#eee;
    }
    @keyframes pulse{
    0%{
        box-shadow:#aaaaab 0 0 0 0;
    }
    75%{
        box-shadow:#ff69b400 0 0 0 16px;
    }
    }
</style>