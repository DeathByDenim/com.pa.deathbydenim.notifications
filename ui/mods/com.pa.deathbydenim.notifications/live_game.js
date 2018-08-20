(function() {
    console.log("Loaded notification mods");
    var $panel = $("<panel id='notifications'></panel>").css({
        visibility: "visible",
        width: "100%",
        height: "100%",
    }).attr({
        name: "notifications",
        src: "coui://ui/mods/com.pa.deathbydenim.notifications/live_game_notifications.html",
        "yield-focus": true,
        fit: "dock-top-left",
    }).addClass("ignoreMouse");
    $panel.appendTo("body");
    api.Panel.bindElement($panel[0]);
    //Delayed so the positioning works out right
    $panel.css("display", "flex");
})();

function create_notification(player, donor, unit, primary, secondary) {
    var message = {
        player: player,
        donor: donor,
        unit: unit,
        primary: primary,
        secondary: secondary
    };
    api.panels.notifications.message('new_message', message);
}

handlers['notifications.message'] = function(message) {
    message.primary = "grey";
    message.secondary = "darkgrey";
    for(var i = 0; i < model.players().length; i++) {
        var p = model.players()[i];
        if(p.name === message.player) {
            message.primary = "rgb("+p.primary_color[0]+","+p.primary_color[1]+","+p.primary_color[2]+")"
            message.secondary = "rgb("+p.secondary_color[0]+","+p.secondary_color[1]+","+p.secondary_color[2]+")"
            break;
        }
    }
    api.panels.notifications.message('new_message', message);
};
