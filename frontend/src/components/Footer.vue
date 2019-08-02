<template>
    <v-footer class="corefooter" height="82">
        <div style="display: flex; justify-content: space-around; width: 100%; align-items: center;">
        <div class="findus">
            <h3 class="font">Find us</h3>
            <hr />
        </div>
        <div class="fdiv font">(SSAFY)서울특별시 강남구 언주로 508 10-17층(역삼동, 서울상록빌딩)</div>

        <div class="ftweather font">
           &copy;
           2019.08.02
           <a
           href="https://lab.ssafy.com/2HyungJu/webmobile-sub2"
           target="_blank" class="font">GitLab
           </a>

           <br/>
          <a class="font"> {{city}}  {{ temperature }}℃  {{ weatherMain }}</a>
         </div>
        </div>
    <v-spacer/>
  </v-footer>
</template>

<script>
export default {
   data() {
  return {
         dataObj: null,
         city: "Seoul",
         temperature: null,
         weatherMain: "",
         latitude: 0.0,
         longitude: 0.0,
         apikey: "9989d998a94c13b8a2148df6fc4d1f4d" //openweathermap에서 발급한 자신의 apikey 입력
       };
       },
       methods:{
               getLocation: function () {
                   if (!navigator.geolocation) {
                       this.errorMsg = "Geolocation is not supported by your browser";
                       this.city = this.errorMsg;

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

                   this.getWeather();
               },
               error: function (err) {
                   this.errorMsg = "Unable to retrieve your location";
                   this.city = this.errorMsg;
               },
               getWeather: function(){
                   var reqURL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + this.latitude + '&lon=' + this.longitude + '&APPID=' + this.apikey;

                   this.$http.get(reqURL, {headers: {'x-requested-with': 'XMLHttpRequest'}}).then(function (response) {
                       this.dataObj = response.data;
                       this.temperature = (this.dataObj.main.temp - 273.15).toFixed(0);
                       this.city = this.dataObj.name + ', ' + this.dataObj.sys.country;
                       this.weatherMain = this.dataObj.weather[0].main;

                   }, function (response) {

                   });
               }
           },
           created(){
               this.getLocation();
           }
       }
       </script>
<style>

@media (min-width: 600px) {
.font{
  font-size: 13px;
  }
.ftweather {
    text-align: right;
    margin-right: 5%;
  }
}

@media (max-width:599px) {
.font {
  font-size: 8px;
  }

.findus {
    display: none;
  }
.fdiv {
    display: none;
  }
.ftweather {
    text-align: center;
  }
}

.findus {
    margin-left: 5%;
}
.corefooter {
    text-align: center;
}
.img {
    margin-right: 15px;
}

.fdiv {
    margin-left: 5%;
    margin-right: 5%;
}

.ftitem {
    padding: 25px;
    color: black;
    font-size: 18px;
}

.ftweather {
    font-family: sans-serif;
    font-size: 15px;
}
</style>
