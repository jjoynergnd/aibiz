export type LeadStatus = 'New' | 'Contacted'

export type Lead = {
  id: string
  name: string
  phone: string
  serviceAddress: string
  email?: string
  service: string
  message?: string
  status: LeadStatus
  createdAt: number
}

export type LeadFormValues = {
  name: string
  phone: string
  serviceAddress: string
  email: string
  service: string
  message: string
}
