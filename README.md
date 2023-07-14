# Burger Queen

Quinto projeto criado durante o bootcamp da Laboratória. O projeto é uma plataforma de apoio a hamburguerias onde as principais funcionalidades consistem em: 
1. Garçom tem a possibilidade de criar pedidos personalizados de acordo com o cardápio disponibilizado por administradores.
2. Cozinha recebe em tempo real os pedidos que garçom retira no salão e podem marcar os pedidos como prontos para entrega. 
3. Administradores podem alterar produtos disponíveis no cardápio, além de gerenciar os acessos de demais colaboradores. 

🔗[Clique aqui para acessar](https://burger-queen-three.vercel.app/)

| Usuário  | Senha |
| ------------- | ------------- |
| burger@waiter.com  | senha123  |
| burger@chef.com  | senha123  |
| burger@admin.com | senha123 |

## Índice
[1. Histórias de usuários](#1-histórias-de-usuários)  
[2. Rodando o arquivo localmente](#2-rodando-o-arquivo-localmente)  
[3. Primeira tela do garçom: Cardápio](#3-primeira-tela-do-garçom-cardápio)  
[4. Segunda tela do garçom: Pedidos prontos para envio](#4-segunda-tela-do-garçom-pedidos-prontos-para-envio)  
[5. Tela do chefe de cozinha](#5-tela-do-chefe-de-cozinha)  
[6. Primeira tela do administrador: Produtos](#6-primeira-tela-do-administrador-produtos)  
[7. Segunda tela do administrador: Funcionários](#7-segunda-tela-do-administrador-funcionários)  
[8. Mensagens de erros](#8-mensagens-de-erros)  
[9. Considerações técnicas](#9-considerações-técnicas)  
[10. Contatos](#10-contatos)

## 1. Histórias de usuários
O projeto foi guiado seguindo 06 histórias de usuários, sendo elas:

1. **Garçom/Garçonete** deve poder entrar no sistema, caso o admin já lhe tenha dado as credenciais.
2. **Garçom/Garçonete** deve ser capaz de anotar o pedido do cliente.
3. **Chefe de cozinha** deve ver os pedidos.
4. **Garçom/Garçonete** deve ver os pedidos prontos para servir.
5. **Administrador(a) de loja** deve administrar seus funcionários.
6. **Administrador(a)** de loja deve administrar os produtos.

## 2. Rodando o arquivo localmente

A API responsável pelos dados da hamburgueria estão hospedados no Vercel, mas, caso você prefira rodá-la localmente, sugiro que siga os passos abaixo:

1. Faça o clone do [mock da API](https://github.com/AlineGuiseline/burger-queen-api-mock) no seu computador
2. Abra o arquivo no VS Code
3. Abra o terminal e digite *npm install*
4. Ainda no terminal, execute o mock com o comando *npm start*
5. Será aberta uma porta (possivelmente 8080)
6. Retorne ao arquivo burger-queen, que contém o código do projeto em si
7. Abra a pasta **src** e, depois disso, a subpasta **api**
8. Abra os arquivos **orders**, **products** e **users** e, dentro de cada um deles, substitua o link da variável *API_URL* por 'http://localhost:número-da-porta'  
 **ex.: const API_URL = 'http://localhost:8080'**
9. Salve as alterações feitas e rode o projeto, também no terminal, com o comando npm start
**Importante:** Nâo se esqueça de manter a API rodando durante todo o tempo de uso do site Burger Queen (recomendamos que rode a API antes de rodar o site, para evitar qualquer tipo de conflito)
## 3. Primeira tela do garçom: Cardápio
Para otimizar o espaço e não cansar a mente atarefada do garçom com excesso de informação, a primeira visão de sua tela é dos filtros de produtos disponíveis para consumo, junto do espaço para calcular os valores e, efetivamente, fazer o pedido. Ao clicar em cada filtro, as opções correspondentes aparecerão e, ao clicar no botão de mais(+) em cada uma delas, os pedidos serão adicionados ao resumo na lateral direita. É possível fazer o controle da quantidade tanto pelo botão de mais(+) do cardápio quanto pelos botões de mais(+) e menos(-) do resumo. Após inserir o nome do cliente, o pedido é enviado à cozinha e o resumo é zerado novamente.

![Desktop](./src/assets/readme/waiter%20first%20screen.gif)

## 4. Segunda tela do garçom: Pedidos prontos para envio
Ao alternar para a aba de "Pedidos prontos", o garçom pode ver os pedidos que foram marcados como "prontos para envio" pelo chef de cozinha, bem como há quanto tempo eles foram feitos, e pode marcá-los como "enviados", sinalizando que eles já foram entregues à mesa - ao fazer isso, o pedido desaparece da página, também para evitar o excesso de informações.

![Desktop](./src/assets/readme/waiter%20second%20screen.gif)

## 5. Tela do chefe de cozinha
Ao entrar em sua tela, o chefe de cozinha pode ver todos os pedidos que foram feitos pelo garçom, podendo ver, também, há quanto tempo eles foram feitos, e pode marcá-los como "prontos para envio", sinalizando que já foram preparados - ao fazer isso, o pedido desaparece da página.

![Desktop](./src/assets/readme/chef%20screen.gif)

## 6. Primeira tela do administrador: Produtos
Ao entrar em sua tela, o administrador depara-se com 2 botões: Produtos e Funcionários. Selecionando a opção "Produtos", é possível ver todos os produtos disponíveis à hamburgeria, sendo possível editá-los, excluí-los e também cadastrar novos produtos.

![Desktop](./src/assets/readme/admin%20first%20screen.gif)
## 7. Segunda tela do administrador: Funcionários
Retornando à tela principal e escolhendo a opção "Funcionários", vemos todos os funcionários contratados pela hamburgueria e também podemos editá-los, excluí-los e cadastrar novos.

![Desktop](./src/assets/readme/admin%20second%20screen.gif)

## 8. Mensagens de erros
Há mensagens de erros em 3 telas, sendo elas:
- **Tela de login:** caso o usuário use um e-mail ou senha incorretos, seu login será barrado e uma mensagem de erro aparecerá acima do botão "Entrar".
- **Tela do garçom:** caso o garçom tente fazer um pedido sem inserir o nome do cliente ou sem adicionar nenhum pedido, uma mensagem de erro aparecerá no topo da tela.
- **Telas do administrador:** caso o administrador tente cadastrar um novo produto ou funcionário sem inserir nenhuma informação ou deixando algum campo em branco, uma mensagem de erro aparecerá no topo da tela.

![Desktop](./src/assets/readme/erros.png)
## 9. Considerações técnicas

**Linguagens/bibliotecas utilizadas:** JavaScript | React | HTML5 | CSS3

**Programas/Plataformas utilizadas:** VSCode (codificação) | Figma (protótipos das páginas) | Trello (planejamento) | Vercel (hospedagem do projeto e da API) | Insomnia (auxílio às rotas) | fetch (requisições HTTP) | Testing Library (testagem das funções)

## 10. Contatos

**Aline Guiseline** 💙 

[LinkedIn](https://www.linkedin.com/in/alineguiseline/)


**Stella Zen** 💙 

[LinkedIn](https://www.linkedin.com/in/stella-zen-690569197/)