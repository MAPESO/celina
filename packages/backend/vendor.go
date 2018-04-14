package main

import (
	graphql "github.com/graph-gophers/graphql-go"
	uuid "github.com/satori/go.uuid"
)

type Vendor struct {
	ID          string
	Name        string
	Address     string
	Description string
	Category    string
	Diet        []string
	Coordinates Coordinates
}

var vendors = []Vendor{}

type vendorResolver struct {
	Vendor   Vendor
	distance float64
}

func (v *vendorResolver) ID() graphql.ID {
	return graphql.ID(v.Vendor.ID)
}

func (v *vendorResolver) Name() string {
	return v.Vendor.Name
}

func (v *vendorResolver) Address() string {
	return v.Vendor.Address
}

func (v *vendorResolver) Category() string {
	return v.Vendor.Category
}

func (v *vendorResolver) Description() string {
	return v.Vendor.Description
}

func (v *vendorResolver) Diet() []string {
	return v.Vendor.Diet
}

func (v *vendorResolver) Distance() float64 {
	return v.distance
}

func (v *vendorResolver) Coordinates() *coordinateResolver {
	return &coordinateResolver{
		Coordinates: v.Vendor.Coordinates,
	}
}

type coordinateResolver struct {
	Coordinates
}

func (c *coordinateResolver) Latitude() float64 {
	return c.Coordinates.Latitude
}

func (c *coordinateResolver) Longitude() float64 {
	return c.Coordinates.Longitude
}

type CoordinatesInput struct {
	Latitude  float64
	Longitude float64
}

type CreateVendorInput struct {
	Name        string
	Address     string
	Description string
	Category    string
	Diet        []string
	Coordinates CoordinatesInput
}

func (r *Resolver) CreateVendor(args *struct {
	Input CreateVendorInput
}) *vendorResolver {
	vendor := Vendor{
		ID:          uuid.NewV4().String(),
		Name:        args.Input.Name,
		Description: args.Input.Description,
		Address:     args.Input.Address,
		Category:    args.Input.Category,
		Diet:        args.Input.Diet,
	}

	vendor.Coordinates.Latitude = args.Input.Coordinates.Latitude
	vendor.Coordinates.Longitude = args.Input.Coordinates.Longitude

	vendors = append(vendors, vendor)

	return &vendorResolver{Vendor: vendor}
}
