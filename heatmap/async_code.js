<script>
    <!--START of tracking code-->

function getXPath( element ) {
    var val=element.value;
    var xpath = '';
    for ( ; element && element.nodeType == 1; element = element.parentNode )
    {
                //alert(element);
        var id = $(element.parentNode).children(element.tagName).index(element) + 1;
        id > 1 ? (id = '[' + id + ']') : (id = '');
        xpath = '/' + element.tagName.toLowerCase() + id + xpath;
    }
    return xpath;
}

$(document).ready(function() {

    $('body').on('click', function(t) {
        var width = t.target.clientWidth;
        var height = t.target.clientHeight;
        var XPATH = getXPath(t.target);
        var offsetx = t.offsetX;
        var offsety = t.offsetY;
        var params = 'xpath=' + encodeURIComponent(XPATH) + '&xratio=' + (width/offsetx) + '&yratio=' + (height/offsety) + '&' + Math.random();
        $('<img src="http://127.0.0.1:8000/record?' + params + '">');
    });
});
    <!--END of tracking code-->
</script>