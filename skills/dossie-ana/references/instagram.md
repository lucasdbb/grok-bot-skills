# Ler o Instagram no navegador do box

O navegador do box já deve estar logado como @lucasbraga.ia (a sessão usada pelo Social Selling ANA) e segue parte dos leads, então perfis fechados podem abrir. Só o bot principal dispara o subagente `computerUse` (um por vez). Executores não usam o navegador. Coloque neste brief o recorte técnico abaixo (URLs, o que extrair e o JavaScript). Não deixe o subagente digitar senha, código ou desafio de login. Se o Instagram pedir login ou bloquear, ele para e devolve a frente como **bloqueada**; o bot avisa o Lucas. Ao terminar, feche as abas do perfil abertas nesta tarefa; não deslogue a sessão.

## Cabeçalho do perfil

O texto visível da página costuma voltar vazio no Instagram. Use JavaScript:

```js
await new Promise(r=>setTimeout(r,3000));
[...document.querySelectorAll('header button')].find(x=>x.innerText.trim()==='mais')?.click();
await new Promise(r=>setTimeout(r,500));
document.querySelector('header')?.innerText
```

Isso devolve @, nome, posts, seguidores, seguindo, bio expandida, link, destaques e "Seguido(a) por".

## Grade de posts

Role a página acumulando links e o texto alternativo das imagens (que traz o começo da legenda). Guarde num `window.__posts` e leia em fatias: a saída da ferramenta corta em cerca de 1.000 caracteres.

```js
const seen=new Map();
for(let i=0;i<16;i++){
  document.querySelectorAll('a[href*="/p/"],a[href*="/reel/"]').forEach(a=>{
    const h=a.getAttribute('href');
    if(!seen.has(h)) seen.set(h,(a.querySelector('img')?.alt||'').replace(/\s+/g,' ').slice(0,90));
  });
  window.scrollBy(0,2500); await new Promise(r=>setTimeout(r,1200));
}
window.__posts=[...seen]; window.__posts.length
```

- O dono do post está no caminho: `/outroperfil/p/...` é collab ou marcação. Conte por dono para separar posts próprios de collabs (família, assessoria de imprensa, instituições).
- Os três primeiros da grade costumam ser fixados e antigos. Não os trate como recentes.
- Filtre por palavras jurídicas (`advog|direito|jur[ií]d|oab|escrit|clien|mestr|palestr|empres|plano|banco`) para achar os posts profissionais.

## Post individual (data e legenda)

Navegue para `https://www.instagram.com/p/<código>/` (sem o @ do dono) e rode:

```js
await new Promise(r=>setTimeout(r,3000));
(document.querySelector('time')?.getAttribute('datetime')||'')+' :: '+
([...document.querySelectorAll('h1, span[dir=auto]')].map(e=>e.innerText)
  .filter(x=>x.length>60 && !/Afrikaans/.test(x))
  .sort((a,b)=>b.length-a.length)[0]||'').slice(0,900)
```

O filtro `Afrikaans` descarta o seletor de idiomas, que é o maior texto da página. Leia vários posts no mesmo `computerUse`, navegando de verdade de um post a outro.

`fetch()` de páginas do Instagram de dentro da aba costuma ser bloqueado. Navegue de verdade. Não tente dirigir o navegador por Playwright, Puppeteer ou CDP no terminal.

## Destaques (stories)

Liste os destaques com `[...document.querySelectorAll('a[href*="/stories/highlights/"]')].map(a=>a.innerText+' => '+a.getAttribute('href'))`. O nome do destaque já informa muito ("Palestras - IA", "Cursos").

Abrir um story mostra ao lead que @lucasbraga.ia viu. O Instagram pergunta "Ver como lucasbraga.ia?" antes: pare nessa tela, anote a idade do destaque e registre o conteúdo como não verificado. Só abra se quem pediu autorizar.

## O que extrair

- **Perfil pessoal:** família, filhos, hobbies, viagens, sinais de padrão de vida. Serve para quem vai conduzir a reunião entender a pessoa. Na reunião não se cita nada disso; a página avisa.
- **Perfil profissional e do escritório:** temas, público (cliente final ou empresas), frequência, último post, engajamento, destaques (Na Mídia, FAQ, Contatos).
- **Posts de terceiros:** assessoria de imprensa, entrevistas na TV, instituições (IAP, OAB, IBDFAM), eventos, associações empresariais, depoimentos.
- **Seguidores em comum** com @lucasbraga.ia: possíveis pontes.

Não salve print de perfil privado. Não mande DM, não comente, não siga e não curta.
