<script>
    // all notes
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    // modes and patterns
    let chordArr = [
        { name: 'Major Triad', pattern: [4, 3] },
        { name: 'Dominant 7', pattern: [4, 3, 3] },
        { name: 'Major 7', pattern: [4, 3, 4] },
        { name: 'Major 6', pattern: [4, 3, 2] },
        { name: 'Suspended 4', pattern: [5, 2] },
        { name: '9', pattern: [4, 3, 3, 4] },
        { name: 'Add 9', pattern: [4, 3, 7] },
        { name: '11', pattern: [4, 3, 3, 4, 3] },
        { name: '13', pattern: [4, 3, 3, 4, 3, 4] },
        { name: 'Augmented Triad', pattern: [4, 4] },
        { name: 'Minor Triad', pattern: [3, 4] },
        { name: 'Minor 7', pattern: [3, 4, 3] },
        // { name: 'Minor 6', pattern: [2, 2, 2, 1, 2, 2, 1] },
        // { name: 'Suspended 4', pattern: [2, 2, 1, 2, 2, 1, 2] },
        // { name: 'Minor 9', pattern: [2, 1, 2, 2, 1, 2, 2] },
        // { name: 'Major 6 add 9', pattern: [1, 2, 2, 1, 2, 2, 2] },
        // { name: 'Major 7 add 9', pattern: [2, 1, 2, 2, 1, 2, 2] },
        // { name: 'Major 7 flat 9', pattern: [1, 2, 2, 1, 2, 2, 2] },
        // { name: 'Diminished', pattern: [2, 1, 2, 2, 1, 2, 2] },
        // { name: 'Minor 7 flat 5', pattern: [1, 2, 2, 1, 2, 2, 2] },
    ];
    // root
    export let rootNote = 'C';

    function generateChords(rootNote, chordPattern) {
        let rootIndex = notes.indexOf(rootNote);
        let chord = [rootNote];

        for (let step of chordPattern) {
            rootIndex = (rootIndex + step) % notes.length;
            chord.push(notes[rootIndex]);
        }
        return chord;
    }

    function generateChordsFromArray(rootNote) {
        let chords = [];
        for (let i = 0; i < chordArr.length; i++) {
            let chordName = chordArr[i].name;
            let pattern = chordArr[i].pattern;
            let chord = generateChords(rootNote, pattern);
    
            chords.push({ chordName, rootNote, chord });
        }
        return chords;
    }

    let otherChords = generateChordsFromArray(rootNote);

    $: otherChords = generateChordsFromArray(rootNote);

</script>

{#each otherChords as { chordName, chord }}
<h5>{rootNote} {chordName}</h5>
<div class="container list-group-item">
    <div class="row">
    {#each chord as note}
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
</style>