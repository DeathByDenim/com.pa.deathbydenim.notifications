(function() {
    console.log("Notification in live_game_chat");

    var oldhandler = handlers.chat_message;
    handlers.chat_message = function (payload) {
        oldhandler(payload);
        console.log("Message intercepted:", payload);
        if(payload && payload.type == "global") {
            var message = {
                player: payload.player_name,
                donor: payload.type,
                unit: payload.message
            };
            api.Panel.message(api.Panel.parentId, 'notifications.message', message);
        }
    }
})();

function testmessage() {
    var message = {
        player: "player",
        donor: "donor",
        unit: "unit",
    };

    api.Panel.message(api.Panel.parentId, 'notifications.message', message);
}
