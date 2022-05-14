import { intervalToDuration } from 'date-fns'

export function getDecimalDuration (duration) {
  return duration ? (Math.floor(duration * 10 / 60)) / 10 : 0
}

export function durationRequiresAdjustment (duration) {
  return duration && (duration * 10 % 60 !== 0)
}

export function getPrintableDuration (duration) {
  return duration > 0
    ? intervalToDuration({ start: 0, end: duration * 60 * 1000 })
    : { hours: 0, minutes: 0 }
}

export function minutesToHHmm (duration) {
  const pad = n => n.toString().padStart(2, '0')
  const minutes = duration % 60
  const hours = Math.floor(duration / 60)

  return `${pad(hours)}:${pad(minutes)}`
}
