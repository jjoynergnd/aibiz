export type LeadStatus = 'New' | 'Contacted'

export type Lead = {
  id: string
  name: string
  phone: string
  email?: string
  service: string
  message?: string
  status: LeadStatus
  createdAt: string
}

export type LeadFormValues = {
  name: string
  phone: string
  email: string
  service: string
  message: string
}
