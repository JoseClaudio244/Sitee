-- Inserir serviços comuns de assistência técnica
INSERT INTO public.services (name, description, estimated_price) VALUES
  ('Troca de Tela', 'Substituição completa da tela do dispositivo', 250.00),
  ('Troca de Bateria', 'Substituição da bateria original', 150.00),
  ('Reparo de Placa', 'Diagnóstico e reparo de placa-mãe', 300.00),
  ('Troca de Conector de Carga', 'Substituição do conector de carga', 100.00),
  ('Limpeza Interna', 'Limpeza completa dos componentes internos', 80.00),
  ('Atualização de Software', 'Atualização e otimização do sistema', 60.00),
  ('Recuperação de Dados', 'Recuperação de arquivos e dados', 200.00),
  ('Troca de Câmera', 'Substituição de câmera frontal ou traseira', 180.00)
ON CONFLICT DO NOTHING;
