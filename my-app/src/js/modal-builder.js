class ModalBuilder {
  constructor() {
    this.restaurantModal = "<div class='modal fade' id='mymodal' tabindex='-1' role='dialog' aria-labelledby='mymodalLabel' aria-hidden='true'>      <div class='modal-dialog modal-lg' role='document'>        <div class='modal-content'>          <div class='modal-header'>            <h2 class='modal-title' id='mymodalLabel'>{0}</h2> <button type='button' class='close' data-dismiss='modal'              aria-label='Close'> <span aria-hidden='true'>&times;</span> </button>          </div>          <div class='modal-body'>            <div class='row custom-images'>              <div class='col-xs-10 col-sm-8 col-md-8 col-lg-8 col-centered'> {1} </div>            </div>            <div class='row custom-description'>              <div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12'>{2}</div>            </div>          </div>          <div class='modal-footer'> <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>          </div>        </div>      </div>    </div>";
    this.infoWindow = '<div> <h2>{0}</h2> <img src={1} width="200"><div> {2} </div> </div>';
  }

  CreateInfoWindow(content) {
    return this.infoWindow.format(content.title, content.img, content.body)
  }

  CreateModal(content) {
    var carosel = this.CreateCarousel(content.images);

    return this.restaurantModal.format(content.title, carosel, content.description);
  }

  CreateCarousel(images) {
    var carousel = "<div id='myCarousel' class='carousel slide' data-ride='carousel'>{0}{1}{2}</div>";

    var indicators = "";
    var controllers = "";

    if (images.length > 1){
        indicators = this.CraeteCarouselIndicators(images.length);
        controllers = this.CreateIndicatorsControllers();
    }
    
    var inner = this.CreateCarouselInner(images);
    
    carousel = carousel.format(inner, indicators, controllers)
    return carousel;
  }

  CreateIndicatorsControllers(){
      return "<a class='left carousel-control' href='#myCarousel' data-slide='prev'>    <span class='glyphicon glyphicon-chevron-left'></span>    <span class='sr-only'>Previous</span>  </a>  <a class='right carousel-control' href='#myCarousel' data-slide='next'>    <span class='glyphicon glyphicon-chevron-right'></span>    <span class='sr-only'>Next</span>  </a>";
  }

  CraeteCarouselIndicators(numbers) {
    var baseValue = "<ol class='carousel-indicators'>";

    for (let i = 0; i < numbers; i++) {
      if (i == 0) {
        baseValue += ("<li data-target='#myCarousel' data-slide-to='{0}' class='active'></li>").replace("{0}", i + "");
      } else {
        baseValue += ("<li data-target='#myCarousel' data-slide-to='{0}'></li>").replace("{0}", i + "");
      }
    }

    baseValue += " </ol>";

    return baseValue;
  }

  CreateCarouselInner(images) {
    var baseValue = "<div class='carousel-inner'>";

    for (let i = 0; i < images.length; i++) {
      if (i == 0) {
        baseValue += ("<div class='item active'> <img src='{0}' style='width:100%;'> </div>").replace("{0}", images[i]);
      } else {
        baseValue += ("<div class='item'> <img src='{0}' style='width:100%;'> </div>").replace("{0}", images[i]);
      }
    }

    baseValue += "</div>";

    return baseValue;
  }
}
