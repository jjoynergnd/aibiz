import type { Lead } from './leadTypes'
import styles from './LeadPage.module.css'

type LeadSuccessProps = {
  lead: Lead
}

export default function LeadSuccess({ lead }: LeadSuccessProps) {
  return (
    <div className={styles.successCard}>
      <div className={styles.cardHeader}>
        <p className={styles.eyebrow}>Instant Response Preview</p>
        <h2 className={styles.cardTitle}>Request received</h2>
      </div>

      <div className={styles.previewList}>
        <div className={styles.previewCard}>
          <h3>Customer message</h3>
          <p>Hey {lead.name}, we received your request for {lead.service}</p>
        </div>

        <div className={styles.previewCard}>
          <h3>Business message</h3>
          <p>
            New lead: {lead.name} - {lead.service} - {lead.phone}
          </p>
        </div>
      </div>
    </div>
  )
}
