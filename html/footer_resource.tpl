<script src="js/vendor/jquery.min.js"></script>
<script src="js/vendor/what-input.min.js"></script>
<script src="js/vendor/foundation.min.js"></script>
<script>
 $(document).foundation();

 $('.top-bar-title').click(function(){
    location = 'index.html'
 })

 if( location.pathname.indexOf('download.html') != -1  || location.pathname.indexOf('demo.html') != -1   ){
       $('.top-bar').addClass('non-index')
 }

</script>