const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  mode: 'development',

  // arquivo de entrada do código que será convertido
  entry: path.resolve(__dirname, 'src', 'index.jsx'),

  //o arquivo que será gerado na saída, convertido para que o browser entenda
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // as extensões que o código vai entender dentro do src
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // webpack-dev-server é um plugin que precisa ser instalado e serve para monitorar as configurações da nossa aplicação
  devServer: {
    static: path.resolve(__dirname, 'public'), // onde fica o conteúdo estático da aplicação
  },

  // plugin para injetar o arquivo de saída dentro do HTML automaticamente
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],

  // a forma como a aplicação vai se comportar quando importarmos cada um dos tipos de arquivos
  module: {
    rules: [
      {
        // testar para ver se esse arquivo é um arquivo javascript ou não, sem levar em consideração a node modules
        test: /\.js?x$/,
        exclude: /node_modules/,
        use: 'babel-loader' // faz a integração do babel com o webpack
      },
    ]
  }
}