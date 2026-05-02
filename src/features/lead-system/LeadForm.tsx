import { useState, type ChangeEvent, type FormEvent } from 'react'
import { leadConfig } from './leadConfig'
import type { LeadFormValues } from './leadTypes'
import styles from './LeadPage.module.css'

type LeadFormProps = {
  onSubmit: (values: LeadFormValues) => void
}

const initialValues: LeadFormValues = {
  name: '',
  phone: '',
  serviceAddress: '',
  email: '',
  service: leadConfig.services[0],
  message: '',
}

function formatPhoneValue(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10)

  if (digits.length === 0) {
    return ''
  }

  if (digits.length < 4) {
    return `(${digits}`
  }

  if (digits.length < 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export default function LeadForm({ onSubmit }: LeadFormProps) {
  const [formValues, setFormValues] = useState<LeadFormValues>(initialValues)
  const [errors, setErrors] = useState<{
    name?: string
    phone?: string
    serviceAddress?: string
  }>({})

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: name === 'phone' ? formatPhoneValue(value) : value,
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: {
      name?: string
      phone?: string
      serviceAddress?: string
    } = {}

    if (!formValues.name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (formValues.phone.replace(/\D/g, '').length < 10) {
      nextErrors.phone = 'Phone must include at least 10 digits.'
    }

    if (!formValues.serviceAddress.trim()) {
      nextErrors.serviceAddress = 'Service Address is required.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSubmit(formValues)
    setFormValues(initialValues)
    setErrors({})
  }

  return (
    <div className={styles.formCard}>
      <div className={styles.cardHeader}>
        <p className={styles.eyebrow}>Lead Capture</p>
        <h2 className={styles.cardTitle}>Request service</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>Name</span>
          <input
            name="name"
            type="text"
            placeholder="Jordan Lee"
            value={formValues.name}
            onChange={handleChange}
          />
          {errors.name ? <small className={styles.error}>{errors.name}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Phone</span>
          <input
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formValues.phone}
            onChange={handleChange}
          />
          {errors.phone ? <small className={styles.error}>{errors.phone}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Service Address</span>
          <input
            name="serviceAddress"
            type="text"
            placeholder="123 Main St, Pittsburgh, PA"
            value={formValues.serviceAddress}
            onChange={handleChange}
          />
          {errors.serviceAddress ? (
            <small className={styles.error}>{errors.serviceAddress}</small>
          ) : null}
        </label>

        <label className={styles.field}>
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="jordan@example.com"
            value={formValues.email}
            onChange={handleChange}
          />
        </label>

        <label className={styles.field}>
          <span>Service</span>
          <select name="service" value={formValues.service} onChange={handleChange}>
            {leadConfig.services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Message</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Share a few details about what you need."
            value={formValues.message}
            onChange={handleChange}
          />
        </label>

        <button className={styles.primaryButton} type="submit">
          Submit request
        </button>
      </form>
    </div>
  )
}
