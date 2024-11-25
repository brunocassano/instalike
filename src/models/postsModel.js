import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js'
// Conecta ao banco de dados MongoDB usando as informações da string de conexão fornecida no ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts da coleção 'posts' no banco de dados 'imersao-instabytes'.
export async function getTodosPosts() {
    // Obtém o banco de dados 'imersao-instabytes' da conexão.
    const db = conexao.db('imersao-instabytes');
    // Obtém a coleção 'posts' do banco de dados.
    const colecao = db.collection('posts');
    // Retorna um array com todos os documentos da coleção.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('posts');
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('posts');
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost});
}