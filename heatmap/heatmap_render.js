<script type="text/javascript">

var config = {
    element: 'container',
    radius: 10,
    opacity: 50
};

$("#frame").load(function() {
    var coords = [];
    //Set Iframe's height to the height of the contents inside the iframe (To avoid scrollbars)
    $("iframe").css('height', $("#frame").contents().height() + 'px' );
    //Set container(contains the canvas) height to the iframe height
    $("#container").css("height", $("#frame").contents().height() + 'px' );
    $.get( "/retreive_data/", function( data ) {

        var frame = $('#frame').get(0);
        var frame_height = $('#frame').contents().height();
        $.each(data, function(xpath, info) {
            var elem = document.evaluate(xpath, frame.contentDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            $(elem).css({'border':'1px solid black'});
            var offset = $(elem).offset();
            var counter_element = '<span class="bubble">' + info.clicks + '</span>';

            $(elem).append(counter_element);

            $(elem).find('.bubble').css({
                'background-color': 'black',
                'color': 'white',
                'padding': '2px',
                'font-size': '12px',
                'border-radius': '50px',
                'position': 'relative',
                'line-height': '14px',
                'font-weight': 'bold',
                'float':'right'
            });
            $.each(info.positions, function(index, pos) {
                x_pos = offset.left + $(elem).get(0).clientWidth / pos[0];
                y_pos = offset.top + $(elem).get(0).clientHeight / pos[1];
                coords.push({x:x_pos, y:y_pos, count:info.clicks});

            });
        });
        var heatmap = h337.create(config);
        var metrics = {
            max: Math.max.apply(Math, coords.map(function(t) {return parseInt(t.count)})),
            data: coords
        };
        heatmap.store.setDataSet(metrics);
    });
});
</script>