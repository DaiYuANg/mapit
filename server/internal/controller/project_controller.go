package controller

import (
	"github.com/gofiber/fiber/v2"
	"mapit/internal/service"
)

type ProjectController struct {
	*service.ProjectService
}

func (p ProjectController) RegisterRoutes(app *fiber.App) {
	app.Get("/project", p.list)
}

func (p ProjectController) list(ctx *fiber.Ctx) error {

	return ctx.JSON(fiber.Map{})
}

func NewProjectController(projectService *service.ProjectService) *ProjectController {
	return &ProjectController{
		projectService,
	}
}
