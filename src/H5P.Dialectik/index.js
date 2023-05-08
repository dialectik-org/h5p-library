var H5P = H5P || {};

H5P.Dialectik = (function ($) {
  /**
   * Constructor function.
   */
  function C(options, id) {
    this.$ = $(this);
    // Extend defaults with provided options
    //this.options = $.extend(true, {}, {
    //  script: '',
    //}, options);
    this.options = options;
    // Keep provided id.
    this.id = id;
  };

  /**
   * Attach function called by H5P framework to insert H5P content into
   * page
   *
   * @param {jQuery} $container
   */
  C.prototype.attach = function ($container) {
    var self = this;
    console.log('Executing Dialectik component ...')
    $container.addClass('dialectik-container');
     // Add root div needed by react.
    $container.append('<div id="root"></div>')
    // Add content's react script.
    const script = document.createElement('script');
    script.defer = true;
    script.text = window.atob(this.options.script, 'base64');
    $container.append(script);
    if (this.options.style) {
      const style = document.createElement('style');
      style.innerText = window.atob(this.options.style, 'base64')
      $container.append(style)
    }
    // TODO - need to wait for image beeing loaded
    // For now using timer. Should wait for image is loaded...
    setTimeout(function () {
      self.trigger('resize');
    }, 2000);
  };

  return C;
})(H5P.jQuery);
