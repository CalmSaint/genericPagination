({
  doneRerender: function(component,event,helper){
    if(component.isValid()){
      helper.removeButtonCSS(component);
    }
  },
  paginate: function(component,event,helper){
    if (component.isValid()) {
      helper.processPageRecords(component, event, helper);
    }
  },
  changePage: function (component, event, helper) {
    if (component.isValid()) {
      var selectcmp = component.find('selectPageId');
      var pageLimit = parseInt(selectcmp.getElement().value, 10);
      if (pageLimit) {
        component.set('v.pageLimit', pageLimit);
        helper.processPageRecords(component, event, helper, true);
      }
    }
  }
});