// !LOCNS:live_game
var model;
var handlers = {};

$(document).ready(function () {

    function NotificationViewModel() {
        var self = this;

        self.newMessage = function (message) {
            console.log(message);
            var notification_element = $("<div class=\"notification\"><span class=\"notification_line notification_secondary\" style=\"background-color: "+message.secondary+"\"></span><span class=\"notification_line notification_primary\" style=\"background-color: "+message.primary+"\"></span><b>"+message.player+"</b> received <b>"+message.unit+"</b> from <b>"+message.donor+"</b></div>").appendTo($('body'));
            setTimeout(function() {
                notification_element.remove();
            }, 10000);
        };

        self.setup = function () {
            console.log("Setting up NotificationViewModel");
        };
    }
    model = new NotificationViewModel();

    handlers.new_message = model.newMessage;

    // inject per scene mods
    if (scene_mod_list['live_game_notification'])
        loadMods(scene_mod_list['live_game_notification']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // run start up logic
    model.setup();
});
