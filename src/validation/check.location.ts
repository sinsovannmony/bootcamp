import { shopConstants } from 'src/order/constant/shop.constant';
export class checkLocation {
  check(userLat: number, userLong: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(shopConstants.lat - userLat); // deg2rad below
    var dLon = this.deg2rad(shopConstants.long - userLong);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(shopConstants.lat)) *
        Math.cos(this.deg2rad(userLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log(d);
    if (d < 0.05) return true;
    return false;
  }

  deg2rad(degrees: number) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }
}
