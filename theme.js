document.getElementById('theme').addEventListener('change', function() {
    val = $( "#theme" ).val();  
    console.log(val)
    if(val === 'Light') {
      window.open('index.html');
      }
    if(val === 'Dark') {
      window.open('indexd.html');
    }
  });