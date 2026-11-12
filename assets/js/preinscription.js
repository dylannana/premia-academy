/* =========================================================
   PREMIA ACADEMY - preinscription.js
   Vérification du formulaire + envoi par WhatsApp
   ========================================================= */
(function () {
  'use strict';

  var NUMERO_WHATSAPP = '237683857126';
  var form = document.getElementById('form-preinscription');
  if (!form) return;

  var champs = {
    eleve: document.getElementById('nom-eleve'),
    classe: document.getElementById('classe'),
    etablissement: document.getElementById('etablissement'),
    parent: document.getElementById('nom-parent'),
    telephone: document.getElementById('telephone'),
    consentement: document.getElementById('consentement')
  };

  // Si on arrive depuis la page Formations (?classe=3eme), on présélectionne la classe
  var classeUrl = new URLSearchParams(window.location.search).get('classe');
  if (classeUrl) {
    for (var i = 0; i < champs.classe.options.length; i++) {
      if (champs.classe.options[i].value === classeUrl) {
        champs.classe.value = classeUrl;
        break;
      }
    }
  }

  // Affiche ou efface le message d'erreur d'un champ. Renvoie true si le champ est valide.
  function signaler(champ, message) {
    var zone = document.getElementById('err-' + champ.id);
    zone.textContent = message || '';
    if (message) { champ.setAttribute('aria-invalid', 'true'); }
    else { champ.removeAttribute('aria-invalid'); }
    return !message;
  }

  // Nettoie un numéro : retire espaces, points, tirets et indicatif +237
  function nettoyerTelephone(valeur) {
    return valeur.replace(/[\s.\-]/g, '').replace(/^(\+237|00237|237)/, '');
  }

  function verifier() {
    var ok = true;
    ok = signaler(champs.eleve, champs.eleve.value.trim().length < 3
      ? "Merci d'indiquer le nom complet de l'élève." : '') && ok;
    ok = signaler(champs.classe, champs.classe.value === ''
      ? 'Merci de choisir une classe.' : '') && ok;
    ok = signaler(champs.parent, champs.parent.value.trim().length < 3
      ? 'Merci d\'indiquer le nom du parent ou tuteur.' : '') && ok;
    ok = signaler(champs.telephone, /^[26]\d{8}$/.test(nettoyerTelephone(champs.telephone.value))
      ? '' : 'Numéro invalide. Exemple : 677 123 456') && ok;
    ok = signaler(champs.consentement, champs.consentement.checked
      ? '' : 'Merci de cocher cette case pour continuer.') && ok;
    return ok;
  }

  // On efface l'erreur dès que l'utilisateur corrige le champ
  Object.keys(champs).forEach(function (cle) {
    ['input', 'change'].forEach(function (evt) {
      champs[cle].addEventListener(evt, function () { signaler(champs[cle], ''); });
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!verifier()) {
      var premiere = form.querySelector('[aria-invalid="true"]');
      if (premiere) premiere.focus();
      return;
    }

    var classeTexte = champs.classe.options[champs.classe.selectedIndex].text;
    var lignes = [
      'Bonjour PREMIA ACADEMY, je souhaite préinscrire mon enfant.',
      '',
      'Élève : ' + champs.eleve.value.trim(),
      'Classe : ' + classeTexte
    ];
    if (champs.etablissement.value.trim()) {
      lignes.push('Établissement actuel : ' + champs.etablissement.value.trim());
    }
    lignes.push('Parent : ' + champs.parent.value.trim());
    lignes.push('Téléphone : ' + nettoyerTelephone(champs.telephone.value));

    window.location.href = 'https://wa.me/' + NUMERO_WHATSAPP +
      '?text=' + encodeURIComponent(lignes.join('\n'));
  });
})();