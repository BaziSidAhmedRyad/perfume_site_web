const { default: axios } = require("axios");



exports.getdata=async()=>{
    try {
        const res=await axios.get('');
        return res.data;
    } catch (error) {
        console.error('probleme du recuperation du data'+ error);
    }
}

exports.fillcart=async(name)=>{
    try {
        const res=await axios.get('',name,{headers:{"Content-Type": "application/json"}});
        return res.data;
    } catch (error) {
        console.error('probleme du remplire cart'+error);
    }

  
}


exports.filteredPerfumes = perfumes.filter((perfume) => {
  // Vérifie catégorie si un filtre est activé
  if (filters.category && perfume.category !== filters.category) {
    return false; // exclu
  }

  // Vérifie météo si activé
  if (filters.weather && perfume.weather !== filters.weather) {
    return false; // exclu
  }

  // Vérifie prix si activé
  if (filters.price && perfume.price > filters.price) {
    return false; // exclu
  }

  // Si on arrive ici → aucune condition échouée
  return true; // inclus
});


