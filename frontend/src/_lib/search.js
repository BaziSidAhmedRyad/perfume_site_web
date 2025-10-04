
exports.search=(e)=>{
    const find=Products.filter(
        (p)=>p.name.toLowerCase().includes(e.target.name.toLowerCase())
    )
}