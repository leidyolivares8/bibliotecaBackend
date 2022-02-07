//================================
//Puerto 
//================================
process.env.PORT = process.env.PORT || 3000;

//=================================
//Conexion a la base de datos en la nube mongo atlas
//=================================
let urlDB;
urlDB = 'mongodb+srv://Leidy_8:Cdjb5meCPpzCo3zu@cluster0.rexou.mongodb.net/biblioteca';
process.env.urlDB = urlDB;