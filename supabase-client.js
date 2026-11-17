(function () {
  const SUPABASE_URL = "https://lufavzlmsqrhuzrfwhvk.supabase.co";
  const SUPABASE_KEY = "sb_publishable_idw8C3YDM5XL3MAVYnamfg_1MGK4g9g";

  const BASE_HEADERS = {
    apikey: SUPABASE_KEY,
    Authorization: "Bearer " + SUPABASE_KEY,
    "Content-Type": "application/json"
  };

  // Pure JS SHA-256 fallback (berfungsi di file:// maupun HTTP/HTTPS)
  function sha256Fallback(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = "length";
    var i, j;
    var result = "";
    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    var hash = (sha256Fallback.h = sha256Fallback.h || []);
    var k = (sha256Fallback.k = sha256Fallback.k || []);
    var primeCounter = k[lengthProperty];
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += "\x80";
    while ((ascii[lengthProperty] % 64) - 56) ascii += "\x00";
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return "";
      words[i >> 2] |= j << (((3 - i) % 4) * 8);
    }
    words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
    words[words[lengthProperty]] = asciiBitLength;
    for (j = 0; j < words[lengthProperty]; ) {
      var w = words.slice(j, (j += 16));
      var oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15],
          w2 = w[i - 2];
        var a = hash[0],
          e = hash[4];
        var temp1 =
          hash[7] +
          (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
          ((e & hash[5]) ^ (~e & hash[6])) +
          k[i] +
          (w[i] =
            i < 16
              ? w[i]
              : (w[i - 16] +
                  (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                  w[i - 7] +
                  (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
                0);
        var temp2 =
          (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
          ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }
    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        var b = (hash[i] >> (j * 8)) & 255;
        result += (b < 16 ? 0 : "") + b.toString(16);
      }
    }
    return result;
  }

  async function hashPassword(plain) {
    if (window.crypto && window.crypto.subtle) {
      try {
        const enc = new TextEncoder().encode(plain);
        const buf = await window.crypto.subtle.digest("SHA-256", enc);
        return Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      } catch {
        // fallback below
      }
    }
    const utf8 = unescape(encodeURIComponent(plain));
    return sha256Fallback(utf8);
  }

  async function rest(path, options = {}) {
    const res = await fetch(SUPABASE_URL + "/rest/v1/" + path, {
      ...options,
      headers: { ...BASE_HEADERS, ...(options.headers || {}) }
    });
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
    if (!res.ok) {
      const msg = (data && data.message) || (data && data.hint) || res.statusText || "Request gagal";
      throw new Error(msg);
    }
    return data;
  }

  window.SupabaseService = {
    isReady() {
      return true;
    },

    hashPassword,

    async checkConnection() {
      try {
        await rest("app_users?select=id&limit=1");
        return { ok: true };
      } catch (err) {
        return { ok: false, reason: err.message || "Gagal terhubung ke Supabase" };
      }
    },

    async login(nip, password) {
      try {
        const pwHash = await hashPassword(password);
        const rows = await rest(
          `app_users?select=id,nip,full_name,role,grade,unit,is_active,allow_all_grades,password_hash&nip=eq.${encodeURIComponent(nip.trim())}&limit=1`
        );
        const data = rows && rows[0];
        if (!data) return { ok: false, reason: "NIP / Username tidak ditemukan." };
        if (!data.is_active) return { ok: false, reason: "Akun Anda belum diverifikasi atau sedang dinonaktifkan oleh Admin." };
        if (data.password_hash !== pwHash) return { ok: false, reason: "Password salah." };

        return {
          ok: true,
          user: {
            id: data.id,
            nip: data.nip,
            full_name: data.full_name,
            role: data.role,
            grade: data.grade,
            unit: data.unit,
            allow_all_grades: Boolean(data.allow_all_grades)
          }
        };
      } catch (err) {
        return { ok: false, reason: err.message };
      }
    },

    async createUser({ nip, full_name, password, role = "pegawai", grade = "BOD-4", unit = "Underwriting", is_active = true, allow_all_grades = false }) {
      try {
        const pwHash = await hashPassword(password);
        const rows = await rest("app_users", {
          method: "POST",
          headers: { Prefer: "return=representation" },
          body: JSON.stringify([{ nip: nip.trim(), full_name: full_name.trim(), password_hash: pwHash, role, grade, unit, is_active, allow_all_grades }])
        });
        return { ok: true, user: rows && rows[0] };
      } catch (err) {
        return { ok: false, reason: err.message };
      }
    },

    async fetchAllUsers() {
      try {
        const data = await rest("app_users?select=id,created_at,nip,full_name,role,grade,unit,is_active,allow_all_grades&order=created_at.desc");
        return { ok: true, data: data || [] };
      } catch (err) {
        return { ok: false, data: [], reason: err.message };
      }
    },

    async updateUser(id, fields) {
      try {
        const payload = { ...fields };
        if (payload.password) {
          payload.password_hash = await hashPassword(payload.password);
          delete payload.password;
        }
        await rest(`app_users?id=eq.${encodeURIComponent(id)}`, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
        return { ok: true };
      } catch (err) {
        return { ok: false, reason: err.message };
      }
    },

    async deleteUser(id) {
      try {
        await rest(`app_users?id=eq.${encodeURIComponent(id)}`, {
          method: "DELETE"
        });
        return { ok: true };
      } catch (err) {
        return { ok: false, reason: err.message };
      }
    },

    async saveResult(entry) {
      try {
        const data = await rest("assessment_results", {
          method: "POST",
          headers: { Prefer: "return=representation" },
          body: JSON.stringify([
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
        });
        return { ok: true, data };
      } catch (err) {
        return { ok: false, reason: err.message };
      }
    },

    async fetchResults(limit = 50, nipFilter = null) {
      try {
        let q = `assessment_results?select=*&order=created_at.desc&limit=${limit}`;
        if (nipFilter) q += `&participant_nip=eq.${encodeURIComponent(nipFilter)}`;
        const data = await rest(q);
        return { ok: true, data: data || [] };
      } catch (err) {
        return { ok: false, data: [], reason: err.message };
      }
    }
  };
})();
