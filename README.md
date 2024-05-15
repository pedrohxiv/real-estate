## Projeto Real Estate

## Descrição do Projeto

O Real Estate é uma aplicação completa de imóveis desenvolvida com Next.js, React.js, TailwindCSS e Supabase, onde eu criei e implantei uma aplicação moderna de imóveis a partir do zero, onde os usuários podem cadastrar e listar imóveis disponíveis para compra ou aluguel.

## Principais Funcionalidades

- **UI Deslumbrante com TailwindCSS:** Criei uma interface do usuário deslumbrante e responsiva utilizando TailwindCSS.

- **Backend sem interrupções com Supabase:** Utilizei Supabase para operações de backend sem interrupções, incluindo armazenamento de dados e autenticação.

- **Cadastro e Listagem de Imóveis:** Permite que os usuários cadastrem e listem imóveis disponíveis para compra ou aluguel.

- **Pesquisa Avançada de Imóveis:** Implementei uma pesquisa avançada de imóveis com filtros por tipo, preço, localização e mais.

- **Mapas Interativos:** Integrei mapas interativos utilizando Google Maps API para visualização precisa de localizações de imóveis.

- **Carousel de Imagens:** Exibe imagens de imóveis em um carousel interativo utilizando Embla Carousel React.

- **Formulários com Formik:** Utilizei Formik para simplificar a criação e validação de formulários de cadastro de imóveis.

- **Integração com Google Places:** Facilitei a entrada de endereços utilizando o Google Places Autocomplete.

## Dependências

O projeto utiliza diversas dependências para garantir seu funcionamento suave:

- `@clerk/nextjs:` ^5.0.3
- `@radix-ui/react-alert-dialog:` ^1.0.5
- `@radix-ui/react-dropdown-menu:` ^2.0.6
- `@radix-ui/react-label:` ^2.0.2
- `@radix-ui/react-radio-group:` ^1.1.3
- `@radix-ui/react-select:` ^2.0.0
- `@radix-ui/react-slot:` ^1.0.2
- `@radix-ui/react-toast:` ^1.1.5
- `@react-google-maps/api:` ^2.19.3
- `@supabase/supabase-js:` ^2.43.0
- `class-variance-authority:` ^0.7.0
- `clsx:` ^2.1.1
- `embla-carousel-react:` ^8.0.4
- `formik:` ^2.4.6
- `lucide-react:` ^0.376.0
- `next:` 14.2.3
- `react:` ^18
- `react-dom:` ^18
- `react-google-places-autocomplete:` ^4.0.1
- `tailwind-merge:` ^2.3.0
- `tailwindcss-animate:` ^1.0.7
- `@types/node:` ^20
- `@types/react:` ^18
- `@types/react-dom:` ^18
- `postcss:` ^8
- `tailwindcss:` ^3.4.1
- `typescript:` ^5

## Como Executar o Projeto

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js e o npm (ou yarn) instalados.
3. Instale as dependências do projeto utilizando o seguinte comando:

```bash
npm install
# ou
yarn install
```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes chaves e seus respectivos valores:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=seu_valor_aqui
CLERK_SECRET_KEY=seu_valor_aqui
NEXT_PUBLIC_CLERK_SIGN_IN_URL=seu_valor_aqui
NEXT_PUBLIC_CLERK_SIGN_UP_URL=seu_valor_aqui
NEXT_PUBLIC_SUPABASE_URL=seu_valor_aqui
NEXT_PUBLIC_SUPABASE_API_KEY=seu_valor_aqui
NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=seu_valor_aqui
NEXT_PUBLIC_IMAGE_URL=seu_valor_aqui
```

Certifique-se de substituir `seu_valor_aqui` pelos valores corretos de cada chave.

5. Para iniciar o servidor de desenvolvimento, utilize o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

6. O projeto estará disponível em `http://localhost:3000`.
