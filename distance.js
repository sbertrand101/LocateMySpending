// JAVASCRIPT CODE TO CALC DISTANCE BETWEEN TWO GEOCODES

var GeoCodeDiff = {};

GeoCodeDiff.EarthRadiusInMiles = 3956.0;
GeoCodeDiff.EarthRadiusInKilometers = 6367.0;

GeoCodeDiff.ToRadian = function(v) {
		return v * (Math.PI / 180);
};
GeoCodeDiff.DiffRadian = function(v1, v2) {
	return GeoCodeDiff.ToRadian(v2) - GeoCodeDiff.ToRadian(v1);
};
// Formula to calculate distance between two lat/long points: Haversine formula
GeoCodeDiff.CalcDistance = function(lat1, lng1, lat2, lng2, radius) {
	return radius * 2 * Math.asin(Math.min(1, Math.sqrt((Math.pow(Math.sin((GeoCodeDiff.DiffRadian(lat1, lat2))/2),2) + Math.cos(GeoCodeDiff.ToRadian(lat1)) * Math.cos(GeoCodeDiff.ToRadian(lat2)) * Math.pow(Math.sin((GeoCodeDiff.DiffRadian(lng1, lng2))/2),2)))));
};

// Calculate distance in Miles
d = GeoCodeDiff.CalcDistance(35.784010, -78.670987, 37.871899, -122.258540, GeoCodeDiff.EarthRadiusInMiles);
// Calculate distance in Kilometers
d = GeoCodeDiff.CalcDistance(35.784010, -78.670987, 37.871899, -122.258540, GeoCodeDiff.EarthRadiusInKilometers); 