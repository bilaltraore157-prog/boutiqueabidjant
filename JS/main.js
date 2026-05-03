// 1. Chargement des produits au démarrage
window.onload = function() {
    const grilleProduits = document.querySelector('.product-grid');
    if (!grilleProduits) return;

    const produitsStockes = JSON.parse(localStorage.getItem('stock_iphones')) || [];

    produitsStockes.forEach(produit => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const classeBadge = (produit.condition === "Nouveau") ? "badge-nouveau" : "badge-occasion";
        const imagePrincipale = (Array.isArray(produit.images)) ? produit.images[0] : produit.image;

        card.innerHTML = `
            <div class="badge-etat ${classeBadge}">${produit.condition}</div>
            <button onclick="supprimerProduit(${produit.id})" class="delete-btn">×</button>
            <img src="${imagePrincipale}" alt="iPhone" onclick="ouvrirDetail(${produit.id})" style="cursor:pointer;">
            <div class="card-details">
                <h3 onclick="ouvrirDetail(${produit.id})" style="cursor:pointer;">${produit.modele}</h3>
                <p class="price">${produit.prix} FCFA</p>
                <p class="desc-mini">${produit.description}</p>
                <button onclick="ouvrirDetail(${produit.id})" class="buy-btn">Voir l'offre</button>
            </div>
        `;
        
        grilleProduits.prepend(card);
    });
};

// 2. Gestion de la fenêtre de détails (Modal)
function ouvrirDetail(id) {
    const produits = JSON.parse(localStorage.getItem('stock_iphones')) || [];
    const p = produits.find(item => item.id === id);
    
    if (p) {
        document.getElementById('modal-title').innerText = p.modele;
        document.getElementById('modal-price').innerText = p.prix + " FCFA";
        document.getElementById('modal-desc').innerText = p.description;
        document.getElementById('modal-whatsapp').href = "https://wa.me/2250749363718?text=Bonjour, je suis intéressé par l'"+p.modele;
        
        const imgContainer = document.getElementById('modal-images-container');
        if (Array.isArray(p.images)) {
            imgContainer.innerHTML = p.images.map(img => `<img src="${img}" class="modal-img-slide">`).join('');
        } else {
            imgContainer.innerHTML = `<img src="${p.image}" class="modal-img-slide">`;
        }
        
        document.getElementById('product-modal').style.display = "block";
        document.body.style.overflow = "hidden";
    }
}

function fermerDetail() {
    document.getElementById('product-modal').style.display = "none";
    document.body.style.overflow = "auto";
}

// Fermer si on clique en dehors de la fenêtre blanche
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        fermerDetail();
    }
};

// 3. Gestion Administrateur (Secret)
function activerModeAdmin() {
    console.log("Clic sur le titre détecté !");
    const code = prompt("Entrez le code administrateur pour gérer le stock :");
    
    if (code === "0000") {
        const boutons = document.querySelectorAll('.delete-btn');
        boutons.forEach(btn => {
            btn.style.display = 'flex'; // On affiche les boutons de suppression
        });
        alert("Mode gestion activé ! Cliquez sur les × rouges pour supprimer.");
    } else {
        alert("Code incorrect.");
    }
}

function supprimerProduit(id) {
    if (confirm("Voulez-vous vraiment supprimer ce produit du catalogue ?")) {
        let produits = JSON.parse(localStorage.getItem('stock_iphones')) || [];
        produits = produits.filter(p => p.id !== id);
        localStorage.setItem('stock_iphones', JSON.stringify(produits));
        location.reload();
    }
}