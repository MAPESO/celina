watch-build: 
	watchman-make -p '*.go'  --run 'go build'

build:
	go build -o backend.exe

run: build
	./backend.exe

deploy:
	env GOOS=linux GOARCH=amd64 go build -o backend.exe -v .
	docker build -t lpalmes/celina-backend .
	docker push lpalmes/celina-backend
	ssh root@67.205.167.181 "./update.sh"
