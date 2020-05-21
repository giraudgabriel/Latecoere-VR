const pecas = [];
let passo = 0;
let passoMontagem = 0;
let erros = 0;
let acertos = 0;

addPeca('peca1');
addPeca('peca2');
addPeca('peca3');
addPeca('peca4');

let pecaAtual = pecas[0];

function addPeca(id) {
    pecas.push(id)
    document.getElementById(id + '-img')
        ?.addEventListener("click", () => {
            if (passoMontagem < pecas.length) {
                if (pecas.indexOf(id) === passoMontagem) {
                    const el = document.getElementById(id + '-montagem');
                    el.object3D.visible = true;
                    passoMontagem++;
                    acertos++;
                    if (acertos === pecas.length) {
                        alert('Você construiu a porta com sucesso!');
                        animationMario();
                        getAproveitamento();
                    }
                } else {
                    erros++;
                }
            }
        });
}

function getAproveitamento() {
    const tentativas = acertos + erros;
    const aproveitamento = (acertos / tentativas * 100.0).toFixed(2);
    console.log(`${erros} erros`);
    console.log(`${acertos} acertos`);
    console.log(`${tentativas} tentativas`);
    console.log(`${aproveitamento} % de aproveitamento`);
    passoMontagem = erros = acertos = 0;
}

function animationMario() {
    pecas.forEach(peca => {
        const attribute = {
            id: `${peca}-montagem`,
            property: 'rotation',
            dur: 1000,
            to: '0 360 0',
            loop: 1
        };
        generateAttribute(attribute);
    })
    const alerta = document.querySelector("#alerta2");
    setTimeout(() => {
        alerta.object3D.visible = true;
        alerta.setAttribute('animation', 'property: model-opacity; dur: 1000; to: 1 ;loop: 3;');;
    }, 100);

    setTimeout(() => {
        pecas.forEach(peca => {
            const el = document.getElementById(peca + '-montagem');
            el.object3D.visible = false;
        });
        alerta.object3D.visible = false;
    }, 3000);
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

function virarPraEsquerda(args = '') {
    pecas.forEach(peca => {
        let e = document.getElementById(peca + args);
        e.object3D.rotation.y -= 0.9
    })
}

function virarPraDireita(args = '') {
    pecas.forEach(peca => {
        let e = document.getElementById(peca + args);
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

document
    .querySelector("#setaEsquerdaMontagem")
    .addEventListener("click", () => {
        virarPraEsquerda('-montagem');
    });
document
    .querySelector("#setaDireitaMontagem")
    .addEventListener("click", () => {
        virarPraDireita('-montagem');
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
};

function countSub() {
    passo = passo < 0
        ? 0
        : passo - 1;
};