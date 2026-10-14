import type { Answers } from '../data/questions'
import { buildEmailBody, buildFullPayload, pick } from './formatAnswers'

/** Destino das notificações do diagnóstico */
export const NOTIFY_EMAIL = 'marciliochu@gmail.com'

export type EmailSendResult =
  | { ok: true }
  | { ok: false; error: string }

/**
 * Envia o diagnóstico por e-mail via FormSubmit (sem backend próprio).
 * Na primeira vez, o Gmail recebe um e-mail de confirmação do FormSubmit —
 * é preciso clicar no link para ativar o recebimento.
 */
export async function sendDiagnosticoEmail(
  answers: Answers,
): Promise<EmailSendResult> {
  const contato = pick(answers, 'contato')
  const empresa = pick(answers, 'empresa')
  const payload = buildFullPayload(answers)

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${NOTIFY_EMAIL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: empresa !== '—' ? empresa : 'Diagnóstico Premium',
          email: 'diagnostico@marcilio.dev',
          _replyto: 'diagnostico@marcilio.dev',
          _subject: `Novo diagnóstico premium${empresa !== '—' ? ` — ${empresa.slice(0, 80)}` : ''}`,
          _template: 'box',
          _captcha: 'false',
          contato_cliente: contato,
          resumo: buildEmailBody(answers),
          json_completo: JSON.stringify(payload, null, 2),
        }),
      },
    )

    if (!response.ok) {
      const text = await response.text()
      return {
        ok: false,
        error:
          text.slice(0, 200) ||
          `Falha ao enviar e-mail (HTTP ${response.status})`,
      }
    }

    const data = (await response.json()) as { success?: string | boolean }
    if (data.success === false) {
      return { ok: false, error: 'O serviço de e-mail recusou o envio.' }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      error:
        'Não foi possível conectar ao serviço de e-mail. Verifique a internet e tente de novo.',
    }
  }
}
