const song = document.querySelector('#song');
const player = document.querySelector('#player');
const play = document.querySelector('#play');
const gate = document.querySelector('#gate');
const showPlayer = document.querySelector('#showPlayer');
song.volume = 0.32;

function syncPlayer() {
  const playing = !song.paused;
  play.textContent = playing ? 'Ⅱ' : '▶';
  play.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
  player.classList.toggle('playing', playing);
}

document.querySelector('#enter').addEventListener('click', async () => {
  sessionStorage.setItem('dollie-age-confirmed', 'yes');
  gate.classList.add('gone');
  player.classList.remove('hidden');
  try { await song.play(); } catch (_) { /* Visitor can press play. */ }
  syncPlayer();
});

if (sessionStorage.getItem('dollie-age-confirmed') === 'yes') {
  gate.classList.add('gone');
  player.classList.remove('hidden');
}

play.addEventListener('click', () => song.paused ? song.play() : song.pause());
song.addEventListener('play', syncPlayer);
song.addEventListener('pause', syncPlayer);
document.querySelector('#hidePlayer').addEventListener('click', () => { player.classList.add('hidden'); showPlayer.classList.add('visible'); });
showPlayer.addEventListener('click', () => { player.classList.remove('hidden'); showPlayer.classList.remove('visible'); });
