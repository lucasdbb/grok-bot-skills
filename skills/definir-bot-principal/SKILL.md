---
name: Definir bot principal
description: >-
  Use quando o usuário quiser escolher ou trocar o bot principal (Primary Bot),
  a porta de entrada que recebe os pedidos e repassa para os especialistas.
---
# Definir bot principal

## Entradas
- Qual bot o usuário quer como principal (nome), ou o pedido para recomendar um.
- Lista atual de bots (da lista de colegas).

## Passos
1. Se o usuário não nomeou o bot, liste os candidatos com uma linha cada dizendo por que serve ou não. Bons candidatos: um roteador/triador ou um generalista. Bots de equipe não podem ser principais.
2. **Aprovação:** confirme qual bot o usuário escolheu. Não troque sem resposta explícita.
3. Ache o id exato do bot na lista de colegas.
4. Chame SetPrimaryBot com esse id.
5. **Verificação:** confira se o retorno diz que o bot virou o principal. Se falhar, informe o erro e não tente outro caminho.
6. Opcional: sugira mandar os pedidos do dia a dia para o bot principal, e que os especialistas reportem para ele.

## Formato de saída
Uma frase confirmando qual bot ficou como principal e onde ele aparece (topo da barra lateral), mais uma dica curta de uso.

## Pontos de verificação
- O bot escolhido existe e não é bot de equipe.
- O retorno da ferramenta confirmou a troca.

## Momentos de aprovação
- Antes de trocar o bot principal (passo 2).
