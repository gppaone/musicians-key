<script>
    // Metronome
    let bpm = 60;  // Beats per minute
    let intervalId = null;
    let isPlaying = false;
    let audioContext = null;
    let isBeepVisible = false;

    function createClickSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
    
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
    
        oscillator.type = 'square';
        oscillator.frequency.value = 100;
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);  // Quick decay to mimic a wood block

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
    }

    function startMetronome() {
        if (isPlaying) return;
        isPlaying = true;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        intervalId = setInterval(() => {
            createClickSound();
            flashBeep();
        }, (60 / bpm) * 1000);
    }

    function stopMetronome() {
        clearInterval(intervalId);
        isPlaying = false;
        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }
    }

    function toggleMetronome() {
        if (isPlaying) {
            stopMetronome();
        } else {
            startMetronome();
        }
    }

    function increaseBPM() {
        bpm++;
        if (isPlaying) {
            stopMetronome();
            startMetronome();
        }
    }

    function decreaseBPM() {
        bpm--;
        if (isPlaying) {
            stopMetronome();
            startMetronome();
        }
    }

    function jumpBPM(jump) {
        bpm = jump;
        if (isPlaying) {
            stopMetronome();
            startMetronome();
        }
    }

    function flashBeep() {
        isBeepVisible = true;
        setTimeout(() => {
        isBeepVisible = false;
        }, 100);
    }
</script>
<div class="container">
    <div class="row">
        <div class="col-2 metrobeep">
            <div class="visual-beep" style="background-color: {isBeepVisible ? 'red' : 'lightgray'};"></div>
            <div class="visual-steps"><div></div><div></div><div></div><div></div></div>
        </div>
        <div class="col-10">
            
            <div class="bpm-controls">
                <h3>{bpm} <span class="form-text">BPM</span></h3>
                <button class="btn btn-secondary rounded-0" on:click={decreaseBPM}>-</button>
                <button class="btn btn-secondary rounded-0" on:click={increaseBPM}>+</button>
            </div>
            <div class="metrobuttons quickbtns">
                <label>Quick:</label>
                <button class="btn btn-secondary rounded-0" on:click={() => jumpBPM(60)}>60</button>
                <button class="btn btn-secondary rounded-0" on:click={() => jumpBPM(100)}>100</button>
                <button class="btn btn-secondary rounded-0" on:click={() => jumpBPM(120)}>120</button>
                <button class="btn btn-secondary rounded-0" on:click={() => jumpBPM(140)}>140</button>
            </div>
            <div class="metrobuttons">
                <button on:click={toggleMetronome} class="btn btn-success rounded-0">{isPlaying ? 'Stop' : 'Start'}</button>
            </div>
        </div>
    </div>
</div>

<style>
    .container {
        margin-top:10px;
    }
    h3 {
        margin-right:20px;
        font-size:3em;
        width:4em;
    }
    .metrobeep {
        text-align:right;
    }
    .metrobuttons {
        text-align:left;
    }
    .quickbtns {
        padding:10px 0;
    }
    .bpm-controls {
        display: flex;
        margin-top: 10px;
    }
    .bpm-controls button {
        margin: 5px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
    .visual-beep {
        margin-top: 20px;
        border-radius:50%;
        border:5px solid #aaaaaa;
        transition: background-color 0.1s ease;
        width:100px;
        height:100px;
        margin:20px auto 0 auto;
    }
    .visual-steps {
        display: flex;
        margin-top:10px;
    }
    .visual-steps div {
        border-radius:50%;
        width:10px;
        height:10px;
        background-color:#aaaaaa;
        margin-right:5px;
    }
</style>