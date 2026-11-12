/* =========================================================
   PREMIA ACADEMY - gallery.js
   Agrandissement des photos de la galerie
   ========================================================= */
(function () {
  'use strict';

  var boite = document.getElementById('lightbox');
  if (!boite || typeof boite.showModal !== 'function') return;

  var image = document.getElementById('lightbox-img');
  var legende = document.getElementById('lightbox-legende');
  var fermer = boite.querySelector('.lightbox-close');

  // Clic sur une vignette : on affiche la grande photo
  document.querySelectorAll('[data-grand]').forEach(function (vignette) {
    vignette.addEventListener('click', function () {
      var texte = vignette.getAttribute('data-legende') || '';
      image.src = vignette.getAttribute('data-grand');
      image.alt = texte;
      legende.textContent = texte;
      boite.showModal();
    });
  });

  // Fermeture : bouton, clic à l'extérieur de la photo (la touche Échap fonctionne d'office)
  fermer.addEventListener('click', function () { boite.close(); });
  boite.addEventListener('click', function (e) {
    if (e.target === boite) boite.close();
  });
  boite.addEventListener('close', function () { image.removeAttribute('src'); });
})();