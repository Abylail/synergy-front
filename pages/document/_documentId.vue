<template>
  <div class="document-page">
    {{ documentId }}
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "_documentId",
  data: () => ({
    document: null,
    isLoading: false,
  }),
  computed: {
    documentId() {
      return this.$route.params.documentId;
    }
  },
  methods: {
    ...mapActions({
      _fetchDocument: "document/fetchDocument",
    }),
    async fetchDocument() {
      this.isLoading = true;
      this.document = await this._fetchDocument(this.documentId);
      this.isLoading = false;
    }
  },
  mounted() {
    this.fetchDocument();
  }
}
</script>

<style lang="scss" scoped>

</style>
