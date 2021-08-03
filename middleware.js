const Product = require("./model/product");

const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','You need to Login First');
        return res.redirect('/login');
    }
    next();
}

const isAllowed = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    const email = product.email;
    console.log(product);
    console.log(email);
    if(req.user.email !== email){
        req.flash('error','You can only edit/delete those products which you have added');
        return res.redirect(`/products/${req.params.id}`);
    }
    next();
}

module.exports = {
    isLoggedIn,
    isAllowed
}