# Fotografias oficiais do Luar de Minas Suítes

Coloque aqui **somente fotografias reais da hospedagem** (ou de paisagens de
Lavras Novas), com o nome exato listado abaixo. Nunca use imagens de outras
hospedagens. JPG de boa qualidade, 2000 px ou mais no lado maior, sem marca
d'água. O build gera AVIF/WebP redimensionados automaticamente.

Enquanto um arquivo não existir, o site mostra uma moldura elegante no lugar
(e, na primeira dobra e na chamada final, uma ilustração das serras).

| Arquivo | Onde aparece |
| --- | --- |
| `hero.jpg` | Primeira dobra (suíte ou fachada — horizontal) |
| `sobre-01.jpg` | Apresentação — foto principal (vertical) |
| `sobre-02.jpg` | Apresentação — detalhe (quadrada) |
| `chamada-final.jpg` | Chamada final (paisagem horizontal) |
| `galeria-quarto-01.jpg` | Galeria — destaque do mosaico |
| `galeria-banheiro-01.jpg` | Galeria — Banheiros |
| `galeria-varanda-01.jpg` | Galeria — Varandas e terraços |
| `galeria-interior-01.jpg` | Galeria — Ambientes internos |
| `galeria-decoracao-01.jpg` | Galeria — Detalhes da decoração |
| `galeria-convivencia-01.jpg` | Galeria — Áreas de convivência (horizontal larga) |
| `galeria-paisagem-01.jpg` | Galeria — Paisagens de Lavras Novas |
| `galeria-quarto-02.jpg` | Galeria — Quartos e camas |
| `suite-1-quarto-01.jpg` … | Capa de cada acomodação (ver `src/content/rooms.ts`) |

Para mais fotos na galeria, acrescente entradas em `src/content/photos.ts`.
Para criar a galeria de uma acomodação, acrescente fotos ao campo `photos`
dela em `src/content/rooms.ts` (com 2 ou mais, o card ganha o botão
"Ver fotos").
