import type { Lead, LeadFormValues } from './leadTypes'

export function createDemoLead(formValues: LeadFormValues): Lead {
  return {
    id: crypto.randomUUID(),
    name: formValues.name.trim(),
    phone: formValues.phone.trim(),
    email: formValues.email.trim() || undefined,
    service: formValues.service,
    message: formValues.message.trim() || undefined,
    status: 'New',
    createdAt: new Date().toISOString(),
  }
}
