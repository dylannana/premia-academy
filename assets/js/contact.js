/* =========================================================
   PREMIA ACADEMY - contact.js
   Vérification du formulaire de contact + envoi par WhatsApp
   ========================================================= */
(function () {
  'use strict';

  var NUMERO_WHATSAPP = '237683857126';
  var form = document.getElementById('form-contact');
  if (!form) return;

  var champs = {
    nom: document.getElementById('nom'),
    telephone: document.getElementById('telephone'),
    message: document.getElementById('message'),
    consentement: document.getElementById('consentement')
  };

  function signaler(champ, message) {
    var zone = document.getElementById('err-' + champ.id);
    zone.textContent = message || '';
    if (message) { champ.setAttribute('aria-invalid', 'true'); }
    else { champ.removeAttribute('aria-invalid'); }
    return !message;
  }

  function nettoyerTelephone(valeur) {
    return valeur.replace(/[\s.\-]/g, '').replace(/^(\+237|00237|237)/, '');
  }

  function verifier() {
    var ok = true;
    ok = signaler(champs.nom, champs.nom.value.trim().length < 3
      ? 'Merci d\'indiquer votre nom.' : '') && ok;
    ok = signaler(champs.telephone, /^[26]\d{8}$/.test(nettoyerTelephone(champs.telephone.value))
      ? '' : 'Numéro invalide. Exemple : 677 123 456') && ok;
    ok = signaler(champs.message, champs.message.value.trim().length < 10
      ? 'Votre message est trop court (10 caractères minimum).' : '') && ok;
    ok = signaler(champs.consentement, champs.consentement.checked
      ? '' : 'Merci de cocher cette case pour continuer.') && ok;
    return ok;
  }

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

    var texte = [
      'Bonjour PREMIA ACADEMY, je vous contacte depuis votre site.',
      '',
      'Nom : ' + champs.nom.value.trim(),
      'Téléphone : ' + nettoyerTelephone(champs.telephone.value),
      '',
      champs.message.value.trim()
    ].join('\n');

    window.location.href = 'https://wa.me/' + NUMERO_WHATSAPP +
      '?text=' + encodeURIComponent(texte);
  });
})();