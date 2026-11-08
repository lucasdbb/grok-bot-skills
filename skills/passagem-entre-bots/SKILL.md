---
name: passagem-entre-bots
description: >-
  Use quando um bot escreve um arquivo para outro bot ler, depende de um arquivo
  que outro bot deveria ter deixado (pastas de passagem na box), ou quando manda
  uma tarefa a outro bot por mensagem (delegação).
---
# Passagem entre bots

Regras para quando um bot entrega trabalho a outro: por arquivo na box (ex.: `/workspace/<area>/...`) ou por mensagem.

## 1. Um dono por arquivo
- Cada arquivo de passagem tem um único bot que escreve nele. Os outros só leem.
- Se você precisa responder ao arquivo de outro bot, crie o seu próprio arquivo (ex.: `<nome>-resposta.md`) em vez de editar o dele.
- Crie a pasta se ela não existir (`mkdir -p`).

## 2. Linha de status no fim
Todo arquivo de passagem termina com uma linha neste formato:

`[AAAA-MM-DD HH:MM Recife] [Nome do bot] FEITO|TRAVADO -> caminho/do/arquivo -> próximo bot`

- FEITO: o conteúdo está completo e conferido; o próximo bot pode usar.
- TRAVADO: diga na mesma linha, depois de " — ", o que falta e de quem depende.
- Atualize a linha (não acrescente outra) quando o status mudar.

## 3. Arquivo faltando ou travado
- Antes de ler a entrega de outro bot, rode `python3 /workspace/grok-bot-scripts/comum/passagem.py <arquivo ou pasta> [--padrao 'triagem-*.md'] [--bot <Nome>] [--max-dias 1]`. Ele diz o arquivo mais novo, a data (Recife) e se termina em FEITO ou TRAVADO; sem arquivo, "<bot> não rodou". Saída 0 = FEITO e no prazo; 1 = travado, sem status, desatualizado ou faltando (siga as regras abaixo); 2 = erro.
- Se o arquivo que você espera não existe, está vazio ou termina em TRAVADO: não siga com dado inventado nem com a versão antiga.
- Diga na sua entrega: "<bot> não rodou" (ou "<bot> travou: motivo"), com o caminho que procurou, e coloque isso em "Não verificado:".
- Se o arquivo terminar em FEITO mas a data for antiga demais para a tarefa, avise que está desatualizado.

## 4. Nada sensível
Nunca grave senha, token, chave ou dado de gravação privada em arquivo de passagem nem em mensagem para outro bot.

## 5. Delegação por mensagem
Use esta seção quando você manda uma tarefa a outro bot (não só deixa um arquivo). O objetivo é o outro bot executar sem perguntar de volta.

### Antes de mandar
- Junte o que o outro bot precisaria perguntar: links, caminhos, textos, regras de marca, o que não fazer e as decisões já tomadas.
- Se falta uma decisão do dono, pergunte a ele antes de acionar o especialista. Não mande um brief ambíguo para corrigir depois.
- Casos com dois caminhos precisam ser excludentes e explícitos: "se X, então A; se Y, então B; nunca os dois".
- Grave o brief num arquivo (ex.: `/workspace/<area>/briefs/AAAA-MM-DD-slug.md`) e aponte o caminho na mensagem.
- Um pedido por mensagem. Não junte tarefas sem relação.
- Não mande aviso (FYI) que acorda outro bot sem um pedido claro.
- Só envie quando estiver ok se o outro bot nunca te perguntar nada.

### O que o brief precisa ter
1. Quem pediu e quando.
2. Objetivo e o que conta como pronto.
3. Público.
4. Mensagem ou texto (ou "você escreve seguindo X").
5. Formato e especificações.
6. Fontes e caminhos (não "veja se acha").
7. Prazo.
8. Métrica ou critério de matar.
9. Fora de escopo (o que não fazer).
10. Como responder: só `FEITO` ou `TRAVADO` mais o caminho, sem recap longo.
11. Quem mostra o resultado ao dono: uma pessoa só, em geral quem pediu. O especialista não manda o mesmo pacote nos dois chats.

### Quem recebe
- Se o brief fecha, execute sem devolver pergunta.
- Se falta um fato, procure primeiro (arquivo, bases do time, memória).
- Se ainda travar, mande UMA pergunta com tudo que falta e a sua recomendação.
- Entregue uma vez: `FEITO` ou `TRAVADO`, a prova e o caminho. Não comece uma conversa.
- Se quem pediu disse que mostra o resultado ao dono, não mostre o mesmo pacote no chat do dono.

### O que gasta crédito à toa
- Brief incompleto, que gera vai-e-volta.
- Os dois mostrando o mesmo resultado ao dono.
- Aviso de "estou trabalhando" no meio do caminho.
- FYI sem pedido.
- Corrigir depois porque uma regra não estava no primeiro recado.

## Verificação antes de entregar
- O arquivo que você escreveu termina com a linha de status correta.
- Você conferiu a linha de status do arquivo que leu, e o que faltou aparece em "Não verificado:".
- Se você delegou por mensagem: o brief tinha os 11 itens (o que faltou vai em "Não verificado:"); a resposta pedida era só FEITO ou TRAVADO com o caminho; e ficou dito quem mostra o resultado ao dono.
- Se você recebeu um brief: procurou o que faltava antes de perguntar; a entrega foi uma, com prova e caminho.
