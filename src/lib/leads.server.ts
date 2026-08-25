import type { LeadInput } from "./lead-schema";

export type LeadResult =
  | { ok: true; delivered: true; receivedAt: string }
  | { ok: true; delivered: false; reason: "channel_not_configured"; receivedAt: string };

/**
 * Приём заявки.
 *
 * Персональные данные не логируются. Если канал доставки (LEAD_WEBHOOK_URL)
 * не настроен — заявка НЕ отправляется никуда и функция честно сообщает об этом,
 * чтобы интерфейс не показывал ложный success.
 */
export async function handleLead(data: LeadInput): Promise<LeadResult> {
  const receivedAt = new Date().toISOString();
  const endpoint = process.env["LEAD_WEBHOOK_URL"];

  if (!endpoint) {
    // Только техническое событие, без ФИО, контактов и названия компании.
    console.log("[lead] delivery channel not configured", {
      receivedAt,
      hasUtm: Boolean(data.utm && Object.keys(data.utm).length),
    });
    return { ok: true, delivered: false, reason: "channel_not_configured", receivedAt };
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...data, receivedAt }),
  });

  if (!res.ok) throw new Error(`lead delivery failed: ${res.status}`);

  console.log("[lead] delivered", { receivedAt });
  return { ok: true, delivered: true, receivedAt };
}
