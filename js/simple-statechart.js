(function($){
    
  $.fn.statechart = function(options){
  
    // first fix the index of problem
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(obj, start) {
       for (var i = (start || 0), j = this.length; i < j; i++) {
         if (this[i] === obj) { return i; }
       }
       return -1;
      }
    }
    
    // settings
    var settings = $.extend({
      activeStateId: '',
      activeTransitionId: ''
    },options);
    
    // states and transitions
    var states = this.find('div[class|="state"]');
    var transitions = this.find('a[class|="transition"]');
    
    // select active state and transition
    jQuery('#' + settings.activeStateId).removeClass('state').addClass('state-active');
    jQuery('#' + settings.activeTransitionId).addClass('transition-active');
        
    var positionedStateIds = [];
    
    var getNextRightStates = function(curStateId){
    	var ret = [];
    	var trans = jQuery("a.transition-right[id*='" + curStateId + "'],a.transition-left[id*='" + curStateId + "']");
    	trans.each(function(index){
    	  var transId = jQuery(this).attr('id');
    	  var id = transId.replace(curStateId,'').replace('-','');
    	  if (ret.indexOf(id) === -1){
    	    ret.push(id);
    	  }
    	});
    	return ret;
    };
    
    var positionState = function(stateId, referenceStateId){
    	if (positionedStateIds.indexOf(stateId) === -1){
    		positionedStateIds.push(stateId);
    		if (referenceStateId){
    			jQuery('#' + stateId).appendTo('#state-wrapper-right-' + referenceStateId);
    		}
    		jQuery('#' + stateId).wrap("<div id='state-wrapper-" + stateId + "' class='state-wrapper'><div id='state-wrapper-left-" + stateId + "' class='state-wrapper-left'></div></div>");
    		jQuery("<div id='state-wrapper-right-" + stateId + "' class='state-wrapper-right'></div>").appendTo('#state-wrapper-' + stateId);
    	}
    };
    
    // position states
    for (var i = 0; i < states.length; i++ ){
    	var state = jQuery(states[i]);
    	var stateId = state.attr('id');
    	var nextStates = getNextRightStates(stateId);
    	positionState(stateId, null);
    	for (var j = 0; j < nextStates.length; j ++){
    		positionState(nextStates[j], stateId);
    	}
    }
    
    // resize states
    for (var i = 0; i < states.length; i++ ){
    	var state = jQuery(states[i]);
    	var stateWrapper = state.parents('.state-wrapper-left:first');
    	state.width(stateWrapper.width() - 
    			    state.css('margin-right').replace('px','')*1 - 
    			    state.css('padding-left').replace('px','')*1  - 
    			    state.css('padding-right').replace('px','')*1 - 4);
    	state.height(stateWrapper.height() - 
    			     state.css('margin-bottom').replace('px','')*1 - 
			         state.css('padding-top').replace('px','')*1  - 
			         state.css('padding-bottom').replace('px','')*1 - 4);
    }
    
    // position transitions
    for (var i = 0; i < transitions.length; i++ ){
    	var trans = jQuery(transitions[i]);
    	var id = trans.attr('id');
    	var dir = trans.attr('class');
    	
    	var title = trans.html();
    	trans.attr('title',title);
    	trans.html('');
    	
    	if (dir.indexOf('up') !== -1 || dir.indexOf('down') !== -1){
        	// up or down +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    		var splitIndex = 1;
        	var leftCorrection = 16;
        	if (dir.indexOf('up') !== -1){
        		splitIndex = 0;
        		leftCorrection = 62;
        	}
        	var state = jQuery('#' + id.split('-')[splitIndex]);
        	var statePaddingVer = state.css('padding-top').replace('px','')*1  + 
        			              state.css('padding-bottom').replace('px','')*1;
        	
        	var posTop = state.offset().top - trans.height() - statePaddingVer;
        	var posLeft = state.offset().left + leftCorrection;
        	
        	trans.offset({top: posTop, left: posLeft});
    	}else if (dir.indexOf('left') !== -1 || dir.indexOf('right') !== -1){
    		// left or right ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        	var splitIndex = 1;
        	var topCorrection = 16;
        	if (dir.indexOf('left') !== -1){
        		splitIndex = 0;
        		topCorrection = 62;
        	}
        	var state = jQuery('#' + id.split('-')[splitIndex]);
        	var statePaddingHor = state.css('padding-left').replace('px','')*1  + 
        			              state.css('padding-right').replace('px','')*1;
        	
        	var posLeft = state.offset().left - trans.width() - statePaddingHor;
        	var posTop = state.offset().top + topCorrection;
        	
        	trans.offset({top: posTop, left: posLeft});
    	}
    }
    
    //add events
    this.click(function(ev){
    	var clickedElement = jQuery(ev.target);
    	if (clickedElement.hasClass('transition-active')){
    		var id = clickedElement.attr('id');
    		var prevState = jQuery('#' + id.split('-')[0]);
    		var nextState = jQuery('#' + id.split('-')[1]);
    		var nextIndex = clickedElement.attr('data-index')*1 + 1;
    		var nextTrans = jQuery('[data-index="' + nextIndex + '"]');
    		prevState.removeClass('state-active').addClass('state');
    		nextState.addClass('state-active').removeClass('state');
    		clickedElement.removeClass('transition-active');
    		nextTrans.addClass('transition-active');
    	}
    });
    
    return this;
  };
  
}(jQuery));