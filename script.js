/* ==========================================================
   CONFIGURAÇÕES
========================================================== */

// ❤️ ALTERE PARA A DATA EM QUE VOCÊS COMEÇARAM A NAMORAR

const dataNamoro = new Date(
    2026,
    0,
    2,
    23,
    0,
    0
);

// Lembre-se:
// Janeiro = 0
// Fevereiro = 1
// Março = 2
// Abril = 3
// ...

/* ==========================================================
   ELEMENTOS
========================================================== */

const yearsElement = document.getElementById("years");

const monthsElement = document.getElementById("months");

const daysElement = document.getElementById("days");

const hoursElement = document.getElementById("hours");

const minutesElement = document.getElementById("minutes");

const secondsElement = document.getElementById("seconds");

const quoteText = document.getElementById("quoteText");

/* ==========================================================
   FRASES
========================================================== */

const frases = [

    "O melhor lugar do mundo sempre será onde estivermos juntos. ❤️",

    "Você é a minha pessoa favorita em todos os universos.",

    "Cada segundo ao seu lado vale mais que uma vida inteira.",

    "Se eu pudesse escolher novamente, escolheria você todas as vezes.",

    "Nosso amor transforma dias comuns em lembranças inesquecíveis.",

    "Meu lugar favorito sempre será ao seu lado.",

    "Você é a melhor parte dos meus dias.",

    "Amar você foi a decisão mais bonita da minha vida.",

    "Mesmo depois de milhares de dias, continuarei me apaixonando por você.",

    "Você é meu presente favorito e meu futuro preferido."

];

/* ==========================================================
   FRASE ALEATÓRIA
========================================================== */

function trocarFrase(){

    if(!quoteText) return;

    const indice = Math.floor(

        Math.random() * frases.length

    );

    quoteText.textContent = frases[indice];

}

// primeira frase

trocarFrase();

// troca a cada 20 segundos

setInterval(

    trocarFrase,

    20000

);

/* ==========================================================
   CONTADOR
========================================================== */

function atualizarContador(){

    const agora = new Date();

    let anos = agora.getFullYear() - dataNamoro.getFullYear();

    let meses = agora.getMonth() - dataNamoro.getMonth();

    let dias = agora.getDate() - dataNamoro.getDate();

    if(dias < 0){

        meses--;

        const ultimoMes = new Date(

            agora.getFullYear(),

            agora.getMonth(),

            0

        );

        dias += ultimoMes.getDate();

    }

    if(meses < 0){

        anos--;

        meses += 12;

    }

    const diferenca = agora - dataNamoro;

    const horas = Math.floor(

        diferenca / 1000 / 60 / 60

    ) % 24;

    const minutos = Math.floor(

        diferenca / 1000 / 60

    ) % 60;

    const segundos = Math.floor(

        diferenca / 1000

    ) % 60;

    yearsElement.textContent =

        String(anos).padStart(2,"0");

    monthsElement.textContent =

        String(meses).padStart(2,"0");

    daysElement.textContent =

        String(dias).padStart(2,"0");

    hoursElement.textContent =

        String(horas).padStart(2,"0");

    minutesElement.textContent =

        String(minutos).padStart(2,"0");

    secondsElement.textContent =

        String(segundos).padStart(2,"0");

}

/* ==========================================================
   INICIAR
========================================================== */

atualizarContador();

setInterval(

    atualizarContador,

    1000

);

/* ==========================================================
   CARDS
========================================================== */

const cards = document.querySelectorAll(".menu-card");

/* ==========================================================
   ANIMAÇÃO DE ENTRADA
========================================================== */

const observer = new IntersectionObserver(

    (entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold:.15

    }

);

cards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateY(50px)";

    card.style.transition=`

        opacity .7s ease ${index*0.08}s,

        transform .7s ease ${index*0.08}s

    `;

    observer.observe(card);

});

const style=document.createElement("style");

style.textContent=`

.show{

    opacity:1 !important;

    transform:translateY(0) !important;

}

`;

document.head.appendChild(style);

/* ==========================================================
   RIPPLE
========================================================== */

cards.forEach(card=>{

    card.addEventListener("click",(event)=>{

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=card.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";

        ripple.style.height=size+"px";

        ripple.style.left=(event.clientX-rect.left-size/2)+"px";

        ripple.style.top=(event.clientY-rect.top-size/2)+"px";

        card.appendChild(ripple);

        ripple.addEventListener("animationend",()=>{

            ripple.remove();

        });

    });

});

const rippleStyle=document.createElement("style");

rippleStyle.textContent=`

.menu-card{

    position:relative;

    overflow:hidden;

}

.ripple{

    position:absolute;

    border-radius:50%;

    transform:scale(0);

    background:rgba(255,255,255,.35);

    animation:ripple .7s ease-out;

    pointer-events:none;

}

@keyframes ripple{

    to{

        transform:scale(3.5);

        opacity:0;

    }

}

`;

document.head.appendChild(rippleStyle);

/* ==========================================================
   TILT
========================================================== */

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        const rotateY=((x/rect.width)-0.5)*12;

        const rotateX=((y/rect.height)-0.5)*-12;

        card.style.transform=`

            perspective(900px)

            rotateX(${rotateX}deg)

            rotateY(${rotateY}deg)

            translateY(-8px)

        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});

/* ==========================================================
   CURSOR
========================================================== */

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transition="transform .2s";

    });

});

/* ==========================================================
   PARTÍCULAS
========================================================== */

const particles = document.querySelector(".particles");

if(particles){

    for(let i = 0; i < 40; i++){

        const particle = document.createElement("span");

        const size = Math.random() * 6 + 2;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.left = Math.random() * 100 + "%";

        particle.style.top = Math.random() * 100 + "%";

        particle.style.animationDuration =

            (Math.random() * 15 + 12) + "s";

        particle.style.animationDelay =

            (Math.random() * 10) + "s";

        particles.appendChild(particle);

    }

    const style = document.createElement("style");

    style.textContent = `

    .particles{

        position:absolute;

        inset:0;

        overflow:hidden;

    }

    .particles span{

        position:absolute;

        border-radius:50%;

        background:rgba(255,255,255,.18);

        filter:blur(.5px);

        animation:particleFloat linear infinite;

    }

    @keyframes particleFloat{

        from{

            transform:

                translateY(0)

                scale(1);

            opacity:0;

        }

        15%{

            opacity:1;

        }

        85%{

            opacity:1;

        }

        to{

            transform:

                translateY(-180px)

                scale(1.8);

            opacity:0;

        }

    }

    `;

    document.head.appendChild(style);

}

/* ==========================================================
   PARALLAX
========================================================== */

const background = document.querySelector(".background");

document.addEventListener("mousemove",(event)=>{

    if(!background) return;

    const x =

        (event.clientX / window.innerWidth - .5) * 18;

    const y =

        (event.clientY / window.innerHeight - .5) * 18;

    background.style.transform =

        `translate(${x}px,${y}px)`;

});

/* ==========================================================
   HERO
========================================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    if(!hero) return;

    hero.style.transform =

        `translateY(${window.scrollY * .15}px)`;

});

/* ==========================================================
   TÍTULO DA ABA
========================================================== */

const tituloOriginal = document.title;

let alternando = null;

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        alternando = setInterval(()=>{

            document.title =

            document.title === tituloOriginal

            ? "❤️ Volta pra mim ❤️"

            : tituloOriginal;

        },1500);

    }else{

        clearInterval(alternando);

        document.title = tituloOriginal;

    }

});

/* ==========================================================
   PRELOAD
========================================================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

/* ==========================================================
   CONSOLE
========================================================== */

console.clear();

console.log(

`%c
❤️ Nossa História ❤️

Feito com carinho.

James & Issara
`,

"color:#F5D78E;font-size:16px;font-weight:bold;"

);

/* ==========================================================
   FIM
========================================================== */