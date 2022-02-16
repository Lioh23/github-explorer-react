const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

isDevelopment = process.env.NODE_ENV !== 'production'; // variáveis de ambiente para iniciar um ambiente, produção eu desenvolvimento cross-env

module.exports = {

  mode: isDevelopment ? 'development' : 'production',

  devtool: isDevelopment ? 'eval-source-map' : 'source-map', // facilitar no debug do código pelo navegador

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
    hot: true
  },

  // plugin para injetar o arquivo de saída dentro do HTML automaticamente
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(), // plugin para dar refresh na página e manter os estados dos componentes
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean), // caso não esteja em modo de desenvolvimento, o webpack não implicará com o valor "false"

  // a forma como a aplicação vai se comportar quando importarmos cada um dos tipos de arquivos
  module: {
    rules: [
      {
        // testar para ver se esse arquivo é um arquivo javascript ou não, sem levar em consideração a node modules
        test: /\.js?x$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        } // faz a integração do babel com o webpack
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}