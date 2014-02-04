var controller = Ember.ObjectController.extend({
  needs: ['tasks'],
  actions: {
    'complete': function(){
      var self = this;
      this.get('model').destroyRecord().then(function(){
        self.get('controllers.tasks').refresh();
        self.transitionToRoute('tasks');
      }, function(){
        alert("An error was encountered while marking this task completed.");
      });
    },
    'delete': function(){
      var url = this.store.adapterFor('task').buildURL('task', this.get('uuid')) + 'delete/';
      $.ajax({
        url: url,
        dataType: 'json',
        statusCode: {
          200: function(){
            self.get('model').unloadRecord();
            self.get('controllers.tasks').refresh();
            self.transitionToRoute('tasks');
          },
          501: function(){
            alert("Deleting tasks is currently unimplemented");
          }
        }
      });
    }
  }
});

module.exports = controller;
