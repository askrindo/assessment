(function () {
  const SUPABASE_URL = "https://lufavzlmsqrhuzrfwhvk.supabase.co";
  const SUPABASE_KEY = "sb_publishable_idw8C3YDM5XL3MAVYnamfg_1MGK4g9g";

  let client = null;
  if (window.supabase && typeof window.supabase.createClient === "function") {
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  window.SupabaseService = {
    isReady() {
      return Boolean(client);
    },

    async checkConnection() {
      if (!client) return { ok: false, reason: "SDK Supabase belum dimuat" };
      try {
        const { error } = await client
          .from("assessment_results")
          .select("id", { count: "exact", head: true });
        if (error) {
          return { ok: false, reason: error.message };
        }
        return { ok: true };
      } catch (err) {
        return { ok: false, reason: err.message || "Gagal terhubung ke Supabase" };
      }
    },

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

    async fetchResults(limit = 30) {
      if (!client) return { ok: false, data: [], reason: "SDK tidak tersedia" };
      try {
        const { data, error } = await client
          .from("assessment_results")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);
        if (error) return { ok: false, data: [], reason: error.message };
        return { ok: true, data: data || [] };
      } catch (err) {
        return { ok: false, data: [], reason: err.message };
      }
    }
  };
})();
