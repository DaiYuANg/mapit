package model

type ProjectForm struct {
	Name        string `form:"name"`
	Description string `form:"description"`
}
