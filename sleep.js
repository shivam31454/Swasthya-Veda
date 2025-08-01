// Breathing circle animation
const breathingCircle = document.getElementById('breathingCircle');
const breathingText = document.getElementById('breathingText');
const startMeditationBtn = document.getElementById('startMeditation');
let isMeditating = false;
let breatheInterval;

function startBreathing() {
    isMeditating = true;
    let scale = 1;
    let isInhaling = true;
    
    breatheInterval = setInterval(() => {
        if (isInhaling) {
            scale += 0.01;
            if (scale >= 1.2) {
                isInhaling = false;
                breathingText.textContent = 'Breathe Out';
            }
        } else {
            scale -= 0.01;
            if (scale <= 1) {
                isInhaling = true;
                breathingText.textContent = 'Breathe In';
            }
        }
        breathingCircle.style.transform = `scale(${scale})`;
    }, 150);
}

function stopBreathing() {
    clearInterval(breatheInterval);
    breathingCircle.style.transform = 'scale(1)';
    breathingText.textContent = 'Breathe In';
    isMeditating = false;
}

startMeditationBtn.addEventListener('click', () => {
    if (!isMeditating) {
        startBreathing();
        startMeditationBtn.textContent = 'Stop Meditation';
    } else {
        stopBreathing();
        startMeditationBtn.textContent = 'Start Meditation';
    }
});

// White noise functionality
const noiseType = document.getElementById('noiseType');
const sleepTimer = document.getElementById('sleepTimer');
const playNoiseBtn = document.getElementById('playNoise');
let audioPlayer = null;
let noiseTimer = null;

const soundFiles = {
    rain: 'assets/rain.wav',
    waves: 'assets/waves.wav',
    forest: 'assets/forest.wav'
};

// Function to check if a sound file exists
async function checkSoundFile(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

function playWhiteNoise() {
    try {
        if (audioPlayer) {
            audioPlayer.pause();
        }
        
        const soundType = noiseType.value;
        const soundFile = soundFiles[soundType];
        
        if (!soundFile) {
            throw new Error('Sound type not found');
        }
        
        // Check if the sound file exists
        checkSoundFile(soundFile).then(exists => {
            if (!exists) {
                alert(`The ${soundType} sound is not available. Please try the rain sound instead.`);
                // Switch to rain sound if the selected sound isn't available
                noiseType.value = 'rain';
                playWhiteNoise();
                return;
            }
            
            audioPlayer = new Audio(soundFile);
            audioPlayer.loop = true;
            audioPlayer.volume = 0.5;
            
            audioPlayer.addEventListener('canplaythrough', () => {
                const playPromise = audioPlayer.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error('Error playing audio:', error);
                        alert('Please enable audio in your browser to use this feature.');
                    });
                }
            });
            
            audioPlayer.addEventListener('error', (error) => {
                console.error('Audio error:', error);
                alert(`There was an error playing the ${soundType} sound. Please try the rain sound instead.`);
                noiseType.value = 'rain';
                playWhiteNoise();
            });
            
            const minutes = parseInt(sleepTimer.value);
            if (minutes > 0) {
                noiseTimer = setTimeout(() => {
                    stopWhiteNoise();
                }, minutes * 60 * 1000);
            }
        });
    } catch (error) {
        console.error('Error setting up audio:', error);
        alert('There was an error setting up the audio player. Please try again.');
    }
}

// Add volume control
const volumeControl = document.createElement('div');
volumeControl.className = 'volume-control';
volumeControl.innerHTML = `
    <label for="noiseVolume">Volume:</label>
    <input type="range" id="noiseVolume" min="0" max="100" value="50">
`;

document.querySelector('.noise-controls').appendChild(volumeControl);

document.getElementById('noiseVolume').addEventListener('input', (e) => {
    if (audioPlayer) {
        audioPlayer.volume = e.target.value / 100;
    }
});

function stopWhiteNoise() {
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer = null;
    }
    if (noiseTimer) {
        clearTimeout(noiseTimer);
        noiseTimer = null;
    }
    playNoiseBtn.textContent = 'Play Sound';
}

playNoiseBtn.addEventListener('click', () => {
    if (!audioPlayer) {
        playWhiteNoise();
        playNoiseBtn.textContent = 'Stop Sound';
    } else {
        stopWhiteNoise();
    }
}); 