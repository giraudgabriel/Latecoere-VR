const pecas = [];
let passo = 0;

addPeca('peca1');
addPeca('peca2');
addPeca('peca3');
addPeca('peca4');

let pecaAtual = pecas[0];

function addPeca(id) {
    pecas.push(id)
}

function generateAttribute({
    id,
    property = 'position',
    dur = 1000,
    from,
    to,
    loop,
    easing,
    elasticity
}) {
    const e = document.getElementById(id);
    e.setAttribute('animation', {
        property,
        dur,
        from,
        to,
        loop,
        easing,
        elasticity
    });
}

function virarPraEsquerda() {
    let e = document.getElementsByClassName('cPeca');
    for (let i in e) {
        let item = e[i]
        item.object3D.rotation.y -= 0.9
    }
}

function virarPraDireita() {
    pecas.forEach(peca => {
        let e = document.getElementById(peca);
        e.object3D.rotation.y += 0.9
    })
}

document
    .querySelector("#tras")
    .addEventListener("click", () => {
        generateAttribute({id: pecaAtual})
    });
document
    .querySelector("#frente")
    .addEventListener("click", () => {
        generateAttribute({id: pecaAtual})
    });

document
    .querySelector("#setaEsquerda")
    .addEventListener("click", () => {
        virarPraEsquerda();
    });
document
    .querySelector("#setaDireita")
    .addEventListener("click", () => {
        virarPraDireita();
    });

function CheckMobile() {

    if (AFRAME.utils.device.isMobile() == false) { // DESKTOP
        var el = document.querySelector("#mycursor");
        el.setAttribute('cursor', 'rayOrigin: mouse;fuse: false');
    } else {
        var el = document.querySelector("#mycursor"); // MOBILE
        el.setAttribute('cursor', 'rayOrigin: cursor;fuse: true');
        el.object3D.visible = true;
    }
}

document
    .querySelector('a-scene')
    .addEventListener('enter-vr', () => {
        var el2 = document.querySelector("#mycursor");
        el2.setAttribute('cursor', 'rayOrigin: cursor; fuse: true;');
        el2.object3D.visible = true;
        var el = document.querySelector("#CameraPosition");
        el
            .object3D
            .position
            .set(0, 0, 4.5);
    });
window.onload = function () {
    CheckMobile();
};

let frente = document.getElementById("frente");
frente.addEventListener("click", (e) => {
    count();
    let from = '0.6 0 1'
    let to = '0 0 0'
    atualizarPasso(from, to)
})

let tras = document.getElementById("tras");
tras.addEventListener("click", (e) => {
    let from = '0.6 0 1'
    let to = '0.6 0 1'
    atualizarPasso(from, to, false);
    countSub();
})

function atualizarPasso(from, to, visible = true) {
    if (passo > 0) {
        pecaAtual = pecas[passo - 1];
        let el = document.getElementById(pecaAtual);
        generateAttribute({id: pecaAtual, from, to})
        el.object3D.visible = visible;
    }
}

function count() {
    passo = passo >= pecas.length
        ? pecas.length
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