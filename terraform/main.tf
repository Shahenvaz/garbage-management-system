resource "azuredevops_project" "project" {
  name               = var.project_name
  visibility         = var.visibility
  version_control    = var.version_control
  work_item_template = var.work_item_template
}

resource "azuredevops_agent_pool" "pool" {
  name           = var.agent_pool_name
  auto_provision = var.auto_provision
  auto_update    = var.auto_update
}

resource "azuredevops_agent_queue" "queue" {
  project_id    = azuredevops_project.project.id
  agent_pool_id = azuredevops_agent_pool.pool.id
}

resource "azuredevops_git_repository" "repository" {
  project_id = azuredevops_project.project.id
  name       = var.repo_name
  initialization {
    init_type = "Import"
    source_type = "Git"
    source_url = "https://github.com/Shahenvaz/garbage-management-system.git"
  }
}

resource "azuredevops_build_definition" "pipeline" {
  project_id = azuredevops_project.project.id
  name       = var.pipeline_name

  repository {
    repo_type = "TfsGit"
    repo_id   = azuredevops_git_repository.repository.id
    yml_path  = "azure-pipelines.yml"
  }

  ci_trigger {
    use_yaml = true
  }

}

resource "azuredevops_pipeline_authorization" "authorization" {
  project_id  = azuredevops_project.project.id
  resource_id = azuredevops_agent_queue.queue.id
  type        = "queue"
  pipeline_id = azuredevops_build_definition.pipeline.id
}