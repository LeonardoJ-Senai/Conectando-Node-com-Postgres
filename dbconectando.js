const {Pool} = require("pg")

const pool = new Pool({
   user: "postgres",
   host: "localhost",
   database: "registroUsuarios", //DB criado nos postgreSQL
   password:"postgres",
   port:5432,
   max: 5, //Numero máximo de requisições conectadas
   idleTimeoutMillis: 30000 //Tempo máximo de conexão
})

async function selecionarUsuario(){
    try {
        const responseDB = await pool.query("SELECT * FROM usuarios")
        console.log("Usuários cadastrados: ",responseDB.rows)
    } catch (error) {
        console.log("A consulta retornou "+error.message)
    }
}

async function cadastrarUsuario(nome,idade,email,senha){
    try {
        const responseDB = await pool.query(`INSERT INTO usuarios (nome, idade, email,senha) VALUES ($1,$2,$3,$4)`,[nome,idade,email,senha])
    } catch (error) {
        console.log("A consulta retornou "+error.message)
    }
}

async function executar(){
    await cadastrarUsuario("Pedrinho",28,"pedrinho@email","1243214")

    await selecionarUsuario()
}

executar()
