// Tab switching
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
}

// --- COLOR PICKER LOGIC ---
function syncColor(source) {
    let r, g, b, hex;

    if (source === 'slider') {
        r = parseInt(document.getElementById('sld-r').value);
        g = parseInt(document.getElementById('sld-g').value);
        b = parseInt(document.getElementById('sld-b').value);
        hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    } 
    else if (source === 'picker') {
        hex = document.getElementById('color-picker').value.toUpperCase();
    } 
    else if (source === 'text') {
        hex = document.getElementById('color-text').value;
        if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
    }

    updateColor(hex);
}

function updateColor(hex) {
    const display = document.getElementById('color-preview');
    const picker = document.getElementById('color-picker');
    const text = document.getElementById('color-text');
    const sR = document.getElementById('sld-r');
    const sG = document.getElementById('sld-g');
    const sB = document.getElementById('sld-b');

    display.style.backgroundColor = hex;
    display.innerText = hex;
    picker.value = hex.toLowerCase();
    text.value = hex;

    // スライダーの値をHEXから逆算して更新
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    sR.value = r; sG.value = g; sB.value = b;

    // 文字色反転
    display.style.color = (r*0.299 + g*0.587 + b*0.114) > 186 ? '#000' : '#fff';
}

// --- AUTO CONVERTER LOGIC ---
function doConvert(type) {
    if (type === 'hex') {
        const val = document.getElementById('u-hex').value;
        const res = document.getElementById('res-bin');
        let n = parseInt(val, 16);
        res.innerText = isNaN(n) ? "---- ----" : n.toString(2).padStart(8, '0').replace(/(.{4})/g, '$1 ');
    } 
    else if (type === 'len') {
        const val = document.getElementById('u-m').value;
        const res = document.getElementById('res-ft');
        res.innerText = val ? (parseFloat(val) * 3.28084).toFixed(2) + " ft" : "0.00 ft";
    }
    else if (type === 'temp') {
        const val = document.getElementById('u-c').value;
        const res = document.getElementById('res-f');
        res.innerText = val ? (parseFloat(val) * 9/5 + 32).toFixed(1) + " °F" : "32.0 °F";
    }
}

// --- CALCULATOR ---
let formula = "";
function calcAction(val) { formula += val; document.getElementById('calc-formula').innerText = formula; }
function calcClear() { formula = ""; document.getElementById('calc-formula').innerText = ""; document.getElementById('calc-target').innerText = "0"; }
function calcSolve() {
    try {
        let p = formula.replace(/sin\(/g, "Math.sin(Math.PI/180*").replace(/cos\(/g, "Math.cos(Math.PI/180*").replace(/×/g, "*").replace(/÷/g, "/");
        let res = eval(p);
        document.getElementById('calc-target').innerText = Number.isFinite(res) ? (Number.isInteger(res) ? res : res.toFixed(4)) : "Error";
    } catch { document.getElementById('calc-target').innerText = "Error"; }
}
