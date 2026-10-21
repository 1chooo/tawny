'use client'

import { PhoneCard } from '@/components/desk/phone-card'
import { ProgressRing } from '@/components/desk/progress-ring'
import { ProjectList } from '@/components/desk/project-list'
import { Reminders } from '@/components/desk/reminders'
import { StatCards } from '@/components/desk/stat-cards'
import { Team } from '@/components/desk/team'
import { TimeTracker } from '@/components/desk/time-tracker'
import { WeekChart } from '@/components/desk/week-chart'
import { useDesk } from '@/components/desk/desk-store'
import { PageHeading, primaryButton, quietButton } from '@/components/desk/views/page-heading'

export function DashboardHome({ live = true }: { live?: boolean }) {
  const { openDialog } = useDesk()

  return (
    <div>
      <PageHeading
        title="Dashboard"
        description="Plan the week, then finish the work."
        actions={
          <>
            <button type="button" className={primaryButton} onClick={() => openDialog('project')}>
              + Add project
            </button>
            <button type="button" className={quietButton} onClick={() => openDialog('import')}>
              Import data
            </button>
          </>
        }
      />
      <div className="space-y-3 @md:space-y-4">
        <StatCards />
        <div className="grid grid-cols-1 gap-3 @md:gap-4 @lg:grid-cols-3">
          <div className="space-y-3 @md:space-y-4 @lg:col-span-2">
            <WeekChart />
            <Team />
          </div>
          <div className="space-y-3 @md:space-y-4">
            <Reminders />
            <ProgressRing />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @md:gap-4 @lg:grid-cols-3">
          <ProjectList />
          <PhoneCard />
          <TimeTracker live={live} />
        </div>
      </div>
    </div>
  )
}
