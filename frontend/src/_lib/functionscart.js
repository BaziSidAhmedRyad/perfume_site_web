




exports.incrm=(quantity,nbr)=>{
    if(quantity-nbr>0){
        return nbr+1;
    }
    return nbr;
}

exports.dec=(nbr)=>{
    if(nbr>0){
        return nbr-1;
    }
    return nbr;
}

exports.deleteproduct=(cart,id)=>{
    return cart.filter((item) =>{(item._id||item.id)!==id})
}