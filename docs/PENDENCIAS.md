# Pendências que dependem da hospedagem

O site foi construído **sem inventar informações**. Os itens abaixo precisam
ser confirmados pela equipe do Luar de Minas Suítes; até lá, o site oculta o
recurso ou orienta o visitante a consultar a equipe.

## Para a demonstração ao cliente

Nada é obrigatório: a demonstração (GitHub Pages) já mostra todas as seções,
as acomodações citadas, molduras ilustradas no lugar das fotos e o formulário
validando sem enviar dados. Só falta ativar o Pages uma vez em
**Settings → Pages → Source: GitHub Actions** e rodar o workflow
"Demonstração no GitHub Pages". Fotos reais, se houver, deixam a
apresentação bem mais forte.

## Essencial antes de publicar

- [ ] **Canal oficial de reservas/atendimento** — `src/config/site.ts`:
      `bookingEngineUrl` (se houver motor de reservas), `contact.whatsapp`,
      `contact.phoneDisplay` e/ou `contact.email`. Sem nenhum deles, o
      formulário apenas valida e avisa que nada foi enviado.
- [ ] **Domínio oficial** — `url` em `src/config/site.ts`.
- [ ] **Fotografias reais** — veja `src/assets/fotos/README.md`.
- [ ] **Acomodações** — confirmar quais categorias existem e, para cada uma:
      descrição, camas, capacidade, comodidades e fotos. Depois, mudar
      `status` para `'confirmado'` em `src/content/rooms.ts`. Categorias citadas
      (ainda não confirmadas): Suíte de 1 Quarto, Suíte Superior, Suíte Deluxe com
      Banheira de Hidromassagem, Estúdio Standard.

## Recomendado

- [ ] **Plataforma de origem das avaliações** e link público —
      `source.platform` e `source.url` em `src/content/reviews.ts` (ativa o
      botão "Consulte nossas avaliações"). Conferir notas periodicamente e
      atualizar `updatedAt`.
- [ ] **Autorização** para exibir o nome dos avaliadores nos depoimentos (`author`).
- [ ] **Horários de check-in e check-out** (FAQ).
- [ ] **Café da manhã**: incluso na diária ou cobrado à parte? (FAQ)
- [ ] **Quais unidades têm cozinha** com micro-ondas e frigobar.
- [ ] **Política de pets** detalhada (porte, valor, regras).
- [ ] **Estacionamento**: confirmar a ausência ou atualizar se mudar.
- [ ] **Suítes com varanda** (FAQ e galeria).
- [ ] **Redes sociais oficiais** — `social` em `src/config/site.ts`.
- [ ] **Dados legais** (razão social, CNPJ, Cadastur) — `legal` em `src/config/site.ts`.
- [ ] **Logotipo oficial**, se existir — substituir `src/components/Logo.astro`
      e regenerar os ícones (`scripts/generate-brand-assets.mjs`).
- [ ] **Atrações de Ouro Preto** com distâncias verificadas — `ouroPreto` em
      `src/content/location.ts`.

## Decisões tomadas

- Dados estruturados (`LodgingBusiness`) sem `aggregateRating`: o Google não
  aceita notas autodeclaradas de terceiros no próprio site.
- O mapa do Google só carrega após clique (privacidade e desempenho).
- A primeira dobra e a chamada final usam uma **ilustração** das serras sob o
  luar enquanto não houver fotos oficiais — não representa a propriedade.
- Fonte de títulos: **Playfair Display** (Cormorant Garamond desenha acentos
  do português, como "ê" e "ó", de forma irregular em tamanhos grandes).
