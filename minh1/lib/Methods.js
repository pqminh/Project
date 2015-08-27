Meteor.methods({
  addTask:function(text){
     if(!Meteor.userId()){
     throw Meteor.Error("not-authorized");
  }
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.userId().username
    });
  },
  deleteTask: function (taskId) {
    var task = Tasks.findOne(taskId);
    if(task.owner !== Meteor.userId()){
      alert("Permission Denied");
      throw new Meteor.Error("not-authorized");
    }
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    var task = Tasks.findOne(taskId);
    if(task.owner !== Meteor.userId()){
      alert("Permission Denied");
      throw new Meteor.Error("not-authorized");
    }
    Tasks.update(taskId, { $set: { checked: setChecked} });
  },
  setPrivate: function(taskId,setToPrivate){
    var task = Tasks.findOne(taskId);
    if(task.owner !== Meteor.userId()){
      alert("Permission Denied");
      throw new Meteor.Error("not-authorized");
    }
    Tasks.update(taskId,{$set:{
      private: setToPrivate
    }});
  }
});
