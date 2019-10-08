# Chainlink CryptoCompare External Adapter

External adapter for use on Google Cloud Platform, AWS Lambda or Docker. Zip and upload, then use trigger URL as bridge endpoint.

## Install

### Build yourself

```bash
npm install
```

Create zip:

```bash
zip -r cl-cc.zip .
```

### Docker
```bash
docker build . -t cryptocompareadaptor
docker run -d \
    --name cryptocompareadaptor \
    -p 80:80 \
    -e PORT=80 \
    cryptocompareadaptor
```


## Upload

Create a cloud function in GCP or Lambda, upload the zip file and set the handler function according to the platform you are using.

* GCP: `gcpservice`
* AWS: `handler`

## Test

```bash
mocha
```
