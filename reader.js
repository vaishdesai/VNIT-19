var cur_symbol="AAPL";
var datag;
window.onload = function () {
  $.getJSON("Stock_List.json", function(data) {
    datag=data;
    symbol_list=new Set();
    for(var i = 0; i < data.length; i++)
    {
      symbol_list.add(data[i].symbol);
    }
    

    var dropdown=document.getElementById("menu");
    let dropdown_html="";
        symbol_list.forEach( function(element, index){

          var item=document.createElement("li")
          item.setAttribute("class", "dropdown-item");
          item.innerHTML=element;
          item.setAttribute("id",`${element}`);
          dropdown.appendChild(item);
          document.getElementById(`${element}`).onclick=function(e){
          filter_data(e.target.innerHTML,data)
          cur_symbol=e.target.innerHTML;
          var heading=document.getElementById("heading");
          heading.innerHTML=`<h1>${cur_symbol}</h1>`
          }
        });
    
          document.getElementById("ohlc").onclick=function(e){
          filter_data(cur_symbol,data,"ohlc")
          }
        
        document.getElementById("candlestick").onclick=function(e){
          filter_data(cur_symbol,data,"candlestick")
          }

        document.getElementById("line").onclick=function(e){
          filter_data(cur_symbol,data,"line")
          }
        document.getElementById("bar").onclick=function(e){
            filter_data(cur_symbol,data,"bar")
            }

   function filter_data(symbol, data, charttype="ohlc")
    {
    
    var new_data= data.filter(function (el) {
      return el.symbol===symbol ;
    });
    plotdata(new_data, charttype);
  }

  filter_data(cur_symbol, data);
  });

 
}
