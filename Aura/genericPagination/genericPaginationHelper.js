({
  removeButtonCSS: function (component) {
    $A.util.removeClass(component.find('first'), 'uiButton--default uiButton');
    $A.util.removeClass(component.find('previous'), 'uiButton--default uiButton');
    $A.util.removeClass(component.find('next'), 'uiButton--default uiButton');
    $A.util.removeClass(component.find('last'), 'uiButton--default uiButton');
  },
  processPageRecords: function (component, event, helper, flag) {
    var buttonval = '';
    if (flag === true) {
      buttonval = 'first';
    } else {
      buttonval = event.getSource().getLocalId().toLowerCase();
    }
    if (buttonval) {
      var pageLimit = component.get('v.pageLimit'), offsetvalue = component.get('v.offset'),
        totalrows = component.get('v.totalRecords');
      if (buttonval === 'first') {
        offsetvalue = 0;
        component.set('v.isLast', false);
      } 
      else if (buttonval === 'previous') {
        offsetvalue = offsetvalue - pageLimit;
        component.set('v.isLast', false);
      }
      else if (buttonval === 'last' || buttonval === 'next') {
        if (totalrows > (offsetvalue + pageLimit) && buttonval === 'next') {
          offsetvalue = offsetvalue + pageLimit;
          component.set('v.isLast', false);
        }
        if (buttonval === 'last' || totalrows <= (offsetvalue + pageLimit)) {
          var currentpage = (totalrows % pageLimit) > 0 ? Math.floor(totalrows / pageLimit) + 1 : Math.floor(totalrows / pageLimit);
          offsetvalue = (currentpage - 1) * pageLimit;
          component.set('v.isLast', true);
        }
      }
      component.set('v.offset', offsetvalue);
      let pageEvent = component.getEvent('pageChangeEvent');
      pageEvent.setParams({ 'pageValue': offsetvalue });
      pageEvent.fire();
    }
  }
})