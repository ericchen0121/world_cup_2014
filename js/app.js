App = Ember.Application.create();

App.Router.map(function() {
  this.resource('teams');
  this.resource('players');
});
