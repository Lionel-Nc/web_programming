
let commandPreviouData = [];
const recapitulatif = document.querySelector('.recapitulatif');
const form = document.querySelector('.js-form-command');
const formSteps = document.querySelectorAll('.form-steps li');

const recapitulatifItem = (data) => {
    return `<li class="recapitulatif-item">
        <p>Article: ${data.command.typepass}</p>
        <span>Adultes: ${data.command.nbadultes} | Enfants: ${data.command.nbenfants}</span>
    </li>`;
}

const commandForm = () => {
    return `<div id="commande">
        <h2>Commande</h2>
        <div class="content-input">
        <label for="typepass">Type de pass: </label>
        <select class="input" id="typepass" name="typepass" required>
            <option value="PassIDF n°1">PassIDF n°1</option>
            <option value="PassIDF n°2">PassIDF n°2</option>
            <option value="PassIDF n°3">PassIDF n°12</option>
        </select>
        </div>

        <div class="content-input">
        <label for="nbadultes">Adultes: </label>
        <select class="input" id="nbadultes" name="nbadultes" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="content-input">
        <label for="nbenfants">Enfants: </label>
        <select class="input" id="nbenfants" name="nbenfants" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="content-input">
        <label for="date"> Date : </label>
        <input class="input" type="date" id="date" name="date" required>
        </div>

        <span class="error">
        <p id="ajout_error"> </p>
        </span>

        <div class="content-buttons">
        <button type="reset">Supprimer</button>
        <button type="submit">suivant</button>
        </div>
    </div>`;
}

const personnellesForm = () => {
    return `<div id="personnelles">
        <h2> Informations personnelles</h2>
        <div class="content-input">
            <label for="nom">Nom: </label>
            <input type="text" class="input" id="nom" name="nom" placeholder="Votre nom" required>
        </div>

        <div class="content-input">
            <label for="prenom">Prénom: </label>
            <input type="text" class="input" id="prenom" name="prenom" placeholder="Votre prénom" required>
        </div>

        <div class="content-input">
            <label for="adresse">Adresse: </label>
            <input type="text" class="input" id="adresse" name="adresse" placeholder="Votre adresse" required>
        </div>

        <div class="content-input">
            <label for="telephone">Téléphone: </label>
            <input type="number" class="input" id="telephone" name="telephone" placeholder="Votre téléphone" required>
        </div>

        <div class="content-input">
            <label for="email">Email: </label>
            <input type="email" class="input" id="email" name="email" placeholder="Votre email" required>
        </div>

        <span class="error">
            <p id="ajout_error"> </p>
        </span>

        <div class="content-buttons">
            <button type="button" onclick="resetForm()">Precedent</button>
            <button type="submit">Ajouter</button>
        </div>
    </div>`;
}

const paiementForm = () => {
    return `<div id="paiement">
        <h2>Paiement</h2>
        <div class="content-buttons">
            <button type="button" onclick="resetForm()">Nouvelle article</button>
            <button type="submit">Payer maintenant</button>
        </div>
    </div>`;
}

const serializeForm = form => {
    var obj = {};
    var formData = new FormData(form);
    for (var key of formData.keys()) {
        obj[key] = formData.get(key);
    }
    return obj;
};

const random = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
};

const activeStep = activeKey => {

    formSteps.forEach((formStep, key) => {

        if (formStep.classList.contains('active')) {

            formStep.classList.remove('active');
        }

        if (key == activeKey) {

            formStep.classList.add('active');
        }
    })
}

form.addEventListener('submit', e => {

    e.preventDefault();
    if (form.classList.contains('js-command')) {

        activeStep(1);
        const randomKey = random();
        commandPreviouData[randomKey] = {
            "command": serializeForm(form),
            "personnel": null
        };
        form.innerHTML = personnellesForm();
        form.classList.remove('js-command');
        form.classList.add('js-personnelles');
        form.dataset.id = randomKey;
    } else if (form.classList.contains('js-personnelles')) {

        const formId = form.dataset.id;
        if (!commandPreviouData[formId]) {
            alert('Erreur dans le formulaire.');
            return false;
        }

        activeStep(2);
        commandPreviouData[formId].personnel = serializeForm(form);
        form.classList.remove('js-personnelles');
        form.classList.add('js-paiement');
        form.innerHTML = paiementForm();
        recapitulatif.innerHTML += recapitulatifItem(commandPreviouData[formId]);
        document.querySelector('.total-amount span').innerText = Object.keys(commandPreviouData).length;
    } else if (form.classList.contains('js-paiement')) {
        
        const formId = form.dataset.id;
        if (!commandPreviouData[formId]) {

            alert('Erreur dans le formulaire.');
            return false;
        }

        window.location.href = 'paiement.html?id=' + formId
    }
});

function resetForm() {
    form.innerHTML = commandForm();
    form.classList.add('js-command');
    form.classList.remove('js-personnelles');
    form.classList.remove('js-paiement');
    form.dataset.id = '';
    activeStep(0);
}