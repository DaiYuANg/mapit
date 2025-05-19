package service

import (
	"gorm.io/gorm"
	"mapit/internal/entity"
	"mapit/internal/model"
)

type ProjectService struct {
	DB *gorm.DB
}

func NewProjectService(DB *gorm.DB) *ProjectService {
	return &ProjectService{DB}
}

func (p *ProjectService) ListWithQuery(offset int, limit int, sortField, sortOrder, titleFilter string) ([]entity.Project, int, error) {
	var projects []entity.Project
	var total int64

	db := p.DB.Model(&entity.Project{})

	// 模糊搜索，title_like 示例
	if titleFilter != "" {
		db = db.Where("title LIKE ?", "%"+titleFilter+"%")
	}

	// 先统计总数
	if err := db.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	//
	//// 构造排序字段，防止 SQL 注入可以加校验，这里简单演示
	//order := sortField + " " + strings.ToUpper(sortOrder)
	//if order != "ASC" && order != "DESC" {
	//  order = "ASC" // 默认排序
	//}
	//
	// 分页查询
	if err := db.Offset(offset).Limit(limit).Find(&projects).Error; err != nil {
		return nil, 0, err
	}

	return projects, int(total), nil
}

func (p *ProjectService) CreateProject(form *model.ProjectForm) error {
	project := &entity.Project{
		Name:        form.Name,
		Description: form.Description,
	}
	result := p.DB.Create(project)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
