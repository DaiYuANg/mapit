package repository

import "github.com/uptrace/bun"

type ProjectRepository struct {
	*bun.DB
}

func NewProjectRepository(db *bun.DB) *ProjectRepository {
	return &ProjectRepository{db}
}
