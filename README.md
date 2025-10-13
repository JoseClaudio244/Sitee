# InfoCell - Sistema de Assistência Técnica

Sistema completo de gerenciamento para assistência técnica de celulares, desenvolvido com Next.js, Supabase e Tailwind CSS.

## 🚀 Funcionalidades

### Site Público
- **Landing Page Profissional**: Apresentação da empresa com design moderno usando as cores da marca (azul #00A8FF e verde #00FF00)
- **Catálogo de Serviços**: Exibição de todos os serviços oferecidos com preços
- **Informações de Contato**: Links diretos para WhatsApp e Instagram
- **Responsivo**: Design otimizado para desktop e mobile

### Painel Administrativo

#### Dashboard
- Visão geral com estatísticas em tempo real
- Total de ordens (pendentes, em andamento, concluídas)
- Receita total de ordens finalizadas
- Total de clientes cadastrados
- Lista de ordens recentes

#### Gerenciamento de Ordens de Serviço
- **Criar Ordens**: Formulário completo para cadastro de novas ordens
  - Seleção de serviços do catálogo
  - Edição de preços individuais
  - Cálculo automático do total
  - Cadastro de informações do cliente e dispositivo
- **Listar Ordens**: Tabela com todas as ordens
  - Busca por cliente, dispositivo ou problema
  - Filtro por status (pendente, em andamento, concluída, entregue, cancelada)
  - Visualização rápida de informações importantes
- **Detalhes da Ordem**: Página completa com:
  - Informações do cliente e dispositivo
  - Atualização de status
  - Definição de valor final
  - Adição de observações
  - Função de impressão para recibos

#### Gerenciamento de Clientes
- Lista completa de clientes cadastrados
- Busca por nome, telefone ou email
- Visualização de dados de contato
- Clientes são criados automaticamente ao criar ordens

#### Catálogo de Serviços
- **Adicionar Serviços**: Criar novos serviços com nome, descrição e preço
- **Editar Serviços**: Atualizar informações de serviços existentes
- **Excluir Serviços**: Remover serviços que não são mais oferecidos
- Serviços pré-cadastrados incluem:
  - Troca de Tela
  - Troca de Bateria
  - Reparo de Placa
  - Troca de Conector de Carga
  - Limpeza e Manutenção
  - Desbloqueio de Aparelho

#### Relatórios Financeiros
- **Receita Total**: Soma de todas as ordens concluídas e entregues
- **Receita Mensal**: Faturamento do mês atual
- **Ticket Médio**: Valor médio por ordem de serviço
- **Ordens Concluídas**: Total de serviços finalizados
- Lista detalhada de ordens concluídas com valores

## 🔐 Autenticação e Segurança

- Sistema de login com email e senha
- Página de cadastro para novos técnicos
- Proteção de rotas administrativas via middleware
- Row Level Security (RLS) no Supabase para proteção de dados
- Apenas usuários autenticados podem acessar o painel admin

## 🗄️ Banco de Dados

### Tabelas
- **profiles**: Perfis de técnicos/usuários
- **customers**: Clientes da assistência técnica
- **services**: Catálogo de serviços oferecidos
- **repair_orders**: Ordens de serviço/reparo

### Políticas de Segurança (RLS)
Todas as tabelas possuem Row Level Security habilitado, garantindo que apenas usuários autenticados possam acessar e modificar dados.

## 📱 Tecnologias Utilizadas

- **Next.js 15**: Framework React com App Router
- **Supabase**: Backend as a Service (autenticação e banco de dados PostgreSQL)
- **Tailwind CSS v4**: Framework CSS utilitário
- **shadcn/ui**: Componentes de UI reutilizáveis
- **TypeScript**: Tipagem estática para maior segurança

## 🎨 Design

- Cores da marca: Azul (#00A8FF) e Verde (#00FF00)
- Design moderno e profissional
- Interface responsiva para todos os dispositivos
- Componentes acessíveis e otimizados

## 📋 Como Usar

### Configuração Inicial

1. **Execute os scripts SQL** na ordem:
   - `001_create_tables.sql` - Cria as tabelas
   - `002_profile_trigger.sql` - Configura trigger para perfis
   - `003_seed_services.sql` - Adiciona serviços iniciais

2. **Crie sua conta de técnico**:
   - Acesse `/auth/sign-up`
   - Preencha email, senha e nome completo
   - Confirme o email (verifique sua caixa de entrada)

3. **Faça login**:
   - Acesse `/auth/login`
   - Entre com suas credenciais

### Fluxo de Trabalho

1. **Receber Cliente**:
   - Acesse "Ordens de Serviço" → "Nova Ordem"
   - Preencha dados do cliente e dispositivo
   - Selecione serviços do catálogo (preços editáveis)
   - Salve a ordem

2. **Acompanhar Reparo**:
   - Clique na ordem para ver detalhes
   - Atualize o status conforme o progresso
   - Adicione observações sobre o reparo
   - Defina o valor final

3. **Finalizar Serviço**:
   - Marque status como "Concluída"
   - Imprima o recibo usando o botão "Imprimir"
   - Atualize para "Entregue" após entrega ao cliente

4. **Gerenciar Catálogo**:
   - Acesse "Serviços" para adicionar/editar serviços
   - Ajuste preços conforme necessário
   - Mantenha o catálogo atualizado

5. **Acompanhar Finanças**:
   - Acesse "Relatórios" para ver estatísticas financeiras
   - Monitore receita total e mensal
   - Analise ticket médio

## 🔗 Links Importantes

- **Site Público**: `/`
- **Login**: `/auth/login`
- **Cadastro**: `/auth/sign-up`
- **Dashboard Admin**: `/admin`
- **Ordens**: `/admin/orders`
- **Clientes**: `/admin/customers`
- **Serviços**: `/admin/services`
- **Relatórios**: `/admin/reports`

## 📞 Contato InfoCell

- **WhatsApp**: 82 99119-0301
- **Instagram**: @info_cell082

## 🛠️ Manutenção

### Backup de Dados
Recomenda-se fazer backup regular do banco de dados Supabase através do painel administrativo do Supabase.

### Atualizações
O sistema está pronto para uso e pode ser expandido com novas funcionalidades conforme necessário.

---

Desenvolvido para InfoCell - Assistência Técnica Especializada
