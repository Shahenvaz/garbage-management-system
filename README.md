#  Assessment Exercise: DevOps Hands-on Challenge

# first way 

[step 1]
Firstly you need to have a azure account to use terraform to setup azure pipeline for you.

[step 2]
Create an organization and generate a Personal Access Token (PAT) after that set environment vaiable from you system named <b>TF_VAR_org_service_url </b> and <b>TF_VAR_personal_access_token</b>.

[step 3]
Run 
```sh
Terraform init
Terraform plan
Terraform apply
```
command to initialize, plan and apply the changes.

# second way 
If you don't have an azure account you can also run this project locally by following steps: 

[step 1] 
First you need to install ansible to your system and provide a host machine name and ip address (for localuse you can provide your own details) Or you can create a inventory file on the existing location of asible nodeapp-role. 

[step 2] 
Run 

```sh
ansible-playbook -K master.yaml
```
It will install jenkins on your system.

[step 3]
Open jenkins applicaiton by typing [![Build Status] localhost:8080 ] on your browser and create a new pipeline project.

[step 4]
Provide some description and check github project option from the given options. Paste the url of this git repo or fork it and provide your repo url.

[step 5]

In bottom pipline option select [pipeline script from SCM ] and click run.
