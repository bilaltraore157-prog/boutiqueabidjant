console.log("Le fichier admin.js est bien chargé !");

document.getElementById('add-phone-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Bouton cliqué, traitement des images...");

    const photoInput = document.getElementById('phone-photo');
    const imagesArray = [];
    let filesLoaded = 0;

    // On récupère les autres valeurs du formulaire
    const modele = document.getElementById('phone-model').value;
    const prix = document.getElementById('phone-price').value;
    const description = document.getElementById('phone-desc').value;
    const condition = document.querySelector('input[name="condition"]:checked').value;

    // Fonction pour sauvegarder quand toutes les photos sont prêtes
   async function publierProduit() {
    const modele = document.getElementById('modele').value;
    const prix = document.getElementById('prix').value;
    const description = document.getElementById('description').value;
    const condition = document.querySelector('input[name="etat"]:checked').value;
    const imageFiles = document.getElementById('product-images').files;

    if (imageFiles.length === 0) {
        alert("Veuillez ajouter au moins une photo !");
        return;
    }

    // Cette partie transforme TOUTES les images en un tableau
    const imagesPromises = Array.from(imageFiles).map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    });

    const imagesBase64 = await Promise.all(imagesPromises);

    const nouveauProduit = {
        id: Date.now(),
        modele: modele,
        prix: prix,
        description: description,
        condition: condition,
        images: imagesBase64 // On enregistre le tableau de photos
    };

    // Sauvegarde dans le LocalStorage
    let stock = JSON.parse(localStorage.getItem('stock_iphones')) || [];
    stock.push(nouveauProduit);
    localStorage.setItem('stock_iphones', JSON.stringify(stock));

    alert("L'iPhone est publié avec ses " + imageFiles.length + " photos !");
    window.location.href = "index.html";
}