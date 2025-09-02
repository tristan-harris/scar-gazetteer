<template>
  <b-container class="search">
    <h1>Search for place names</h1>
    <b-form @submit="search">
      <b-form-group label="Place Name:" label-for="search_text">
        <b-form-input id="search_text" v-model="form.search_text" type="text" />
      </b-form-group>
      <b-form-group label="Feature Type:" label-for="feature_type">
        <b-form-select id="feature_type" v-model="form.feature_type" :options="feature_types" />
      </b-form-group>
      <b-form-group label="Gazetteer:" label-for="gazetteer">
        <b-form-select id="gazetteer" v-model="form.gazetteer" :options="gazetteers" />
      </b-form-group>
      <b-form-group label="Relics:" label-for="relics">
        <b-form-select id="relics" v-model="form.relics" :options="relics" />
        <b-icon-info-circle v-b-tooltip.hover title="Relics are places that no longer have a physical basis." />
      </b-form-group>
      <b-button class="submit-button" type="submit" variant="primary">Search</b-button>
    </b-form>
  </b-container>
</template>

<script>
import qs from "qs";
import axios from "axios";

export default {
  name: "Search",
  data: function () {
    return {
      feature_types: [
        {
          value: null,
          text: "All feature types",
        },
      ],
      relics: [
        { value: null, text: "Include Relics" },
        { value: 1, text: "Exclude Relics" },
        { value: 2, text: "Only Relics" },
      ],
      gazetteers: [{ value: null, text: "All Gazetteers" }],
      form: {
        search_text: "",
        feature_type: null,
        gazetteer: null,
        relics: null,
      },
    };
  },
  methods: {
    search(event) {
      event.preventDefault();
      this.$router.push(`/search/results?${qs.stringify(this.form)}`);
    },
  },
  mounted: async function () {
    let response = await axios.get("/api/gazetteers?order=country.asc");
    let gaz = response.data;

    let formatted = gaz.map((g) => {
      return { value: g.gazetteer_code, text: g.country };
    });

    this.gazetteers = this.gazetteers.concat(formatted);

    let response2 = await axios.get(
      "/api/feature_types?feature_type_code=neq.0&order=feature_type_name.asc"
    );
    let feat = response2.data;

    let formatted2 = feat.map((f) => {
      return { value: f.feature_type_code, text: f.feature_type_name };
    });

    this.feature_types = this.feature_types.concat(formatted2);
  },
};
</script>

<style scoped>
.search {
  max-width: 50em;
}

.submit-button {
  margin-top: 1em;
}
</style>
