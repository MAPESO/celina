package main

import (
	"github.com/kellydunn/golang-geo"
)

type Coordinates struct {
	Latitude  float64
	Longitude float64
}

type GeolocationInput struct {
	Coordinates Coordinates
	Radius      float64
}

func (c *Coordinates) Point() *geo.Point {
	return geo.NewPoint(c.Latitude, c.Longitude)
}

type viewerResolver struct {
	geolocation *GeolocationInput
}

func (r *Resolver) Viewer(args *struct {
	Geolocation *GeolocationInput
}) *viewerResolver {
	return &viewerResolver{
		geolocation: args.Geolocation,
	}
}

func (v *viewerResolver) Vendors() []*vendorResolver {
	l := []*vendorResolver{}

	// We get the user coordinates from the server and converted to a geo.Point
	// So we can then compare with each vendor coordinate and see if the distance is
	// smaller than the set radius
	if v.geolocation != nil {
		userPoint := geo.NewPoint(v.geolocation.Coordinates.Latitude, v.geolocation.Coordinates.Longitude)

		for _, vendor := range vendors {
			distance := userPoint.GreatCircleDistance(vendor.Coordinates.Point())
			if distance <= v.geolocation.Radius {
				l = append(l, &vendorResolver{Vendor: vendor, distance: distance})
			}
		}
	} else {
		for _, vendor := range vendors {
			l = append(l, &vendorResolver{Vendor: vendor, distance: 0})
		}
	}

	return l
}
