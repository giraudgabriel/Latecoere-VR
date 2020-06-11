import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import assemblyService from '../services/AssemblyService';
import Score from '../models/Score';
const AFRAME = window.AFRAME;

class VRScene extends React.Component {
    state = {
        pecas: [],
        pieces: [],
        passo: 0,
        passoMontagem: 0,
        erros: 0,
        acertos: 0,
        ordem: [],
        pecaAtual: ''
    }

    //pega da api os objetos e coloca no cenario
    async setPieces() {
        try {
            const {data} = await assemblyService.getAll();
            const {pieces} = data[0];
            this.setState({
                ...this.state,
                pieces
            });
            this
                .state
                .pieces
                .map(piece => this.createPiece(piece));
            this.aleatorizarImagens(this.state.pieces)
        } catch (error) {
            console.error(error)
            fetch('../db.json').then(response => {
                response
                    .json()
                    .then(data => {
                        const {pieces} = data['assembly'][0];
                        this.setState({
                            ...this.state,
                            pieces
                        });
                        this
                            .state
                            .pieces
                            .map(piece => this.createPiece(piece));
                        this.aleatorizarImagens(this.state.pieces)
                    });
            })
        }

    }

    getAproveitamento = () => {
        new Score(this.state.erros, this.state.acertos, this.state.ordem);
        this.setState({
            ...this.state,
            passoMontagem: 0,
            erros: 0,
            acertos: 0,
            ordem: []
        });
        this.setBotoesMontagem(false);
        this.aleatorizarImagens(this.state.pieces);
    }

    setBotoesMontagem(visible = true) {
        this.state.setaEsquerdaMontagem0.object3D.visible = visible;
        this.state.setaEsquerdaMontagem.object3D.visible = visible;
        this.state.setaDireitaMontagem0.object3D.visible = visible;
        this.state.setaDireitaMontagem.object3D.visible = visible;
    }

    animationMario = () => {
        this
            .state
            .pecas
            .forEach(peca => {
                const attribute = {
                    id: `${peca}-montagem`,
                    property: 'rotation',
                    dur: 1000,
                    to: '0 360 0',
                    loop: 1
                };
                this.generateAttribute(attribute);
            })

        setTimeout(() => {
            this
                .state
                .pecas
                .forEach(peca => {
                    const el = document.getElementById(peca + '-montagem');
                    el.object3D.visible = false;
                });
        }, 2000);
    }

    generateAttribute({
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

    virarPraEsquerda(args = '') {
        this
            .state
            .pecas
            .forEach(peca => {
                let e = document.getElementById(peca + args);
                e.object3D.rotation.y -= 0.9
            })
    }

    virarPraDireita(args = '') {
        this
            .state
            .pecas
            .forEach(peca => {
                let e = document.getElementById(peca + args);
                e.object3D.rotation.y += 0.9
            })
    }

    checkMobile = () => {
        let el = document.querySelector("#rig");
        if (AFRAME.utils.device.isMobile() === false) { // DESKTOP
            el.setAttribute('cursor', 'rayOrigin: mouse;fuse: false');
        } else {
            el.setAttribute('cursor', 'rayOrigin: cursor;fuse: true');
            el.object3D.visible = true;
        }
    }

    createPiece({id, src}) {
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
        this
            .state
            .scene
            .appendChild(piece);
        this
            .state
            .scene
            .appendChild(pieceMontage);

        this
            .state
            .pecas
            .push(id);
    }

    sortArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    aleatorizarImagens(array) {
        const sortedArray = this.sortArray(array);
        sortedArray.forEach((item, index) => {
            const {id, src_img} = item;
            this.createImg({id, src_img, index})
        })
    }

    createImg({id, src_img, index}) {
        //adicionando link da img
        const existTagImg = document.getElementById(id + '-img');
        const img = existTagImg !== null
            ? existTagImg
            : document.createElement('img');
        if (existTagImg === null) {
            img.setAttribute('src', src_img);
            img.setAttribute('id', id + '-foto');
            img.setAttribute('alt', id + '-foto');
            document
                .getElementsByTagName('a-assets')[0]
                .appendChild(img);
        }

        //adicionando image ao aframe
        const existImg = document.getElementById(id + '-img');
        const imgAFRAME = existImg !== null
            ? existImg
            : document.createElement('a-image');
        imgAFRAME.setAttribute('position', `${ (9) + (index)} 2.54 -2.4ds`);
        imgAFRAME.setAttribute('color', '');
        if (existImg === null) {
            imgAFRAME.setAttribute('id', id + '-img');
            imgAFRAME.setAttribute('src', img.src);
            imgAFRAME.setAttribute('scale', '1 2.01 2');
            imgAFRAME.addEventListener("click", (e) => {
                e.preventDefault();
                this.onImgClick(id);
            });
            this
                .state
                .scene
                .appendChild(imgAFRAME);
        }

    }

    onImgClick(id) {
        this
            .state
            .ordem
            .push(id)
        if (this.state.pecas.indexOf(id) === this.state.passoMontagem) {
            this.setCorImagem('rgb(1, 255, 18)', id)
            if (this.state.passoMontagem === 0) 
                this.setBotoesMontagem();
            const el = document.getElementById(id + '-montagem');
            el.object3D.visible = true;
            this.setState({
                ...this.state,
                passoMontagem: this.state.passoMontagem + 1,
                acertos: this.state.acertos + 1
            });
            if (this.state.acertos === this.state.pecas.length) {
                this.animationMario();
                this.getAproveitamento();
            }
        } else {
            this.setCorImagem('rgb(255, 0, 0)', id)
            this.setState({
                ...this.state,
                erros: this.state.erros + 1
            })
        }
    }

    setCorImagem(cor, id) {
        const imgId = document.getElementById(id + '-img');
        imgId.setAttribute('color', cor);
        setTimeout(() => {
            imgId.setAttribute('color', '');
        }, 2000);
    }

    setProximoPasso = () => {
        this.count();
        let from = '0.6 0 1'
        let to = '0 0 0'
        this.atualizarPasso(from, to)
    }

    setPassoAnterior = () => {
        let from = '0 0 0'
        let to = '0.6 0 1'
        this.atualizarPasso(from, to, false);
        this.countSub();
    }

    enterVR = () => {
        let cursor = document.querySelector("#mycursor");
        cursor.setAttribute('cursor', 'rayOrigin: cursor; fuse: true;');
        cursor.object3D.visible = true;
        document
            .querySelector("#CameraPosition")
            .object3D
            .position
            .set(0, 0, 3.5);
        document
            .querySelector("#piso_1")
            .object3D
            .visible = true;
        document
            .querySelector("#piso_11")
            .object3D
            .visible = true;
        document
            .querySelector("#piso0")
            .object3D
            .visible = true;
        document
            .querySelector("#piso01")
            .object3D
            .visible = true;
        document
            .querySelector("#piso1")
            .object3D
            .visible = true;
        document
            .querySelector("#piso11")
            .object3D
            .visible = true;
        document
            .querySelector("#piso2")
            .object3D
            .visible = true;
        document
            .querySelector("#piso21")
            .object3D
            .visible = true;
        document
            .querySelector("#pisoImagem1")
            .object3D
            .visible = true;
        document
            .querySelector("#pisoImagem2")
            .object3D
            .visible = true;
        document
            .querySelector("#pisoImagem3")
            .object3D
            .visible = true;
        document
            .querySelector("#pisoImagem4")
            .object3D
            .visible = true;
        document
            .querySelector("#piso_luz1")
            .object3D
            .visible = true;
    }

    componentDidMount() {
        AFRAME.registerComponent('model-opacity', {
            schema: {
                default: 1.0
            },
            init: function () {
                this
                    .el
                    .addEventListener('model-loaded', this.update.bind(this));
            },
            update: function () {
                var mesh = this
                    .el
                    .getObject3D('mesh');
                var data = this.data;
                if (!mesh) {
                    return;
                }
                mesh
                    .traverse(function (node) {
                        if (node.isMesh) {
                            node.material.opacity = data;
                            node.material.transparent = data < 1.0;
                            node.material.needsUpdate = true;
                        }
                    });
            }
        });
        window.document.onreadystatechange = () => {
            if (document.readyState === "complete") {
                this.setPieces();
                this
                    .state
                    .scene
                    .addEventListener('enter-vr', () => this.enterVR())
            }
        }
        window.onload = () => {
            this.checkMobile();
        }
        const user = sessionStorage.getItem('user');
        console.log(user);
        this.setState({
            ...this.state,
            scene: document.getElementsByTagName('a-scene')[0],
            tras: document.getElementById('tras'),
            frente: document.getElementById('frente'),
            setaDireita: document.getElementById('setaDireita'),
            setaEsquerda: document.getElementById('setaEsquerda'),
            setaDireitaMontagem: document.getElementById('setaDireitaMontagem'),
            setaDireitaMontagem0: document.getElementById('setaDireitaMontagem0'),
            setaEsquerdaMontagem: document.getElementById('setaEsquerdaMontagem'),
            setaEsquerdaMontagem0: document.getElementById('setaEsquerdaMontagem0'),
            madeiraParedeMontagem: document.getElementById('moldura2'),
            alerta2: document.getElementById('alerta2')
        })
    }

    atualizarPasso(from, to, visible = true) {
        if (this.state.passo > 0) {
            const pecaAtual = this.state.pecas[this.state.passo - 1];
            let el = document.getElementById(pecaAtual);
            this.generateAttribute({id: pecaAtual, from, to})
            el.object3D.visible = visible;
        }
    }

    count = () => {
        this.setState({
            ...this.state,
            passo: this.state.passo >= this.state.pecas.length
                ? this.state.pecas.length
                : this.state.passo + 1
        })
    };

    countSub = () => {
        this.setState({
            ...this.state,
            passo: this.state.passo < 0
                ? 0
                : this.state.passo - 1
        })
    };

    render() {
        return (
            <Scene shadow="type: pcf">
                <a-entity id="rig" position="10 -0.5 3">
                    <a-camera id="camera"></a-camera>
                </a-entity>
                <Entity
                    primitive='a-entity'
                    id="ambiente"
                    position="6.5 0 0"
                    environment="preset:  starry;
                      fog: 0.610;
                      groundColor:  #1f502;
                      grid: none;
                      dressing: trees;
                      dressingColor: #162c18;
                      ground: canyon;
                      active:  true;
                      groundTexture:  walkernoise;
                      groundColor: #021a00;
                      groundColor2: #032400;
                      lightPosition: -10.9 0 -4.4"/>
                <Entity
                    primitive='a-entity'
                    id="light1"
                    light="type: ambient; intensity: 0.170;"
                    visible="True"/>
                <Entity
                    primitive='a-entity'
                    id="light2"
                    light="castShadow: true; color: #9e9e9e; groundColor: #ffffff; intensity: 0.5; shadowCameraNear: 0.38;
   shadowCameraBottom: -0.49; shadowRadius: 1.83; shadowCameraFar: 9.550"
                    scale="0.26 0.18 0.18"
                    position="-2.92 -0.0025 2.12328"
                    rotation="0 -9.83 0"/>

                <Entity
                    primitive='a-sphere'
                    id="poste_1"
                    color="green"
                    position="-16.70079 3.94793 0.6035"
                    rotation="-90 0 0"
                    scale="0.1 0.1 0.1"
                    visible=""
                    light="type: spot; intensity: 2.89; angle: 59.59; distance: 10.57; shadowCameraFar: 0.5; shadowCameraFov: -0.12; shadowCameraNear: 0; shadowCameraTop: 0; shadowCameraRight: 0; shadowCameraBottom: -9.95; shadowCameraLeft: 0"
                    material=""
                    geometry=""/>
                <Entity
                    primitive='a-entity'
                    id="poste_lampada1"
                    light="type: spot; intensity: 100; color: white; distance: 0.5; angle: 55.36"
                    position="-16.73724 3.65924 0.58546"
                    rotation="90 0 0"/>

                <Entity
                    primitive='a-sphere'
                    segments="50"
                    opacity="0.2"
                    color="#f9ffda"
                    position="-2.7 4.3 2.5"
                    rotation="-90 0 0"
                    scale="1 1 1"
                    visible="true"/>
                <Entity
                    primitive='a-sphere'
                    opacity="0.1"
                    color="white"
                    position="-2.7 4.3 2.5"
                    rotation="-90 0 0"
                    scale="1.8 1.8 1.8"
                    visible="true"/>
                <Entity
                    primitive='a-sphere'
                    id="lampada1"
                    color="white"
                    position="-2.7 4.3 2.5"
                    rotation="-90 0 0"
                    scale="0.1 0.1 0.1"
                    visible="true"
                    light="type: spot; color: #FFF; intensity: 0.54; angle:30; penumbra:61.0;"/>
                <Entity
                    primitive='a-entity'
                    id="lampada1-0"
                    light="type: spot; intensity: 100; color: white; distance:0.5"
                    position="-2.8 4 2.5 "
                    rotation="90 0 0"/>

                <Entity
                    primitive='a-sphere'
                    segments="50"
                    color="#f9ffda"
                    opacity="0.2"
                    position="0.1 4.3 2.5"
                    rotation="-90 0 0"
                    scale="1 1 1"
                    visible="true"/>
                <Entity
                    primitive='a-sphere'
                    color="white"
                    opacity="0.1"
                    position="0.1 4.3 2.5"
                    rotation="-90 0 0"
                    scale="1.8 1.8 1.8"
                    visible="true"/>
                <Entity
                    primitive='a-sphere'
                    color="white"
                    position="0.1 4.3 2.5"
                    rotation="-90 0 0"
                    scale="0.1 0.1 0.1"
                    visible="true"
                    light="type: spot; color: #FFF; intensity: 0.54; angle:30;penumbra:61.0;"/>
                <Entity
                    primitive='a-entity'
                    light="type: spot; intensity: 100; color: white; distance:0.5"
                    position="0 4 2.5 "
                    rotation="90 0 0"/>

                <Entity
                    primitive='a-sphere'
                    segments="50"
                    color="#f9ffda"
                    opacity="0.2"
                    position="3.2 4.3 2.5"
                    rotation="-90 0 0"
                    scale="1 1 1"
                    visible="true"/>
                <Entity
                    primitive='a-sphere'
                    color="white"
                    opacity="0.1"
                    position="3.2 4.3 2.5"
                    rotation="-90 0 0"
                    scale="1.8 1.8 1.8"
                    visible="true"/>
                <Entity
                    primitive='a-sphere'
                    color="white"
                    position="3.2 4.3 2.5"
                    rotation="-90 0 0"
                    scale="0.1 0.1 0.1"
                    visible="true"
                    light="type: spot; color: #FFF; intensity: 0.54; angle:30;penumbra:61.0;"/>
                <Entity
                    primitive='a-entity'
                    light="type: spot; intensity: 100; color: white; distance:0.5"
                    position="3.2 4 2.5 "
                    rotation="90 0 0"/>

                <Entity
                    primitive='a-sphere'
                    segments="50"
                    color="#f9ffda"
                    opacity="0.2"
                    position="6.5 4.3 2.5"
                    rotation="-90 0 0"
                    scale="1 1 1"
                    visible="true"/>
                <Entity
                    primitive='a-sphere'
                    color="white"
                    opacity="0.1"
                    position="6.5 4.3 2.5"
                    rotation="-90 0 0"
                    scale="1.8 1.8 1.8"
                    visible="true"/>
                <Entity
                    primitive='a-sphere'
                    color="white"
                    position="6.5 4.3 2.5"
                    rotation="-90 0 0"
                    scale="0.1 0.1 0.1"
                    visible="true"
                    light="type: spot; color: #FFF; intensity: 0.54; angle:30;penumbra:61.0"/>
                <Entity
                    primitive='a-entity'
                    light="type: spot; intensity: 100; color: white; distance:0.5"
                    position="6.5 4 2.5 "
                    rotation="90 0 0"/>

                <Entity
                    primitive='a-sphere'
                    segments="50"
                    color="#f9ffda"
                    opacity="0.2"
                    position="9.7 4.3 2.5"
                    rotation="-90 0 0"
                    scale="1 1 1"
                    visible="true"/>
                <Entity
                    primitive='a-sphere'
                    color="white"
                    opacity="0.1"
                    position="9.7 4.3 2.5"
                    rotation="-90 0 0"
                    scale="1.8 1.8 1.8"
                    visible="true"/>
                <Entity
                    primitive='a-sphere'
                    color="white"
                    position="9.7 4.3 2.5"
                    rotation="-90 0 0"
                    scale="0.1 0.1 0.1"
                    visible="true"
                    light="type: spot; color: #FFF; intensity: 0.54; angle:30;penumbra:61.0;"/>
                <Entity
                    primitive='a-entity'
                    light="type: spot; intensity: 100; color: white; distance:0.5"
                    position="9.7 4 2.5 "
                    rotation="90 0 0"/>

                <img
                    alt=""
                    id="img1"
                    crossOrigin=""
                    src="https://images-na.ssl-images-amazon.com/images/I/71dIGcFhMIL._AC_SL1001_.jpg"/>
                <img
                    id="img2"
                    crossOrigin=""
                    alt=""
                    src="https://t3.ftcdn.net/jpg/01/99/33/12/240_F_199331210_yNekHPBgSlsA9VdVbj4aO0PU1dMWijpW.jpg"/>
                <Entity
                    primitive='a-image'
                    look-at="#player1"
                    id="image1"
                    src="#img1"
                    scale="1.520 2 2"
                    transparent="true"
                    position="1.52 2.54 -2.54"
                    visible="true"
                    width="2"/>
                <Entity
                    primitive='a-image'
                    look-at="#player2"
                    id="image2"
                    src="#img2"
                    scale="3.02 2.02 1.650"
                    transparent="true"
                    position="1.51 2.53 -2.56"
                    visible="false"/>
                <img
                    id="pisoImg1"
                    crossOrigin=""
                    alt=""
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/Piso%20imagem/passos.png"/>
                <img
                    id="pisoImg2"
                    crossOrigin=""
                    alt=""
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/Piso%20imagem/passos2.png"/>

                <Entity
                    primitive='a-image'
                    look-at="#player1"
                    id="pisoImagem2"
                    src="#pisoImg1"
                    scale="0.89 0.39 1.81"
                    transparent="true"
                    position=".33298 0.20542 2.98036"
                    visible="false"
                    width="2"
                    material="side: back; wireframeLinewidth: 20"
                    geometry=""
                    rotation="90 0 0"/>

                <Entity
                    primitive='a-image'
                    look-at="#player2"
                    id="pisoImagem1"
                    src="#pisoImg2"
                    scale="0.43 0.34 1.81"
                    transparent="true"
                    position="6.47611 0.20542 2.96398"
                    visible="false"
                    width="2"
                    material="side: back; wireframeLinewidth: 20"
                    geometry=""
                    rotation="90 0 0"/>

                <Entity
                    primitive='a-image'
                    look-at="#player1"
                    id="pisoImagem3"
                    src="#pisoImg1"
                    scale="0.89 0.39 1.81"
                    transparent="true"
                    position="3.23674 0.20542 2.98036"
                    visible="false"
                    width="2"
                    material="side: back; wireframeLinewidth: 20"
                    geometry=""
                    rotation="90 0 0"/>

                <Entity
                    primitive='a-image'
                    look-at="#player2"
                    id="pisoImagem4"
                    src="#pisoImg2"
                    scale="0.43 0.34 1.81"
                    transparent="true"
                    position="1.20136 0.20542 2.96398"
                    visible="false"
                    width="2"
                    material="side: back; wireframeLinewidth: 20"
                    geometry=""
                    rotation="90 0 0"/>

                <Entity
                    primitive='a-gltf-model'
                    id="alerta2"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/alerta_selecao.gltf"
                    position="10.46186 -0.0378 -2.63003"
                    visible="false"
                    model-opacity="1"
                    animation="property: model-opacity; to: 0.0; loop:4; dur: 1000"
                    scale="3.22 0.99 1.36"/>

                <a-assets>
                    <a-asset-item
                        id="tablado"
                        src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/tablado3-11.gltf"
                        position="0 0 0"
                        rotation="0 0 0"
                        scale="1 1 1"
                        visible="true"></a-asset-item>
                    <a-asset-item
                        static-body
                        id="hangar"
                        src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/Hangar.0.9.gltf"
                        rotation="0 0 0"
                        scale="1 1 1"
                        visible="true"></a-asset-item>
                    <a-asset-item
                        id="hangarPiso"
                        src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/hangar-PISO2.gltf"
                        scale="1 1 1"
                        visible="true"></a-asset-item>
                    <a-asset-item
                        id="hangarViga"
                        src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/Estrutura-vigas.gltf"
                        scale="1 1 1"
                        visible="true"></a-asset-item>

                </a-assets>

                <Entity
                    primitive='a-gltf-model'
                    src="#tablado"
                    shadow="cast: true;"
                    position="0 0.1 0"/>
                <Entity
                    primitive='a-gltf-model'
                    src="#tablado"
                    shadow="cast: false;"
                    position="10 0.1 0"/>
                <Entity
                    primitive='a-gltf-model'
                    src="#hangar"
                    shadow="cast: false;"
                    position="0 0.1 0"/>
                <Entity
                    primitive='a-gltf-model'
                    src="#hangarPiso"
                    shadow="cast: false;"
                    position="0 0.1 0"/>
                <Entity
                    primitive='a-gltf-model'
                    src="#hangarViga"
                    shadow="cast: true;"
                    position="0 0.1 0"/>

                <Entity
                    primitive='a-gltf-model'
                    id="trolley"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/trolley.01.gltf"
                    position="0 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"
                    shadow="cast: true"/>

                <Entity
                    primitive='a-gltf-model'
                    id="portatrolley"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/PORTAtrolley.01.gltf"
                    position="0 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"/>

                <Entity
                    primitive='a-gltf-model'
                    id="moldura"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/moldura-1.gltf"
                    visible="true"
                    position="0 0 0"
                    shadow="cast: false"/>

                <Entity
                    primitive='a-gltf-model'
                    id="moldura2"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/moldura-1.gltf"
                    visible="false"
                    position="10 0 0"
                    scale="1 1 1"
                    shadow="cast: false"/>

                <Entity
                    primitive='a-gltf-model'
                    id="extintor"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/extintor.gltf"
                    visible=""
                    position="-2.92379 0.34635 8.70807"
                    shadow="cast: false"
                    scale="1.13 1.03 1.13"/>

                <Entity
                    primitive='a-gltf-model'
                    id="cidade"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/cidade.gltf"
                    position="22.76 0.464 -3.468"/>

                <Entity
                    primitive='a-gltf-model'
                    id="poste-luz"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/poste-lampada.gltf"
                    position="-16.10168 0.464 2.23248"
                    rotation="0 90 0"/>

                <Entity
                    primitive='a-gltf-model'
                    id="Lampada1"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/lampara1.gltf"
                    position="0 0 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"/>

                <Entity
                    primitive='a-gltf-model'
                    id="Lampada2"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/lampara2.gltf"
                    position="0 0 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"/>

                <Entity
                    primitive='a-gltf-model'
                    id="Lampada3"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/lampara3.gltf"
                    position="0 0 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"/>

                <Entity
                    primitive='a-gltf-model'
                    id="Lampada4"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/lampara4.gltf"
                    position="0 0 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"/>

                <Entity
                    primitive='a-gltf-model'
                    id="Lampada5"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/lampara5.gltf"
                    position="0 0 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"/>

                <Entity
                    primitive='a-gltf-model'
                    id="painelApresentacao"
                    src="https://raw.githubusercontent.com/giraudgabriel/Latecoere-VR/feature/Modelagem_3D_cen%C3%A1rio/Tv_3D/scene.gltf"
                    position="10.15 0.4 1.2"
                    rotation="-30 0 0"
                    scale="0.01 0.01 0.01"
                    visible="true"/>
                <Entity
                    primitive='a-image'
                    id="imagemPainelApresentacao"
                    position="10.15 0.41 1.2"
                    rotation="-30 0 0"
                    color="blue"
                    scale="0.55 0.315 0"
                    visible="true"/>

                <Entity
                    primitive='a-gltf-model'
                    id="setaEsquerdaMontagem"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/arrow-left.gltf"
                    position="10 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    events={{
                    click: () => this.virarPraEsquerda('-montagem')
                }}
                    visible="false"/>
                <Entity
                    primitive='a-gltf-model'
                    id="setaEsquerdaMontagem0"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/arrow-left0.gltf"
                    position="10 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="false"
                    shadow="cast: true;"/>
                <Entity
                    primitive='a-gltf-model'
                    id="setaDireitaMontagem"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/arrow-right.gltf"
                    position="10.1 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="false"
                    events={{
                    click: () => this.virarPraDireita('-montagem')
                }}/>
                <Entity
                    primitive='a-gltf-model'
                    id="setaDireitaMontagem0"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/arrow-right0.gltf"
                    position="10.1 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="false"
                    shadow="cast: true;"/>

                <Entity
                    primitive='a-gltf-model'
                    id="setaEsquerda"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/arrow-left.gltf"
                    position="0 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    events={{
                    click: () => this.virarPraEsquerda()
                }}
                    visible="true"/>
                <Entity
                    primitive='a-gltf-model'
                    id="setaEsquerda0"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/arrow-left0.gltf"
                    position="0 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"
                    shadow="cast: true;"/>
                <Entity
                    primitive='a-gltf-model'
                    id="setaDireita"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/arrow-right.gltf"
                    position="0 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"
                    events={{
                    click: () => this.virarPraDireita()
                }}/>

                <Entity
                    primitive='a-gltf-model'
                    id="setaDireita0"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/arrow-right0.gltf"
                    position="0 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"
                    shadow="cast: true;"/>

                <Entity
                    primitive='a-gltf-model'
                    id="tras"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/atras.gltf"
                    position="0 0.1 0"
                    rotation="0 0 0"
                    events={{
                    click: this.setPassoAnterior
                }}
                    scale="1 1 1"
                    visible="true"/>
                <Entity
                    primitive='a-gltf-model'
                    id="tras0"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/atras0.gltf"
                    position="0 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"
                    shadow="cast: true;"/>

                <Entity
                    primitive='a-gltf-model'
                    id="frente"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/frente.gltf"
                    position="0 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    events={{
                    click: this.setProximoPasso
                }}
                    visible="true"/>
                <Entity
                    primitive='a-gltf-model'
                    id="frente0"
                    src="https://raw.githubusercontent.com/KurtRodrigues/Project01/master/modelos%203D%20Porta%20avi%C3%A3o/frente0.gltf"
                    position="0 0.1 0"
                    rotation="0 0 0"
                    scale="1 1 1"
                    visible="true"
                    shadow="cast: true;"/>

                <Entity
                    primitive='a-entity'
                    class="clickable"
                    id="piso_1"
                    geometry="primitive: cylinder"
                    material="color: #ff3b3b ;opacity: 0.4; transparent: true"
                    visible="false"
                    position="-5 0.1 3"
                    scale="0.2 0.2 0.2"
                    rotation="0 0 0"
                    animation="property: material.color; to: #fdff75; dur: 1050; easing: easeInQuad; loop:true; visible:true"/>
                <Entity
                    primitive='a-entity'
                    class="clickable"
                    id="piso_11"
                    geometry="primitive: cylinder; radius: 0.74"
                    material="color: #aeaeae; opacity: 1; transparent: false"
                    position="-4.99541 -0.00108 2.99187"
                    visible="false"
                    scale="0.4 0.4 0.38"
                    rotation=""/>
                <Entity
                    primitive='a-entity'
                    class="clickable"
                    id="piso0"
                    geometry="primitive: cylinder"
                    material="color: #ff3b3b;opacity: 0.4; transparent: true"
                    position="0 0.1 3"
                    visible="false"
                    scale="0.2 0.2 0.2"
                    rotation="0 0 0"
                    animation="property: material.color; to: #f7fe96; dur: 1050; easing: easeInQuad; loop:true"/>
                <Entity
                    primitive='a-entity'
                    class="clickable"
                    visible="false"
                    id="piso01"
                    geometry="primitive: cylinder; radius: 0.74"
                    material="color: #aeaeae; opacity: 1; transparent: false"
                    position="0 -0.00108 3"
                    scale="0.4 0.4 0.38"
                    rotation=""/>
                <Entity
                    primitive='a-entity'
                    class="clickable"
                    visible="false"
                    id="piso1"
                    geometry="primitive: cylinder"
                    material="color: #ff3b3b;opacity: 0.4; transparent: true"
                    position="5 0.1 3"
                    scale="0.2 0.2 0.2"
                    rotation="0 0 0"
                    animation="property: material.color; to: #f7fe96; dur: 1050; easing: easeInQuad; loop:true"/>
                <Entity
                    primitive='a-entity'
                    class="clickable"
                    visible="false"
                    id="piso11"
                    geometry="primitive: cylinder; radius: 0.74"
                    material="color: #aeaeae; opacity: 1; transparent: false"
                    position="5 -0.00108 3"
                    scale="0.4 0.4 0.38"
                    rotation=""/>

                <Entity
                    primitive='a-entity'
                    class="clickable"
                    visible="true"
                    id="piso2"
                    geometry="primitive: cylinder"
                    material="color: #ff3b3b; opacity: 0.4; transparent: true"
                    position="10.01742 0.1 3"
                    scale="0.2 0.2 0.2"
                    rotation=""
                    animation="property: material.color; to: #f7fe96; dur: 1050; loop: true"/>

                <Entity
                    primitive='a-entity'
                    class="clickable"
                    visible="false"
                    id="piso21"
                    geometry="primitive: cylinder; radius: 0.74"
                    material="color: #aeaeae; opacity: 1; transparent: false"
                    position="10 -0.00108 3"
                    scale="0.4 0.4 0.38"
                    rotation=""/>

                <Entity
                    primitive='a-entity'
                    id="piso_luz1"
                    visible="false"
                    light="type: spot; intensity: 1.03; color: white; distance: 0.51; angle: 54.41"
                    position="-5.00383 0.55998 2.98832"
                    rotation="-90 0 0"/>
            </Scene>
        );
    }
}

export default VRScene;