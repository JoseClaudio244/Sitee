-- Tabela de perfis de usuários (técnicos)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'technician',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de serviços oferecidos
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  estimated_price DECIMAL(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de ordens de serviço
CREATE TABLE IF NOT EXISTS public.repair_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  technician_id UUID REFERENCES public.profiles(id),
  device_type TEXT NOT NULL,
  device_brand TEXT NOT NULL,
  device_model TEXT,
  problem_description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'delivered', 'cancelled')),
  estimated_cost DECIMAL(10, 2),
  final_cost DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_orders ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para customers (técnicos autenticados podem ver todos)
CREATE POLICY "customers_select_authenticated" ON public.customers 
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "customers_insert_authenticated" ON public.customers 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "customers_update_authenticated" ON public.customers 
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "customers_delete_authenticated" ON public.customers 
  FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas RLS para services (técnicos autenticados podem ver todos)
CREATE POLICY "services_select_authenticated" ON public.services 
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "services_insert_authenticated" ON public.services 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "services_update_authenticated" ON public.services 
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "services_delete_authenticated" ON public.services 
  FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas RLS para repair_orders (técnicos autenticados podem ver todos)
CREATE POLICY "repair_orders_select_authenticated" ON public.repair_orders 
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "repair_orders_insert_authenticated" ON public.repair_orders 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "repair_orders_update_authenticated" ON public.repair_orders 
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "repair_orders_delete_authenticated" ON public.repair_orders 
  FOR DELETE USING (auth.role() = 'authenticated');
