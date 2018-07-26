/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {

  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $commentContainerTextarea = $(".comment-container textarea"),
    $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

  $commentContainerTextarea.one("focus", function() {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  // Expand Request comment form when Add to conversation is clicked
  var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
    $requestCommentFields = $(".request-container .comment-container .comment-fields"),
    $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");

  $showRequestCommentContainerTrigger.on("click", function() {
    $showRequestCommentContainerTrigger.hide();
    $requestCommentFields.show();
    $requestCommentSubmit.show();
    $commentContainerTextarea.focus();
  });

  // Mark as solved button
  var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
    $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
    $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");

  $requestMarkAsSolvedButton.on("click", function () {
    $requestMarkAsSolvedCheckbox.attr("checked", true);
    $requestCommentSubmitButton.prop("disabled", true);
    $(this).attr("data-disabled", true).closest("form").submit();
  });

  // Change Mark as solved text according to whether comment is filled
  var $requestCommentTextarea = $(".request-container .comment-container textarea");

  $requestCommentTextarea.on("keyup", function() {
    if ($requestCommentTextarea.val() !== "") {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
      $requestCommentSubmitButton.prop("disabled", false);
    } else {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
      $requestCommentSubmitButton.prop("disabled", true);
    }
  });

  // Disable submit button if textarea is empty
  if ($requestCommentTextarea.val() === "") {
    $requestCommentSubmitButton.prop("disabled", true);
  }

  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select")
    .on("change", function() {
      search();
    });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  $(".header .icon-menu").on("click", function(e) {
    e.stopPropagation();
    var menu = document.getElementById("user-nav");
    var isExpanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", !isExpanded);
  });

  if ($("#user-nav").children().length === 0) {
    $(".header .icon-menu").hide();
  }

  // Submit organization form in the request page
  $("#request-organization select").on("change", function() {
    this.form.submit();
  });

  // Toggles expanded aria to collapsible elements
  $(".collapsible-nav, .collapsible-sidebar").on("click", function(e) {
    e.stopPropagation();
    var isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
  });
  
  function appendHeader (headerHTML) {
    $('main[role="main"]').prepend(headerHTML);
  }
  
  function userVisitsNoHeaderPageWithClearedLocalStorage (
  	header,
    storedHeaderHTML,
    headerHTMLPlaceholder
  ) {
    if (!header.length && !storedHeaderHTML) {
        window.localStorage.setItem('zndskHeader', headerHTMLPlaceholder);
      	appendHeader(storedHeaderHTML);
      	return true;
    }
  }
  
  function noHeaderOnPage (header, storedHeaderHTML) {
    if (!storedHeaderHTML) {
  		window.localStorage.setItem('zndskHeader', header[0].outerHTML.replace(/\n/g, ''));
      return true;
  	}
  }
  
  function embedHeaderOnEveryPage () {
		var header = $('.header');
    var storedHeaderHTML = window.localStorage.getItem('zndskHeader');
    var headerHTMLPlaceholder = '<header class="header"><a title="Home" href="/hc/en-us"><img height="80" src="//theme.zdassets.com/theme_assets/2212352/f2594f0ccc55b925d9645f287f0add1f2f268250.png" alt="Logo">  </a><nav class="header-nav"><a href="/hc/en-us/categories/360000082754-Android" class="blocks-item-link">Android</a><a href="/hc/en-us/categories/360000080093-iOS" class="blocks-item-link">iOS</a><a href="/hc/en-us/categories/360000158453-API" class="blocks-item-link">API</a></nav><form role="search" class="search header-search" data-search="" data-instant="true" autocomplete="off" action="/hc/en-us/search" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="✓"><input type="search" name="query" id="query" placeholder="Search" autocomplete="off" aria-label="Search"></form></header>';
    
    if (userVisitsNoHeaderPageWithClearedLocalStorage(header, storedHeaderHTML, headerHTMLPlaceholder)) {
        return;
    }
    
  	if (noHeaderOnPage(header, storedHeaderHTML)) {
        return;
    }
    
    if (header.length) {
        return;
    }
    
    appendHeader(storedHeaderHTML);
  }
  
  embedHeaderOnEveryPage();
});
