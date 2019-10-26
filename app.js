
function changeIcon(inc){
document.querySelector('.weather-icon img').src=`icons/${inc}.png`;
}

function getWeather(lat,long){

	const proxy='https://cors-anywhere.herokuapp.com/';

	const api=`${proxy}https://api.darksky.net/forecast/a75bc7b28f347ebe19a78e17560b1029/${lat},${long}`


    fetch(api)
       .then(function(response){
       	return response.json();
       }).then(function(data){


       	   const temp=document.querySelector('.temperature-value p');
           const icon=document.querySelector('.weather-icon img');
           const tempDesc=document.querySelector('.temp-desc p');
           const locationCity=document.querySelector('.location p');
           const notification=document.querySelector('.notification p');
       	
          var tempInFH=data.currently.temperature;

          var tempInCel=(tempInFH - 32)*5/9;
               
          var iconSYM=data.currently.icon;
          var timezone=data.timezone;
          var summary=data.currently.summary;

          temp.innerHTML=Math.floor(tempInCel)+"<span>&#8451;</span>";
          tempDesc.innerHTML=summary;

          locationCity.innerHTML=timezone;
          
          let arr=["wind","fog","cloudy","rain","clear-day","clear-night"];
          if(arr.includes(iconSYM)){
          changeIcon(iconSYM);
             }
             else{
             document.querySelector('.weather-icon img').src="icons/partly-cloudy-day.png";	
             }

       })

	
}



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setPosition);
}
else{
	notification.style.display="inlineBlock";
}

function setPosition(position){

let longitude=position.coords.longitude;
let latitude=position.coords.latitude;

getWeather(latitude,longitude);
}


/*"clear-day",
                "clear-night",
                "partly-cloudy-day",
                "partly-cloudy-night",
                "cloudy",
                "rain",
                "sleet",
                "snow",
                "wind",
                "fog"

                */