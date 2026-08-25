import { z } from "zod";

export const utmSchema = z
  .object({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    referrer: z.string().max(500).optional(),
    landing_path: z.string().max(500).optional(),
  })
  .partial();

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Укажите имя" })
    .max(100, { message: "Слишком длинное имя" }),
  company: z
    .string()
    .trim()
    .min(2, { message: "Укажите компанию" })
    .max(150, { message: "Слишком длинное название" }),
  contact: z
    .string()
    .trim()
    .min(5, { message: "Укажите телефон, почту или telegram" })
    .max(150, { message: "Слишком длинный контакт" }),
  consent: z.literal(true, { errorMap: () => ({ message: "Нужно согласие на обработку данных" }) }),
  utm: utmSchema.optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type UtmData = z.infer<typeof utmSchema>;
