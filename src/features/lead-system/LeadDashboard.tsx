import type { Lead } from './leadTypes'
import styles from './LeadPage.module.css'

type LeadDashboardProps = {
  leads: Lead[]
  onMarkContacted: (leadId: string) => void
}

function formatLeadTime(createdAt: number) {
  return new Date(createdAt).toLocaleString()
}

export default function LeadDashboard({
  leads,
  onMarkContacted,
}: LeadDashboardProps) {
  return (
    <section className={styles.dashboard}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>Lead Tracker</p>
          <h2 className={styles.sectionTitle}>Submitted leads</h2>
        </div>
        <span className={styles.countBadge}>{leads.length} total</span>
      </div>

      {leads.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No leads yet. Submit a request to see it appear here.</p>
        </div>
      ) : (
        <div className={styles.leadList}>
          {leads.map((lead) => (
            <article key={lead.id} className={styles.leadRow}>
              <div className={styles.leadInfo}>
                <h3>{lead.name}</h3>
                <p>{lead.service}</p>
                <p>{lead.phone}</p>
                <p>{lead.serviceAddress}</p>
                <p>{formatLeadTime(lead.createdAt)}</p>
              </div>

              <div className={styles.leadMeta}>
                <span
                  className={
                    lead.status === 'New' ? styles.statusNew : styles.statusContacted
                  }
                >
                  {lead.status}
                </span>

                <button
                  className={styles.secondaryButton}
                  type="button"
                  onClick={() => onMarkContacted(lead.id)}
                  disabled={lead.status === 'Contacted'}
                >
                  Mark Contacted
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
