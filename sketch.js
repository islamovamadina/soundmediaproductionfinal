let music;
let fft;
let amp;
let isPlaying = false;
let mode = 0; // 색상 모드 변경용

function preload() {
  music = loadSound("music.mp3"); // 너가 넣고 싶은 음악 파일 이름
}

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);

  // FFT와 Amplitude 생성 (필수 조건 충족)
  fft = new p5.FFT();
  amp = new p5.Amplitude();
}

function draw() {
  background(0, 0, 10);

  let level = amp.getLevel(); 
  let spectrum = fft.analyze();

  // 소리 크기로 원 크기 변화 (기본 매핑)
  let size = map(level, 0, 0.3, 50, 300);

  // 색상 모드에 따라 색 변함 (시각적 다양성)
  let hueValue = (mode * 80 + frameCount) % 360;
  fill(hueValue, 80, 100);
  noStroke();

  // 중심 원
  ellipse(width / 2, height / 2, size);

  // 스펙트럼 바 (도형 2가지 사용: rect + ellipse)
  noStroke();
  for (let i = 0; i < spectrum.length; i += 20) {
    let h = map(spectrum[i], 0, 255, 10, 200);
    fill((hueValue + i) % 360, 80, 100, 0.8);
    rect(i * 3, height - h, 10, h);
    ellipse(i * 3 + 5, height - h, 10);
  }

  // 안내 문구
  fill(255);
  textSize(16);
  text("Click: Play/Stop | Key: Change Color Mode", 20, 30);
}

// 마우스 클릭 → 재생/정지 (인터랙션)
function mousePressed() {
  if (!isPlaying) {
    music.play();
    isPlaying = true;
  } else {
    music.pause();
    isPlaying = false;
  }
}

// 키보드 → 색상 모드 변경
function keyPressed() {
  mode = (mode + 1) % 4;
}



