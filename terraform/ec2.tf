resource "aws_instance" "angular_server" {

  ami           = "ami-0f5ee92e2d63afc18"
  instance_type = "t2.micro"

  security_groups = [aws_security_group.app_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              apt update
              apt install docker.io -y
              docker run -d -p 80:80 atulkr7/findinmycity:latest
              EOF

  tags = {
    Name = "Angular-App-Server"
  }
}