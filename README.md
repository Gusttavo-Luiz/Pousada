# Luar de Minas Suítes — site oficial

Site institucional e de reservas diretas do **Luar de Minas Suítes**
(Rua do Campo, 280 — Lavras Novas, MG — CEP 35450-000).

- **Estático e rápido**: páginas pré-renderizadas pelo [Astro](https://astro.build),
  sem frameworks no navegador — apenas pequenos scripts para menu, galeria,
  formulário e mapa.
- **Dados centralizados**: todo o conteúdo editável fica em `src/config/` e
  `src/content/`.
- **Sem informação inventada**: categorias de suíte, contatos, links e fotos
  só aparecem quando confirmados. O que falta está em
  [`docs/PENDENCIAS.md`](docs/PENDENCIAS.md).

## Seções

Cabeçalho (transparente → sólido, menu compacto no celular) · Hero · Apresentação ·
Acomodações · Experiência e comodidades · Galeria com visualizador · Avaliações ·
Localização com mapa sob demanda · Reservas diretas · Perguntas frequentes ·
Chamada final · Rodapé · Política de privacidade · Página 404.

## Comandos

Node.js **22.12+**.

| Comando | Ação |
| --- | --- |
| `npm install` | Instala as dependências |
| `npm run dev` | Desenvolvimento em `http://localhost:4321` (mostra conteúdo pendente, selos "a confirmar" e nomes dos arquivos de fotos) |
| `npm run build` | Verifica tipos e gera o site em `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm test` | Build + testes Playwright (desktop, tablet e celular) |

Para os testes: `npx playwright install chromium` (uma vez), ou aponte
`PW_CHROMIUM_PATH` para um Chromium já instalado.

Variáveis opcionais de build (veja `.env.example`):
`PUBLIC_SHOW_PENDING=true` mostra as acomodações ainda não confirmadas;
`PUBLIC_DEMO_MODE=true` gera a demonstração (sem envio e sem indexação).
Selos técnicos e nomes de arquivos aparecem só em `npm run dev`, nunca na
versão mostrada ao cliente.

## Onde editar o conteúdo

| Arquivo | Conteúdo |
| --- | --- |
| `src/config/site.ts` | Nome, domínio, endereço, WhatsApp/telefone/e-mail, motor de reservas, redes sociais, dados legais |
| `src/content/rooms.ts` | Acomodações — só `status: 'confirmado'` vai ao ar |
| `src/content/amenities.ts` | Comodidades e destaques |
| `src/content/reviews.ts` | Nota geral, notas por categoria, depoimentos, plataforma e link de origem |
| `src/content/location.ts` | Pontos de interesse e distâncias |
| `src/content/faq.ts` | Perguntas frequentes (também geram dados estruturados) |
| `src/content/photos.ts` | Fotos de destaque e da galeria |
| `src/assets/fotos/` | Arquivos das fotos oficiais ([lista de nomes](src/assets/fotos/README.md)) |
| `src/components/Logo.astro` | Marca tipográfica provisória |
| `src/styles/global.css` | Paleta, tipografia e estilos base |

## Como funciona a consulta de disponibilidade

1. O visitante escolhe check-in, check-out, adultos, crianças e quartos.
   O formulário impede datas passadas e check-out igual ou anterior ao check-in.
2. O envio segue o primeiro canal configurado em `src/config/site.ts`:
   **motor de reservas oficial** (`bookingEngineUrl`, com os dados preenchidos) →
   **WhatsApp oficial** (mensagem pronta) → **e-mail oficial** (mensagem pronta).
3. Sem nenhum canal configurado, o site valida os dados e informa com clareza
   que **nada foi enviado**. Não há disponibilidade, preço ou confirmação simulados.

## Publicação

O build gera arquivos estáticos em `dist/`, publicáveis em qualquer hospedagem
estática (Netlify, Vercel, Cloudflare Pages, servidor próprio etc.).
Antes de ir ao ar, preencha `url` em `src/config/site.ts` com o domínio oficial
(gera URLs canônicas, Open Graph e sitemap).

**Demonstração no GitHub Pages**: cada atualização da `main` publica uma versão
de demonstração em <https://gusttavo-luiz.github.io/Pousada/>
(`.github/workflows/pages.yml`). Configuração única no GitHub:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Imagens da marca

Favicons e `public/og-image.jpg` são gerados por
`node scripts/generate-brand-assets.mjs` (usa o Chromium do Playwright).
Rode novamente se a marca mudar.
