import Ember from 'ember';

export default {
    name: "foundation",
    initialize: function() {
        Ember.View.reopen({
            _initializeFoundation: function() {
                console.log('Re-initialized foundation.');
                $(document).foundation();
            },
            initializeFoundation: function() {
                Ember.run.debounce(
                    null,
                    this._initializeFoundation,
                    500
                );
            }.on('didInsertElement'),
        });
    }
};
