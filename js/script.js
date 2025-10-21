// Dados simulados de projetos (Etapa 3 pode trocar por fetch de JSON)
const projetos = [
{ id: 1, nome: 'Aulas de Reforço', causa: 'Educação', desc: 'Reforço escolar para crianças em vulnerabilidade.', vagas: 8 },
{ id: 2, nome: 'Mutirão de Plantio', causa: 'Meio ambiente', desc: 'Ação mensal de plantio de mudas nativas.', vagas: 20 },
{ id: 3, nome: 'Feira de Adoção', causa: 'Bem-estar animal', desc: 'Evento para adoção responsável de pets.', vagas: 12 },
];


function byId(id){ return document.getElementById(id); }
function setYear(){ const y = byId('year'); if (y) y.textContent = new Date().getFullYear(); }


function renderProjetos(filtro = ''){
const el = document.querySelector('#lista-projetos');
if (!el) return;
const q = filtro.trim().toLowerCase();
const itens = projetos.filter(p => !q || p.nome.toLowerCase().includes(q) || p.causa.toLowerCase().includes(q));
el.innerHTML = itens.map(p => `
<article class="project-card" tabindex="0">
<h3>${p.nome}</h3>
<span class="badge">${p.causa}</span>
<p>${p.desc}</p>
<small>Vagas: ${p.vagas}</small>
<button class="btn" aria-label="Tenho interesse em ${p.nome}">Tenho interesse</button>
</article>
`).join('');
}


function setupBusca(){
const bx = byId('buscar');
if (!bx) return;
renderProjetos('');
bx.addEventListener('input', () => renderProjetos(bx.value));
}


function validateForm(){
const form = byId('form-cadastro');
if (!form) return;
const status = byId('status');
const showError = (field, msg) => { field.parentElement.querySelector('.error').textContent = msg || ''; };


form.addEventListener('submit', (e) => {
e.preventDefault();
let ok = true;
const nome = byId('nome');
const email = byId('email');
const area = byId('area');


if (!nome.value.trim()) { ok = false; showError(nome, 'Informe seu nome'); } else showError(nome);
if (!/\S+@\S+\.\S+/.test(email.value)) { ok = false; showError(email, 'E-mail inválido'); } else showError(email);
if (!area.value) { ok = false; showError(area, 'Selecione uma área'); } else showError(area);


if (ok) {
status.textContent = 'Cadastro enviado! Em breve entraremos em contato.';
form.reset();
} else {
status.textContent = 'Verifique os campos em destaque.';
}
});
}


function init(){ setYear(); setupBusca(); validateForm(); }
document.addEventListener('DOMContentLoaded', init);