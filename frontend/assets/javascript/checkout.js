// Récupérer le contenu du localStorage
let paniers=JSON.parse(localStorage.getItem('paniers'));
let prix_a_payer=0;

// Fonction globale des mises à jour: quantité totale/prix total
let miseAjour=function(){
    // Récupération des achats du panier
    let paniers=JSON.parse(localStorage.getItem('paniers'));
    let total=0;
    for (var i = 0; i<paniers.length; i++) {
            total=total+paniers[i].quantite;
        };
document.getElementById("total_item").innerText=total;
// Afficher le nombre d'article
document.getElementById("votre_panier").textContent=total+"  article(s)";
};
miseAjour();// Fin fonction

// Eviter les doublons des produits sélectionnés
// Pour afficher une seule carte pour chaque produit sélectionné
let nouveauPanier=[];
for(let i=0;i<paniers.length;i++){
    let article=paniers[i];
    let key=paniers[i].nom+"_"+paniers[i].couleur;
    if(nouveauPanier.hasOwnProperty(key)){
      nouveauPanier[key].quantite=paniers[i].quantite+nouveauPanier[key].quantite;
       nouveauPanier[key].prix=paniers[i].prix+nouveauPanier[key].prix;
    }else{
        nouveauPanier[key]=article;
    }
};
paniers=[];

// Mettre les éléments de nouveauxPanier dans paniers
for (let [key, value] of Object.entries(nouveauPanier)) {
   paniers.push(value);
}

//Création des éléments html de la carte produit 
localStorage.setItem('paniers',JSON.stringify(paniers));

for (let i in paniers) {  
    let lien                =document.createElement("a");
    let carte               =document.createElement("div");
    let image_produit       =document.createElement("img");
    let nombre_produit      =document.createElement("span");
    let name_price   =document.createElement("div");
    let nom_produit         =document.createElement("p");
    let price_product        =document.createElement("p");
    let prix_total          =document.createElement("p");
    let supprimer           =document.createElement("bouton");
    let ajouter             =document.createElement("bouton");         

// Récupérer les articles dans le panier
    let carte_produit       =document.getElementById('nos-produits');
    carte_produit.appendChild(lien).href="#";

    // insérer la carte dans le lien
    lien.appendChild(carte).classList.add("carte_produit_mini");
        
    // Insérer l'image dans la carte
    carte.appendChild(image_produit).classList.add("image_produit_mini");
    image_produit.src=paniers[i].url;
    carte.appendChild(nombre_produit)
    .classList.add("nombre_article");
    nombre_produit.classList.add("nombre_produit");
    nombre_produit.textContent=paniers[i].quantite+' X';
    
    // Insérer le nom  du produit dans la carte
    carte.appendChild(name_price).classList.add("name_price_mini");
    name_price.appendChild(nom_produit).classList.add("nom_produit");
    nom_produit.textContent=paniers[i].nom;

    // Insérer le prix du produit
    name_price.appendChild(price_product).classList.add("price_product")
    price_product.textContent='Unitaire: '+ paniers[i].prix_unitaire+' €';

    // Insérer le prix total du produit
    carte.appendChild(prix_total)
    .textContent='Prix total: '+ paniers[i].prix+' €';
    prix_total.classList.add("prix_total");
    prix_a_payer=prix_a_payer+paniers[i].prix;
    document.getElementById("total_a_payer")
    .textContent='Total à payer : '+ prix_a_payer+ ' €';

// insérer le bouton supprimer
    carte.appendChild(supprimer);
    supprimer.classList.add ("btn_supprimer");
	supprimer.innerText="Supprimer -"+" \u00a0"+" \u00a0";
    
    // début écouter le clic sur Supprimer
        supprimer.addEventListener("click",function(){
    // supprimer un produit de la quantité
        paniers[i].quantite=paniers[i].quantite-1;
    // Soustraire le prix total du produit
        paniers[i].prix=paniers[i].prix-paniers[i].prix_unitaire;
    // Soustraire le prix à payer
        prix_a_payer=prix_a_payer-paniers[i].prix_unitaire;
    // mettre à jour la quantité du produit
        nombre_produit.textContent=paniers[i].quantite+' X';
    // Mettre à jour le prix total du produit
        prix_total.textContent='Prix total: '+paniers[i].prix +' €';
    // Mettre à jour le prix à payer du panier
        total_a_payer.textContent= 'Total à payer: '+prix_a_payer+ ' €';
    
    // Tester la quantité restante du produit                
        let reste=paniers[i].quantite;
        let aSupprimer=paniers[i];
            if (reste==0) {
                carte.style.display="none";
            };// Fin if 
    // Mise à jour du localStorage        
        localStorage.setItem("paniers",JSON.stringify(paniers));
        miseAjour(miseAjour);

    // Tester le prix à payer
        if (prix_a_payer<1) {
            alert("Vous avez vidé votre panier!");
            localStorage.clear();
            document.location.href="index.html";
        };
        });//fin ecoute suprimer
// insérer le bouton Ajouter
    carte.appendChild(ajouter);
    ajouter.classList.add("btn_ajouter");
    ajouter.innerText="Ajouter + ";
// début écouter le clic sur Ajouter
    ajouter.addEventListener("click",function(){
        // Ajouter un produit de la quantité
        paniers[i].quantite=paniers[i].quantite+1;
        // Additionner le prix total du produit
        paniers[i].prix=paniers[i].prix+paniers[i].prix_unitaire;
        // Soustraire le prix à payer
        prix_a_payer=prix_a_payer+paniers[i].prix_unitaire;
        // mettre à jour la quantité du produit
        nombre_produit.textContent=paniers[i].quantite+' X';
        // Mettre à jour le prix total du produit
        prix_total.textContent='Prix total: '+paniers[i].prix +' €';
        // Mettre à jour le prix à payer du panier
        total_a_payer.textContent= 'Total à payer: '+prix_a_payer+ ' €';
        // Mise à jour du localStorage et les valeurs fonction           
        localStorage.setItem("paniers",JSON.stringify(paniers));
        miseAjour(miseAjour);
    });//fin ecoute Ajouter
};  // fin parcourir paniers// création des éléments html

// Formatage des informations du formulaire
let formulaire=document.getElementById('formulaire');
let mesInput=formulaire.getElementsByTagName('input');
let erreur=formulaire.getElementsByTagName('p');
// Mes regex
let regex=[
    /^[a-zA-Z-\s]+$/,
    /^[a-zA-Z-\s]+$/,
    /^[a-zA-Z0-9\s,.'-]{3,}$/,
    /^[a-zA-Z-\s]+$/,
    /^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/,
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    /^(0|\+33)[1-9]([-._\s]?[0-9]{2}){4}$/
]

// Message d'erreur propre à chaque champs
let messages=[
    "Ce nom n'est pas valide! ",
    "Ce prénom n'est pas valide! ",
    "Cette adresse n'est pas valide! ",
    "Cette ville n'est pas reconnue! ",
    "Ce code postal est invalide! ",
    "Cet e-mail est invalide! ",
    "Ce numéro est invalide! "
];

// Ecouter le bouton submit // Valider le formulaire
formulaire.addEventListener('submit',function (f){
for (let i=0; i < mesInput.length; i++){
    if (mesInput[i].value.trim()=="") {
        erreur[i].textContent='Ce champs est obligatoire!'
        erreur[i].classList.add('message_erreur');
        mesInput[i].style.border='1px dashed red';
        f.preventDefault();
    }else if (regex[i].test(mesInput[i].value)==false){
        erreur[i].textContent=messages[i];
        erreur[i].classList.add('message_erreur');
        mesInput[i].style.border='1px dashed red';
        f.preventDefault();
    }else{
        mesInput[i].style.border='1px dashed green';
        erreur[i].style.display="none";
    }
}

// Récupérer les données saisies du formulaire dans un objet contact
let contact={
        firstName:nom.value,
        lastName:prenom.value,
        address:adresse.value,
        city:ville.value,
        email:mail.value,
        };
localStorage.setItem("contact",JSON.stringify(contact));
});
let contact=JSON.parse(localStorage.getItem('contact'));

// Envoi des données au serveur avec fetch POST
// 1- Regrouper le panier et le formulaire dans un objet ORDER
let errayStringsProducts=[];
for (var i = 0; i < paniers.length; i++) {
    id=paniers[i].id_;
    errayStringsProducts.push(id);
}
let order={
    contact:contact,
    products:errayStringsProducts,
    };
     
//2- Envoi de la requête Fetch avec la méthode POST
let promise=fetch("http://localhost:3000/api/teddies/order",{
    method:"POST",
    body:JSON.stringify(order),
    headers:{"Content-Type":"application/json",},
});

//3- Réception des données serveur
promise.then(async(response)=>{
    try{
        const retourServeur=await response.json();
        let commandeInfos={
            identifiant:retourServeur.orderId,
            prix_a_payer:prix_a_payer,
            nomContact:retourServeur.contact.firstName,
            prenomContact:retourServeur.contact.lastName
        }

        // Vider le localStorage (panier et données formulaire)
        localStorage.clear();

        // Stockage des informations retournées par le serveur   
        localStorage.setItem("commandeInfos",JSON.stringify(commandeInfos));   
        document.location.href="confirmation.html";
        }

// En cas d'échec de la requête
    catch(err){
        document.getElementById("merci")
        .innerText="Merci de saisir le formulaire pour votre commande. "
    }
});
