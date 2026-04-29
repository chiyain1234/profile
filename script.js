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

// Color Picker
function updateColor(hex) {
    const display = document.getElementById('color-preview');
    display.style.backgroundColor = hex;
    display.innerText = hex.toUpperCase();
    // 明るさに応じてテキスト色を変える
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    display.style.color = (r*0.299 + g*0.587 + b*0.114) > 186 ? '#000' : '#fff';
}

// Multi Unit Converter
function initUnit() {
    const type = document.getElementById('unit-type').value;
    const lIn = document.getElementById('label-in');
    const lOut = document.getElementById('label-out');
    document.getElementById('unit-in').value = "";
    document.getElementById('unit-out').value = "";

    if(type === "base") { lIn.innerText = "HEX"; lOut.innerText = "BINARY"; }
    else if(type === "length") { lIn.innerText = "METERS (m)"; lOut.innerText = "FEET (ft)"; }
    else if(type === "weight") { lIn.innerText = "KILOGRAMS (kg)"; lOut.innerText = "POUNDS (lb)"; }
}

function unitConvert() {
    const type = document.getElementById('unit-type').value;
    const val = document.getElementById('unit-in').value;
    const out = document.getElementById('unit-out');

    if(!val) return out.value = "";

    if(type === "base") {
        let n = parseInt(val, 16);
        out.value = !isNaN(n) ? n.toString(2).padStart(8,'0').replace(/(.{4})/g, '$1 ') : "Error";
    } else if(type === "length") {
        out.value = (parseFloat(val) * 3.28084).toFixed(2) + " ft";
    } else if(type === "weight") {
        out.value = (parseFloat(val) * 2.20462).toFixed(2) + " lb";
    }
}

// Calculator Logic (前述と同じ)
let formula = "";
function calcAction(val) { formula += val; document.getElementById('calc-formula').innerText = formula; }
function calcClear() { formula = ""; document.getElementById('calc-formula').innerText = ""; document.getElementById('calc-target').innerText = "0"; }
function calcSolve() {
    try {
        let p = formula.replace(/sin\(/g, "Math.sin(Math.PI/180*").replace(/cos\(/g, "Math.cos(Math.PI/180*").replace(/×/g, "*").replace(/÷/g, "/");
        let res = eval(p);
        document.getElementById('calc-target').innerText = Number.isInteger(res) ? res : res.toFixed(4);
    } catch { document.getElementById('calc-target').innerText = "Error"; }
}
