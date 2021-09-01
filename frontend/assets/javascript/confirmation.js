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
// Afficher le prix total
let commandeInfos = JSON.parse(localStorage.getItem("commandeInfos")); 
document.getElementById('total_commande')
.textContent=commandeInfos.prix_a_payer + '  €'
