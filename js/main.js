
var App = {
  
  facebook_id : "490869927652398",

  market_url  : "http://happy.ph.xxx/marketplace_for_app.json?callback=?",

  preferences : { 
    preview_mobile_site : true,
    category      : 'everything',
    page          : 1, 
    per           : 24, 
    sort          : 'newest', 
    landing       : true 
  },

  items : [],

  initialize : function(){ 

    this.store = new MemoryStore();
    
    this.items_cont = $("#products");

    this.tmpls = {
      item    : $("#product_tmpl").html(),
      message : $("#message_tmpl").html()
    };

    this.initialize_user();

    this.initialize_behaviours();

  },

  initialize_user : function(){

  },

  initialize_behaviours : function(){
    
    $(window).on('hashchange', $.proxy(this.route, this));

    this.items_cont.
      on('.product_photo','click',function(){
        App.show_item(this.parents(".product").attr('data-id'));
      }).
      on('.product_heart','click',function(){
        App.toggle_favorite(this.parents(".product").attr('data-id'));
      });

  },

  route : function() {
    var hash = window.location.hash;
    if (!hash) {
      go_to();
    }
  },

  go_to : function(section) {
    $("section").hide();
    
    if (!section) {
      $("#marketplace").show();
    }

  },

  fetch : function(and_render){
    $.jsonp({
      url : App.market_url,
      data : App.preferences,
      dataType : "JSON",
      success : function(data){
        
        if (_.isArray(data)) {
          App.items.push(data);  
        }
        
        if (and_render===true) {
          App.render(data);
          App.go_to();
        }

      },
      error : function(x,s,e) {      
      }
    });
  },

  render : function(new_items, replace){
    if (replace===true) {
      this.items_cont.empty();
    }

    _.each(new_items, function(item){
      App.items_cont.append( Mustache.to_html(App.tmpls.item, item) );
    });

  },

  show_item : function(item_id) {

  },

  toggle_favorite : function(item_id) {

  }

};