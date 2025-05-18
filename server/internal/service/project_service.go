package service

import "mapit/internal/repository"

type ProjectService struct {
	Repository *repository.ProjectRepository
}

func NewProjectService(projectRepository *repository.ProjectRepository) *ProjectService {
	return &ProjectService{projectRepository}
}
