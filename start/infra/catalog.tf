resource "aws_iam_role" "catalog" {
  name = "catalog-deploy"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Federated = "arn:aws:iam::000000000000:oidc-provider/token.actions.githubusercontent.com" }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = { StringLike = { "token.actions.githubusercontent.com:sub" = "repo:OWNER/devsecops-lab:*" } }
    }]
  })
}
