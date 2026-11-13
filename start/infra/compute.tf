resource "aws_instance" "checkout" {
  ami           = "ami-lab-placeholder"
  instance_type = "t3.small"
  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "optional"
  }
}
