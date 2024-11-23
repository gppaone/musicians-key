<script>
    import { onMount } from 'svelte';
    import { Fretboard } from '@moonwave99/fretboard.js';

    let fretboard;

onMount(() => {
    fretboard = new Fretboard({
        el: '#fretboard',
        numStrings: 6,
        numFrets: 12,
    }).render();
});

function showCChord() {
    const dots = [
        { string: 5, fret: 3, label: 'C' },
        { string: 4, fret: 2, label: 'E' },
        { string: 3, fret: 0, label: 'G' },
        { string: 2, fret: 1, label: 'C' }
    ];

    fretboard.setDots(dots).render();
    addTextLabels(dots);
}

function showAScale() {
    const dots = [
        { string: 6, fret: 5, label: 'A' },
        { string: 6, fret: 7, label: 'B' },
        { string: 6, fret: 9, label: 'C#' },
        { string: 6, fret: 10, label: 'D' },
        { string: 5, fret: 7, label: 'E' },
        { string: 5, fret: 9, label: 'F#' },
        { string: 4, fret: 7, label: 'G#' },
        { string: 4, fret: 9, label: 'A' }
    ];

    fretboard.setDots(dots).render();
    addTextLabels(dots);
}

function addTextLabels(dots) {
    const svg = document.querySelector('#fretboard svg');

    dots.forEach(dot => {
        if (dot.label) {
            const { string, fret, label } = dot;

            // Construct the target class
            const targetClass = `.dot-string-${string}.dot-fret-${fret}.dot-label-${CSS.escape(label)}`;

            // Find the corresponding <g> element
            const dotElement = svg.querySelector(`${targetClass}`);

            if (dotElement) {
                console.log(label);
                // Locate the <text> element inside the group
                const textElement = dotElement.querySelector('text');

                if (textElement) {
                    textElement.textContent = label; // Set the note text
                }
            }
        }
    });
}
</script>

<div id="fretboard"></div>
<button on:click={showCChord}>Show C Chord</button>
<button on:click={showAScale}>Show A Scale</button>

<style>
    #fretboard {
        margin: 20px 0;
    }
</style>