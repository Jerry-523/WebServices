const soap = require('strong-soap').soap;
const readline = require('readline');


const wsdlUrl = 'https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


soap.createClient(wsdlUrl, {}, (err, client) => {
    if (err) {
        console.error('Erro ao criar o cliente SOAP:', err);
        rl.close();
        return;
    }

    console.log('Cliente SOAP criado com sucesso!');

   
    const getInput = () => {
        rl.question(
            '\nEscolha uma opção:\n1 - Converter número para texto\n2 - Converter número para dólares\n3 - Sair\n\nSua escolha: ',
            (option) => {
                if (option === '1') {
                    rl.question('Digite o número que deseja converter para texto: ', (number) => {
                        const args = { ubiNum: parseInt(number, 10) };
                        client.NumberToWords(args, (err, result) => {
                            if (err) {
                                console.error('Erro ao chamar NumberToWords:', err);
                            } else {
                                console.log('Resultado de NumberToWords:', result.NumberToWordsResult);
                            }
                            getInput(); 
                        });
                    });
                } else if (option === '2') {
                    rl.question('Digite o número que deseja converter para dólares: ', (number) => {
                        const args = { dNum: parseFloat(number) };
                        client.NumberToDollars(args, (err, result) => {
                            if (err) {
                                console.error('Erro ao chamar NumberToDollars:', err);
                            } else {
                                console.log('Resultado de NumberToDollars:', result.NumberToDollarsResult);
                            }
                            getInput(); 
                        });
                    });
                } else if (option === '3') {
                    console.log('Saindo...');
                    rl.close();
                } else {
                    console.log('Opção inválida. Tente novamente.');
                    getInput(); 
                }
            }
        );
    };

    getInput(); 
});
