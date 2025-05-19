package controller

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"go.uber.org/zap"
	"mapit/internal/constant"
	"mapit/internal/model"
	"mapit/internal/service"
	"strconv"
)

type ProjectController struct {
	*service.ProjectService
	logger  *zap.SugaredLogger
	Session *session.Store
}

func (p ProjectController) RegisterRoutes(app *fiber.App) {
	group := app.Group("/project")
	group.Get("", p.list)
	group.Post("/create", p.create)
}

func (p ProjectController) list(ctx *fiber.Ctx) error {
	// 解析分页参数
	start, _ := strconv.Atoi(ctx.Query("_start", "0"))
	end, _ := strconv.Atoi(ctx.Query("_end", "10"))
	limit := end - start

	// 排序
	sortField := ctx.Query("_sort", "id")
	sortOrder := ctx.Query("_order", "ASC")

	titleFilter := ctx.Query("title_like", "")

	// 查询列表 & 总数
	list, total, err := p.ProjectService.ListWithQuery(start, limit, sortField, sortOrder, titleFilter)
	if err != nil {
		return err
	}
	ctx.Set(constant.XTotalCount, fmt.Sprintf("%d", total))
	ctx.Set(constant.AccessControlExposeHeaders, constant.XTotalCount)
	return ctx.JSON(list)
}

func (p ProjectController) create(ctx *fiber.Ctx) error {
	form := new(model.ProjectForm)
	if err := ctx.BodyParser(form); err != nil {
		return ctx.JSON(model.Result[string]{
			Code: "error",
		})
	}

	p.logger.Debugf("创建项目: 名称=%s, 描述=%s", form.Name, form.Description)
	err := p.ProjectService.CreateProject(form)
	if err != nil {
		return ctx.JSON(model.Result[string]{
			Code: "error",
		})
	}
	return ctx.JSON(model.Result[string]{
		Code: "success",
	})
}

func NewProjectController(projectService *service.ProjectService, logger *zap.SugaredLogger, store *session.Store) *ProjectController {
	return &ProjectController{
		projectService,
		logger,
		store,
	}
}
