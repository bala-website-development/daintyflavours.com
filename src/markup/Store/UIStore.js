import { Store } from "pullstate";
import secureLocalStorage from "react-secure-storage";
const cartDetails = JSON.parse(secureLocalStorage.getItem("daintycart"));
const daintyproducts_ = JSON.parse(secureLocalStorage.getItem("daintyproducts"));
const a = 3;
export const UIStore = new Store({
  cartcount: cartDetails && cartDetails.length > 0 ? cartDetails.length : 0,
  daintyproducts: daintyproducts_ && daintyproducts_.length > 0 ? daintyproducts_ : [],
});
