// Si le local storage existe, récupérer les produits du panier
// Afficher le nombre d'article dans le panier
let paniers=[];
if (localStorage.getItem("paniers")!=null){
	paniers=JSON.parse(localStorage.getItem("paniers"));
	let total=0;
	for (var i = 0; i<paniers.length; i++) {
		total=total+paniers[i].quantite;
		document.getElementById("total_item").innerText=total;
		mon_panier.onclick=()=> {
		document.location.href="checkout.html"
	};
};
// Si local storage est vide, mettre le panier à 0		
} else {
	let total=0;
	mon_panier.onclick=()=> {
	alert("Votre panier est vide !")
	};
};

// Récupération de l'API via l'id

// Retourner la partie de l'URL qui suit le symbole?
const lienId=window.location.search;

// Retourne la partie de l'URL sans le symbole ? 
const idLien=lienId.slice(1);

// Construire la nouvelle URL du produit sélectionné
let api="http://localhost:3000/api/teddies"
let api2=api+"/"+idLien

// Récupération des informations du produit sélectionné
fetch(api2)		
	.then((res)=>res.json())
	.then((data)=>{

		//Création des éléments html de la carte produit 
		
		const carte            =document.createElement("div");
		const image_produit    =document.createElement("img");
		const name_price=document.createElement("div");
		const nom_produit      =document.createElement("p");
		const price_product     =document.createElement("p");
		const lien             =document.createElement("a");
		let description        =document.createElement("p");
				
		// Insérer les éléments en HTML
		document.getElementById("produit_selectionne")
		.textContent=data.name;
		
		// Insérer la div carte et le lien
		let carte_produit=document.getElementById('nos-produits');
		carte_produit.appendChild(lien).href="#";
		lien.appendChild(carte).classList.add("carte_produit");
		
		
		
		// Insérer le nom  et le prix
		carte.appendChild(name_price).classList.add("name_price2")
		name_price.appendChild(nom_produit).classList.add("nom_produit")
		nom_produit.textContent=data.name;
		name_price.appendChild(price_product).classList.add("price_product")
		price_product.textContent=data.price/100+" €"

		// Insérer l'image dans la carte
		carte.appendChild(image_produit).classList.add("image_produit2");
		image_produit.src=data.imageUrl;

         // Insérer la description du produit
	    carte.appendChild(description).classList.add("description");
	    description.textContent=data.description;

		// Insérer les options choix de couleurs
		for (var couleur = 0; couleur <data.colors.length; couleur++) {
			const choix=document.createElement("option");
			let choix_couleur=document.getElementById("choix_couleur");
			choix_couleur.appendChild(choix).textContent=data.colors[couleur];
		}
		let button = document.querySelector('button');


		// Insérer la quantité choisie
		let quantite_choisie=document.getElementById("quantite_commandee");
		quantite_commandee.addEventListener("input", function(){
			let quant=document.getElementById('quantite_commandee').value;
			let quantite=parseInt(quant);
							
			if(quantite<=0){
			alert('Merci de saisir une quantité supérieure à 0 !');
			quantite_choisie.value=0;
			}else{

				document.getElementById('quant_com').innerText=quantite;

			// Insérer le prix total des produits choisis	
			prix_total=data.price/100*quantite;
			document.getElementById('prix_total').innerText=prix_total+" €";
			
	// Au clic sur ajouter au panier
	// Créer un objet du produit
	// Pousser l'objet dans le tableau paniers
	// Stocker le tableau dans le localStorage
 		
 		panier.onclick=()=> {
 			document.getElementById('total_item').innerText;
 			let total=document.getElementById('total_item').textContent;
 			total    =parseInt(total)+quantite;
 			document.getElementById('total_item').innerHTML=total;
 			
 		let couleur =document.getElementById("choix_couleur").value;
 		let imageUrl=data.imageUrl;
 		let nom     =data.name;
 		
 		let votrePanier={
    		nom:nom,
			couleur:couleur,
			quantite:quantite,
			prix_unitaire:data.price/100,
			prix:prix_total,
			url:imageUrl,
			id_:data._id
		   } 	

paniers.push(votrePanier);

localStorage.setItem("paniers",JSON.stringify(paniers));

// Continuer les achats: Retour à la page d'accueil
// Non: Aller à la page panier

if (confirm(quantite+ "  produit(s) ajouté(s) au panier. \nContinuer les achats?\n\nOK: Continuer       Panier: Voir mon panier")){
	document.location.href="./index.html";
}else{
	document.location.href="./checkout.html";
	};
};

// Possibilité de vider le panier et renoncer aux achats

vider_panier.onclick=()=> {
    localStorage.clear();
    document.location.reload();
};
};
});
});
