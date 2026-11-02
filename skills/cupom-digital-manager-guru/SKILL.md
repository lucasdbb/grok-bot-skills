---
name: Cupom Digital Manager Guru
description: >-
  Quando o usuário pedir para criar um cupom de desconto no Digital Manager Guru
  (código, valor ou %, produto, validade, limite de uso).
---
# Criar cupom no Digital Manager Guru

API: `https://digitalmanager.guru/api/v2`, header `Authorization: Bearer $GURU_API_TOKEN` (env na box; nunca imprimir). Docs: https://docs.digitalmanager.guru

## 1. Coletar dados (pergunte o que faltar)
- Código do cupom (ex.: PAULOSOUZA, sempre em maiúsculas)
- Desconto: valor fixo em R$ (`incidence_type: value`) ou % (`percent`)
- Produto(s): nome ou ID de marketplace. O cupom usa o ID interno (UUID) do Guru em `product_ids`
- Validade (data início/fim, fuso America/Recife) e limite de uso (0 = sem limite)

Pedido explícito do usuário com esses dados = OK para criar. Se faltar algo que muda o resultado, pergunte.

## 2. Checagens antes de criar
1. Ache o produto: liste/busque produtos e pegue o UUID interno correspondente ao ID de marketplace. Veja preços das ofertas ativas: desconto fixo não pode passar do preço (preços vêm em reais).
2. Busque cupons existentes (ativos e inativos) com o mesmo código. Se existir, pare e pergunte.
3. Avise se o produto estiver `is_active: 0` mesmo com ofertas ativas: sugerir checkout de teste.

## 3. Criar (uma vez só)
`POST /coupons` com campos como:
```json
{"coupon_code":"CODIGO","incidence_field":"products","incidence_type":"value","incidence_value":5000,"product_ids":["<uuid>"],"date_ini":<epoch início 00:00 Recife>,"date_end":<epoch fim 23:59:59 Recife>,"usage_total":0,"usage_contact":0,"is_active":1}
```
Confira os nomes exatos nos docs se der erro de validação. Antes de repetir um POST que falhou, verifique se o cupom já foi criado.

## 4. Verificar
`GET /coupons/<id>` e confira código, tipo e valor, produto, datas, limites e `is_active`. Responda ao usuário com o código, o desconto, o produto, a validade (horário de Recife) e o limite.

## 5. Link de checkout (opcional)
Formato: `<url do checkout>?coupon=<codigo em minúsculas>`, ex.: `https://go.itsedu.com.br/pay/a-nova-advocacia?coupon=codigo`. Para enviar a alguém, peça à secretária, que segue as próprias regras de envio.
