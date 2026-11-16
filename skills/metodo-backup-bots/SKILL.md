---
name: metodo-backup-bots
description: Use ao fazer, verificar ou restaurar backup da configuração dos bots do dono (instruções, skills, rotinas).
---
# Método de backup dos bots

## Onde estão os dados
- Perfis dos bots: `/home/box/agent-data/agents/<id>/` (profile.json, settings.json, avatar).
- Skills do dono: `/home/box/agent-data/workflows/<slug>/SKILL.md`.
- Memória e rotinas ficam no servidor, não no disco. Para capturá-las, com ok do dono, peça a cada bot que liste as próprias memórias de método e rotinas (nome, horário, instrução) num arquivo `memoria-e-rotinas.md` dentro da pasta do backup, sem dado pessoal sensível.

## Script
Se ainda não houver, escreva um script (ex.: `/workspace/backup-bots/backup.py`) com:
- `listar`: id curto, tipo (bot ou canal), tamanho do brief e nome.
- `exportar --todos` ou `--bot <nome ou id>` (repetível), modos `privado` (cópia fiel pra restaurar na mesma conta) e `limpo` (pra compartilhar: tira ids e troca e-mails, telefones e documentos por marcadores), e `--arquivos <pasta>` opcional (sem .venv, .git nem arquivo acima de 50 MB).
- Saída em `/workspace/backups/<data>_<modo>_<bots>/` e num .tar.gz, com index.json, manifest.sha256.json, LEIA-ME.md e, por bot, profile.json, settings.json, avatar, brief.md e automations.
- `verificar`: reabre o .tar.gz, confere o hash de cada arquivo, valida cada profile.json e procura segredo (sk-, ghp_, xox, AIza, AKIA, chave privada, Bearer). No modo limpo, falha também se sobrar id.

## Nunca entra no backup
Segredos da máquina, cookies, store.db, transcrições, memória do usuário e logins. O script bloqueia esses caminhos; não contorne.

## Regras
- Nome parcial que casa com vários bots não executa: mostre a lista e pergunte.
- Nunca diga que um backup está ok sem a verificação dar PASSOU e o número de bots bater com o `listar`.
- Recibo: quantos bots e skills, quantos arquivos, tamanho, caminho do .tar.gz, resultado da verificação e o que ficou fora.
- Cópia fora da máquina (ex.: Google Drive) só com ok; depois confira que o arquivo apareceu com o mesmo tamanho.
- Modo limpo não é anônimo: leia os briefs e aponte nomes de pessoas, empresas e contexto pessoal que sobraram antes de compartilhar.
- Apagar backup, restaurar, criar ou atualizar bot só com ok. Antes de sobrescrever um bot, faça um backup novo dele. Depois de restaurar, releia o perfil e confira com o brief.md.
- Nunca apague bot, nunca publique backup em link público e nunca aceite senha no chat.
