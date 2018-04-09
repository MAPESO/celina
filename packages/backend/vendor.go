package main

import (
	graphql "github.com/graph-gopher/graphql-go"
	uuid "github.com/satori/go.uuid"
)

type Vendor struct {
	ID      string
	Name    string
	Address string
}

var vendors = []Vendor{}

func (r *Resolver) Vendors() []*vendorResolver {
	l := []*vendorResolver{}

	for _, vendor := range vendors {
		l = append(l, &vendorResolver{Vendor: vendor})
	}

	return l
}

type vendorResolver struct {
	Vendor Vendor
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

type CreateVendorInput struct {
	Name    string
	Address string
}

func (r *Resolver) CreateVendor(args *struct {
	Input CreateVendorInput
}) *vendorResolver {
	vendor := Vendor{
		ID:      uuid.NewV4().String(),
		Name:    args.Input.Name,
		Address: args.Input.Address,
	}

	vendors = append(vendors, vendor)

	return &vendorResolver{Vendor: vendor}
}
