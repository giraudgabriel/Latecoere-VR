//controller api
const objectController = new ObjectController();

//cenario
const scene = document.getElementsByTagName('a-scene')[0];
const tras = document.getElementById('tras');
const frente = document.getElementById('frente');
const setaDireita = document.getElementById('setaDireita');
const setaEsquerda = document.getElementById('setaEsquerda');
const setaDireitaMontagem = document.getElementById('setaDireitaMontagem');
const setaEsquerdaMontagem = document.getElementById('setaEsquerdaMontagem');

//pecas
const pecas = [];

//passo demonstracao
let passo = 0;

//passo montagem
let passoMontagem = 0;

//contagem de erros na montagem
let erros = 0;

//contagem de acertos na montagem
let acertos = 0;

//peca atual demonstracao
let pecaAtual = pecas[0];

//pega da api os objetos e coloca no cenario
async function setObjects() {
    var pieces = [];
    try {
        const response = await objectController.getAll();
        pieces = response.data[0].pieces;
        pieces.map(piece => createPiece(piece));
    } catch (error) {
        fetch('./db/db.json').then(response => {
            response
                .json()
                .then(data => {
                    const {object} = data;
                    const first = object[0];
                    pieces = first.pieces;
                    pieces.map(piece => createPiece(piece));
                });
        })
    }

}

function getAproveitamento() {
    const tentativas = acertos + erros;
    const aproveitamento = (acertos / tentativas * 100.0).toFixed(2);
    console.log(`${erros} erros`);
    console.log(`${acertos} acertos`);
    console.log(`${tentativas} tentativas`);
    console.log(`${aproveitamento} % de aproveitamento`);
    passoMontagem = erros = acertos = 0;
    setBotoesMontagem(false);
}

function setBotoesMontagem(visible = true) {
    const btnEsquerdo = document.getElementById('setaEsquerdaMontagem');
    const btnEsquerdo2 = document.getElementById('setaEsquerdaMontagem0');
    const btbDireito = document.getElementById('setaDireitaMontagem');
    const btbDireito2 = document.getElementById('setaDireitaMontagem0');

    btnEsquerdo.object3D.visible = visible;
    btnEsquerdo2.object3D.visible = visible;
    btbDireito.object3D.visible = visible;
    btbDireito2.object3D.visible = visible;
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
    }, 2000);
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

function checkMobile() {
    var el = document.querySelector("#mycursor");
    if (AFRAME.utils.device.isMobile() == false) { // DESKTOP
        el.setAttribute('cursor', 'rayOrigin: mouse;fuse: false');
    } else {
        el.setAttribute('cursor', 'rayOrigin: cursor;fuse: true');
        el.object3D.visible = true;
    }
}

function createPiece({id, src, src_img}) {
    //peca demonstracao
    const piece = document.createElement('a-gltf-model');
    piece.setAttribute('id', id)
    piece.setAttribute('src', src)
    piece.setAttribute('shadow', 'cast: true')
    piece.setAttribute('position', '0 0 0')
    piece.setAttribute('rotation', '0 0 0')
    piece.setAttribute('scale', '1 1 1')
    piece.setAttribute('visible', false)

    //peca montagem
    const pieceMontage = document.createElement('a-gltf-model');
    pieceMontage.setAttribute('id', id + '-montagem')
    pieceMontage.setAttribute('src', src)
    pieceMontage.setAttribute('shadow', 'cast: true')
    pieceMontage.setAttribute('position', '10.1 0 0')
    pieceMontage.setAttribute('rotation', '0 0 0')
    pieceMontage.setAttribute('scale', '1 1 1')
    pieceMontage.setAttribute('visible', false)

    //adicionando ao cenario
    scene.appendChild(piece);
    scene.appendChild(pieceMontage);

    //criando imagem pra clicar
    createImg({id, src_img});

    pecas.push(id);
}

function createImg({id, src_img}) {
    const img = document.createElement('img');
    img.setAttribute('src', src_img);
    img.setAttribute('id', id + '-foto');

    const imgAFRAME = document.createElement('a-image');
    imgAFRAME.setAttribute('id', id + '-img');
    imgAFRAME.setAttribute('src', img.src);
    imgAFRAME.setAttribute('scale', '0.6 2.01 2');
    imgAFRAME.setAttribute('position', `${ 11.183 + (pecas.length * 0.7)} 2.54 -2.54`);
    imgAFRAME.addEventListener("click", () => onImgClick(id));

    scene.appendChild(img);
    scene.appendChild(imgAFRAME);
}

function onImgClick(id) {
    if (passoMontagem < pecas.length) {
        if (pecas.indexOf(id) === passoMontagem) {
            if (passoMontagem === 0) 
                setBotoesMontagem();
            const el = document.getElementById(id + '-montagem');
            el.object3D.visible = true;
            passoMontagem++;
            acertos++;
            if (acertos === pecas.length) {
                animationMario();
                getAproveitamento();
            }
        } else {
            erros++;
        }
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        setObjects();
        //prosseguir passo a passo
        frente.addEventListener("click", (e) => {
            count();
            let from = '0.6 0 1'
            let to = '0 0 0'
            atualizarPasso(from, to)
        })

        //voltar passo a passo
        tras.addEventListener("click", (e) => {
            let from = '0 0 0'
            let to = '0.6 0 1'
            atualizarPasso(from, to, false);
            countSub();
        })

        //virar pra esquerda passo a passo
        setaEsquerda.addEventListener("click", () => virarPraEsquerda());

        //virar pra direita passo a passo
        setaDireita.addEventListener("click", () => virarPraDireita());

        //virar pra esquerda montagem
        setaEsquerdaMontagem.addEventListener("click", () => virarPraEsquerda('-montagem'));

        //virar pra direita montagem
        setaDireitaMontagem.addEventListener("click", () => virarPraDireita('-montagem'));

        //adicionar cursor
        scene.addEventListener('enter-vr', () => {
            var el2 = document.querySelector("#mycursor");
            el2.setAttribute('cursor', 'rayOrigin: cursor; fuse: true;');
            el2.object3D.visible = true;
            var el = document.querySelector("#CameraPosition");
            el
                .object3D
                .position
                .set(0, 0, 4.5);
        });
    }
}

window.onload = () => checkMobile();

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