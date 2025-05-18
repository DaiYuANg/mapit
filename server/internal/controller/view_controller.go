package controller

import (
	"github.com/gofiber/fiber/v2"
)

type ViewController struct{}

func (v *ViewController) RegisterRoutes(app *fiber.App) {
	app.Get("/", v.index)
}

func (v *ViewController) index(c *fiber.Ctx) error {
	return c.Render("index", fiber.Map{})
}

func NewViewController() *ViewController {
	return &ViewController{}
}
