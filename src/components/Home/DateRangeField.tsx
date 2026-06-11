import { format, parseISO } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { DayPicker, type DateRange } from 'react-day-picker'
import 'react-day-picker/style.css'

interface DateRangeFieldProps {
  checkIn: string
  checkOut: string
  onCheckInChange: (value: string) => void
  onCheckOutChange: (value: string) => void
}

const ISO = 'yyyy-MM-dd'
const DISPLAY = 'EEE, dd MMM'

const toDate = (value: string): Date | undefined => {
  if (!value) return undefined
  try {
    const d = parseISO(value)
    return Number.isNaN(d.getTime()) ? undefined : d
  } catch {
    return undefined
  }
}

const sameDay = (a?: Date, b?: Date) => {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

const DateRangeField = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: Readonly<DateRangeFieldProps>) => {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<DateRange | undefined>(() => {
    const from = toDate(checkIn)
    const to = toDate(checkOut)
    if (!from && !to) return undefined
    return { from, to }
  })
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open) {
      setDraft(() => {
        const from = toDate(checkIn)
        const to = toDate(checkOut)
        if (!from && !to) return undefined
        return { from, to }
      })
    }
  }, [open, checkIn, checkOut])

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const commit = (range: DateRange | undefined) => {
    onCheckInChange(range?.from ? format(range.from, ISO) : '')
    onCheckOutChange(range?.to ? format(range.to, ISO) : '')
  }

  const handleSelect = (range: DateRange | undefined) => {
    const prevFrom = draft?.from
    const prevTo = draft?.to
    const hadCompleteRange = Boolean(prevFrom && prevTo)
    const nextFrom = range?.from
    const nextTo = range?.to

    let nextDraft: DateRange | undefined = range

    if (hadCompleteRange && nextFrom && nextTo && sameDay(nextFrom, prevFrom) && sameDay(nextTo, prevTo)) {
      nextDraft = undefined
    } else if (hadCompleteRange && nextFrom && nextTo) {
      nextDraft = { from: nextFrom, to: undefined }
    }

    setDraft(nextDraft)

    const hasBoth = Boolean(nextDraft?.from && nextDraft?.to)
    if (hasBoth && !sameDay(nextDraft?.from, nextDraft?.to)) {
      commit(nextDraft)
      setOpen(false)
    }
  }

  const handleClear = () => {
    setDraft(undefined)
    commit(undefined)
  }

  const handleDone = () => {
    if (draft?.from && draft?.to) {
      commit(draft)
    }
    setOpen(false)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const fromDate = toDate(checkIn)
  const toDateObj = toDate(checkOut)

  const triggerLabel = (() => {
    if (fromDate && toDateObj) {
      return `${format(fromDate, DISPLAY)}  →  ${format(toDateObj, DISPLAY)}`
    }
    if (fromDate) {
      return `${format(fromDate, DISPLAY)}  →  Select check-out`
    }
    return 'Select your stay dates'
  })()

  const hasValue = Boolean(fromDate && toDateObj)
  const draftHasBoth = Boolean(draft?.from && draft?.to)
  const helperText = (() => {
    if (!draft?.from) return 'Pick your check-in date'
    if (!draft?.to) return 'Now pick your check-out date'
    return `${format(draft.from, DISPLAY)}  →  ${format(draft.to, DISPLAY)}`
  })()

  return (
    <div className="date-range-field" ref={wrapperRef}>
      <span className="date-range-label">Stay Dates</span>
      <button
        type="button"
        className={`date-range-trigger${hasValue ? ' has-value' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <svg
          className="date-range-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span className="date-range-trigger-text">{triggerLabel}</span>
        <svg
          className={`date-range-caret${open ? ' open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="date-range-popover" aria-label="Choose stay dates">
          <div className="date-range-helper">{helperText}</div>
          <DayPicker
            mode="range"
            numberOfMonths={2}
            selected={draft}
            onSelect={handleSelect}
            disabled={{ before: today }}
            showOutsideDays
            pagedNavigation
          />
          <div className="date-range-popover-footer">
            <button
              type="button"
              className="date-range-link"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="button"
              className="date-range-apply"
              onClick={handleDone}
              disabled={!draftHasBoth}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateRangeField
