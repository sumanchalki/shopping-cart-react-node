import $ from 'jquery';

export const countCart = cart => {
  const cartItemCount = cart.map(item => item.quantity).reduce((total, num) => (total + num), 0);
  const cartTotal = cart.map(item => item.Price * item.quantity).reduce((total, num) => (total + num), 0);
  return { cartItemCount, cartTotal }
}

export const highLightCartButton = () => {
  $("html, body").animate({ scrollTop: 0 }, 300);
  $("#nav-view-cart-link").addClass('active');
  setTimeout(() => $("#nav-view-cart-link").removeClass('active'), 700);
}

export const displayMessage = (message, type) => {
  switch (type) {
    case 'success':
      $('.container.main-container').prepend(
        `<div class="alert alert-success alert-dismissible fade show">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Success!</strong> ${message}
        </div>`
      );
      break;
    case 'error':
      $('.container.main-container').prepend(
        `<div class="alert alert-danger alert-dismissible fade show">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Error!</strong> ${message}
        </div>`
      );
      break;
    default:
      $('.container.main-container').prepend(
        `<div class="alert alert-dismissible fade show">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          ${message}
        </div>`
      );
  }
}