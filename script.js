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
}

// --- Color Picker Logic (入力・選択対応) ---
function syncColor(source) {
    const picker = document.getElementById('color-picker');
    const text = document.getElementById('color-text');
    let color = (source === 'picker') ? picker.value : text.value;
    
    // テキスト入力の場合、#を補完してバリデーション
    if(source === 'text') {
        if(!color.startsWith('#')) color = '#' + color;
        if(!/^#[0-9A-Fa-f]{6}$/.test(color)) return; // 不正な形式なら無視
    }
    
    updateColor(color);
}

function updateColor(hex) {
    const display = document.getElementById('color-preview');
    const picker = document.getElementById('color-picker');
    const text = document.getElementById('color-text');

    display.style.backgroundColor = hex;
    display.innerText = hex.toUpperCase();
    picker.value = hex;
    text.value = hex.toUpperCase();

    // 背景色に応じて文字色を反転
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    display.style.color = (r*0.299 + g*0.587 + b*0.114) > 186 ? '#000' : '#fff';
}

// --- Unit Converter Logic (修正版) ---
function initUnit() {
    const type = document.getElementById('unit-type').value;
    const lIn = document.getElementById('label-in');
    const lOut = document.getElementById('label-out');
    const input = document.getElementById('unit-in');
    const output = document.getElementById('unit-out');

    input.value = "";
    output.value = "";

    if(type === "base") { lIn.innerText = "HEXADECIMAL"; lOut.innerText = "BINARY RESULT"; }
    else if(type === "length") { lIn.innerText = "METERS (m)"; lOut.innerText = "FEET (ft)"; }
    else if(type === "weight") { lIn.innerText = "KILOGRAMS (kg)"; lOut.innerText = "POUNDS (lb)"; }
}

function unitConvert() {
    const type = document.getElementById('unit-type').value;
    const val = document.getElementById('unit-in').value;
    const out = document.getElementById('unit-out');

    if(!val || val.trim() === "") { out.value = ""; return; }

    try {
        if(type === "base") {
            let n = parseInt(val, 16);
            if(isNaN(n)) { out.value = "Invalid Hex"; }
            else { out.value = n.toString(2).padStart(8,'0').replace(/(.{4})/g, '$1 '); }
        } else if(type === "length") {
            let n = parseFloat(val);
            out.value = isNaN(n) ? "Error" : (n * 3.28084).toFixed(3) + " ft";
        } else if(type === "weight") {
            let n = parseFloat(val);
            out.value = isNaN(n) ? "Error" : (n * 2.20462).toFixed(3) + " lb";
        }
    } catch(e) { out.value = "Error"; }
}

// --- Calculator Logic ---
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
        document.getElementById('calc-target').innerText = Number.isFinite(res) ? (Number.isInteger(res) ? res : res.toFixed(4)) : "Error";
    } catch { document.getElementById('calc-target').innerText = "Error"; }
}


const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
