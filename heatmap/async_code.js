<script>
    <!--START of tracking code-->

    function getXPath( element ) {
        var val=element.value;
            var xpath = '';
            //Check if element node or not and set element as its parent node
            for ( ; element && element.nodeType == 1; element = element.parentNode )
            {
                //get index ot element
                var id = $(element.parentNode).children(element.tagName).index(element) + 1;
                //Set index as xpath string
                id > 1 ? (id = '[' + id + ']') : (id = '');
                xpath = '/' + element.tagName.toLowerCase() + id + xpath;
            }
            return xpath;
    }

    $(document).ready(function() {

        $('body').on('click', function(t) {
            console.log(t);
            var width = t.target.clientWidth;
            var height = t.target.clientHeight;
            var XPATH = getXPath(t.target);
            //Offsetxy not available on firefox
            var offsetx = (t.offsetX || (t.pageX - $(t.target).offset().left));
            var offsety = (t.offsetY || (t.pageY - $(t.target).offset().top));
            var params = 'xpath=' + encodeURIComponent(XPATH) + '&xratio=' + (width/offsetx) + '&yratio=' + (height/offsety) + '&' + Math.random();
            $('<img src="http://127.0.0.1:8000/record?' + params + '">');
        });

    });
    <!--END of tracking code-->
</script>
