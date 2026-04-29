// --- 画面遷移 ---
function showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('view-' + id).classList.add('active');
    event.currentTarget.classList.add('active');
    if(id === 'maze') generateMaze();
}

// --- 関数電卓 ---
let formula = "";
const formulaDisp = document.getElementById('calc-formula');
const targetDisp = document.getElementById('calc-target');

function calcAction(val) {
    formula += val;
    updateCalc();
}
function calcClear() {
    formula = "";
    updateCalc();
}
function updateCalc() {
    formulaDisp.innerText = formula;
}
function calcSolve() {
    try {
        let processed = formula
            .replace(/sin\(/g, "Math.sin(Math.PI/180*")
            .replace(/cos\(/g, "Math.cos(Math.PI/180*")
            .replace(/×/g, "*").replace(/÷/g, "/");
        let result = eval(processed);
        targetDisp.innerText = Number.isInteger(result) ? result : result.toFixed(4);
    } catch {
        targetDisp.innerText = "Error";
    }
}

// --- ランダム迷路 ---
function generateMaze() {
    const container = document.getElementById('maze-container');
    const size = 15; // 15x15
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.innerHTML = '';
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (i === 0) cell.innerText = "S"; // Start
        else if (i === size * size - 1) {
            cell.classList.add('g'); // Goal
            cell.onmouseenter = () => alert("GOAL CLEAR!");
        } else if (Math.random() > 0.7) {
            cell.classList.add('w'); // Wall
            cell.onmouseenter = () => { alert("HIT!"); generateMaze(); };
        }
        container.appendChild(cell);
    }
}
function resetMaze() { /* 枠外に出た時の処理など */ }

// --- 変換ツール ---
function convert(type) {
    const hex = document.getElementById('hex-in');
    const dec = document.getElementById('dec-in');
    const bin = document.getElementById('bin-out');
    
    let val;
    if(type === 'hex') val = parseInt(hex.value, 16);
    else val = parseInt(dec.value, 10);

    if(!isNaN(val)) {
        if(type !== 'hex') hex.value = val.toString(16).toUpperCase();
        if(type !== 'dec') dec.value = val;
        bin.value = val.toString(2).padStart(8, '0');
    }
}
