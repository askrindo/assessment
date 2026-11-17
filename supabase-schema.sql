-- Jalankan SQL ini di Supabase Dashboard -> SQL Editor
-- untuk membuat tabel penyimpanan hasil simulasi asesmen.

create table if not exists public.assessment_results (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  participant_name text default 'Anonim',
  participant_nip text default '-',
  grade text not null,
  unit text not null,
  score integer not null,
  status text not null,
  details jsonb default '[]'::jsonb
);

-- Aktifkan Row Level Security (RLS)
alter table public.assessment_results enable row level security;

-- Izinkan insert & select menggunakan publishable key untuk simulasi
create policy "Allow public insert on assessment_results"
  on public.assessment_results
  for insert
  to anon
  with check (true);

create policy "Allow public select on assessment_results"
  on public.assessment_results
  for select
  to anon
  using (true);
