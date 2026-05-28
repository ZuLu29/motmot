// Quiz Elements
const quizContainer = document.getElementById('quiz-container');
const quizInput = document.getElementById('quiz-answer');
const quizSubmit = document.getElementById('quiz-submit');
const quizError = document.getElementById('quiz-error');
const bodyTheme = document.getElementById('body-theme');

// Surprise Elements
const mainHeart = document.getElementById('main-heart');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const msgContainer = document.getElementById('message-container');
const bgMusic = document.getElementById('bg-music');
const restartBtn = document.getElementById('restart-btn');
const messageElement = document.querySelector('.message');
const lyricsBackground = document.getElementById('lyrics-background');

let confettiInterval;
let isAudioUnlocked = false;

// 🎶 Lyrics Array (Sample: Pasilyo by SunKissed Lola)
// Pwede mong palitan ang mga phrases na ito depende sa kanta mo pre!
const lyrics = [
    "Panapanahon ang pagkakataon",
    "Maibabalik ba ang kahapon?",
    "Ikaw ang kailangan ko",
    "Sa mundong magulo",
    "Ikaw ang aking pahinga",
    "Paboritong kabanata",
    "92 months of us",
    "Happy Monthsary Baby",
    "I love you forever",
    "You are my best part",
    "Salamat sa pagmamahal",
    "Dito ka lang sa tabi ko",
    "Ikaw at ako",
    "Walang hanggan"
];

const fullMessage = `Hi Baby! <br><br>
Happy 92 months sa atin! Grabe, 7 years and 8 months na tayo pero parang kailan lang nung nagsisimula pa lang tayo. 
Salamat sa pagiging best partner, sa lahat ng tawa, at kahit sa mga asaran natin. <br><br>
You are my greatest blessing, and I'm so lucky to have you as my "Baby". 
I love you so much, more than words can say! Cheers to many more months and years together! 🥂❤️`;

function unlockAudio() {
    if (!isAudioUnlocked) {
        bgMusic.play().then(() => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            isAudioUnlocked = true;
        }).catch(e => console.log("Audio unlock failed:", e));
    }
}

// 1. Quiz Logic
quizSubmit.addEventListener('click', () => {
    unlockAudio();
    const answer = quizInput.value.trim();
    if (answer === '92') {
        quizContainer.classList.add('hidden');
        envelopeWrapper.classList.remove('hidden');
        bodyTheme.classList.remove('wrong-answer'); 
        quizError.classList.add('hidden');
    } else {
        bodyTheme.classList.add('wrong-answer');
        quizError.classList.remove('hidden');
    }
});

quizInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') quizSubmit.click();
});

// 2. Lyrics Animation Logic
function createFloatingLyric() {
    if (msgContainer.classList.contains('hidden')) return;

    const lyric = document.createElement('div');
    lyric.classList.add('floating-lyric');
    
    // Pick random lyric
    const randomText = lyrics[Math.floor(Math.random() * lyrics.length)];
    lyric.innerText = randomText;
    
    // Random position
    const startY = Math.random() * 80 + 10; // 10% to 90% height
    lyric.style.top = startY + 'vh';
    
    // Random speed
    const duration = Math.random() * 10 + 15; // 15s to 25s
    lyric.style.animationDuration = duration + 's';
    
    lyricsBackground.appendChild(lyric);
    
    // Remove after animation
    setTimeout(() => {
        lyric.remove();
    }, duration * 1000);
}

// 3. Typewriter Effect
function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        if (text.substring(i, i + 4) === '<br>') {
            messageElement.innerHTML += '<br>';
            i += 4;
        } else {
            messageElement.innerHTML += text.charAt(i);
            i++;
        }
        setTimeout(() => typeWriter(text, i, fnCallback), 30);
    } else if (typeof fnCallback == 'function') {
        fnCallback();
    }
}

// 4. Surprise Logic
function startSurprise() {
    bgMusic.volume = 1.0;
    bgMusic.play().catch(error => {
        alert("Happy Monthsary, Baby! ❤️");
        bgMusic.play();
    });

    envelopeWrapper.classList.add('hidden');
    msgContainer.classList.remove('hidden');
    messageElement.innerHTML = '';
    
    setTimeout(() => {
        msgContainer.classList.add('show');
        typeWriter(fullMessage, 0, () => {
            restartBtn.classList.remove('hidden');
        });
    }, 500);

    // Start floating lyrics
    setInterval(createFloatingLyric, 3000); // New lyric every 3 seconds

    VanillaTilt.init(document.querySelectorAll(".photo-card"), {
        max: 25, speed: 400, glare: true, "max-glare": 0.5,
    });

    setInterval(createFallingHeart, 300);
    triggerConfetti();
}

mainHeart.addEventListener('click', startSurprise);

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.opacity = Math.random();
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

function triggerConfetti() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    confettiInterval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(confettiInterval);
      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

restartBtn.addEventListener('click', () => location.reload());
