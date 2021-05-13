export default function(arg){
  let mytime=arg||new Date;
  let year=mytime.getFullYear()
  let month=parseInt(mytime.getMonth())+1
  let date=mytime.getDay()
  let hours=mytime.getHours()
  let minutes=mytime.getMinutes()
  let second=mytime.getSeconds()
  return year+'-'+month+'-'+date+' '+hours+':'+minutes+':'+second
}