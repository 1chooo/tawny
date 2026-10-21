'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { DeskDialog, Field, fieldClass } from '@/components/desk/desk-dialog'
import {
  DeskSelect,
  PRIORITY_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  TASK_STATUS_OPTIONS,
} from '@/components/desk/desk-select'
import { useDesk } from '@/components/desk/desk-store'
import { IMPORT_GUIDE, SAMPLE_CSV, parseImport, type ImportRow } from '@/lib/desk/import-data'
import {
  STATUS_LABEL,
  formatDue,
  isIsoDate,
  type Priority,
  type ProjectStatus,
  type TaskStatus,
} from '@/lib/desk/model'

const primaryButton =
  'h-9 rounded-lg bg-primary px-3 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50'
const quietButton = 'h-9 rounded-lg border border-border px-3 text-sm text-foreground hover:bg-muted'

export function ProjectForm() {
  const { members, addProject, closeDialog, profile } = useDesk()
  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [due, setDue] = useState('2026-12-12')
  const [status, setStatus] = useState<ProjectStatus>('running')
  const [ownerId, setOwnerId] = useState(members.find((member) => member.email === profile.email)?.id ?? members[0]?.id ?? '')
  const [error, setError] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim()) {
      setError('Give the project a name.')
      return
    }
    if (!isIsoDate(due)) {
      setError('Choose a due date.')
      return
    }
    addProject({ name: name.trim(), summary: summary.trim() || 'Added in this demo.', due, status, ownerId })
  }

  return (
    <DeskDialog title="Add project" onClose={closeDialog}>
      <form onSubmit={submit} className="space-y-3">
        <Field label="Name">
          <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} autoFocus />
        </Field>
        <Field label="Summary">
          <textarea
            className={`${fieldClass} h-20 py-2`}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Due">
            <input className={fieldClass} type="date" value={due} onChange={(event) => setDue(event.target.value)} />
          </Field>
          <Field label="Status">
            <DeskSelect
              ariaLabel="Status"
              value={status}
              options={PROJECT_STATUS_OPTIONS}
              onChange={(next) => setStatus(next as ProjectStatus)}
            />
          </Field>
        </div>
        <Field label="Owner">
          <DeskSelect
            ariaLabel="Owner"
            value={ownerId}
            options={members.map((member) => ({ value: member.id, label: member.name }))}
            onChange={setOwnerId}
          />
        </Field>
        {error ? <p className="text-sm text-foreground">{error}</p> : null}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className={quietButton} onClick={closeDialog}>
            Cancel
          </button>
          <button type="submit" className={primaryButton}>
            Create project
          </button>
        </div>
      </form>
    </DeskDialog>
  )
}

export function ImportDialog() {
  const { closeDialog, importRows, dismissFlash } = useDesk()
  const [fileName, setFileName] = useState('')
  const [parsed, setParsed] = useState<{ rows: ImportRow[]; errors: string[] } | null>(null)
  const [fileError, setFileError] = useState('')

  function readFile(file: File) {
    setFileName(file.name)
    setFileError('')
    setParsed(null)
    if (file.size > 200_000) {
      setFileError('That file is too large for this demo. Keep it under 200 KB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : ''
      setParsed(parseImport(text, file.name))
    }
    reader.onerror = () => setFileError('The file could not be read.')
    reader.readAsText(file)
  }

  function downloadSample() {
    const blob = new Blob([SAMPLE_CSV], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'desk-projects.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const canImport = (parsed?.rows.length ?? 0) > 0

  return (
    <DeskDialog title="Import data" onClose={closeDialog}>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">{IMPORT_GUIDE}</p>
        <button type="button" className="text-sm underline" onClick={downloadSample}>
          Download a sample CSV
        </button>
        <Field label="File" hint="CSV or JSON">
          <input
            className="block w-full text-sm"
            type="file"
            accept=".csv,.json,.txt,text/csv,application/json"
            onChange={(event) => {
              const file = event.target.files?.[0]
              event.target.value = ''
              if (file) readFile(file)
            }}
          />
        </Field>
        {fileName ? <p className="text-xs text-muted-foreground">Selected {fileName}</p> : null}
        {fileError ? <p className="text-sm">{fileError}</p> : null}
        {parsed ? (
          <div className="space-y-2">
            {parsed.errors.length > 0 ? (
              <ul className="space-y-1 rounded-lg border border-border bg-background p-3 text-sm">
                {parsed.errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            ) : null}
            {parsed.rows.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr>
                      <th className="px-2 py-1.5 font-medium">Name</th>
                      <th className="px-2 py-1.5 font-medium">Due</th>
                      <th className="px-2 py-1.5 font-medium">Status</th>
                      <th className="px-2 py-1.5 font-medium">Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.rows.map((row) => (
                      <tr key={`${row.name}-${row.due}`} className="border-t border-border">
                        <td className="px-2 py-1.5">{row.name}</td>
                        <td className="px-2 py-1.5">{formatDue(row.due)}</td>
                        <td className="px-2 py-1.5">{STATUS_LABEL[row.status]}</td>
                        <td className="px-2 py-1.5">{row.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className={quietButton} onClick={closeDialog}>
            Cancel
          </button>
          <button
            type="button"
            className={primaryButton}
            disabled={!canImport}
            onClick={() => {
              if (!parsed) return
              dismissFlash()
              importRows(parsed.rows)
            }}
          >
            Import {parsed?.rows.length ? `${parsed.rows.length}` : ''}
          </button>
        </div>
      </div>
    </DeskDialog>
  )
}

export function MemberForm() {
  const { addMember, closeDialog } = useDesk()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Engineering')
  const [error, setError] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    if (!email.includes('@')) {
      setError('Use an email address.')
      return
    }
    addMember({ name: name.trim(), email: email.trim(), role: role.trim() || 'Team' })
  }

  return (
    <DeskDialog title="Add teammate" onClose={closeDialog}>
      <form onSubmit={submit} className="space-y-3">
        <Field label="Name">
          <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} autoFocus />
        </Field>
        <Field label="Email">
          <input className={fieldClass} value={email} onChange={(event) => setEmail(event.target.value)} />
        </Field>
        <Field label="Role">
          <input className={fieldClass} value={role} onChange={(event) => setRole(event.target.value)} />
        </Field>
        {error ? <p className="text-sm">{error}</p> : null}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className={quietButton} onClick={closeDialog}>Cancel</button>
          <button type="submit" className={primaryButton}>Add teammate</button>
        </div>
      </form>
    </DeskDialog>
  )
}

export function TaskForm() {
  const { projects, members, addTask, closeDialog, profile } = useDesk()
  const [title, setTitle] = useState('')
  const [projectId, setProjectId] = useState(projects[0]?.id ?? '')
  const [assigneeId, setAssigneeId] = useState(members.find((member) => member.email === profile.email)?.id ?? members[0]?.id ?? '')
  const [status, setStatus] = useState<TaskStatus>('todo')
  const [priority, setPriority] = useState<Priority>('medium')
  const [due, setDue] = useState('2026-10-30')
  const [error, setError] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim()) {
      setError('Give the task a title.')
      return
    }
    if (!projectId) {
      setError('Choose a project first.')
      return
    }
    addTask({ title: title.trim(), projectId, assigneeId, status, priority, due })
  }

  return (
    <DeskDialog title="Add task" onClose={closeDialog}>
      <form onSubmit={submit} className="space-y-3">
        <Field label="Title">
          <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} autoFocus />
        </Field>
        <Field label="Project">
          <DeskSelect
            ariaLabel="Project"
            value={projectId}
            options={projects.map((project) => ({ value: project.id, label: project.name }))}
            onChange={setProjectId}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Status">
            <DeskSelect
              ariaLabel="Status"
              value={status}
              options={TASK_STATUS_OPTIONS}
              onChange={(next) => setStatus(next as TaskStatus)}
            />
          </Field>
          <Field label="Priority">
            <DeskSelect
              ariaLabel="Priority"
              value={priority}
              options={PRIORITY_OPTIONS}
              onChange={(next) => setPriority(next as Priority)}
            />
          </Field>
        </div>
        <Field label="Assignee">
          <DeskSelect
            ariaLabel="Assignee"
            value={assigneeId}
            options={members.map((member) => ({ value: member.id, label: member.name }))}
            onChange={setAssigneeId}
          />
        </Field>
        <Field label="Due">
          <input className={fieldClass} type="date" value={due} onChange={(event) => setDue(event.target.value)} />
        </Field>
        {error ? <p className="text-sm">{error}</p> : null}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className={quietButton} onClick={closeDialog}>Cancel</button>
          <button type="submit" className={primaryButton}>Create task</button>
        </div>
      </form>
    </DeskDialog>
  )
}

export function EventForm() {
  const { projects, addEvent, closeDialog } = useDesk()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('2026-10-21')
  const [time, setTime] = useState('10:00')
  const [duration, setDuration] = useState('30 min')
  const [projectId, setProjectId] = useState('')
  const [error, setError] = useState('')
  const projectOptions = useMemo(() => projects, [projects])

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim()) {
      setError('Give the event a title.')
      return
    }
    if (!isIsoDate(date)) {
      setError('Choose a date.')
      return
    }
    const [hour, minute] = time.split(':')
    const hourNum = Number(hour)
    const suffix = hourNum >= 12 ? 'pm' : 'am'
    const hour12 = hourNum % 12 || 12
    addEvent({
      title: title.trim(),
      date,
      time: `${hour12}:${minute} ${suffix}`,
      duration,
      projectId: projectId || undefined,
    })
  }

  return (
    <DeskDialog title="Add event" onClose={closeDialog}>
      <form onSubmit={submit} className="space-y-3">
        <Field label="Title">
          <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} autoFocus />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            <input className={fieldClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </Field>
          <Field label="Time">
            <input className={fieldClass} type="time" value={time} onChange={(event) => setTime(event.target.value)} />
          </Field>
        </div>
        <Field label="Duration">
          <input className={fieldClass} value={duration} onChange={(event) => setDuration(event.target.value)} />
        </Field>
        <Field label="Project">
          <DeskSelect
            ariaLabel="Project"
            value={projectId}
            options={[{ value: '', label: 'None' }, ...projectOptions.map((project) => ({ value: project.id, label: project.name }))]}
            onChange={setProjectId}
          />
        </Field>
        {error ? <p className="text-sm">{error}</p> : null}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className={quietButton} onClick={closeDialog}>Cancel</button>
          <button type="submit" className={primaryButton}>Add event</button>
        </div>
      </form>
    </DeskDialog>
  )
}
