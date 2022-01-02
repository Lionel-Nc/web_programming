
const getCommandeInfos = () => {

    const storage = localStorage.getItem("commandesInfos");
    if (storage != null) {

        return JSON.parse(storage);
    } else {

        const commandesInfos = new Object();
        commandesInfos.commandes = new Array();
        commandesInfos.personnelles = null;
        return commandesInfos;
    }
    
};

let commandesInfos = getCommandeInfos();
const recapitulatif = document.querySelector('.recapitulatif');
const forms = document.querySelectorAll('form');
const resetStorage = document.querySelector('.js-reset-storage');

const recapitulatifItem = (data) => {
    return `<li class="recapitulatif-item">
        <p>Article: ${data.typepass}</p>
        <span>Adultes: ${data.nbadultes} | Enfants: ${data.nbenfants}</span>
    </li>`;
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

if (commandesInfos) {
    
    commandesInfos.commandes.forEach(commande => {

        recapitulatif.innerHTML += recapitulatifItem(commande[Object.keys(commande)[0]]);
    });

    document.querySelector('.total-amount span').innerText = Object.keys(commandesInfos.commandes).length;
    if (commandesInfos.personnelles) {

        Object.keys(commandesInfos.personnelles).forEach(key => {

            document.querySelector("[name=" + key + "]").value = commandesInfos.personnelles[key];
        });
    }
}

if (forms) {
    
    forms.forEach(form => {

        form.addEventListener('submit', e => {

            e.preventDefault();
            if (form.classList.contains('js-form-command')) {
                
                const randomKey = random();
                const data = serializeForm(form)
                const obj = new Object();
                obj[randomKey] = data;
                commandesInfos.commandes.push(obj);
                recapitulatif.innerHTML += recapitulatifItem(data);
                document.querySelector('.total-amount span').innerText = Object.keys(commandesInfos.commandes).length;
                localStorage.setItem("commandesInfos", JSON.stringify(commandesInfos));
            } else if (form.classList.contains('js-form-personnelles')) {

                const data = serializeForm(form)
                commandesInfos.personnelles = data;
                localStorage.setItem("commandesInfos", JSON.stringify(commandesInfos));
                console.log(commandesInfos);
                console.log(localStorage.getItem("commandesInfos"));
                window.location.href = 'paiement.html';
            }
        });
    });
}

if (resetStorage) {
    
    resetStorage.addEventListener('click', e => {

        e.preventDefault();
        localStorage.clear();
        recapitulatif.innerHTML = '';
        document.querySelector('.total-amount span').innerText = 0;
        commandesInfos = getCommandeInfos();
    })
}
