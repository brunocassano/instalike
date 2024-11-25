import express from 'express'; // Importa o framework Express.js para criar aplicações web Node.js
import multer from 'multer';   // Importa o módulo Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js'; // Importa funções de postsController.js (provavelmente contendo lógica para posts)
import cors from 'cors';

const corsOptions = {
  origin:'http://localhost:8000',
  optionsSuccessStatus: 200
}

// Configura o armazenamento para arquivos no disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // Define o diretório de destino para arquivos enviados (e.g., 'uploads/')
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) { // Define como os arquivos serão nomeados (mantém o nome original)
    cb(null, file.originalname);
  },
});

// Cria uma instância do Multer para processar uploads de acordo com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage }); // Opcionalmente, defina o destino diretamente



// Define rotas para a aplicação Express
const routes = (app) => {
  // Permite que o servidor receba dados no formato JSON nas requisições
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para buscar todos os posts (delega para a função listarPosts)
  app.get('/posts', listarPosts);

  // Rota POST para criar um novo post (delega para a função postarNovoPost)
  app.post('/posts', postarNovoPost);

  // Rota POST para upload de imagem com Multer (delega para a função uploadImagem)
  app.post('/upload', upload.single('imagem'), uploadImagem); // Processa upload de um arquivo com o nome 'imagem'

  app.put('/upload/:id', atualizarNovoPost)
};

export default routes; // Exporta a função routes para uso em outros arquivos