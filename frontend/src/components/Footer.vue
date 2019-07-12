<template>
    <v-footer
            id="core-footer"
            absolute
            height="82"
    >
        <div class="footer-items">
      <span
              v-for="link in links"
              :key="link.name"
      >
        <a
                :href="link.Link"
                class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
        </div>
        <v-spacer/>
        <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
              href="https://edu.ssafy.com/"
              target="_blank">SSAFY In {{ city }}</a>
        <br>
        {{ temperature }}℃ , {{ weatherMain }}
    </span>
    </v-footer>
</template>

<script>
export default {
data(){
  return{
    links: [
      { name: 'Home', Link: '/dashboard' },
      { name: 'Creative Tim', Link: 'https://www.creative-tim.com' },
      { name: 'About Us', Link: 'https://creative-tim.com/presentation' },
      { name: 'Blog', Link: 'https://blog.creative-tim.com' }
    ],
          dataObj: null,
          city: 'Seoul',
          temperature: null,
          weatherMain: '',
          latitude: 0.0,
          longitude: 0.0,
          apikey: 'e65185ee1387f1638295a15d28f81636' //openweathermap에서 발급한 자신의 apikey 입력
    }
},
methods:{
      getLocation: function () {
          if (!navigator.geolocation) {
              this.errorMsg = "Geolocation is not supported by your browser";
              this.city = this.errorMsg;
              console.warn(this.errorMsg);
              return;
          }
          var options = { timeout: 10000 };
          navigator.geolocation.getCurrentPosition(this.success, this.error, options);
      },
      success: function (position) {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.latitude = parseFloat(this.latitude).toFixed(2);
          this.longitude = parseFloat(this.longitude).toFixed(2);

                //console.warn(`ERROR(${err.code}): ${err.message}`);
              //  console.warn(this.errorMsg);
            },
            getWeather: function () {
                var reqURL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + this.latitude + '&lon=' + this.longitude + '&APPID=' + this.apikey;



          this.$http.get(reqURL, {headers: {'x-requested-with': 'XMLHttpRequest'}}).then(function (response) {
              this.dataObj = response.data;
              this.temperature = (this.dataObj.main.temp - 273.15).toFixed(0);
              this.city = this.dataObj.name + ', ' + this.dataObj.sys.country;
              this.weatherMain = this.dataObj.weather[0].main;
              console.log(response);
          }, function (response) {
              this.errorMsg = "Unable to retrive weather information.";
          });
      }
  },
  created(){
      this.getLocation();
  }
}
</script>

<style>

    #core-footer {
        z-index: 1;
    }
</style>
