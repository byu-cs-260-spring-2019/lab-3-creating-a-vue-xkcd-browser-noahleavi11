Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
  el: '#app',
  data: {
    number: '',
    max: '',
    addedName: '',
    addedComment: '',
    comments: {    },
    current: {
      title: '',
      img: '',
      alt: ''
    },
    loading: true,
    ratings:{    },
  },
  created() {
    this.xkcd();
  },
  methods: {
    async xkcd() {
      try{
        this.loading = true;

        const response = await axios.get('https://xkcd.now.sh/' + this.number);
        this.current = response.data;
        this.loading = false;
        this.number = this.current.num
        return true;
      }
      catch(error){
        console.log(error)
      }
    },
    firstComic() {
      this.number = 1;
    },
    previousComic() {
      this.number = this.current.num - 1;
      if (this.number < 1){
        this.number = 1;
      }
    },
    nextComic() {
      this.number = this.current.num + 1;
      if (this.number > this.max){
        this.number  = this.max;
      }
    },
    lastComic() {
      this.number = this.max;
    },
    getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
    },
    randomComic() {
      this.number = this.getRandom(1, this.max);
    },
    addComment() {
      if (!(this.number in this.comments))
        Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push({
        author: this.addedName,
        text: this.addedComment,
        time: moment().format('LLLL')
      });
      this.addedName = '';
      this.addedComment = '';
    },
    setRating(rating){
      if (!(this.number in this.ratings))
        Vue.set(this.ratings, this.number, {
          sum: 0,
          total: 0
      });
      this.ratings[this.number].sum += rating;
      this.ratings[this.number].total += 1;
    },
    avgRating(comicNumber) {
      if (this.ratings.length !== 0 && this.ratings[comicNumber]){
        console.log('some');
        return ((this.ratings[comicNumber].sum / this.ratings[comicNumber].total).toFixed(2));
      } else {
        console.log('none');
        return 'None';
      }
    },
  },
  computed: {
    month() {
      var month = new Array;
      if (this.current.month === undefined)
        return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    }
  },
  watch: {
    number(value, oldvalue) {
      if(oldvalue !== '')
      {
        this.xkcd();
      }
      else{
        this.max = value;
      }
    },
  },
});
