# Pitchday APP

Requisitos:

- NodeJS
- Android Studio

Por fim, mas não menos importante, vamos aprender a executar o nosso aplicativo.

Após baixar o arquivo zipado, descompacte-o, abra-o no VS Code e no terminal, assim como na API, rode o seguinte comando:

```jsx
npm install
```

que serve para baixar todas as dependências. Feito isso nosso projeto já está quase pronto para ser executado. Precisamos configurar uma constante em específico que é a constante da URL da nossa API. Lembram que o [localhost](http://localhost) na verdade é o IP da internet que você está conectado? Pois é, quando rodamos nosso aplicativo em um emulador, o IP é diferente do IP real que a máquina está conectada, por isso não podemos fazer uma requisição direto no link http://localhost:3000.

Para arrumar isso, entre no seguinte diretório:  pitchday/constants/API.ts que estará assim:



Assim, substitua `<SEU_IP>` pelo IP que você está conectado. 

Dica: você pode descobrir isso abrindo o prompt de comando do windows e rodando o comando `ipconfig` :


O que nos interessa é esse Endereço de IPv4 dentro de `Adaptador de Rede sem Fio Wi-Fi`, que é o ip que substituiremos naquele arquivo dito anteriormente.

Após isso, toda configuração a nível de código já foi feita, agora nos resta arrumar o Android Studio. Depois de já ter instalado em em seu computador, você vai procurar pela opção `Virtual Device Manager` :



Abrindo ela, vai ter um dispositivo já cadastrado, só dar o play no canto direito dele e o emulador já estará funcionando.

Depois de tudo isso feito, é só rodar o aplicativo! Digite no terminal do VS Code o seguinte comando: `npm run start` que ele já rodará o código e te dará algumas opções:



Caso você possua o Expo Go (Android) ou um iOS, basta ler aquele QR Code, mas caso queira rodar no emulador só pressionar a tecla “a” do seu teclado que ele já abrirá automaticamente no emulador.
