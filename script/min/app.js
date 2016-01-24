function init(){$("body").backstretch("images/"+images[Math.round(Math.random()*(images.length-1))],{fade:300}),$(".left-pannel, .mid-pannel, .right-pannel").mCustomScrollbar({scrollInertia:100}),initGreetings(),initWeather(),initTimeLines(),initTerminal(),initSearch(),initFavorites(),initRss(),initSize(),tlLoading.play(),$("img").on("load",function(){tlLoading.pause(),tlDisplay.play()})}function initRss(){$("#rss-board").FeedEk({FeedUrl:"http://www.20min.ch/rss/rss.tmpl?type=channel&get=20&lang=ro",MaxCount:1e3,DateFormat:"L",DateFormatLang:"en"})}function initTerminal(){mainT=$(".terminal-term.main #main").terminal({f:function(e){for(var t=0;t<favorites.length;t++)for(var s=0;s<favorites[t][1].length;s++)if(e==favorites[t][1][s][2]){var i=window.open(favorites[t][1][s][1],"_blank");i.focus()}},cff:{travel:function(e,t,s,i){void 0==i&&(i=cffDate()),void 0==s&&(s=cffTime()),$.get("http://transport.opendata.ch/v1/connections?from="+e+"&to="+t+"&date="+i+"&time="+s,function(e){createCFFdata(e)})},reset:function(){new TimelineMax({onComplete:function(){$(".informations.cff").remove()}}).to($(".informations.cff"),.2,{height:0,autoAlpha:0}).timeScale(.5)},help:function(){this.echo("\n"),this.error("travel <from> <to> <?time> <?date>"),this.echo("display the train informations"),this.echo("\n"),this.error("reset"),this.echo("clean the cff informations"),this.echo("\n"),this.error("main"),this.echo("goto main terminal"),this.echo("\n"),this.error("sc"),this.echo("goto soundcloud terminal"),this.echo("\n"),this.error("cff"),this.echo("goto cff terminal"),this.echo("\n"),this.echo("\n"),this.echo("to quit the cff function press CTRL+D"),this.echo("\n")}},sc:{login:function(){scPlayer=new SoundCloudAudio(clientid),SC.initialize({client_id:clientid,redirect_uri:redirecturi}),SC.connect(function(){SC.get("/me",function(e){scMe=e})})},load:{likes:function(){var e=this;scPlayer.resolve("https://soundcloud.com/"+scMe.permalink+"/likes",function(e,t){scPlayer.play({playlistIndex:0}),scPlayer.pause(),scPlayer.on("ended",function(){scPlayer._playlistIndex==scPlayer._playlist.tracks.length-1?scPlayer.play({playlistIndex:0}):scPlayer.next()})}),e.echo("\n"),e.error("Call currentplaylist to see the loaded plalist"),e.echo("\n")},tracks:function(){var e=this;scPlayer.resolve("https://soundcloud.com/"+scMe.permalink+"/tracks",function(e,t){scPlayer.play({playlistIndex:0}),scPlayer.pause(),scPlayer.on("ended",function(){scPlayer._playlistIndex==scPlayer._playlist.tracks.length-1?scPlayer.play({playlistIndex:0}):scPlayer.next()})}),e.echo("\n"),e.error("Call currentplaylist to see the loaded plalist"),e.echo("\n")},playlist:function(e){var t=this;scPlayer.resolve("https://soundcloud.com/"+scMe.permalink+"/sets/"+e,function(e,t){scPlayer.play({playlistIndex:0}),scPlayer.pause(),scPlayer.on("ended",function(){scPlayer._playlistIndex==scPlayer._playlist.tracks.length-1?scPlayer.play({playlistIndex:0}):scPlayer.next()})}),t.echo("\n"),t.error("Call currentplaylist to see the loaded plalist"),t.echo("\n")},user:function(e,t,s){var i=this;"playlist"==t?scPlayer.resolve("https://soundcloud.com/"+e+"/sets/"+s,function(e,t){scPlayer.play({playlistIndex:0}),scPlayer.pause(),scPlayer.on("ended",function(){scPlayer._playlistIndex==scPlayer._playlist.tracks.length-1?scPlayer.play({playlistIndex:0}):scPlayer.next()})}):"likes"==t?scPlayer.resolve("https://soundcloud.com/"+e+"/likes",function(e,t){scPlayer.play({playlistIndex:0}),scPlayer.pause(),scPlayer.on("ended",function(){scPlayer._playlistIndex==scPlayer._playlist.tracks.length-1?scPlayer.play({playlistIndex:0}):scPlayer.next()})}):scPlayer.resolve("https://soundcloud.com/"+e+"/tracks",function(e,t){scPlayer.play({playlistIndex:0}),scPlayer.pause(),scPlayer.on("ended",function(){scPlayer._playlistIndex==scPlayer._playlist.tracks.length-1?scPlayer.play({playlistIndex:0}):scPlayer.next()})}),i.echo("\n"),i.error("Call currentplaylist to see the loaded plalist"),i.echo("\n")},help:function(){this.echo("\n"),this.error("likes"),this.echo("load your account favorites"),this.echo("\n"),this.error("tracks"),this.echo("load your account tracks"),this.echo("\n"),this.error("playlist <name of the playlist>"),this.echo("load one of your playlist"),this.echo("\n"),this.error("user <username>"),this.echo("load the user's tracks"),this.echo("\n"),this.error("user <username> likes"),this.echo("load the user's favorites"),this.echo("\n"),this.error("user <username> playlist <name of the playlist>"),this.echo("load one of the user's playlist"),this.echo("\n"),this.echo("\n"),this.echo("to quit the load function press CTRL+D"),this.echo("\n")}},currentplaylist:function(){var e=this;void 0==scPlayer._playlist?(e.echo("\n"),e.error("You must load a playlist first !"),e.echo("\n")):(e.echo("\n"),$(scPlayer._playlist.tracks).each(function(t,s){scPlayer._playlistIndex==t?e.error(t+"		"+s.title):e.echo(t+"		"+s.title)}),e.echo("\n"))},currentsong:function(){var e=this;void 0==scPlayer._playlist?(e.echo("\n"),e.error("You must load a playlist first !"),e.echo("\n")):(e.echo("\n"),e.error(scPlayer._playlistIndex+"		"+scPlayer._playlist.tracks[scPlayer._playlistIndex].title+" is playing"),e.echo("\n"))},play:function(e){var t=this;void 0==scPlayer._playlist?(t.echo("\n"),t.error("You must load a playlist first !"),t.echo("\n")):(t.echo("\n"),null!=e?(scPlayer.play({playlistIndex:e}),t.error(e+"		"+scPlayer._playlist.tracks[e].title+" is playing")):(scPlayer.play(),console.log(scPlayer),t.error(scPlayer._playlistIndex+"		"+scPlayer._playlist.tracks[scPlayer._playlistIndex].title+" is playing")),scCurr=scPlayer._playlistIndex,t.echo("\n"))},pause:function(){var e=this;void 0==scPlayer._playlist?(e.echo("\n"),e.error("You must load a playlist first !"),e.echo("\n")):(scPlayer.pause(),e.echo("\n"),e.error(scPlayer._playlistIndex+"		"+scPlayer._playlist.tracks[scPlayer._playlistIndex].title+" is paused"),scCurr=scPlayer._playlistIndex,e.echo("\n"))},resume:function(){var e=this;void 0==scPlayer._playlist?(e.echo("\n"),e.error("You must load a playlist first !"),e.echo("\n")):(scPlayer.play({playlistIndex:scCurr}),e.echo("\n"),e.error(scPlayer._playlistIndex+"		"+scPlayer._playlist.tracks[scPlayer._playlistIndex].title+" is resumed"),e.echo("\n"))},next:function(){var e=this;void 0==scPlayer._playlist?(e.echo("\n"),e.error("You must load a playlist first !"),e.echo("\n")):(scPlayer._playlistIndex==scPlayer._playlist.tracks.length-1?scPlayer.play({playlistIndex:0}):scPlayer.next(),e.echo("\n"),e.error(scPlayer._playlistIndex+"		"+scPlayer._playlist.tracks[scPlayer._playlistIndex].title+" is playing"),e.echo("\n"))},prev:function(){var e=this;void 0==scPlayer._playlist?(e.echo("\n"),e.error("You must load a playlist first !"),e.echo("\n")):(0==scPlayer._playlistIndex?scPlayer.play({playlistIndex:scPlayer._playlist.tracks.length-1}):scPlayer.previous(),e.echo("\n"),e.error(scPlayer._playlistIndex+"		"+scPlayer._playlist.tracks[scPlayer._playlistIndex].title+" is playing"),e.echo("\n"))},help:function(){this.echo("\n"),this.error("login"),this.echo("login in your account"),this.echo("\n"),this.error("load"),this.echo("load a playlist (see help inside the function)"),this.echo("\n"),this.error("currentplaylist"),this.echo("see the current playlist loaded"),this.echo("\n"),this.error("currentsong"),this.echo("see the current song playing"),this.echo("\n"),this.error("play"),this.echo("play the current song"),this.echo("\n"),this.error("pause"),this.echo("pause the current song"),this.echo("\n"),this.error("next"),this.echo("play the next song inside the playlist"),this.echo("\n"),this.error("prev"),this.echo("play the previous song inside the playlist"),this.echo("\n"),this.echo("\n"),this.echo("To quit the sc function press CTRL+D"),this.echo("\n")}},help:function(){this.echo("\n"),this.error("f <shortcut>"),this.echo("open the favorites in a new tab"),this.echo("\n"),this.error("main"),this.echo("goto main terminal"),this.echo("\n"),this.error("sc"),this.echo("goto soundcloud terminal"),this.echo("\n"),this.error("cff"),this.echo("goto cff terminal"),this.echo("\n"),this.echo("\n")}},{greetings:"Welcome "+username,name:"main",height:0,prompt:username+"@homepage:~$ "}),mainT.focus()}function initGreetings(){$(".greetings-helloworld .greetings-name").html(username),initClock()}function initWeather(){locations.forEach(function(e,t){$.simpleWeather({zipcode:"",woeid:locations[t],location:"",unit:"c",success:function(e){var s='<p class="weather" id="'+locations[t]+'"><span class="weather-location"></span><br><span class="weather-icon"></span><span class="weather-temperature"></span> <br><span class="weather-description"></span></p>';$("#weather-board").append(s),$("#"+locations[t]+" .weather-location").html(e.city+", "+e.region),$("#"+locations[t]+" .weather-icon").html('<i class="icon-'+e.code+'"></i>'),$("#"+locations[t]+" .weather-temperature").html(e.temp+"&deg;"+e.units.temp),$("#"+locations[t]+" .weather-description").html(e.currently)},error:function(e){$("#"+locations[t]).html("<p>"+e+"</p>")}})})}function initTimeLines(){tlLoading=new TimelineMax({repeat:-1}).from($(".s1"),.4,{rotation:"-=180"},"#1").from($(".s2"),.5,{rotation:"-=180"},"#1").from($(".s3"),.6,{rotation:"-=180"},"#1").from($(".s4"),.7,{rotation:"-=180"},"#1").pause(),tlDisplay=(new TimelineMax).to($(".squares"),.2,{autoAlpha:0}).to($(".squares"),.05,{height:0},"#1").from($(".image"),.2,{height:0},"#1").from($(".image"),.2,{autoAlpha:0,marginLeft:"-20"}).from($("#greetings-board"),.2,{autoAlpha:0,marginLeft:"-20"}).from($("#weather-board"),.2,{autoAlpha:0,marginLeft:"-20"}).from($("#search-board"),.2,{autoAlpha:0,marginLeft:"-20"}).from($("#favorites-board"),.2,{autoAlpha:0,marginLeft:"-20"}).from($("#terminal-board"),.2,{autoAlpha:0,marginLeft:"-20"},"#2").from($("#tabs"),.2,{autoAlpha:0,marginLeft:"-20"},"#2").timeScale(1.2).pause()}function initClock(){var e=new Date,t=e.getHours(),s=e.getMinutes(),i=e.getSeconds(),a=e.getDate(),l=e.getMonth()+1,n=e.getFullYear();10>a&&(a="0"+a),10>l&&(l="0"+l),10>t&&(t="0"+t),10>s&&(s="0"+s),10>i&&(i="0"+i),$(".time-hours").html(t),$(".time-minutes").html(s),$(".time-seconds").html(i),$(".date-day").html(a),$(".date-month").html(l),$(".date-year").html(n),$(".greetings-title").html(12>t?"Good Morning":t>=12&&19>t?"Good Afternoon":"Good Evening");setTimeout(initClock,500)}function initSize(){$(".mid-pannel, .left-pannel, .right-pannel").height(document.body.clientHeight-20);var e=0;$("#favorites-board .favorite").each(function(t,s){e<=$(s).height()&&(e=$(s).height())}),$("#favorites-board .favorite").height(e)}var tlLoading,tlDisplay,mainT,scPlayer=null,scMe=null,scCurr=null;$(document).ready(function(){init(),setTimeout(function(){initSize()},2500)}),$(window).resize(function(){initSize()});
