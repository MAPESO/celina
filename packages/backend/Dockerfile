FROM alpine

RUN apk update
RUN apk add ca-certificates

WORKDIR /app
# copy binary into image
COPY backend.exe /app/
COPY schema.graphql /app/
COPY graphiql.html /app/

ENTRYPOINT ["./backend.exe"]
