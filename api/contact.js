const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "PLFinder@outllook.es";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "PLFinder <onboarding@resend.dev>";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const sendJson = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
};

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return sendJson(res, 500, { error: "Email service is not configured" });
  }

  const { name = "", email = "", company = "", message = "" } = req.body || {};

  if (!name.trim() || !email.trim() || !message.trim()) {
    return sendJson(res, 400, { error: "Missing required fields" });
  }

  const subject = `Solicitud de contacto desde web PLFinder - ${name.trim()}`;
  const html = `
    <h2>Nueva solicitud de contacto</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(company || "-")}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject,
      html
    })
  });

  if (!response.ok) {
    return sendJson(res, 502, { error: "Email could not be sent" });
  }

  return sendJson(res, 200, { ok: true });
};
