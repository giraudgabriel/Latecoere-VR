let passos = [];
let passo = 0;
let passoAtual = null;

function start() {
    gerarPasso('peca1');
    gerarPasso('peca2');
    gerarPasso('peca3');
    gerarPasso('peca4');

    let frente = document.getElementById("frente");
    frente.addEventListener("mouseenter", (e) => {
        count();
        let from = {
            fx: 0.6,
            fy: 0,
            fz: 1
        };
        let to = {
            tx: 0,
            ty: 0,
            tz: 0
        };
        atualizarPasso(from, to, true)
    })

    let tras = document.getElementById("tras");
    tras.addEventListener("mouseenter", (e) => {
        let from = {
            fx: 0.6,
            fy: 0,
            fz: 1
        };
        let to = {
            tx: 0.6,
            ty: 0,
            tz: 1
        };
        atualizarPasso(from, to, false);
        countSub();
    })

    let loop = document.getElementById("loop");
    loop.addEventListener("mouseenter", (e) => {
        passoAtual.repetir = !passoAtual.repetir;
        let from = {
            fx: 0.6,
            fy: 0,
            fz: 1
        };
        let to = {
            tx: 0,
            ty: 0,
            tz: 0
        };
        atualizarPasso(from, to, true);
    })

};
window.addEventListener("load", start, false);

function gerarPasso(id, repetir = false, duracao = 1500) {
    passos.push({id, repetir, duracao})
}

function atualizarPasso({
    fx = 0,
    fy = 0,
    fz = 0
}, {
    tx = 0,
    ty = 0,
    tz = 0
}, visible = true) {
    if (passo > 0) {
        passoAtual = passos[passo - 1];
        let el = document.getElementById(passoAtual.id);
        let valueAnimation = `property: position; dur: ${passoAtual.duracao}; from: ${fx} ${fy} ${fz}; to: ${tx} ${ty} ${tz} ;loop: ${passoAtual.repetir};`;
        el.setAttribute('animation', valueAnimation);
        el.object3D.visible = visible;
    }
}

function count() {
    passo = passo >= passos.length
        ? passos.length
        : passo + 1;
    document
        .getElementById("count")
        .innerHTML = passo;
};

function countSub() {
    passo = passo < 0
        ? 0
        : passo - 1;
    document
        .getElementById("count")
        .innerHTML = passo;
};