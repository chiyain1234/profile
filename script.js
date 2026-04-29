// Tab Switching
function showView(id, event) {
    const views = document.querySelectorAll('.view');
    const btns = document.querySelectorAll('.nav-btn');

    btns.forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');

    views.forEach(v => {
        v.classList.remove('active');
        setTimeout(() => { v.style.display = 'none'; }, 300);
    });

    setTimeout(() => {
        const target = document.getElementById('view-' + id);
        target.style.display = (id === 'profile') ? 'flex' : 'block';
        setTimeout(() => { target.classList.add('active'); }, 50);
    }, 300);

    if(id === 'maze') generateMaze();
}

// Calculator Logic
let formula = "";
function calcAction(val) {
    formula += val;
    document.getElementById('calc-formula').innerText = formula;
}
function calcClear() {
    formula = "";
    document.getElementById('calc-formula').innerText = "";
    document.getElementById('calc-target').innerText = "0";
}
function calcSolve() {
    try {
        let p = formula.replace(/sin\(/g, "Math.sin(Math.PI/180*").replace(/cos\(/g, "Math.cos(Math.PI/180*").replace(/×/g, "*").replace(/÷/g, "/");
        let res = eval(p);
        document.getElementById('calc-target').innerText = Number.isInteger(res) ? res : res.toFixed(4);
    } catch { document.getElementById('calc-target').innerText = "Error"; }
}

// Maze Logic
function generateMaze() {
    const container = document.getElementById('maze-container');
    const size = 12;
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (i === size * size - 1) {
            cell.classList.add('g');
            cell.onmouseenter = () => { alert("CLEAR"); showView('profile', {currentTarget: document.querySelector('.nav-btn')}); };
        } else if (i !== 0 && Math.random() > 0.78) {
            cell.classList.add('w');
            cell.onmouseenter = () => { generateMaze(); };
        }
        container.appendChild(cell);
    }
}

// Converter Logic
function convert() {
    const hex = document.getElementById('hex-in').value;
    const bin = document.getElementById('bin-out');
    let val = parseInt(hex, 16);
    if(!isNaN(val)) {
        bin.value = val.toString(2).padStart(8, '0').replace(/(.{4})/g, '$1 ');
    }
}
