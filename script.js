// Dictionary Ngôn ngữ (English / Vietnamese)
const i18n = {
    vi: {
        subTitle: "Luyện Tập Tập Trung & Não Bộ",
        playerName: "Tên người chơi",
        boardMode: "Chế độ",
        modeGrid: "Lưới Ô Số",
        modeWheel: "Hình Tròn / Bánh Xe",
        wheelStyle: "Kiểu Hình Tròn",
        styleConcentric: "Vòng Đồng Tâm (30 ô)",
        styleRadial: "Mặt Đồng Hồ (24 ô)",
        styleSingle: "Vòng Đơn (16 ô)",
        gridSize: "Kích thước",
        shapeType: "Nút Lưới",
        shapeSquare: "Vuông",
        shapeCircle: "Tròn",
        btnNewGame: "Trò Chơi Mới",
        target: "MỤC TIÊU",
        leaderboardTitle: "🏆 Top Thành Tích",
        thName: "Tên",
        thMode: "Chế độ",
        thTime: "Thời gian",
        alertFinish: "🎉 Tuyệt vời! Thời gian của bạn: ",
        noScores: "Chưa có kỷ lục nào"
    },
    en: {
        subTitle: "Focus & Brain Training",
        playerName: "Player Name",
        boardMode: "Mode",
        modeGrid: "Grid Matrix",
        modeWheel: "Circle / Wheel",
        wheelStyle: "Wheel Style",
        styleConcentric: "Concentric Rings (30)",
        styleRadial: "Clock Radial (24)",
        styleSingle: "Single Ring (16)",
        gridSize: "Grid Size",
        shapeType: "Button Shape",
        shapeSquare: "Square",
        shapeCircle: "Circle",
        btnNewGame: "New Game",
        target: "TARGET",
        leaderboardTitle: "🏆 Leaderboard",
        thName: "Name",
        thMode: "Mode",
        thTime: "Time",
        alertFinish: "🎉 Awesome! Your time: ",
        noScores: "No records yet"
    }
};

// Application State
let currentLang = localStorage.getItem('schulte_lang') || 'vi';
let currentTheme = localStorage.getItem('schulte_theme') || 'dark';

let mode = 'grid';
let wheelStyle = 'concentric';
let size = 5;
let shape = 'square';
let currentTarget = 1;
let maxNumber = 25;

let timerInterval = null;
let startTime = null;
let isGameRunning = false;

// DOM Elements
const btnLang = document.getElementById('btnLang');
const btnTheme = document.getElementById('btnTheme');
const boardModeSelect = document.getElementById('boardMode');
const wheelStyleSelect = document.getElementById('wheelStyle');
const gridSizeSelect = document.getElementById('gridSize');
const shapeTypeSelect = document.getElementById('shapeType');

const wheelStyleGroup = document.getElementById('wheelStyleGroup');
const gridSizeGroup = document.getElementById('gridSizeGroup');
const shapeTypeGroup = document.getElementById('shapeTypeGroup');

const btnNewGame = document.getElementById('btnNewGame');
const playerNameInput = document.getElementById('playerName');

const gridBoard = document.getElementById('gridBoard');
const wheelBoard = document.getElementById('wheelBoard');
const schulteSvg = document.getElementById('schulteSvg');

const timerEl = document.getElementById('timer');
const nextNumEl = document.getElementById('nextNum');
const scoreTableEl = document.getElementById('scoreTable');

// Initialize App
function init() {
    // Apply initial settings
    applyTheme(currentTheme);
    applyLanguage(currentLang);

    // Event Listeners
    btnLang.addEventListener('click', toggleLanguage);
    btnTheme.addEventListener('click', toggleTheme);

    boardModeSelect.addEventListener('change', () => { toggleModeUI(); resetGame(); });
    wheelStyleSelect.addEventListener('change', () => { resetGame(); });
    gridSizeSelect.addEventListener('change', resetGame);
    shapeTypeSelect.addEventListener('change', resetGame);
    btnNewGame.addEventListener('click', resetGame);

    toggleModeUI();
    renderScores();
    resetGame();
}

// Switch Language
function toggleLanguage() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    localStorage.setItem('schulte_lang', currentLang);
    applyLanguage(currentLang);
    renderScores();
}

function applyLanguage(lang) {
    btnLang.textContent = lang === 'vi' ? '🌐 EN' : '🌐 VI';
    const dict = i18n[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
}

// Switch Light/Dark Theme
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('schulte_theme', currentTheme);
    applyTheme(currentTheme);
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        btnTheme.textContent = '☀️ Light';
    } else {
        document.body.classList.remove('light-theme');
        btnTheme.textContent = '🌙 Dark';
    }
}

// Toggle UI Groups
function toggleModeUI() {
    mode = boardModeSelect.value;
    if (mode === 'grid') {
        gridSizeGroup.style.display = 'flex';
        shapeTypeGroup.style.display = 'flex';
        wheelStyleGroup.style.display = 'none';
        gridBoard.style.display = 'grid';
        wheelBoard.style.display = 'none';
    } else {
        gridSizeGroup.style.display = 'none';
        shapeTypeGroup.style.display = 'none';
        wheelStyleGroup.style.display = 'flex';
        gridBoard.style.display = 'none';
        wheelBoard.style.display = 'block';
    }
}

// Reset Game
function resetGame() {
    stopTimer();
    currentTarget = 1;
    isGameRunning = false;
    timerEl.textContent = "00:00.000";
    nextNumEl.textContent = "1";

    if (mode === 'grid') {
        size = parseInt(gridSizeSelect.value);
        shape = shapeTypeSelect.value;
        maxNumber = size * size;
        generateGridBoard();
    } else {
        wheelStyle = wheelStyleSelect.value;
        if (wheelStyle === 'concentric') maxNumber = 30;
        else if (wheelStyle === 'radial') maxNumber = 24;
        else if (wheelStyle === 'single_ring') maxNumber = 16;

        generateWheelBoard();
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Grid Mode Board
function generateGridBoard() {
    gridBoard.innerHTML = '';
    gridBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    const fontSize = Math.max(12, Math.min(28, 160 / size));
    const numbers = shuffle(Array.from({ length: maxNumber }, (_, i) => i + 1));

    numbers.forEach(num => {
        const cell = document.createElement('div');
        cell.classList.add('cell', shape);
        cell.style.fontSize = `${fontSize}px`;
        cell.textContent = num;

        cell.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            handleCellClick(num, cell);
        });
        gridBoard.appendChild(cell);
    });
}

// SVG Wheel Mode Board
function generateWheelBoard() {
    schulteSvg.innerHTML = '';
    const cX = 50, cY = 50;
    const numbers = shuffle(Array.from({ length: maxNumber }, (_, i) => i + 1));

    let rings = [];
    if (wheelStyle === 'concentric') {
        rings = [
            { numCells: 12, outerR: 50, innerR: 34 },
            { numCells: 12, outerR: 34, innerR: 19 },
            { numCells: 6, outerR: 19, innerR: 0 }
        ];
    } else if (wheelStyle === 'radial') {
        rings = [
            { numCells: 12, outerR: 50, innerR: 25 },
            { numCells: 12, outerR: 25, innerR: 0 }
        ];
    } else if (wheelStyle === 'single_ring') {
        rings = [{ numCells: 16, outerR: 50, innerR: 18 }];
    }

    let cellIdx = 0;
    rings.forEach(ring => {
        const angleStep = 360 / ring.numCells;
        for (let c = 0; c < ring.numCells; c++) {
            const startAngle = c * angleStep;
            const endAngle = (c + 1) * angleStep;
            const num = numbers[cellIdx];

            const slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
            slice.setAttribute("class", "schulte-slice");
            slice.setAttribute("d", createArcPath(cX, cY, ring.outerR, ring.innerR, startAngle, endAngle));
            if (num === 1) slice.classList.add('slice-1');

            slice.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                handleCellClick(num, slice);
            });
            schulteSvg.appendChild(slice);

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            const midAngle = startAngle + (angleStep / 2);
            const midRadius = ring.innerR + (ring.outerR - ring.innerR) / 2;
            const pos = polarToCartesian(cX, cY, midRadius, midAngle);

            text.setAttribute("x", pos.x);
            text.setAttribute("y", pos.y);
            text.setAttribute("class", "schulte-text");
            text.textContent = num;

            if (num === 1) text.classList.add('special-num-1');
            else if (num === maxNumber) text.classList.add('special-num-max');

            schulteSvg.appendChild(text);
            cellIdx++;
        }
    });
}

function createArcPath(cX, cY, outerR, innerR, startAngle, endAngle) {
    const startOuter = polarToCartesian(cX, cY, outerR, startAngle);
    const endOuter = polarToCartesian(cX, cY, outerR, endAngle);
    const startInner = polarToCartesian(cX, cY, innerR, startAngle);
    const endInner = polarToCartesian(cX, cY, innerR, endAngle);
    const largeArc = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${startOuter.x} ${startOuter.y} 
            A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y} 
            L ${endInner.x} ${endInner.y} 
            A ${innerR} ${innerR} 0 ${largeArc} 0 ${startInner.x} ${startInner.y} Z`;
}

function polarToCartesian(cX, cY, radius, angleInDegrees) {
    const rad = (angleInDegrees - 90) * Math.PI / 180.0;
    return { x: cX + (radius * Math.cos(rad)), y: cY + (radius * Math.sin(rad)) };
}

// Game Logic
function handleCellClick(num, element) {
    if (num === 1 && !isGameRunning && currentTarget === 1) {
        isGameRunning = true;
        startTimer();
        processCorrectClick(element);
        return;
    }

    if (!isGameRunning) return;

    if (num === currentTarget) {
        processCorrectClick(element);
    } else {
        if (!element.classList.contains('correct')) {
            processWrongClick(element);
        }
    }
}

function processCorrectClick(element) {
    element.classList.remove('wrong');
    element.classList.remove('slice-1');
    element.classList.add('correct');

    if (currentTarget === maxNumber) {
        stopTimer();
        const timeDisplay = timerEl.textContent;
        const elapsed = Date.now() - startTime;

        setTimeout(() => {
            alert(i18n[currentLang].alertFinish + timeDisplay);
            saveScore(elapsed, timeDisplay);
        }, 50);
    } else {
        currentTarget++;
        nextNumEl.textContent = currentTarget;
    }
}

function processWrongClick(element) {
    element.classList.add('wrong');
    setTimeout(() => element.classList.remove('wrong'), 250);
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        timerEl.textContent = formatTime(elapsed);
    }, 10);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function formatTime(ms) {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const msec = ms % 1000;
    const pad = (n, z = 2) => ('00' + n).slice(-z);
    return `${pad(min)}:${pad(sec)}.${pad(msec, 3)}`;
}

// Leaderboard Storage
function saveScore(timeMs, timeDisplay) {
    const name = playerNameInput.value.trim() || 'Player';
    let modeLabel = '';
    if (mode === 'grid') {
        modeLabel = `${size}x${size} (${shape === 'square' ? 'Sq' : 'Ci'})`;
    } else {
        const labels = {
            'concentric': 'Circle (30)',
            'radial': 'Clock (24)',
            'single_ring': 'Single (16)'
        };
        modeLabel = labels[wheelStyle];
    }

    const newRecord = { name, modeLabel, timeMs, timeDisplay };

    let scores = JSON.parse(localStorage.getItem('schulte_combined_scores') || '[]');
    scores.push(newRecord);
    scores.sort((a, b) => a.timeMs - b.timeMs);
    scores = scores.slice(0, 5);

    localStorage.setItem('schulte_combined_scores', JSON.stringify(scores));
    renderScores();
}

function renderScores() {
    const scores = JSON.parse(localStorage.getItem('schulte_combined_scores') || '[]');
    scoreTableEl.innerHTML = '';

    if (scores.length === 0) {
        scoreTableEl.innerHTML = `<tr><td colspan="4" style="text-align:center; color: var(--text-muted);">${i18n[currentLang].noScores}</td></tr>`;
        return;
    }

    scores.forEach((score, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><b>${index + 1}</b></td>
            <td>${escapeHtml(score.name)}</td>
            <td>${score.modeLabel}</td>
            <td class="time-val">${score.timeDisplay}</td>
        `;
        scoreTableEl.appendChild(tr);
    });
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

window.onload = init;