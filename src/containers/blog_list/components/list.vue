
<template>
  <div class="row">
    <div class='col-lg-12'>
      <div v-for="m in collection" class='card bg-light mt-3'>
        <div class="card-body">
          <h4 class="card-title" v-html="compileMarkdown(m.title)"></h4>
          <small><a :href="'/#/users/' + m.author._id">{{ m.author.name }}</a></small> <strong>·</strong>
          <small>{{ new Date(m.createdAt).toString() }}</small>
          <br />
          <p class="card-text" v-html="compileMarkdown(m.content)"></p>
          
        </div>
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import marked from 'marked'

export default {
  props: ['collection'],
  methods: {
    compileMarkdown (raw) {
      return marked(raw, { sanitize: true })
    }
  }
}
</script>
