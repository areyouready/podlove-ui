<template lang="pug">
  div
    transcript-entry(
      v-for="(entry, index) in transcripts"
      :key="index"
      :entry="entry"
      :prerender="true"
      :playtime="playtime"
      :search-query="searchQuery"
      :ghost-active="ghostActive"
      :ghost-time="ghostTime"
      :search-results="searchResults"
      :chapter-style="chapterStyle"
      :active-style="activeStyle"
      :ghost-style="ghostStyle"
    )
</template>

<script>
import { map } from 'lodash'
import { mapState } from 'redux-vuex'
import { asyncAnimation } from '@podlove/utils/helper'

import select from 'store/selectors'

import TranscriptEntry from './Entry'

export default {
  props: {
    transcripts: {
      type: Array,
      default: () => []
    }
  },
  data: mapState({
    playtime: select.playtime,
    ghostActive: select.ghost.active,
    ghostTime: select.ghost.time,
    searchResults: select.transcripts.searchResults,
    searchQuery: select.transcripts.searchQuery,
    chapterStyle: select.styles.transcriptsChapter,
    activeStyle: select.styles.transcriptsActive,
    ghostStyle: select.styles.transcriptsGhost
  }),
  components: {
    TranscriptEntry
  },
  mounted () {
    this.$nextTick(() => {
      const entries = map(this.$el.children, asyncAnimation(entry => entry.clientHeight))

      Promise.all(entries).then(resolved => {
        this.$emit('load', resolved)
      })
    })
  }
}
</script>
