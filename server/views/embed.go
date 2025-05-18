package views

import "embed"

//go:embed *.html partials/* layout/*
var Views embed.FS
