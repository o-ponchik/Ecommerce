import React from "react";

const OrderForm = () => {
  return (
    <div>
      <h1>Pre-Order Form:</h1>
      <form>
        <div className="form-wrapper">
          <div className="name-form">
            <div>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                enterkeyhint="next"
                required
              />
            </div>
            <div>
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                enterkeyhint="next"
                required
              />
            </div>
          </div>
          <div className="email-form">
            <label htmlFor="email">
              Email <span className="asterisk">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              enterkeyhint="next"
              required
              placeholder="example@gmail.com"
            />
          </div>
          <div className="phone-form">
            <label htmlFor="phome">
              Phone Number (enter xxx-xxx-xxxx){" "}
              <span className="asterisk">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="093-123-4567"
              enterkeyhint="next"
              required
            />
          </div>
          <div className="address">
            <h3>
              Shopping Address <span className="asterisk">*</span>
            </h3>
            <div>
              <label for="street-address">Street address</label>
              <input
                type="text"
                id="street-address"
                name="street-address"
                autocomplete="street-address"
                required
                enterkeyhint="next"
              />
            </div>
            <div>
              <label for="postal-code">ZIP or postal code</label>
              <input
                class="postal-code"
                id="postal-code"
                name="postal-code"
                autocomplete="postal-code"
                enterkeyhint="next"
                required
              />
            </div>
            <div>
              <label for="city">City</label>
              <input
                required
                type="text"
                id="city"
                name="city"
                autocomplete="address-level2"
                enterkeyhint="next"
              />
            </div>
            <div>
              <label for="state">State</label>
              <input
                required
                type="text"
                id="state"
                name="state"
                enterkeyhint="next"
              />
            </div>
            <div>
              <label for="country">Country</label>
              <input
                required
                type="text"
                id="country"
                name="country"
                enterkeyhint="done"
              />
            </div>
          </div>
          <div className="details-form">
            <label for="details">
              If you have any additional notes about this order, please write.
            </label>
            <textarea id="details" name="details" rows="5" cols="33">
              Type here...
            </textarea>
          </div>

          <div className="orders">
            <h2>Your orders:</h2>

            <div className="order-item">
              <div className="order-image">
                <img src="" alt="IMAGE" />
              </div>
              <div className="order-description">
                <h3>Name</h3>
                <p>+ 1 -</p>
              </div>
              <div className="order-price">
                <h3>$100</h3>
              </div>
            </div>

            {/* <div className="product-container">
              {cartItems.length >= 1 &&
                cartItems.map((item) => (
                  <div className="product" key={item._id}>
                    <img
                      src={urlFor(item?.image[0])}
                      className="cart-product-image"
                    />
                    <div className="item-desc">
                      <div className="flex top">
                        <h5>{item.name}</h5>
                        <h4>${item.price}</h4>
                      </div>
                      <div className="flex bottom">
                        <div>
                          <p className="quantity-desc">
                            <span
                              className="minus"
                              onClick={() =>
                                toggleCartItemQuantity(item._id, "dec")
                              }
                            >
                              <AiOutlineMinus />
                            </span>

                            <span className="num">{item.quantity}</span>
                            <span
                              className="plus"
                              onClick={() =>
                                toggleCartItemQuantity(item._id, "inc")
                              }
                            >
                              <AiOutlinePlus />
                            </span>
                          </p>
                        </div>
                        <button
                          className="remove-item"
                          type="button"
                          onClick={() => onRemove(item)}
                        >
                          <TiDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
