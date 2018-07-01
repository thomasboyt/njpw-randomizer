const app = new Vue({
  el: '#app',

  data: {
    isLoading: true,
    entries: [],
    match: null,
    filters: {
      pre2015: false,
      onlyRecommended: 0,
    },
  },

  created: function () {
    fetch('/matches.json')
      .then((resp) => {
        return resp.json();
      })
      .then((body) => {
        this.entries = body.entries;
        this.setRandomMatch();
        this.isLoading = false;
      });
  },

  methods: {
    setRandomMatch: function () {
      let entries = this.entries;

      if (this.filters.pre2015) {
        entries = entries.filter((entry) => {
          const year = parseInt(entry.date.match(/^[0-9]+\./)[0].slice(0, -1));
          return year < 2015;
        });
      }

      if (this.filters.onlyRecommended) {
        entries = entries.filter((entry) => entry.recommendationLevel >= this.filters.onlyRecommended);
      }

      const idx = Math.floor(Math.random() * entries.length);
      this.match = entries[idx];
    },
  },
});
