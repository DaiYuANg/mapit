package model

type Result[T any] struct {
	Code string
	Data T
}
