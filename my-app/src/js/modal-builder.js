class ModalBuilder {
  constructor() {
    this.restaurantModal = "<div class='modal fade' id='mymodal' tabindex='-1' role='dialog' aria-labelledby='mymodalLabel' aria-hidden='true'>      <div class='modal-dialog modal-lg' role='document'>        <div class='modal-content'>          <div class='modal-header'>            <h2 class='modal-title' id='mymodalLabel'>{0}</h2> <button type='button' class='close' data-dismiss='modal'              aria-label='Close'> <span aria-hidden='true'>&times;</span> </button>          </div>          <div class='modal-body'>            {1}            {2}            {3}            {4}            {5}            {6}            {7}            {8}          </div>                  </div>      </div>    </div>";
    this.infoWindow = "<div> <h2>{0}</h2> <img src={1} width='200'><div style='margin-top:10px;'><span style='text-align:center;'>{2}</span> </div> </div>";
  }

  CreateInfoWindow(content) {
    return this.infoWindow.format(content.title, content.img, content.body)
  }

  CreateModal(content) {
    var title = content.title;
    var images = this.CreateImagesRowContent(content.images);
    var description = (content.descriptions) ? this.CreateDescriptionRowContent(content.descriptions) : "";
    var address = (content.address) ? this.CreateAddressRowContent(content.address) : "";
    var categories = (content.categories) ? this.CreateCategoriesRowContent(content.categories) : "";
    var contacts = (content.contacts) ? this.CreateContactsRowContent(content.contacts) : "";
    var oficialSite = (content.oficial_site) ? this.CreateOficialSitesRowContent(content.oficial_site) : "";
    var operation = (content.opening_hours) ? this.CreateOperationRowContent(content.opening_hours) : "";

    var social = (content.social_networks) ? this.CreateSocialRowContent(content.social_networks) : "";

    return this.restaurantModal.format(title, images, description, address, categories, contacts, oficialSite, operation, social);
  }

  CreateImagesRowContent(images) {
    var row = "<div class='row custom-images'>";
    row += "<div class='col-xs-10 col-sm-8 col-md-8 col-lg-8 col-centered'> {0} </div>";
    row += "</div>";

    var carosel = this.CreateCarousel(images);

    return row.format(carosel)
  }

  CreateDescriptionRowContent(descriptions) {
    var row = "<div class='row custom-descriptions' >";
    row += "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12'>";
    for (let i = 0; i < descriptions.length; i++) {
      const element = descriptions[i];
      row += (("<p>{0}</p>").format(element));
    }

    row += "</div></div>";

    return row;
  }

  CreateAddressRowContent(address) {
    var row = "<div class='row custom-address' >";
    row += "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12'><p><b>Endereço: </b>{0}</p></div>";
    row += "</div>";

    return row.format(address);
  }

  CreateCategoriesRowContent(categories) {
    var row = "<div class='row custom-categories' >";
    row += "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12'>";
    row += "<p><b>Categorias: </b>";
    for (let i = 0; i < categories.length; i++) {
      const element = categories[i];
      if (i == categories.length - 1) {
        row += (("{0}").format(element));
      } else {
        row += (("{0} - ").format(element));
      }
    }

    row += "</p></div></div>";

    return row;
  }

  CreateContactsRowContent(contacts) {
    var row = "<div class='row custom-contacts' >";
    row += "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12'>";
    row += "<p><b>Contatos: </b>";
    for (let i = 0; i < contacts.length; i++) {
      const element = contacts[i];
      var value = "{0} - ";

      if (i == contacts.length - 1) {
        value = "{0}";
      }
      row += ((value).format(element)).replace("cel:", "<b>cel:</b>").replace("e-mail:", "<b>e-mail:</b>");
    }

    row += "</p></div></div>";

    return row;
  }

  CreateOficialSitesRowContent(site) {
    var row = "<div class='row custom-site' >";

    row += "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12'><p><b>Site Oficial: </b><a href='{0}' target='_blank'>{0}</a></p> </div>";
    row += "</div>";

    return row.format(site);
  }

  CreateOperationRowContent(date) {
    var row = "<div class='row custom-operation' >";

    row += "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12'><p><b>Funcionamento: </b>{0}</p> </div>";
    row += "</div>";

    return row.format(date);
  }

  CreateSocialRowContent(socials) {
    var row = "<div class='row custom-social' >";
    row += "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12'>";
    row += "<p><b>Redes Sociais: </b>";

    var linkImage = "<a href='{0}' target='_blank'><img src='{1}' alt='HTML5 Icon' width='50' height='50'></a>";
    var link = "<a href='{0}' target='_blank'>{0}</a>";

    for (let i = 0; i < socials.length; i++) {
      const element = socials[i];

      var icon = this.GetSocialNetworkIcon(element);
      if (icon){
        row += (linkImage).format(element, icon);
      }else{
        row += (link).format(element);
      }
    }

    row += "</p></div></div>";

    return row;
  }

  GetSocialNetworkIcon(link) {
    if (link.indexOf("instagram") > -1) {
      return "https://storage.googleapis.com/my-project-icons/social_network/instagram.png"
    } else if (link.indexOf("facebook") > -1) {
      return "https://storage.googleapis.com/my-project-icons/social_network/facebook.png"
    } else if (link.indexOf("telegram") > -1) {
      return "https://storage.googleapis.com/my-project-icons/social_network/telegram.png"
    } else if (link.indexOf("twitter") > -1) {
      return "https://storage.googleapis.com/my-project-icons/social_network/twitter.png";
    }
    return null;
  }

  CreateCarousel(images) {
    var carousel = "<div id='myCarousel' class='carousel slide' data-ride='carousel'>{0}{1}{2}</div>";

    var indicators = "";
    var controllers = "";

    if (images.length > 1) {
      indicators = this.CraeteCarouselIndicators(images.length);
      controllers = this.CreateIndicatorsControllers();
    }

    var inner = this.CreateCarouselInner(images);

    carousel = carousel.format(inner, indicators, controllers)
    return carousel;
  }

  CreateIndicatorsControllers() {
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
