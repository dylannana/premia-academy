/* =========================================================
   PREMIA ACADEMY - main.js
   Menu de navigation mobile (burger)
   ========================================================= */
(function () {
  'use strict';

  var bouton = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu-principal');
  if (!bouton || !menu) return;

  // Ouvre ou ferme le menu, et met à jour les attributs d'accessibilité
  function afficherMenu(ouvert) {
    menu.classList.toggle('is-open', ouvert);
    bouton.setAttribute('aria-expanded', String(ouvert));
    bouton.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
  }

  // Clic sur le burger : bascule ouvert / fermé
  bouton.addEventListener('click', function () {
    afficherMenu(bouton.getAttribute('aria-expanded') !== 'true');
  });

  // Clic sur un lien du menu : on referme
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) afficherMenu(false);
  });

  // Clic en dehors de l'en-tête : on referme
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.site-header')) afficherMenu(false);
  });

  // Touche Échap : on referme et on rend le focus au burger
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && bouton.getAttribute('aria-expanded') === 'true') {
      afficherMenu(false);
      bouton.focus();
    }
  });

  // Passage en écran large (≥ 900 px) : on remet le menu à zéro
  window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) {
    if (e.matches) afficherMenu(false);
  });
})();

const ecole = document.getElementById('ecole');
const ecoleAutre = document.getElementById('ecole-autre');

if (ecole && ecoleAutre) {
  ecole.addEventListener('change', () => {
    const autre = ecole.value === 'autre';
    ecoleAutre.hidden = !autre;
    ecoleAutre.required = autre;
    if (!autre) ecoleAutre.value = '';
  });
}