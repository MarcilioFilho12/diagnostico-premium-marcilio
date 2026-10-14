export type FieldType =
  | 'text'
  | 'textarea'
  | 'single'
  | 'multi'
  | 'links'

export type Question = {
  id: string
  label: string
  hint?: string
  type: FieldType
  options?: string[]
  maxSelections?: number
  allowOther?: boolean
  otherLabel?: string
  placeholder?: string
  linkSlots?: number
}

export type Step = {
  id: string
  number: string
  title: string
  subtitle: string
  questions: Question[]
}

export const STEPS: Step[] = [
  {
    id: 'descoberta',
    number: '01',
    title: 'Descoberta',
    subtitle: 'Negócio, público e o que o site precisa conquistar.',
    questions: [
      {
        id: 'empresa',
        label: 'Qual é o nome da empresa e o que ela faz?',
        type: 'textarea',
        placeholder: 'Ex.: NovaForge — soluções de automação industrial sob medida.',
      },
      {
        id: 'segmento',
        label: 'Em qual segmento atua?',
        type: 'text',
        placeholder: 'Ex.: indústria, serviços premium, SaaS, varejo…',
      },
      {
        id: 'produtos',
        label: 'Quais são os principais produtos ou serviços?',
        type: 'textarea',
        placeholder: 'Liste o que mais importa comercialmente.',
      },
      {
        id: 'proposito',
        label: 'Qual é o principal propósito da empresa?',
        hint: 'O que ela busca transformar ou melhorar.',
        type: 'textarea',
        placeholder: 'Em poucas frases, com suas palavras.',
      },
      {
        id: 'diferencial',
        label: 'O que faz sua empresa ser diferente das outras?',
        type: 'textarea',
        placeholder: 'O que só vocês fazem — ou fazem melhor.',
      },
      {
        id: 'pontos_fortes',
        label: 'Quais são os três principais pontos fortes?',
        type: 'textarea',
        placeholder: '1. …  2. …  3. …',
      },
      {
        id: 'cliente_ideal',
        label: 'Quem é o cliente ideal?',
        type: 'textarea',
        placeholder: 'Cargo, tipo de empresa, momento de vida ou compra…',
      },
      {
        id: 'problema_cliente',
        label: 'Qual problema ou desejo leva esse cliente até vocês?',
        type: 'textarea',
      },
      {
        id: 'inseguranca',
        label: 'O que normalmente gera insegurança e impede o fechamento?',
        type: 'textarea',
      },
      {
        id: 'tom_marca',
        label: 'Se pudesse escolher, a marca deveria transmitir principalmente:',
        type: 'single',
        options: [
          'Sofisticação e exclusividade',
          'Autoridade e confiança',
          'Inovação e tecnologia',
          'Proximidade e acolhimento',
          'Força e imponência',
          'Simplicidade e eficiência',
          'Criatividade e personalidade',
          'Tradição e solidez',
        ],
        allowOther: true,
        otherLabel: 'Outra característica',
      },
      {
        id: 'objetivos_site',
        label: 'Escolha até dois objetivos principais do site',
        type: 'multi',
        maxSelections: 2,
        options: [
          'Gerar contatos e pedidos de orçamento',
          'Vender produtos ou serviços',
          'Apresentar a empresa e fortalecer a reputação',
          'Atrair clientes de maior valor',
          'Lançar um produto ou serviço',
          'Demonstrar projetos, resultados ou portfólio',
          'Explicar uma solução complexa',
          'Facilitar o atendimento e reduzir dúvidas',
          'Atrair parceiros, investidores ou talentos',
        ],
        allowOther: true,
        otherLabel: 'Outro objetivo',
      },
      {
        id: 'proxima_acao',
        label: 'O que o visitante deveria fazer depois de conhecer o site?',
        type: 'textarea',
        placeholder: 'Ex.: solicitar orçamento, WhatsApp, agendar reunião…',
      },
      {
        id: 'sinal_sucesso',
        label: 'Qual seria o sinal mais claro de que o site deu certo?',
        type: 'textarea',
      },
    ],
  },
  {
    id: 'conceito',
    number: '02',
    title: 'Conceito',
    subtitle: 'A história, a mensagem e a personalidade da experiência.',
    questions: [
      {
        id: 'mensagem_unica',
        label: 'Se o site pudesse transmitir apenas uma mensagem, qual seria?',
        type: 'textarea',
      },
      {
        id: 'primeiros_segundos',
        label: 'O que o cliente precisa perceber ou sentir nos primeiros segundos?',
        type: 'textarea',
      },
      {
        id: 'transformacao',
        label: 'Qual é a principal transformação que a empresa proporciona?',
        hint: 'Ex.: de processo complicado para operação simples; de dúvida para decisão segura.',
        type: 'textarea',
      },
      {
        id: 'ambiente',
        label: 'Se a empresa fosse um ambiente físico, como seria?',
        type: 'single',
        options: [
          'Galeria de arte contemporânea',
          'Laboratório de inovação',
          'Escritório executivo sofisticado',
          'Indústria de alta precisão',
          'Espaço acolhedor e humano',
          'Showroom de produto',
        ],
        allowOther: true,
        otherLabel: 'Outro ambiente',
      },
      {
        id: 'personagem',
        label: 'Se a marca fosse um personagem, como se comportaria?',
        type: 'single',
        options: [
          'Segura e objetiva',
          'Curiosa e exploradora',
          'Elegante e discreta',
          'Ousada e provocadora',
          'Técnica e precisa',
          'Próxima e consultiva',
        ],
        allowOther: true,
        otherLabel: 'Outro comportamento',
      },
      {
        id: 'jamais',
        label: 'O que o site jamais deveria parecer ou transmitir?',
        type: 'textarea',
      },
      {
        id: 'referencias',
        label: 'Sites ou marcas que você considera visualmente excelentes',
        hint: 'Até 3 links. Explique brevemente o que gosta em cada um.',
        type: 'links',
        linkSlots: 3,
      },
      {
        id: 'historia',
        label: 'Existe uma história, conquista ou princípio que merece ser contado?',
        type: 'textarea',
        allowOther: false,
        placeholder: 'Se não houver, pode deixar em branco ou escrever “ainda não”.',
      },
    ],
  },
  {
    id: 'experiencia',
    number: '03',
    title: 'Experiência',
    subtitle: 'Visual, conteúdo, navegação e como o site se comporta.',
    questions: [
      {
        id: 'impressao_visual',
        label: 'Qual impressão o site deve transmitir principalmente?',
        type: 'single',
        options: [
          'Premium e sofisticado',
          'Moderno e tecnológico',
          'Minimalista e elegante',
          'Forte e impactante',
          'Humano e próximo',
          'Corporativo e confiável',
          'Experimental e criativo',
          'Natural e orgânico',
        ],
        allowOther: true,
        otherLabel: 'Outra impressão',
      },
      {
        id: 'tipo_imagem',
        label: 'O que melhor representa a empresa visualmente?',
        type: 'single',
        options: [
          'Fotografias reais da empresa, equipe ou produtos',
          'Fotografias conceituais e imagens de atmosfera',
          'Ilustrações e elementos gráficos autorais',
          'Modelos e objetos tridimensionais',
          'Texturas, formas e composições abstratas',
          'Gráficos, dados e visualizações',
          'Uma combinação desses recursos',
        ],
        allowOther: true,
        otherLabel: 'Outro recurso visual',
      },
      {
        id: 'comunicacao',
        label: 'Como a empresa costuma se comunicar?',
        type: 'single',
        options: [
          'Direta e objetiva',
          'Técnica e detalhada',
          'Institucional e formal',
          'Próxima e conversacional',
          'Inspiradora e aspiracional',
          'Provocadora e ousada',
        ],
        allowOther: true,
        otherLabel: 'Outro tom',
      },
      {
        id: 'secoes',
        label: 'Quais informações são indispensáveis no site?',
        type: 'multi',
        options: [
          'Apresentação da empresa',
          'Principais produtos ou serviços',
          'Benefícios e diferenciais',
          'Como funciona a solução',
          'Projetos, portfólio ou aplicações',
          'Resultados e casos de sucesso',
          'Clientes, parceiros ou certificações',
          'Depoimentos e avaliações',
          'Equipe, história ou propósito',
          'Perguntas frequentes',
          'Contato e solicitação de orçamento',
          'Conteúdo educativo ou artigos',
        ],
        allowOther: true,
        otherLabel: 'Outra informação',
      },
      {
        id: 'estrutura',
        label: 'Como o visitante deve conhecer a empresa?',
        type: 'single',
        options: [
          'Uma página principal que conduza toda a experiência',
          'Páginas separadas para cada assunto',
          'Uma combinação das duas',
          'Não sei; quero uma recomendação',
        ],
      },
      {
        id: 'ritmo',
        label: 'Qual sensação combina mais com o ritmo do site?',
        type: 'single',
        options: [
          'Suave, elegante e fluido',
          'Rápido, preciso e eficiente',
          'Cinematográfico e imersivo',
          'Dinâmico e energético',
          'Minimalista, com movimentos discretos',
          'Uma combinação equilibrada',
          'Não sei; quero uma recomendação',
        ],
      },
      {
        id: 'interacoes',
        label: 'Quais experiências você considera interessantes?',
        type: 'multi',
        options: [
          'Elementos que aparecem suavemente durante a navegação',
          'Imagens que se transformam ou revelam detalhes',
          'Demonstrações interativas de produtos',
          'Animações que explicam processos',
          'Efeitos de profundidade e perspectiva',
          'Ambientes tridimensionais ou experiências imersivas',
          'Transições sofisticadas entre seções',
          'Pequenos detalhes interativos ao passar ou clicar',
          'Prefiro uma experiência mais simples e objetiva',
          'Não sei; quero uma recomendação',
        ],
        allowOther: true,
        otherLabel: 'Outra interação (ou link de referência)',
      },
      {
        id: 'acesso',
        label: 'Como os clientes costumam acessar o site?',
        type: 'single',
        options: [
          'Principalmente pelo celular',
          'Principalmente pelo computador',
          'De forma equilibrada entre os dois',
          'Não tenho essa informação',
        ],
      },
      {
        id: 'funcionalidades',
        label: 'Quais funcionalidades são indispensáveis?',
        type: 'multi',
        options: [
          'Formulário de contato',
          'Integração com WhatsApp',
          'Agendamento',
          'Catálogo de produtos',
          'Área do cliente',
          'Pagamento online',
          'Acesso a sistemas internos',
        ],
        allowOther: true,
        otherLabel: 'Outra funcionalidade',
      },
      {
        id: 'pior_cenario',
        label: 'O que seria pior para sua empresa?',
        type: 'single',
        options: [
          'Um site visualmente simples demais',
          'Uma experiência bonita, mas lenta e difícil de usar',
        ],
      },
    ],
  },
  {
    id: 'futuro',
    number: '04',
    title: 'Futuro',
    subtitle: 'Ambição, prioridades e o que não pode se perder.',
    questions: [
      {
        id: 'visao_anos',
        label: 'Como você imagina a empresa daqui a dois ou três anos?',
        type: 'textarea',
      },
      {
        id: 'site_representa',
        label: 'O site precisa representar:',
        type: 'single',
        options: [
          'Apenas a empresa de hoje',
          'Também a empresa que estamos nos preparando para ser',
        ],
        allowOther: true,
        otherLabel: 'Outra visão',
      },
      {
        id: 'tres_palavras',
        label: 'Três palavras para definir a experiência ideal',
        type: 'text',
        placeholder: 'Ex.: precisa · elegante · memorável',
      },
      {
        id: 'mensagem_inalteravel',
        label: 'Qual mensagem não pode se perder na criação do site?',
        type: 'textarea',
      },
      {
        id: 'maior_erro',
        label: 'Qual é o maior erro que precisamos evitar neste projeto?',
        type: 'textarea',
      },
      {
        id: 'nao_perguntamos',
        label: 'O que ainda não perguntamos e é importante?',
        hint: 'Espaço livre para acrescentar qualquer coisa.',
        type: 'textarea',
        placeholder: 'Contexto comercial, restrições, desejos, prazos…',
      },
      {
        id: 'exatamente_isso',
        label: 'O que mais faria você olhar o site pronto e pensar: “É exatamente isso”?',
        type: 'textarea',
      },
      {
        id: 'contato',
        label: 'Seu nome e e-mail ou WhatsApp para retorno',
        type: 'text',
        placeholder: 'Nome · contato',
      },
    ],
  },
]

export type AnswerValue = {
  selected?: string | string[]
  other?: string
  text?: string
  links?: { url: string; note: string }[]
}

export type Answers = Record<string, AnswerValue>
