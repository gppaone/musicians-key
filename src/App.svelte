<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/js/bootstrap.bundle.min.js';
    import Scales from "./components/Scales.svelte";
    import Chords from "./components/Chords.svelte";
    //import Metronome from "./components/Metronome.svelte";
    import Navbar from "./components/Navbar.svelte";
    
    export let rootNote = 'A';

    let notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G', "G#"];
    let pulse = false;

    function handleSelectChange() {
        pulse = true;
        setTimeout(() => {
        pulse = false;
        }, 1500);
    }

</script>
<Navbar />
<main>
    <!-- Dropdown to select the root note -->
    <div class="container search input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Scale:</span>
        <select class="form-select" id="noteselect" on:change={handleSelectChange} bind:value={rootNote}>
            {#each notes as note}
                <option value={note}>{note}</option>
            {/each}
        </select>
    </div>
    <div class="container main-body">
        <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" id="scales-tab" data-bs-toggle="tab" data-bs-target="#scales" role="tab" aria-controls="scales" aria-selected="true">Modes/Scales</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" id="chords-tab" data-bs-toggle="tab" data-bs-target="#chords" role="tab" aria-controls="chords" aria-selected="true">Chords</a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link" aria-current="page" id="metronome-tab" data-bs-toggle="tab" data-bs-target="#metronome" role="tab" aria-controls="metronome" aria-selected="true">Metronome</a>
              </li> -->
          </ul>
        <div class="list-group">
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="scales" aria-labelledby="scales-tab">
                    <Scales {rootNote} {pulse} />
                </div>
                <div class="tab-pane fade" id="chords" aria-labelledby="chords-tab">
                    <Chords {rootNote} {pulse} />
                </div>
                <!-- <div class="tab-pane fade" id="metronome" aria-labelledby="metronome-tab">
                    <Metronome />
                </div> -->
            </div>
        </div>
    </div>
</main>

<style>

    .search {
        background-color:#ffffff;
        padding:10px;
        z-index:9999;
     }
	main {
		text-align: center;
		padding: 0 1em 1em 1em;
		margin: 0 auto;
	}

</style>