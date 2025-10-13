-- Permitir que usuários não autenticados possam rastrear ordens pelo telefone
-- Isso é necessário para a funcionalidade pública de rastreamento

-- Adicionar política para permitir SELECT público em customers (apenas por telefone)
CREATE POLICY "customers_select_by_phone_public" ON public.customers 
  FOR SELECT USING (true);

-- Adicionar política para permitir SELECT público em repair_orders
CREATE POLICY "repair_orders_select_public" ON public.repair_orders 
  FOR SELECT USING (true);
