import { useEffect, useState } from 'react'
import LeadDashboard from './LeadDashboard'
import LeadForm from './LeadForm'
import LeadSuccess from './LeadSuccess'
import { leadConfig } from './leadConfig'
import type { Lead, LeadFormValues } from './leadTypes'
import { createDemoLead } from './leadUtils'
import styles from './LeadPage.module.css'

export default function LeadPage() {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const stored = localStorage.getItem('lead-system.leads')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [latestLead, setLatestLead] = useState<Lead | null>(null)

  useEffect(() => {
    if (leads.length > 0) {
      setLatestLead(leads[0])
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('lead-system.leads', JSON.stringify(leads))
    } catch (err) {
      console.error('Failed to save leads to localStorage', err)
    }
  }, [leads])

  function handleCreateLead(formValues: LeadFormValues) {
    const nextLead = createDemoLead(formValues)

    setLeads((currentLeads) => [nextLead, ...currentLeads])
    setLatestLead(nextLead)
  }

  function handleMarkContacted(leadId: string) {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: 'Contacted' } : lead,
      ),
    )

    setLatestLead((currentLead) =>
      currentLead && currentLead.id === leadId
        ? { ...currentLead, status: 'Contacted' }
        : currentLead,
    )
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>{leadConfig.companyName}</p>
          <h1 className={styles.headline}>{leadConfig.headline}</h1>
          <p className={styles.subheadline}>{leadConfig.subheadline}</p>
          <p className={styles.descriptor}>{leadConfig.descriptor}</p>

          <div className={styles.trustList}>
            {leadConfig.trustCards.map((item) => (
              <div key={item} className={styles.trustCard}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroPanel}>
          <LeadForm onSubmit={handleCreateLead} />
          {latestLead ? <LeadSuccess lead={latestLead} /> : null}
        </div>
      </section>

      <LeadDashboard leads={leads} onMarkContacted={handleMarkContacted} />
    </main>
  )
}
