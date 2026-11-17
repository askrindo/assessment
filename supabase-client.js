(function () {
  const SUPABASE_URL = "https://lufavzlmsqrhuzrfwhvk.supabase.co";
  const SUPABASE_KEY = "sb_publishable_idw8C3YDM5XL3MAVYnamfg_1MGK4g9g";

  let client = null;
  if (window.supabase && typeof window.supabase.createClient === "function") {
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async function hashPassword(plain) {
    const enc = new TextEncoder().encode(plain);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  window.SupabaseService = {
    isReady() {
      return Boolean(client);
    },

    hashPassword,

    async checkConnection() {
      if (!client) return { ok: false, reason: "SDK Supabase belum dimuat" };
      try {
        const { error } = await client
          .from("app_users")
          .select("id", { count: "exact", head: true });
        if (error) return { ok: false, reason: error.message };
        return { ok: true };
      } catch (err) {
        return { ok: false, reason: err.message || "Gagal terhubung ke Supabase" };
      }
    },

    // ===== AUTH & USERS =====
    async login(nip, password) {
      if (!client) return { ok: false, reason: "SDK tidak tersedia" };
      try {
        const pwHash = await hashPassword(password);
        const { data, error } = await client
          .from("app_users")
          .select("id, nip, full_name, role, grade, unit, is_active, password_hash")
          .eq("nip", nip.trim())
          .maybeSingle();

        if (error) return { ok: false, reason: error.message };
        if (!data) return { ok: false, reason: "NIP / Username tidak ditemukan." };
        if (!data.is_active) return { ok: false, reason: "Akun Anda sedang dinonaktifkan oleh Admin." };
        if (data.password_hash !== pwHash) return { ok: false, reason: "Password salah." };

        const user = {
          id: data.id,
          nip: data.nip,
          full_name: data.full_name,
          role: data.role,
          grade: data.grade,
          unit: data.unit
        };
        return { ok: true, user };
      } catch (err) {
        return { ok: false, reason: err.message };
      }
    },

    async createUser({ nip, full_name, password, role = "pegawai", grade = "BOD-4", unit = "Underwriting & Klaim", is_active = true }) {
      if (!client) return { ok: false, reason: "SDK tidak tersedia" };
      try {
        const pwHash = await hashPassword(password);
        const { data, error } = await client
          .from("app_users")
          .insert([{ nip: nip.trim(), full_name: full_name.trim(), password_hash: pwHash, role, grade, unit, is_active }])
          .select("id, nip, full_name, role, grade, unit, is_active")
          .single();
        if (error) return { ok: false, reason: error.message };
        return { ok: true, user: data };
      } catch (err) {
        return { ok: false, reason: err.message };
      }
    },

    async fetchAllUsers() {
      if (!client) return { ok: false, data: [], reason: "SDK tidak tersedia" };
      try {
        const { data, error } = await client
          .from("app_users")
          .select("id, created_at, nip, full_name, role, grade, unit, is_active")
          .order("created_at", { ascending: false });
        if (error) return { ok: false, data: [], reason: error.message };
        return { ok: true, data: data || [] };
      } catch (err) {
        return { ok: false, data: [], reason: err.message };
      }
    },

    async updateUser(id, fields) {
      if (!client) return { ok: false, reason: "SDK tidak tersedia" };
      try {
        const payload = { ...fields };
        if (payload.password) {
          payload.password_hash = await hashPassword(payload.password);
          delete payload.password;
        }
        const { error } = await client.from("app_users").update(payload).eq("id", id);
        if (error) return { ok: false, reason: error.message };
        return { ok: true };
      } catch (err) {
        return { ok: false, reason: err.message };
      }
    },

    async deleteUser(id) {
      if (!client) return { ok: false, reason: "SDK tidak tersedia" };
      try {
        const { error } = await client.from("app_users").delete().eq("id", id);
        if (error) return { ok: false, reason: error.message };
        return { ok: true };
      } catch (err) {
        return { ok: false, reason: err.message };
      }
    },

    // ===== ASSESSMENT RESULTS =====
    async saveResult(entry) {
      if (!client) return { ok: false, reason: "SDK tidak tersedia" };
      try {
        const { data, error } = await client
          .from("assessment_results")
          .insert([
            {
              participant_name: entry.participantName || "Anonim",
              participant_nip: entry.participantNip || "-",
              grade: entry.grade,
              unit: entry.unit,
              score: entry.score,
              status: entry.status,
              details: entry.details || []
            }
          ])
          .select();
        if (error) return { ok: false, reason: error.message };
        return { ok: true, data };
      } catch (err) {
        return { ok: false, reason: err.message };
      }
    },

    async fetchResults(limit = 50, nipFilter = null) {
      if (!client) return { ok: false, data: [], reason: "SDK tidak tersedia" };
      try {
        let q = client
          .from("assessment_results")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);
        if (nipFilter) {
          q = q.eq("participant_nip", nipFilter);
        }
        const { data, error } = await q;
        if (error) return { ok: false, data: [], reason: error.message };
        return { ok: true, data: data || [] };
      } catch (err) {
        return { ok: false, data: [], reason: err.message };
      }
    }
  };
})();
