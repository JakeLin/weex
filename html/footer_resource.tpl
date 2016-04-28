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

<script type="text/javascript">
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1258852176'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1258852176' type='text/javascript'%3E%3C/script%3E"));
</script>