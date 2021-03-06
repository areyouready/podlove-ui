import { compose, propOr, map } from 'lodash/fp'
import { toPlayerTime } from './time'
import { createObject } from './helper'

export const duration = compose(
  toPlayerTime,
  propOr(0, 'duration')
)
export const playtime = compose(
  toPlayerTime,
  propOr(0, 'playtime')
)
export const media = compose(
  map(
    createObject({
      url: propOr(null, 'url'),
      size: propOr(0, 'size'),
      title: propOr(null, 'title'),
      mimeType: propOr(null, 'mimeType')
    })
  ),
  propOr([], 'audio')
)

export const chapters = propOr([], 'chapters')
export const reference = propOr({}, 'reference')
export const transcripts = propOr([], 'transcripts')
export const shareReference = compose(
  propOr(null, 'share'),
  reference
)
export const originReference = compose(
  propOr(null, 'origin'),
  reference
)
export const configReference = compose(
  propOr(null, 'origin'),
  reference
)
