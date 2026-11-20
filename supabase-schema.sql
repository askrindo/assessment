-- Jalankan SQL ini di Supabase Dashboard -> SQL Editor
-- 1. Tabel hasil simulasi asesmen
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

alter table public.assessment_results enable row level security;

drop policy if exists "Allow public insert on assessment_results" on public.assessment_results;
create policy "Allow public insert on assessment_results"
  on public.assessment_results for insert to anon with check (true);

drop policy if exists "Allow public select on assessment_results" on public.assessment_results;
create policy "Allow public select on assessment_results"
  on public.assessment_results for select to anon using (true);

-- 2. Tabel user pegawai & admin
create table if not exists public.app_users (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nip text unique not null,
  full_name text not null,
  password_hash text not null,
  role text not null default 'pegawai' check (role in ('admin', 'pegawai')),
  grade text not null default 'BOD-4' check (grade in ('BOD-3', 'BOD-4', 'BOD-5')),
  unit text not null default 'Underwriting & Klaim',
  is_active boolean not null default true,
  allow_all_grades boolean not null default false
);

alter table public.app_users add column if not exists allow_all_grades boolean not null default false;

alter table public.app_users enable row level security;

drop policy if exists "Allow public read app_users" on public.app_users;
create policy "Allow public read app_users"
  on public.app_users for select to anon using (true);

drop policy if exists "Allow public insert app_users" on public.app_users;
create policy "Allow public insert app_users"
  on public.app_users for insert to anon with check (true);

drop policy if exists "Allow public update app_users" on public.app_users;
create policy "Allow public update app_users"
  on public.app_users for update to anon using (true) with check (true);

drop policy if exists "Allow public delete app_users" on public.app_users;
create policy "Allow public delete app_users"
  on public.app_users for delete to anon using (true);

-- 3. Seed akun Admin default (NIP/Username: admin | Password: admin123)
insert into public.app_users (nip, full_name, password_hash, role, grade, unit, is_active)
values (
  'admin',
  'Administrator SDM',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
  'admin',
  'BOD-3',
  'Semua',
  true
)
on conflict (nip) do nothing;

-- 4. Storage Bucket untuk Rekaman Video Presentasi & Suara Telepon
insert into storage.buckets (id, name, public)
values ('assessment-media', 'assessment-media', true)
on conflict (id) do nothing;

drop policy if exists "Allow public upload assessment-media" on storage.objects;
create policy "Allow public upload assessment-media"
  on storage.objects for insert to anon with check (bucket_id = 'assessment-media');

drop policy if exists "Allow public read assessment-media" on storage.objects;
create policy "Allow public read assessment-media"
  on storage.objects for select to anon using (bucket_id = 'assessment-media');
